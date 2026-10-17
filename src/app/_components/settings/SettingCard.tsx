'use client'

import Image from "next/image";
import Link from "next/link";

type SettingCardProps = {
  variant?: "default" | "danger";
  href: string;
  iconPath: string;
  label: string;
  description: string
}

export function SettingCard({ variant, href, iconPath, label, description }: SettingCardProps) {

  return (
    <Link href={href} className="py-3 border-t border-(--color-sub)/20 flex items-center justify-between group cursor-pointer">
      <div className="flex gap-3 items-center">
        <div className={`p-1.5 rounded-[5px] ${variant === "danger" ? "bg-(--color-danger-bg)" : "bg-(--color-bg)"}`}>
          <Image src={iconPath} alt="" width="23" height="23" className="" />
        </div>
        <div className="flex flex-col gap-1">
          <p className={`text-sm font-medium duration-300 ${variant === "danger" ? "text-(--color-text) group-hover:text-(--color-danger)" : "text-(--color-text) group-hover:text-(--color-primary)"}`}>{label}</p>
          <p className={`text-[10px] ${variant === "danger" ? "text-(--color-danger)/80" : "text-(--color-sub)"}`}>{description}</p>
        </div>
      </div>
      <Image src="/images/shared/icon_arrow03.svg" alt="" width="18" height="18" className="" />
    </Link>
  )
}