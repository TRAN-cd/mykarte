'use client'

import { RecordForm } from "@/app/_components/records/RecordForm"
import { useRouter } from "next/navigation";

export default function NewRecords() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4"
      >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-(--color-bg) rounded-[20px] p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        >
        <RecordForm />
      </div>
    </div>
  )
}