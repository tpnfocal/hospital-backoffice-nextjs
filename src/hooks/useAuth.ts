"use client";

import { useMemo } from "react";
import type { Role } from "@/config/nav";

export function useAuth() {
  const roles = useMemo<Role[]>(() => ["admin"], []);
  const canSee = (itemRoles: Role[]) =>
    itemRoles.some((r) => roles.includes(r));
  return { roles, canSee };
}
