'use client'

import { useState } from "react"
import { StarIcon } from "./icons/StarIcon"
import Image from "next/image"
import { subMonths, format } from "date-fns";
import { apiFetch } from "../_libs/apiFetch";
import { CheckIcon } from "./icons/CheckIcon";

export interface AiSummaryPeriods {
  startDate: string;
  endDate: string;
}

export interface AiSummaryContents {
  aiSummary: {
    id: number;
    content: string
  }
}

export const AiSummaryCard = () => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiSummary, setAiSummary] = useState<AiSummaryContents["aiSummary"] | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    setErrorMessage(null)

    const startDate = format(subMonths(new Date(), 1), 'yyyy-MM-dd')
    const endDate = format(new Date(), 'yyyy-MM-dd')

    try {
      const response = await apiFetch.post<AiSummaryPeriods, AiSummaryContents>("/api/ai-summaries", { startDate, endDate })
      if (response)
        setAiSummary(response.aiSummary)
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "要約の生成に失敗しました。"
      )
    } finally {
      setIsGenerating(false)
    }
  }

  const handleAction = async (action: "save" | "cancel") => {
    if (!aiSummary) return

    setIsUpdating(true)
    setErrorMessage(null)
    try {
      await apiFetch.put(`/api/ai-summaries/${aiSummary.id}`, { action })
      setAiSummary(null)
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "保存またはキャンセルに失敗しました。"
      )
    } finally {
      setIsUpdating(false)
    }
  }


  return (
    <div>
      <div className="bg-linear-to-br from-[#D6F2E5] to-[#E8F8F0] border-2 border-(--color-primary) px-5 py-6 rounded-[20px] shadow-[0px_10px_50px_0px_rgba(28,43,36,0.1)]">

        <button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating || aiSummary !== null}
          className="w-full flex items-center gap-4 text-left duration-300 cursor-pointer enabled:hover:opacity-70 disabled:cursor-not-allowed"
        >
          <StarIcon className="text-(--color-primary) transition-colors max-w-10" />
          <div className="text-(--color-primary) flex flex-col gap-1">
            <p className="text-xl font-bold">AI要約する</p>
            <p className="text-xs">今の体調を記録する</p>
          </div>
        </button>

        {isGenerating && <p className="pt-3 text-sm font-medium motion-safe:animate-pulse">要約を生成中…</p>}
        {errorMessage && <p className="pt-3 text-sm font-medium text-(--color-danger)">{errorMessage}</p>}
        {aiSummary && <p className="pt-3 text-sm font-medium whitespace-pre-wrap">{aiSummary.content}</p>}

        {aiSummary && (
          <div className="pt-3 auto w-full flex justify-center gap-3">
            <button
              type="button"
              onClick={() => handleAction("cancel")}
              disabled={isUpdating}
              className="text-[13px] flex justify-center items-center text-(--color-primary) bg-white py-2.5 px-5 border border-(--color-sub) rounded-[5px] duration-300 hover:opacity-70 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              キャンセル
            </button>
            <button
              type="button"
              onClick={() => handleAction("save")}
              disabled={isUpdating}
              className="text-[13px] flex justify-center items-center gap-1 text-white bg-(--color-primary) py-2.5 px-5 border border-(--color-primary) rounded-[5px] duration-300 hover:opacity-70 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed "
            >
              <CheckIcon className="w-3 duration-300" />
              <span className="text-[13px] font-medium leading-0 duration-300">
                保存する
              </span>
            </button>
          </div>
        )}
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