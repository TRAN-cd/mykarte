import { StarIcon } from "./icons/StarIcon"
import Image from "next/image"

export const AiSummaryCard = () => {
  return (
    <div>
      <div className="flex items-center gap-4 bg-gradient-to-br from-[#D6F2E5] to-[#E8F8F0] border-2 border-(--color-primary) px-5 py-6 rounded-[20px] shadow-[0px_10px_50px_0px_rgba(28,43,36,0.1)] duration-300 hover:shadow-none hover:opacity-70">
        <StarIcon className="text-(--color-primary) transition-colors max-w-10 " />
        <div className="text-(--color-primary) flex flex-col gap-1">
          <p className="text-xl font-bold">記録する</p>
          <p className="text-xs">今の体調を記録する</p>
        </div>
      </div>
      <div className="flex justify-end items-center gap-4 py-3 border-b border-(--color-sub)/20">
        <div className="flex items-center gap-1">
          <p className="text-xs font-medium text-(--color-primary)">指定する期間を変更</p>
          <Image src="/images/shared/icon_sort.svg" alt="" width="18" height="18" />
        </div>
        <div><Image src="/images/shared/icon_help.svg" alt="" width="24" height="24" /></div>
      </div>
      <div className="flex justify-center items-center gap-1 pt-3">
        <Image src="/images/shared/icon_past.svg" alt="" width="16" height="16" />
        <p className="text-xs font-medium text-(--color-primary)">過去のAI要約を確認する</p>
        <Image src="/images/shared/icon_arrow01.svg" alt="" width="14" height="14" />
      </div>
    </div>
  )
}