'use client'

import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { useEffect } from "react";


export default function HomePage() {
  const { token } = useSupabaseSession()

  useEffect(() => {
    if (!token) return

    const fetcher = async () => {
      const response = await fetch(`/api/users/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      if (response.ok) {
        console.log("ユーザー情報が登録されました。");
      } else {
        const errorData = await response.json()
        console.log(errorData)
        alert("ユーザー情報の登録に失敗しました。")
      }
    }

    fetcher()
  }, [token])


  return (
    <>
      <main className="flex-1 flex">
        <div className="font-bold text-xl w-full flex justify-center items-center h-[80vh]">
          ダッシュボードのメインエリア
        </div>
      </main>
    </>
  );
}
