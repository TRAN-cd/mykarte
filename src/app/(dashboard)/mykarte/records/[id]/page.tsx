'use client'

import { RecordForm } from "@/app/_components/records/RecordForm"
import { useRouter, useParams } from "next/navigation";
import { CreateRecordRequestBody } from "@/app/api/records/route";
import { RecordFormInputs } from "@/app/_components/records/RecordForm";
import { useFetch } from "@/app/_hooks/useFetch";
import { RecordDetailResponse } from "@/app/api/records/[id]/route";
import { toFormRecordType, toFormSeverityLevel, toFormTimeZone } from "@/app/_libs/recordFormConverters";
import { handleApiError } from "@/app/_libs/handleApiError";
import { apiFetch } from "@/app/_libs/apiFetch";
import { useSWRConfig } from "swr";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

export default function EditRecords() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { mutate } = useSWRConfig();
  const { token } = useSupabaseSession();
  const { data, error, isLoading } = useFetch<RecordDetailResponse>(`/api/records/${id}`);
  const record = data?.record;

  const handleUpdateRecord = async (data: CreateRecordRequestBody) => {
    try {
      await apiFetch.put(`/api/records/${id}`, data)
      router.push("/mykarte/records/")
      // useFetchはSWRのキーを[url, token]の配列で管理しているため、
      // mutate()も同じ形（キーにtokenを含める）で呼ばないと、
      // 一覧ページ(records/page.tsx)のキャッシュが更新されない
      mutate(["/api/records", token])
      router.refresh()
      return true
    } catch (error) {
      handleApiError(error, "記録の編集に失敗しました。")
      return false
    }
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
      onSubmit={handleUpdateRecord}
    />
  )
}