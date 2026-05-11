import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon.png?v=2", sizes: "32x32", type: "image/png" },
      { url: "/images/TrainlyFavicon.png?v=2", sizes: "1024x1024", type: "image/png" },
    ],
    shortcut: "/favicon.png?v=2",
    apple: "/apple-icon.png?v=2",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
