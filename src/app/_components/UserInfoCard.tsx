import Image from "next/image"
import Link from "next/link"
import { useFetch } from "../_hooks/useFetch"
import { UserResponse } from "../api/users/route"
import { useEffect, useState } from "react"
import { supabase } from "../_libs/supabase"

export const UserInfoCard = () => {
  const { data, error, isLoading } = useFetch<UserResponse>("/api/users/");
  const userName = data?.name;
  const userIcon = data?.avatarKey ?? "";

  const [avatarUrl, setAvatarUrl] = useState<null | string>(null);
  useEffect(() => {
    if (!userIcon) return

    const fetcher = async () => {
      const { data: { publicUrl } } = await supabase.storage
        .from("avatar")
        .getPublicUrl(userIcon)

      setAvatarUrl(publicUrl)
    }

    fetcher()
  }, [userIcon])

  return (
    <div className="flex justify-end items-center gap-3 pr-2">
      <p className="text-sm font-semibold">{userName}</p>
      <Link href="/mykarte/settings" className="bg-(--color-bg) rounded-[50%] w-10 p-1">
        <Image
          src={avatarUrl ?? "/images/avatar/happy.png"}
          alt="" width="40" height="40" className="rounded-full object-cover"
        />
      </Link>
    </div>
  )
}