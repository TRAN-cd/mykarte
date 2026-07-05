'use client'

import "../globals.css";
import { useRouteGuard } from "../_hooks/useRouteGuard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useRouteGuard()

  return (
    <div className="flex flex-col flex-1 bg-[url('/images/shared/bg.png')] bg-no-repeat bg-cover bg-fixed">
      <main className="flex-1 flex pt-16">
        {children}
      </main>
    </div>
  );
}
