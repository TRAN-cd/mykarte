'use client'

import { useIsGuest } from "@/app/_hooks/useIsGuest"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SettingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { isGuest, isLoading } = useIsGuest()
  const router = useRouter()

  useEffect(() => {
    if (isGuest) router.replace("/mykarte")
  }, [isGuest, router])

  if (isGuest || isLoading) return null

  return (
    <>{children}</>
  )
}