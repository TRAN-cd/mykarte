'use client'

import { RecordForm } from "@/app/_components/records/RecordForm"
import { useParams } from "next/navigation";
import { CreateRecordRequestBody } from "@/app/api/records/route";
import { apiFetch } from "@/app/_libs/apiFetch";
import { handleApiError } from "@/app/_libs/handleApiError";
import { RecordFormInputs } from "@/app/_components/records/RecordForm";

export default function EditRecords(){
  const {id} = useParams<{ id: string}>();

  // const handleCreateRecord = async (data: CreateRecordRequestBody) => {
  //   try {
  //     await apiFetch.post("/api/records/", data)
  //     return true
  //   } catch (error) {
  //     handleApiError(error, "記録の作成に失敗しました。")
  //     return false
  //   }
  // }

  const handleTest = async (data: CreateRecordRequestBody) => {
    console.log("データの編集を保存しました。");
    return true
  }

  const testData: RecordFormInputs = {
    recordAt: new Date("2026-09-05"),
    recordType: "daily",
    recordCategory: "湿疹",
    content: "ダミーテキスト",
    severityLevel: "moderate",
    timeZone: ["morning", "afternoon"],
    treatment: "軟膏を塗った（テスト）",
    nextVisit: new Date("2026-10-05"),
  }

  return (
    <RecordForm 
      mode="edit"
      defaultValues={testData}
      onSubmit={handleTest}
    />
  )
}