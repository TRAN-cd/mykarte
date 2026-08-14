'use client'

import { useForm, Controller } from "react-hook-form";
import { PageHeader } from "@/app/_components/PageHeader";
import { RecordItemTitle } from "@/app/_components/RecordItemTitle";
import { CustomDateInput } from "@/app/_components/CustomDateInput";
import { RecordTypeCard } from "@/app/_components/records/RecordTypeCard";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { ja } from "date-fns/locale";
import { RecordIcon } from "@/app/_components/icons/RecordIcon";
import { HospitalIcon } from "@/app/_components/icons/HospitalIcon";


interface RecordFormInputs {
  recordDate: Date
  recordType: "daily" | "medical"
  content: string
}

export default function NewRecords() {
  const { control, register } = useForm<RecordFormInputs>()

  return (
    <div className="px-6 py-5">
      <PageHeader pageTitle="新規記録" />

      <div className="flex flex-col gap-6 p-5 bg-white rounded-[20px] border-(--color-bg) border">
        <form action="" className="flex flex-col gap-6">
          <div>
            <RecordItemTitle itemTitle="記録日" />
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
            <RecordItemTitle itemTitle="記録の種類" />
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
            <RecordItemTitle itemTitle="カテゴリー" />
          </div>
          <div>
            <RecordItemTitle itemTitle="メモ" />
            <textarea
              id="content"
              placeholder="例：お腹の調子が昨日から悪い。薬は飲んでない。"
              className="bg-(--color-card-bg) p-3 rounded-[10px] border border-(--color-primary) font-en text-xs w-full min-h-17.5 flex justify-between items-center mt-3"
              {...register("content")}
            >
            </textarea>
          </div>
        </form>
      </div>
    </div>
  );
}
