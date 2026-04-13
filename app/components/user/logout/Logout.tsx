"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { getApiUrl } from "../../../lib/api";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    async function runLogout() {
      try {
        await fetch(getApiUrl("/api/auth/logout"), {
          method: "POST",
          credentials: "include",
        });
      } finally {
        router.replace("/auth/login");
        router.refresh();
      }
    }

    void runLogout();
  }, [router]);

  return <p>Loggar ut...</p>;
}
