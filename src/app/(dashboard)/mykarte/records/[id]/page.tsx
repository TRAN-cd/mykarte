'use client'

import { RecordForm } from "@/app/_components/records/RecordForm"
import { useParams } from "next/navigation";
import { CreateRecordRequestBody } from "@/app/api/records/route";
import { RecordFormInputs } from "@/app/_components/records/RecordForm";
import { useFetch } from "@/app/_hooks/useFetch";
import { RecordDetailResponse } from "@/app/api/records/[id]/route";
import { toFormRecordType, toFormSeverityLevel, toFormTimeZone } from "@/app/_libs/recordFormConverters";

export default function EditRecords() {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading } = useFetch<RecordDetailResponse>(`/api/records/${id}`);
  const record = data?.record;

  const handleTest = async (data: CreateRecordRequestBody) => {
    console.log("データの編集を保存しました。");
    return true
  }

  if (isLoading) return (
    <div className="px-6 py-5">
      <p className="text-sm text-(--color-sub) text-center py-10">読み込み中...</p>
    </div>
  );

  if (error) return (
    <div className="px-6 py-5">
      <p className="text-sm text-(--color-danger) text-center py-10 bg-(--color-danger-bg) rounded-[5px] border border-(--color-danger)">
        記録の取得に失敗しました。
      </p>
    </div>
  );

  if (!record) return null;

  const defaultValues: RecordFormInputs = {
    recordAt: new Date(record.recordAt),
    recordType: toFormRecordType(record.recordType),
    recordCategory: String(record.recordCategories[0].categoryId),
    content: record.content,
    severityLevel: toFormSeverityLevel(record.severityLevel),
    timeZone: record.recordTimeZones.map((tz) => toFormTimeZone(tz.timeZone)),
    treatment: record.treatment ?? "",
    nextVisit: record.nextVisit ? new Date(record.nextVisit) : null,
  }

  return (
    <RecordForm
      mode="edit"
      defaultValues={defaultValues}
      onSubmit={handleTest}
    />
  )
}