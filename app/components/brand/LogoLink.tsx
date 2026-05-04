"use client";

import Image from "next/image";
import Link from "next/link";

type LogoLinkProps = {
  width: number;
  height: number;
  className?: string;
  imageClassName?: string;
  href?: string;
};

export default function LogoLink({
  width,
  height,
  className,
  imageClassName,
  href = "/",
}: LogoLinkProps) {
  return (
    <Link href={href} aria-label="Trainly hem" className={className}>
      <Image
        src="/images/DogTrainlyLogo.png"
        alt="Trainly"
        width={width}
        height={height}
        priority
        className={imageClassName}
      />
    </Link>
  );
}
