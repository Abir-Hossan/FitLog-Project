"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useFitLog } from "./FitLogProvider";

export function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();
  const [open, setOpen] = useState(false);
  const isWorkouts = pathname === "/" || pathname.startsWith("/workout/");
  const isPlan = pathname.startsWith("/my-plan");

  const nav = (
    <div className="flex items-center gap-2">
      <Link
        className={isWorkouts ? "nav-link active" : "nav-link"}
        href="/"
        onClick={() => setOpen(false)}
      >
        Workouts
      </Link>
      <Link
        className={isPlan ? "nav-link active" : "nav-link"}
        href="/my-plan"
        onClick={() => setOpen(false)}
      >
        My Plan
      </Link>
    </div>
  );

  return (
    <header className="border-b border-border bg-bg/95 backdrop-blur">
      <div className="container-shell flex h-16.5 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
          aria-label="FitLog home"
        >
          <Image
            src="/logo.png"
            alt="FitLog"
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
            priority
          />
          <span className="font-display text-xl font-bold tracking-wide">
            FitLog
          </span>
        </Link>

        <nav className="hidden md:block">{nav}</nav>

        <div className="hidden items-center gap-5 md:flex">
          <Link href="/my-plan" className="counter-link">
            Plan <span className="counter">{plan.length}</span>
          </Link>
          <Link href="/my-plan?tab=saved" className="counter-link">
            Saved <span className="counter counter-muted">{saved.length}</span>
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden rounded-lg border border-border p-2 text-muted"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {nav}
            <div className="mt-2 flex gap-5 border-t border-border pt-3">
              <Link
                href="/my-plan"
                className="counter-link"
                onClick={() => setOpen(false)}
              >
                Plan <span className="counter">{plan.length}</span>
              </Link>
              <Link
                href="/my-plan?tab=saved"
                className="counter-link"
                onClick={() => setOpen(false)}
              >
                Saved{" "}
                <span className="counter counter-muted">{saved.length}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
