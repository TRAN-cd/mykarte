'use client'

import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { PageHeader } from "@/app/_components/PageHeader";
import { RecordItemTitle } from "@/app/_components/RecordItemTitle";
import { CustomDateInput } from "@/app/_components/CustomDateInput";
import { RecordTypeCard } from "@/app/_components/records/RecordTypeCard";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { ja } from "date-fns/locale";
import { RecordIcon } from "@/app/_components/icons/RecordIcon";
import { HospitalIcon } from "@/app/_components/icons/HospitalIcon";
import { MinusIcon } from "@/app/_components/icons/MinusIcon";
import { MildIcon } from "@/app/_components/icons/MildIcon";
import { ModerateIcon } from "@/app/_components/icons/ModerateIcon";
import { SevereIcon } from "@/app/_components/icons/SevereIcon";
import { CheckIcon } from "@/app/_components/icons/CheckIcon";


interface RecordFormInputs {
  recordDate: Date
  recordType: "daily" | "medical"

  content: string
  severityLevel: "mild" | "moderate" | "severe" | "na"
  timeZone: ("morning" | "daytime" | "evening" | "night" | "allDay")[]
  treatment: string
  nextVisit: Date | null
}

export default function NewRecords() {
  const { control, register, watch } = useForm<RecordFormInputs>()
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  console.log(watch("timeZone"));

  const handleOpenDetail = () => {
    setIsDetailOpen((prev) => !prev)
  }

  return (
    <div className="px-6 py-5">
      <PageHeader pageTitle="新規記録" />

      <div className="flex flex-col gap-6 p-5 bg-white rounded-[20px] border-(--color-bg) border">
        <form action="" className="flex flex-col gap-6">
          <div>
            <RecordItemTitle itemTitle="記録日" htmlFor="recordDate" />
            <Controller
              name="recordDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={field.onChange}
                  customInput={<CustomDateInput />}
                  locale={ja}
                  dateFormat={"yyyy/MM/dd"}
                  placeholderText="年/ 月/ 日"
                />
              )}
            />
          </div>
          <div>
            <RecordItemTitle itemTitle="記録の種類" htmlFor="recordType" />
            <Controller
              name="recordType"
              control={control}
              render={({ field }) => (
                <div className="flex items-center gap-5 pt-3">
                  <RecordTypeCard
                    cardIcon={RecordIcon}
                    cardTitle="日常の記録"
                    cardDescription="体調・症状・気になること"
                    isSelected={field.value === "daily"}
                    onClick={() => field.onChange("daily")}
                  />
                  <RecordTypeCard
                    cardIcon={HospitalIcon}
                    cardTitle="診療の内容"
                    cardDescription="受診後の記録・処方薬など"
                    isSelected={field.value === "medical"}
                    onClick={() => field.onChange("medical")}
                  />
                </div>
              )}
            />
          </div>
          <div>
            <RecordItemTitle itemTitle="カテゴリー" htmlFor="category" />
          </div>
          <div>
            <RecordItemTitle itemTitle="メモ" htmlFor="content" />
            <textarea
              id="content"
              placeholder="例：お腹の調子が昨日から悪い。薬は飲んでない。"
              className="bg-(--color-card-bg) p-3 rounded-[10px] border border-(--color-primary) font-en text-xs w-full min-h-17.5 flex justify-between items-center mt-3"
              {...register("content")}
            >
            </textarea>
          </div>
          <div>
            <div
              onClick={handleOpenDetail}
              className="flex gap-1 items-center text-(--color-primary) text-[13px] font-medium pb-2.5 border-b border-b-(--color-sub)/20 w-full"
            >
              <div className="relative">
                <MinusIcon className="w-4" />
                <MinusIcon
                  className={`w-4 absolute inset-0 transition-transform duration-300 ${isDetailOpen ? "rotate-0" : "rotate-90"}`}
                />
              </div>
              <p>詳しく記録する</p>
            </div>

            <div className={`flex flex-col gap-6 bg-(--color-card-bg) p-3 rounded-[10px] border border-(--color-primary) overflow-hidden transition-all duration-300 ${isDetailOpen ? "max-h-96 mt-2.5 opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="flex gap-5.5 w-full">
                <fieldset className="flex flex-col gap-3 max-w-58.5 w-full">
                  <legend className="text-[10px] font-medium text-(--color-sub) pb-3">強さ・程度</legend>
                  <div className="flex items-center gap-1.5 w-full">
                    <label className="flex items-center gap-1 text-[10px] text-(--color-sub) py-0.5 px-1.5 bg-white border border-(--color-primary) rounded-[10px] duration-300 has-checked:text-(--color-primary) has-checked:font-medium has-checked:border-(--color-primary) has-checked:bg-(--color-bg)">
                      <input type="radio" value="mild" className="hidden" {...register("severityLevel")} />
                      <MildIcon className="w-3" />
                      <span className="leading-none">軽度</span>
                    </label>
                    <label className="flex items-center gap-1 text-[10px] text-(--color-sub) py-0.5 px-1.5 bg-white border border-(--color-primary) rounded-[10px] duration-300 has-checked:text-[#D97706] has-checked:font-medium has-checked:border-[#D97706] has-checked:bg-[#FFF4E5]">
                      <input type="radio" value="moderate" className="hidden" {...register("severityLevel")} />
                      <ModerateIcon className="w-3" />
                      <span className="leading-none">中等度</span>
                    </label>
                    <label className="flex items-center gap-1 text-[10px] text-(--color-sub) py-0.5 px-1.5 bg-white border border-(--color-primary) rounded-[10px] duration-300 has-checked:text-(--color-danger) has-checked:font-medium has-checked:border-(--color-danger) has-checked:bg-(--color-danger-bg)">
                      <input type="radio" value="severe" className="hidden" {...register("severityLevel")} />
                      <SevereIcon className="w-3" />
                      <span className="leading-none">重度</span>
                    </label>
                    <label className="flex items-center gap-1 text-[10px] text-(--color-sub) py-0.5 px-1.5 bg-white border border-(--color-primary) rounded-[10px] duration-300 has-checked:text-(--color-primary) has-checked:font-medium has-checked:border-(--color-primary) has-checked:bg-(--color-bg)">
                      <input type="radio" value="na" className="hidden" {...register("severityLevel")} />
                      <span className="leading-none">該当なし</span>
                    </label>
                  </div>
                </fieldset>
                <fieldset className="flex flex-col gap-3 max-w-46 w-full">
                  <legend className="text-[10px] font-medium text-(--color-sub) pb-3">時間帯</legend>
                  <div className="flex items-center gap-1.5 w-full">
                    <label className="flex items-center gap-1 text-[10px] text-(--color-sub) py-0.5 px-1.5 bg-white border border-(--color-primary) rounded-[10px] duration-300 has-checked:text-(--color-primary) has-checked:font-medium has-checked:border-(--color-primary) has-checked:bg-(--color-bg)">
                      <input type="checkbox" value="morning" className="hidden" {...register("timeZone")} />
                      <span className="leading-none">朝</span>
                    </label>
                    <label className="flex items-center gap-1 text-[10px] text-(--color-sub) py-0.5 px-1.5 bg-white border border-(--color-primary) rounded-[10px] duration-300 has-checked:text-(--color-primary) has-checked:font-medium has-checked:border-(--color-primary) has-checked:bg-(--color-bg)">
                      <input type="checkbox" value="daytime" className="hidden" {...register("timeZone")} />
                      <span className="leading-none">昼</span>
                    </label>
                    <label className="flex items-center gap-1 text-[10px] text-(--color-sub) py-0.5 px-1.5 bg-white border border-(--color-primary) rounded-[10px] duration-300 has-checked:text-(--color-primary) has-checked:font-medium has-checked:border-(--color-primary) has-checked:bg-(--color-bg)">
                      <input type="checkbox" value="evening" className="hidden" {...register("timeZone")} />
                      <span className="leading-none">夕</span>
                    </label>
                    <label className="flex items-center gap-1 text-[10px] text-(--color-sub) py-0.5 px-1.5 bg-white border border-(--color-primary) rounded-[10px] duration-300 has-checked:text-(--color-primary) has-checked:font-medium has-checked:border-(--color-primary) has-checked:bg-(--color-bg)">
                      <input type="checkbox" value="night" className="hidden" {...register("timeZone")} />
                      <span className="leading-none">夜</span>
                    </label>
                    <label className="flex items-center gap-1 text-[10px] text-(--color-sub) py-0.5 px-1.5 bg-white border border-(--color-primary) rounded-[10px] duration-300 has-checked:text-(--color-primary) has-checked:font-medium has-checked:border-(--color-primary) has-checked:bg-(--color-bg)">
                      <input type="checkbox" value="allDay" className="hidden" {...register("timeZone")} />
                      <span className="leading-none">終日</span>
                    </label>
                  </div>
                </fieldset>
              </div>
              <div className="flex gap-5.5 w-full">
                <div className="flex flex-col max-w-58.5 w-full">
                  <label htmlFor="treatment" className="text-[10px] font-medium text-(--color-sub) pb-3">対処したこと</label>
                  <textarea
                    id="treatment"
                    placeholder="例：暖かくして寝た。"
                    rows={1}
                    className="bg-(--color-card-bg) p-3 rounded-[10px] border border-(--color-primary) font-en text-xs w-full min-h-8 flex justify-between items-center"
                    {...register("treatment")}
                  >
                  </textarea>
                </div>
                <div className="flex flex-col max-w-46 w-full">
                  <label htmlFor="nextVisit" className="text-[10px] font-medium text-(--color-sub)">次回受診予定日</label>
                  <Controller
                    name="nextVisit"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        selected={field.value}
                        onChange={field.onChange}
                        customInput={<CustomDateInput />}
                        locale={ja}
                        dateFormat={"yyyy/MM/dd"}
                        placeholderText="年/ 月/ 日"
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center gap-3">
              <button
                type="button"
                // onClick={onCancel}
                className="w-27 h-9 flex justify-center items-center bg-white rounded-[5px] border border-(--color-text)/20 duration-300 hover:border-(--color-primary) hover:bg-white group cursor-pointer"
              // disabled={isSubmitting}
              >
                <p
                  className="text-[13px] font-medium duration-300 group-hover:text-(--color-primary)">
                  キャンセル
                </p>
              </button>
              <button
                type="submit"
                className="w-27 h-9 flex justify-center items-center gap-1 bg-(--color-primary) text-white rounded-[5px] border border-(--color-text)/20 duration-300 hover:border-(--color-primary) hover:bg-(--color-bg) group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-(--color-primary) disabled:hover:text-white disabled:hover:border-(--color-text)/20"
              // disabled={!isDirty || !isValid || isSubmitting || disabled}
              >
                <CheckIcon className="w-3 duration-300 group-hover:text-(--color-primary) group-disabled:group-hover:text-white" />
                <p className="text-[13px] font-medium leading-0 duration-300 group-hover:text-(--color-primary) group-disabled:group-hover:text-white">
                  保存する
                </p>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
