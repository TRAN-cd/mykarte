'use client'

import { RecordForm } from "@/app/_components/records/RecordForm"
import { CreateRecordRequestBody } from "@/app/api/records/route";
import { apiFetch } from "@/app/_libs/apiFetch";
import { handleApiError } from "@/app/_libs/handleApiError";

export default function NewRecords(){

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
    <RecordForm 
      mode="new"
      onSubmit={handleCreateRecord}
    />
  )
}