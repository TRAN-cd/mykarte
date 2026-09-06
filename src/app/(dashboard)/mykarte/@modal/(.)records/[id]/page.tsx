'use client'

import { RecordForm } from "@/app/_components/records/RecordForm"
import { useRouter, useParams } from "next/navigation";
import { CreateRecordRequestBody } from "@/app/api/records/route";
import { apiFetch } from "@/app/_libs/apiFetch";
import { handleApiError } from "@/app/_libs/handleApiError";
import { RecordFormInputs } from "@/app/_components/records/RecordForm";

export default function EditRecords() {
  const router = useRouter();
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
    <div
      onClick={() => router.back()}
      className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-(--color-bg) rounded-[20px] p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <RecordForm
          mode="edit"
          defaultValues={testData}
          onSubmit={handleTest}
        />
      </div>
    </div>
  )
}