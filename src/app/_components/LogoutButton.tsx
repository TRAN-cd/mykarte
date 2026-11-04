'use client'

import { LogoutIcon } from "@/app/_components/icons/Logout";
import { useState } from "react";
import { supabase } from "@/app/_libs/supabase";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      const { error } = await supabase.auth.signOut()
      if(error) throw error
      router.replace("/login")
    } catch (error) {
      alert("ログアウトに失敗しました。")
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <li className="rounded-[10px] duration-300 text-(--color-text) hover:text-(--color-sub)">
      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="flex w-full items-center gap-2.5 p-2.5 max-lg:justify-center duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <LogoutIcon className="w-5 " />
        <span className="font-medium max-lg:hidden text-sm">
          {isLoggingOut ? "ログアウト中・・・" : "ログアウト"}
        </span>
      </button>
    </li>
  )
}