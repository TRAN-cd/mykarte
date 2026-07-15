import Image from "next/image"
import Link from "next/link"
import { RecordIcon } from "./icons/RecordIcon"

export const RecordButtonCard = () => {

  return (
    <Link href="/mykarte/records/new" className="flex items-center gap-4 bg-(--color-primary) px-5 py-6 rounded-[20px] shadow-[0px_10px_50px_0px_rgba(28,43,36,0.1)] duration-300 hover:shadow-none hover:opacity-70">
      <RecordIcon className="text-white max-w-10 w-full"/>
      <div className="text-white flex flex-col gap-1">
        <p className="text-xl font-bold">記録する</p>
        <p className="text-xs">今の体調を記録する</p>
      </div>
    </Link>
  )
}