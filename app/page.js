import Button from "./components/Button";
import UserMenu from "./components/UserMenu";

// ── Placeholder content (static — no fetching) ─────────────────────────
const projects = [
  {
    name: "neon-orm",
    blurb: "Type-safe ORM that compiles straight to the metal.",
    tags: ["rust", "db"],
    stars: 2841,
    forks: 193,
  },
  {
    name: "ghostkit",
    blurb: "Zero-config component library for dark-mode UIs.",
    tags: ["react", "ui"],
    stars: 5120,
    forks: 412,
  },
  {
    name: "synapse-cli",
    blurb: "AI pair-programmer that lives in your terminal.",
    tags: ["ai", "cli"],
    stars: 8930,
    forks: 766,
  },
  {
    name: "voidpack",
    blurb: "Bundler built on the void — instant cold starts.",
    tags: ["tooling", "wasm"],
    stars: 1502,
    forks: 88,
  },
  {
    name: "chrome-veins",
    blurb: "Animated SVG engine for cyberpunk dashboards.",
    tags: ["svg", "anim"],
    stars: 977,
    forks: 54,
  },
  {
    name: "deadlock",
    blurb: "Distributed lock manager with zero deadlocks. Really.",
    tags: ["go", "infra"],
    stars: 3344,
    forks: 220,
  },
];

const snippets = [
  {
    title: "debounce.js",
    code: `const debounce = (fn, ms) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
};`,
  },
  {
    title: "neon.css",
    code: `.glow {
  color: #00f0ff;
  text-shadow: 0 0 8px #00f0ff,
               0 0 24px #00f0ff;
}`,
  },
  {
    title: "pipe.py",
    code: `from functools import reduce

def pipe(*fns):
    return lambda x: reduce(
        lambda acc, f: f(acc), fns, x
    )`,
  },
];

const members = [
  { handle: "n3on_rider", role: "core" },
  { handle: "byte_witch", role: "maintainer" },
  { handle: "0xGH0ST", role: "contributor" },
  { handle: "mainframe_mei", role: "core" },
  { handle: "void.runner", role: "contributor" },
  { handle: "synth_kid", role: "maintainer" },
];

function TagChip({ children }) {
  return (
    <span className="text-[10px] uppercase tracking-widest text-secondary border border-secondary/50 px-2 py-0.5 rounded-sm">
      {children}
    </span>
  );
}



export default function Home() {
  return (
    <div className="flex flex-col flex-1 text-foreground">
      {/* ── Top nav ─────────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-panel-border">
        <span className="glitch neon-text text-primary text-xl font-bold tracking-[0.3em]">
          DEVFORGE
        </span>
        <UserMenu />
      </header>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="scanlines px-6 sm:px-10 py-20 sm:py-28 text-center border-b border-panel-border">
        <p className="text-secondary text-xs uppercase tracking-[0.4em] mb-4">
          {"// dev grid online"}
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold text-primary max-w-3xl mx-auto leading-tight">
          Build in the dark.
          <br />
          Ship at the speed of light.
        </h1>
        <p className="mt-6 text-muted max-w-xl mx-auto">
          DevForge is the underground community for builders, breakers, and
          dreamers. Browse projects, trade snippets, and jack in.
        </p>
        <Button href="/auth" className="mt-10">
          Log in →
        </Button>
      </section>

      {/* ── Projects ────────────────────────────────────────────── */}
      <section className="px-6 sm:px-10 py-16">
        <h2 className="text-primary neon-text uppercase tracking-[0.3em] text-sm mb-8">
          ## trending_repos
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.name}
              className="bg-panel border border-panel-border rounded-md p-5 hover:border-primary transition-colors group"
            >
              <h3 className="text-primary font-bold">
                {p.name}
              </h3>
              <p className="text-muted text-sm mt-2 min-h-[2.5rem]">
                {p.blurb}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {p.tags.map((t) => (
                  <TagChip key={t}>{t}</TagChip>
                ))}
              </div>
              <div className="flex gap-5 mt-4 text-xs text-muted">
                <span>★ {p.stars.toLocaleString()}</span>
                <span>⑂ {p.forks}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Snippets ────────────────────────────────────────────── */}
      <section className="px-6 sm:px-10 py-16 border-t border-panel-border">
        <h2 className="text-primary neon-text uppercase tracking-[0.3em] text-sm mb-8">
          ## snippet_vault
        </h2>
        <div className="grid gap-5 lg:grid-cols-3">
          {snippets.map((s) => (
            <div
              key={s.title}
              className="bg-panel border border-panel-border rounded-md overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-2 border-b border-panel-border">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="ml-2 text-xs text-muted">
                  {s.title}
                </span>
              </div>
              <pre className="p-4 text-xs text-accent/90 overflow-x-auto">
                <code>{s.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </section>

      {/* ── Online members ──────────────────────────────────────── */}
      <section className="px-6 sm:px-10 py-16 border-t border-panel-border">
        <h2 className="text-primary neon-text uppercase tracking-[0.3em] text-sm mb-8">
          ## online_now
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m) => (
            <li
              key={m.handle}
              className="flex items-center gap-3 bg-panel border border-panel-border rounded-md px-4 py-3"
            >
              <span className="pulse-dot w-2.5 h-2.5 rounded-full bg-accent" />
              <span className="text-primary">@{m.handle}</span>
              <span className="ml-auto text-[10px] uppercase tracking-widest text-muted">
                {m.role}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="mt-auto px-6 sm:px-10 py-8 border-t border-primary/30 text-center text-xs text-muted">
        <span className="text-primary neon-text tracking-[0.3em]">DEVFORGE</span>{" "}
        {"// © 2099 — all signals encrypted."}
      </footer>
    </div>
  );
}
