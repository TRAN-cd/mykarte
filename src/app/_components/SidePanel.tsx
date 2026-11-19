'use client'

import { useState } from "react"
import { AiSummaryCard } from "./AiSummaryCard"
import { RecordButtonCard } from "./RecordButtonCard"
import { UserInfoCard } from "./UserInfoCard"
import { WeekCalendar } from "./WeekCalendar"
import { AiSummaryHistory } from "./AiSummaryHistory"

export const SidePanel = () => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)

  return (
    <div className="relative overflow-hidden bg-(--color-bg) rounded-[0_15px_15px_0] max-w-[314px] w-full">
      <div className="h-full overflow-y-auto p-[20px_12px]">
        <UserInfoCard />
        <div className="pt-9 flex flex-col gap-5">
          <RecordButtonCard />
          <AiSummaryCard onOpenHistory={() => setIsHistoryOpen(true)}/>
        </div>
        <WeekCalendar />
      </div>

      <div
        inert={!isHistoryOpen}
        className={`absolute inset-0 mt-16 bg-linear-to-br from-[#D6F2E5] to-[#E8F8F0] p-[20px_12px] rounded-[15px_15px_0_0] overflow-y-auto transition-transform duration-300 ${isHistoryOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <AiSummaryHistory onClose={() => setIsHistoryOpen(false)} />
      </div>
    </div>
  )
}