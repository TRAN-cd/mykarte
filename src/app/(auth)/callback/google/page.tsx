'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const appUrl = process.env.NEXT_PUBLIC_APP_URL;

export default function OAuthCallback() {
  const router = useRouter()
  const [accessToken, setAccessToken] = useState<string | null>(null)

  useEffect(() => {
    const hash = window.location.hash.substring(1)
    const params = new URLSearchParams(hash)
    const token = params.get("access_token")
    setAccessToken(token)
  }, [])

  useEffect(() => {
    const postUser = async () => {
      if (!accessToken) return

      try {
        const response = await fetch(`/api/users/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken
          },
        });

        if(response.ok) {
          router.replace('/mykarte/')
        } else {
          console.log("ユーザー情報の登録に失敗しました。")
        }
      } catch (error) {
        console.log("ユーザー情報の登録エラー", error);
      }
    }

    postUser()
  }, [accessToken])


  return (
    <div className="flex items-center justify-center w-full">
      <p className="text-(--color-primary) text-xs border border-(--color-sub) bg-(--color-bg) max-w-115 w-full text-center p-3 rounded-[10px]">読込み中...</p>
    </div>
  )
}