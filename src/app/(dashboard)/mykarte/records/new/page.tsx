'use client'

import { useForm, Controller } from "react-hook-form";
import { PageHeader } from "@/app/_components/PageHeader";
import { RecordItemTitle } from "@/app/_components/RecordItemTitle";
import { CustomDateInput } from "@/app/_components/CustomDateInput";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { ja } from "date-fns/locale";


interface RecordFormInputs {
  recordDate: Date
  // recordType: enum
}

export default function NewRecords() {
  const { register, control } = useForm<RecordFormInputs>()

  return (
    <div className="px-6 py-5">
      <PageHeader pageTitle="新規記録" />

      <div className="flex flex-col gap-6 p-5 bg-white rounded-[20px] border-(--color-bg) border">
          <form action="" className="flex flex-col">
            <RecordItemTitle itemTitle="記録日"/>
            <Controller 
              name="recordDate"
              control={control}
              render = {({field}) => (
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
          </form>
      </div>
    </div>
  );
}
