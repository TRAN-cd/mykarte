'use client'

import { RecordForm } from "@/app/_components/records/RecordForm"
import { useRouter } from "next/navigation";
import { CreateRecordRequestBody } from "@/app/api/records/route";
import { apiFetch } from "@/app/_libs/apiFetch";
import { handleApiError } from "@/app/_libs/handleApiError";

export default function NewRecords() {
  const router = useRouter();

  const handleCreateRecord = async (data: CreateRecordRequestBody) => {
    try {
      await apiFetch.post("/api/records/", data)
      return true
    } catch (error) {
      handleApiError(error, "記録の作成に失敗しました。")
      return false
    }
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
          mode="new"
          onSubmit={handleCreateRecord}
        />
      </div>
    </div>
  )
}