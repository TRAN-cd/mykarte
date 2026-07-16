import Image from "next/image"
import Link from "next/link"

export const UserInfoCard = () => {

  return (
    <div className="flex justify-end items-center gap-3 pr-2">
      <p className="text-sm font-semibold">ユーザーネーム</p>
      <Link href="/mykarte/setting" className="bg-(--color-bg) rounded-[50%] w-10 p-1">
        <Image src="/images/avatar/happy.png" alt="" width="40" height="40" className=""/>
      </Link>
    </div>
  )
}