'use client'

import { useState } from "react"
import { StarIcon } from "./icons/StarIcon"
import Image from "next/image"
import { subMonths, format, subWeeks, subYears } from "date-fns";
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

const PERIOD_PRESETS = [
  { label: "1週間", getStartDate: (today: Date) => subWeeks(today, 1)},
  { label: "2週間", getStartDate: (today: Date) => subWeeks(today, 2) },
  { label: "1ヶ月", getStartDate: (today: Date) => subMonths(today, 1) },
  { label: "3ヶ月", getStartDate: (today: Date) => subMonths(today, 3) },
  { label: "1年", getStartDate: (today: Date) => subYears(today, 1) },
]

export const AiSummaryCard = () => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiSummary, setAiSummary] = useState<AiSummaryContents["aiSummary"] | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [startDate, setStartDate] = useState<Date>(subMonths(new Date(), 1))
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [isPeriodOpen, setIsPeriodOpen] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState<string | null>("1ヶ月")

  const handleGenerate = async () => {
    setIsGenerating(true)
    setErrorMessage(null)

    try {
      const response = await apiFetch.post<AiSummaryPeriods, AiSummaryContents>("/api/ai-summaries", {
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd")
      })
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

  const handleSelectPreset = (preset: (typeof PERIOD_PRESETS)[number]) => {
    const today = new Date()
    setEndDate(today)
    setStartDate(preset.getStartDate(today))
    setSelectedPreset(preset.label)
  }

  const isSameYear = startDate.getFullYear() === endDate.getFullYear();
  const dateFormat = isSameYear ? "M/d" : "yyyy/M/d";



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
            <p className="text-xs">
              {format(startDate, dateFormat)}〜{format(endDate, dateFormat)}の体調を要約します
            </p>
          </div>
        </button>

        {isGenerating && <p className="pt-3 text-sm font-medium motion-safe:animate-pulse">要約を生成中…</p>}
        {errorMessage && <p className="pt-3 text-sm font-medium text-(--color-danger)">{errorMessage}</p>}
        {aiSummary && <p className="pt-3 text-sm font-medium whitespace-pre-wrap">{aiSummary.content}</p>}

        {aiSummary && (
          <div className="pt-3 w-full flex justify-center gap-3">
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

      <div className="flex justify-end items-center gap-4 py-3">
        <button
          type="button"
          onClick={() => setIsPeriodOpen(!isPeriodOpen)}
          aria-expanded={isPeriodOpen}
          className="flex items-center gap-1 duration-300 cursor-pointer hover:opacity-70"
        >
          <span className="text-xs font-medium text-(--color-primary)">指定する期間を変更</span>
          <Image src="/images/shared/icon_sort.svg" alt="" width="18" height="18" />
        </button>
        <div><Image src="/images/shared/icon_help.svg" alt="" width="24" height="24" /></div>
      </div>
      {isPeriodOpen && (
        <div className="mb-3 p-4 bg-white rounded-[15px] border border-(--color-sub)/30 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {PERIOD_PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`text-xs font-medium py-1 px-1.5 rounded-full border duration-300 cursor-pointer ${
                  selectedPreset === preset.label
                    ? "bg-(--color-primary) border-(--color-primary) text-white"
                    : "bg-white border-(--color-sub) text-(--color-primary) hover:bg-(--color-bg)"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
          {/* ステップ4：日付の入力 */}
        </div>
      )}

      <div className="flex justify-center items-center gap-1 pt-3 border-t border-(--color-sub)/20">
        <Image src="/images/shared/icon_past.svg" alt="" width="16" height="16" />
        <p className="text-xs font-medium text-(--color-primary)">過去のAI要約を確認する</p>
        <Image src="/images/shared/icon_arrow01.svg" alt="" width="14" height="14" />
      </div>
    </div>
  )
}