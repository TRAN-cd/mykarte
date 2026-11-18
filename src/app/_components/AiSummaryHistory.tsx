'use client'

import Image from "next/image"
import type { GetAiSummariesResponse } from "../api/ai-summaries/route"
import { useFetch } from "../_hooks/useFetch"
import { format } from "date-fns";
import { CalendarIcon } from "./icons/CalenderIcon";

interface Props {
  onClose: () => void
}

export const AiSummaryHistory = ({ onClose }: Props) => {
  const { data, error, isLoading } = useFetch<GetAiSummariesResponse>("/api/ai-summaries")
  const aiSummaries = data?.aiSummaries || []

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <Image src="/images/shared/icon_past.svg" alt="" width="24" height="24" />
          <p className="text-base font-medium leading-0">過去のAI要約</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="bg-white border border-(--color-sub) rounded-[5px] px-4 py-1 flex justify-center items-center duration-300 cursor-pointer hover:opacity-70"
        >
          <span className="text-[13px] font-medium">戻る</span>
        </button>
      </div>

      {isLoading &&
        <p className="w-full text-center text-sm mt-3 motion-safe:animate-pulse">読み込み中...</p>
      }
      {error &&
        <p className="w-full text-center text-sm text-(--color-danger) mt-3">AI要約の取得に失敗しました。</p>
      }
      {!isLoading && !error && aiSummaries.length === 0 && 
        <p className="w-full text-center text-sm mt-3">保存したAI要約はありません。</p>
      }
      {aiSummaries.length > 0 && 
        <ul className="flex flex-col gap-4 mt-3">
          {aiSummaries.map((summary) => (
            <li
              key={summary.id}
              className="bg-white px-5 py-3 border border-(--color-sub) rounded-[10px] flex flex-col gap-2"
            >
              <div className="flex items-center gap-1">
                <CalendarIcon className="text-(--color-sub) w-3 h-3" />
                <p className="text-[10px] text-(--color-sub) font-medium">
                  {format(new Date(summary.startDate), "yyyy/MM/dd")} ~ {format(new Date(summary.endDate), "yyyy/MM/dd")}
                </p>
              </div>
              <p className="text-xs text-(--color-primary) font-medium">作成日: {format(new Date(summary.createdAt), "yyyy/MM/dd")}</p>
              <p className="text-sm font-medium whitespace-pre-wrap">{summary.content}</p>
            </li>
          ))}
        </ul>
      }
    </div>
  )
}