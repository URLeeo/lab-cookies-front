"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Field from "./Field";
import Button from "../components/Button";

export default function AuthForm() {
  const router = useRouter();
  const { login, signup } = useAuth();
  const [mode, setMode] = useState("login");
  const [errors, setErrors] = useState({ confirm: "", form: "" });
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const confirmRef = useRef(null);

  const isLogin = mode === "login";

  async function handleLogin(e) {
    e.preventDefault();
    setSubmitting(true);
    setErrors({ confirm: "", form: "" });

    try {
      await login({ email, password });
      router.push("/");
    } catch (err) {
      setErrors((prev) => ({ ...prev, form: err.message }));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    setErrors({ confirm: "", form: "" });

    if (password !== confirm) {
      setErrors((prev) => ({ ...prev, confirm: "Passwords do not match" }));
      confirmRef.current?.focus();
      return;
    }

    setSubmitting(true);

    try {
      await signup({ name, email, password });
      router.push("/");
    } catch (err) {
      setErrors((prev) => ({ ...prev, form: err.message }));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-lg border border-primary/60 bg-panel/95 p-7 shadow-[0_0_30px_rgba(0,240,255,0.14)] sm:p-8">
      <Link
        href="/"
        className="block text-center text-primary neon-text font-bold tracking-[0.3em] mb-1 cursor-pointer"
      >
        DEVFORGE
      </Link>

      <p className="text-center text-xs text-muted tracking-widest mb-8">
        {isLogin ? "// access_terminal" : "// create_identity"}
      </p>

      <div className="mb-6 grid grid-cols-2 rounded-sm border border-panel-border bg-background/70 p-1">
        <button
          type="button"
          onClick={() => {
            setMode("login");
            setErrors({ confirm: "", form: "" });
          }}
          className={`rounded-sm px-3 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
            isLogin
              ? "bg-primary text-background"
              : "text-muted hover:text-primary"
          }`}
        >
          Log in
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("signup");
            setErrors({ confirm: "", form: "" });
          }}
          className={`rounded-sm px-3 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
            !isLogin
              ? "bg-primary text-background"
              : "text-muted hover:text-primary"
          }`}
        >
          Register
        </button>
      </div>

      <form
        onSubmit={isLogin ? handleLogin : handleSignup}
        className="flex flex-col gap-4"
      >
        {!isLogin && (
          <Field
            id="name"
            label="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, confirm: "" }));
            }}
            placeholder="n3on_rider"
          />
        )}

        <Field
          id="email"
          label="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@grid.net"
        />

        <Field
          id="password"
          label="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, confirm: "" }));
          }}
          placeholder="password"
        />

        {!isLogin && (
          <Field
            id="confirm-password"
            label="confirm password"
            type="password"
            value={confirm}
            inputRef={confirmRef}
            onChange={(e) => {
              setConfirm(e.target.value);
              setErrors((prev) => ({ ...prev, confirm: "" }));
            }}
            error={errors.confirm}
            placeholder="password"
          />
        )}

        {errors.form && (
          <p
            role="alert"
            aria-live="polite"
            className="rounded-sm border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-300"
          >
            {errors.form}
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          className="mt-2 w-full"
          disabled={submitting}
        >
          {submitting ? "Connecting..." : isLogin ? "Log in" : "Register"}
        </Button>
      </form>

      <p className="text-center text-xs text-muted mt-6">
        {isLogin ? "No account yet? " : "Already wired in? "}
        <button
          type="button"
          onClick={() => {
            setMode(isLogin ? "signup" : "login");
            setErrors({ confirm: "", form: "" });
          }}
          className="text-primary hover:text-primary-strong underline underline-offset-4 cursor-pointer"
        >
          {isLogin ? "Register" : "Log in"}
        </button>
      </p>

      <Link
        href="/"
        className="block text-center text-xs text-muted hover:text-primary mt-4 cursor-pointer"
      >
        back to home
      </Link>
    </div>
  );
}
