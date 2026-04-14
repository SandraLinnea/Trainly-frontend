"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { getApiUrl } from "../../lib/api";

type LogoLinkProps = {
  width: number;
  height: number;
  className?: string;
};

export default function LogoLink({
  width,
  height,
  className,
}: LogoLinkProps) {
  const [href, setHref] = useState("/");

  useEffect(() => {
    let active = true;

    async function loadAuthState() {
      try {
        const response = await fetch(getApiUrl("/api/me"), {
          credentials: "include",
        });

        if (!active) return;

        setHref(response.ok ? "/home" : "/");
      } catch {
        if (active) {
          setHref("/");
        }
      }
    }

    void loadAuthState();

    return () => {
      active = false;
    };
  }, []);

  return (
    <Link href={href} aria-label="Trainly hem" className={className}>
      <Image
        src="/images/DogTrainlyLogoTransparent.png"
        alt="Trainly"
        width={width}
        height={height}
        priority
      />
    </Link>
  );
}
