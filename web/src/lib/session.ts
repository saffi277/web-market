"use client";

import type { Session, User } from "./types";

const KEY = "zawan.session";

export function saveSession(s: Session) {
  localStorage.setItem(KEY, JSON.stringify(s));
}

export function readSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(KEY);
}

export function demoDaysLeft(user: User): number {
  if (!user.demoExpiresAt) return 0;
  const ms = new Date(user.demoExpiresAt).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}
