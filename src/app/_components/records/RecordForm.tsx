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
import type { GetCategoryResponse } from "@/app/_type/GetCategoryResponse";
import { useFetch } from "@/app/_hooks/useFetch";
import { PlusIcon } from "@/app/_components/icons/PlusIcon";
import { CategoryFormInputs } from "@/app/_components/categories/CategoryForm";
import { apiFetch } from "@/app/_libs/apiFetch";
import { RecordCategoryForm } from "@/app/_components/records/RecordCategoryForm";
import { useRouter } from "next/navigation";
import { CreateRecordRequestBody } from "@/app/api/records/route";
import { handleApiError } from "@/app/_libs/handleApiError";
import { RecordCategoryType, SeverityLevel,TimeZoneType } from "@/app/_type/RecordTypes";

interface RecordFormInputs {
  recordAt: Date
  recordType: RecordCategoryType
  recordCategory: string
  content: string
  severityLevel: SeverityLevel
  timeZone: TimeZoneType[]
  treatment: string
  nextVisit: Date | null
}

interface Props {
  mode: "new" | "edit"
  defaultValues?: RecordFormInputs
  onSubmit: (data: CreateRecordRequestBody) => Promise<boolean>
  onDelete?: () => void
  onCancel?: () => void
}

export const RecordForm = ({
  mode,
  defaultValues,
  onSubmit,
  onDelete,
}: Props) => {
  const router = useRouter()
  const { control, register, handleSubmit, reset, formState: { isDirty, isValid, isSubmitting } } = useForm<RecordFormInputs>({
    mode: "all", defaultValues: {
      severityLevel: null,
      timeZone: [],
    }
  })
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false)
  const initialData = { name: "" }
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const { data, mutate } = useFetch<GetCategoryResponse>("/api/categories/")
  const categories = data?.categories || []

  const handleOpenCategoryForm = () => {
    setIsCategoryFormOpen((prev) => !prev)
  }

  const handleCreate = async (data: CategoryFormInputs) => {
    try {
      await apiFetch.post("/api/categories/", { name: data.name })
      mutate()
      setIsCategoryFormOpen(false)
      return true
    } catch (error) {
      handleApiError(error, "カテゴリーの作成に失敗しました。")
      return false
    }
  }

  const handleOpenDetail = () => {
    setIsDetailOpen((prev) => !prev)
  }

  const handleSave = async (data: RecordFormInputs) => {
    const {recordAt, recordType, recordCategory, content, severityLevel, timeZone, treatment, nextVisit} = data
    const requestBody: CreateRecordRequestBody = {
      recordAt: recordAt.toISOString(),
      recordType,
      recordCategory,
      content,
      severityLevel,
      timeZone,
      treatment,
      nextVisit: nextVisit ? nextVisit.toISOString() : null
    }
    const success = await onSubmit(requestBody)
    if (success) reset()
  }

  return (
    <div className="px-6 py-5">
      <PageHeader pageTitle="新規記録" />

      <div className="flex flex-col gap-6 p-5 bg-white rounded-[20px] border-(--color-bg) border">
        <form
          onSubmit={handleSubmit(handleSave)}
          action=""
          className="flex flex-col gap-6"
        >
          <div>
            <RecordItemTitle itemTitle="記録日" htmlFor="recordAt" required />
            <Controller
              name="recordAt"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={field.onChange}
                  customInput={<CustomDateInput />}
                  locale={ja}
                  dateFormat={"yyyy/MM/dd"}
                  placeholderText="年/ 月/ 日"
                  disabled={isSubmitting}
                />
              )}
            />
          </div>
          <div>
            <RecordItemTitle itemTitle="記録の種類" htmlFor="recordType" required />
            <Controller
              name="recordType"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <div className="flex items-center gap-5 mt-3">
                  <RecordTypeCard
                    cardIcon={RecordIcon}
                    cardTitle="日常の記録"
                    cardDescription="体調・症状・気になること"
                    isSelected={field.value === "daily"}
                    onClick={() => field.onChange("daily")}
                    disabled={isSubmitting}
                  />
                  <RecordTypeCard
                    cardIcon={HospitalIcon}
                    cardTitle="診療の内容"
                    cardDescription="受診後の記録・処方薬など"
                    isSelected={field.value === "medical"}
                    onClick={() => field.onChange("medical")}
                    disabled={isSubmitting}
                  />
                </div>
              )}
            />
          </div>
          <div>
            <RecordItemTitle itemTitle="カテゴリー" htmlFor="category" required />
            <ul className="flex flex-wrap items-center gap-3 mt-3">
                <Controller 
                  name="recordCategory"
                  control={control}
                  rules={{required: true}}
                  render={({field}) => (
                    <>
                      {categories.map((cat) => (
                        <li key={cat.id}>
                          <label className="flex justify-between items-center bg-white px-2 py-0.5 rounded-xl border border-(--color-sub) text-xs font-medium text-(--color-sub) cursor-pointer duration-300 has-checked:text-(--color-primary) has-checked:font-medium has-checked:border-(--color-primary) has-checked:bg-(--color-bg)">
                            <input 
                              type="radio" 
                              value={cat.id}
                              className="hidden"
                              checked={field.value === String(cat.id)}
                              onChange={() => field.onChange(String(cat.id))}
                              disabled={isSubmitting}
                            />
                            <span>{cat.name}</span>
                          </label>
                        </li>
                      ))}
                    </>
                  )}
                />
              {
                isCategoryFormOpen === true
                  ? (
                    <RecordCategoryForm
                      defaultValues={initialData}
                      placeholder="カテゴリーを追加"
                      onSubmit={handleCreate}
                      disabled={isSubmitting}
                      onCancel={() => setIsCategoryFormOpen(false)}
                    />
                  ) : (
                    <li
                      onClick={handleOpenCategoryForm}
                      className="flex justify-between items-center bg-(--color-card-bg) px-2 py-0.5 rounded-xl cursor-pointer"
                    >
                      <PlusIcon className="w-3 text-(--color-primary)" />
                      <span className="text-xs font-medium text-(--color-primary)">カテゴリー追加</span>
                    </li>
                  )
              }
            </ul>
          </div>
          <div>
            <RecordItemTitle itemTitle="メモ" htmlFor="content" required />
            <textarea
              id="content"
              placeholder="例：お腹の調子が昨日から悪い。薬は飲んでない。"
              className="bg-(--color-card-bg) p-3 rounded-[10px] border border-(--color-primary) font-en text-xs w-full min-h-17.5 flex justify-between items-center mt-3"
              {...register("content",
                { required: true }
              )}
              disabled={isSubmitting}
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

            <div className={`flex flex-col gap-6 bg-(--color-card-bg) rounded-[10px] border border-(--color-primary) overflow-hidden transition-all duration-300 ${isDetailOpen ? "max-h-96 mt-2.5 p-3 opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="flex gap-5.5 w-full">
                <fieldset className="flex flex-col gap-3 max-w-64 w-full">
                  <legend className="text-xs font-medium text-(--color-sub) pb-3">強さ・程度</legend>
                  <div className="flex items-center gap-1.5 w-full">
                    <label className="flex items-center gap-1 text-xs text-(--color-sub) py-0.5 px-1.5 bg-white border border-(--color-primary) rounded-xl cursor-pointer duration-300 has-checked:text-(--color-primary) has-checked:font-medium has-checked:border-(--color-primary) has-checked:bg-(--color-bg)">
                      <input type="radio" value="mild" className="hidden" {...register("severityLevel")} disabled={isSubmitting}/>
                      <MildIcon className="w-3" />
                      <span className="">軽度</span>
                    </label>
                    <label className="flex items-center gap-1 text-xs text-(--color-sub) py-0.5 px-1.5 bg-white border border-(--color-primary) rounded-xl cursor-pointer duration-300 has-checked:text-[#D97706] has-checked:font-medium has-checked:border-[#D97706] has-checked:bg-[#FFF4E5]">
                      <input type="radio" value="moderate" className="hidden" {...register("severityLevel")} disabled={isSubmitting} />
                      <ModerateIcon className="w-3" />
                      <span className="">中等度</span>
                    </label>
                    <label className="flex items-center gap-1 text-xs text-(--color-sub) py-0.5 px-1.5 bg-white border border-(--color-primary) rounded-xl cursor-pointer duration-300 has-checked:text-(--color-danger) has-checked:font-medium has-checked:border-(--color-danger) has-checked:bg-(--color-danger-bg)">
                      <input type="radio" value="severe" className="hidden" {...register("severityLevel")} disabled={isSubmitting} />
                      <SevereIcon className="w-3" />
                      <span className="">重度</span>
                    </label>
                    <label className="flex items-center gap-1 text-xs text-(--color-sub) py-0.5 px-1.5 bg-white border border-(--color-primary) rounded-xl cursor-pointer duration-300 has-checked:text-(--color-primary) has-checked:font-medium has-checked:border-(--color-primary) has-checked:bg-(--color-bg)">
                      <input type="radio" value="na" className="hidden" {...register("severityLevel")} disabled={isSubmitting} />
                      <span className="">該当なし</span>
                    </label>
                  </div>
                </fieldset>
                <fieldset className="flex flex-col gap-3 max-w-46 w-full">
                  <legend className="text-xs font-medium text-(--color-sub) pb-3">時間帯</legend>
                  <div className="flex items-center gap-1.5 w-full">
                    <label className="flex items-center gap-1 text-xs text-(--color-sub) py-0.5 px-1.5 bg-white border border-(--color-primary) rounded-[10px] cursor-pointer duration-300 has-checked:text-(--color-primary) has-checked:font-medium has-checked:border-(--color-primary) has-checked:bg-(--color-bg)">
                      <input type="checkbox" value="morning" className="hidden" {...register("timeZone")} disabled={isSubmitting}/>
                      <span className="">朝</span>
                    </label>
                    <label className="flex items-center gap-1 text-xs text-(--color-sub) py-0.5 px-1.5 bg-white border border-(--color-primary) rounded-xl cursor-pointer duration-300 has-checked:text-(--color-primary) has-checked:font-medium has-checked:border-(--color-primary) has-checked:bg-(--color-bg)">
                      <input type="checkbox" value="afternoon" className="hidden" {...register("timeZone")} disabled={isSubmitting}/>
                      <span className="">昼</span>
                    </label>
                    <label className="flex items-center gap-1 text-xs text-(--color-sub) py-0.5 px-1.5 bg-white border border-(--color-primary) rounded-xl cursor-pointer duration-300 has-checked:text-(--color-primary) has-checked:font-medium has-checked:border-(--color-primary) has-checked:bg-(--color-bg)">
                      <input type="checkbox" value="evening" className="hidden" {...register("timeZone")} disabled={isSubmitting}/>
                      <span className="">夕</span>
                    </label>
                    <label className="flex items-center gap-1 text-xs text-(--color-sub) py-0.5 px-1.5 bg-white border border-(--color-primary) rounded-xl cursor-pointer duration-300 has-checked:text-(--color-primary) has-checked:font-medium has-checked:border-(--color-primary) has-checked:bg-(--color-bg)">
                      <input type="checkbox" value="night" className="hidden" {...register("timeZone")} disabled={isSubmitting}/>
                      <span className="">夜</span>
                    </label>
                    <label className="flex items-center gap-1 text-xs text-(--color-sub) py-0.5 px-1.5 bg-white border border-(--color-primary) rounded-xl cursor-pointer duration-300 has-checked:text-(--color-primary) has-checked:font-medium has-checked:border-(--color-primary) has-checked:bg-(--color-bg)">
                      <input type="checkbox" value="all_day" className="hidden" {...register("timeZone")} disabled={isSubmitting}/>
                      <span className="">終日</span>
                    </label>
                  </div>
                </fieldset>
              </div>
              <div className="flex gap-5.5 w-full">
                <div className="flex flex-col max-w-64 w-full">
                  <label htmlFor="treatment" className="text-xs font-medium text-(--color-sub) pb-3">対処したこと</label>
                  <textarea
                    id="treatment"
                    placeholder="例：暖かくして寝た。"
                    rows={1}
                    className="bg-(--color-card-bg) p-3 rounded-[10px] border border-(--color-primary) font-en text-xs w-full min-h-8 flex justify-between items-center"
                    {...register("treatment")}
                    disabled={isSubmitting}
                  >
                  </textarea>
                </div>
                <div className="flex flex-col max-w-46 w-full">
                  <label htmlFor="nextVisit" className="text-xs font-medium text-(--color-sub)">次回受診予定日</label>
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
                        disabled={isSubmitting}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center gap-3 mt-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="w-27 h-9 flex justify-center items-center bg-white rounded-[5px] border border-(--color-text)/20 shadow-[0px_10px_50px_0px_rgba(28,43,36,0.1)] duration-300 hover:shadow-none hover:border-(--color-primary) hover:bg-white group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                <p
                  className="text-[13px] font-medium duration-300 group-hover:text-(--color-primary)">
                  戻る
                </p>
              </button>
              <button
                type="submit"
                className="w-27 h-9 flex justify-center items-center gap-1 bg-(--color-primary) text-white rounded-[5px] border border-(--color-text)/20 shadow-[0px_10px_50px_0px_rgba(28,43,36,0.1)] duration-300 hover:shadow-none hover:border-(--color-primary) hover:bg-(--color-bg) group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-(--color-primary) disabled:hover:text-white disabled:hover:border-(--color-text)/20"
                disabled={!isDirty || !isValid || isSubmitting}
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
