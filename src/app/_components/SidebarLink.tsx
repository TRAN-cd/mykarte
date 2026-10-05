'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";

type SidebarLinkProps = {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string
}

export function SidebarLink({ href, icon: Icon, label }: SidebarLinkProps) {
  const pathname = usePathname();
  const exactMatchPaths = ["/mykarte", "/mykarte/records/new"];
  const isActive = exactMatchPaths.includes(href) 
    ? pathname === href 
    : pathname.startsWith(href) && !exactMatchPaths.includes(pathname) ;

  return (
    <li className={`rounded-[10px] mb-3.75 duration-300 hover:bg-white/80 hover:shadow-[0px_4px_30px_0px_rgba(26,153,96,0.04)] group ${isActive ? "bg-white/80 shadow-[0px_4px_30px_0px_rgba(28,153,96,0.1)]" : "" }`} >
      <Link
        href={href}
        className="flex items-center gap-2.5 p-2.5 max-lg:justify-center duration-300">
        <Icon className={`text-(--color-muted) group-hover:text-(--color-primary) transition-colors w-6 ${isActive ? "text-(--color-primary)" : "" }`} />
        <p className="font-medium max-lg:hidden duration-300">{label}</p>
      </Link>
    </li>
  )
}