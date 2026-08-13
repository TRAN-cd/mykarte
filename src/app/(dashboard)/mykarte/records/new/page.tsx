'use client'

import { useForm } from "react-hook-form";
import { useRef } from "react";
import { PageHeader } from "@/app/_components/PageHeader";
import { RecordItemTitle } from "@/app/_components/RecordItemTitle";
import { CalendarIcon } from "@/app/_components/icons/CalenderIcon"

interface RecordFormInputs {
  recordDate: Date
  // recordType: enum
}

export default function NewRecords() {
  const { register } = useForm<RecordFormInputs>()
  const { ref, ...rest } = register("recordDate")
  const dateInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="px-6 py-5">
      <PageHeader pageTitle="新規記録" />

      <main className="flex flex-col gap-6 p-5 bg-white rounded-[20px] border-(--color-bg) border">
          <form action="" className="flex flex-col gap-3">
            <RecordItemTitle itemTitle="記録日"/>
            <input 
              id="recordDate"
              type="date"
              ref={ref}
              className="opacity-0 absolute"
            />
            <div 
              onClick={() => ref.current?.showPicker()} 
              className="bg-(--color-card-bg) p-3 rounded-[10px] border border-(--color-primary) font-en text-xs w-40"
            >
              <p></p>
              <CalendarIcon className="text-(--color-sub) w-3.5 h-3.5" />
            </div>
          </form>
      </main>
    </div>
  );
}
