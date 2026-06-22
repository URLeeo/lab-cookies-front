"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";

export default function UserMenu() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  async function handleLogout() {
    await logout();
    router.push("/auth");
  }

  if (loading) {
    return (
      <span className="text-xs uppercase tracking-widest text-muted">
        checking signal...
      </span>
    );
  }

  if (!user) {
    return (
      <Button href="/auth" variant="outline" size="sm">
        &gt; access_terminal
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="hidden text-xs uppercase tracking-widest text-muted sm:inline">
        signed in as{" "}
        <span className="text-primary">@{user.name || user.email}</span>
      </span>
      <Button onClick={handleLogout} variant="outline" size="sm">
        Log out
      </Button>
    </div>
  );
}
