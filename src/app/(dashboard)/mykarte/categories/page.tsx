'use client'

import { PageHeader } from "@/app/_components/PageHeader";
import { RecordIcon } from "@/app/_components/icons/RecordIcon";
import { DeleteIcon } from "@/app/_components/icons/DeleteIcon";
import { CategoryForm } from "@/app/_components/categories/CategoryForm";
import { CategoryFormInputs } from "@/app/_components/categories/CategoryForm";
import type { GetCategoryResponse } from "@/app/_type/GetCategoryResponse";
import { useState } from "react";
import { useFetch } from "@/app/_hooks/useFetch";
import { apiFetch } from "@/app/_libs/apiFetch";
import { handleApiError } from "@/app/_libs/handleApiError";

export default function CategoriesPage() {
  const initialData = { name: "" }
  const [editingId, setEditingId] = useState<number | null>(null)
  

  const { data, error, isLoading, mutate } = useFetch<GetCategoryResponse>("/api/categories/");
  const categories = data?.categories || []

  const handleCreate = async (data: CategoryFormInputs) => {
    try {
      await apiFetch.post("/api/categories/", {name: data.name})
      mutate()
      return true
    } catch (error) {
      handleApiError(error, "カテゴリーの作成に失敗しました。")
      return false
    }
  }

  const handleEdit = (id: number) => {
    setEditingId(id)
  }

  const handleUpdate = async (id: number, data: CategoryFormInputs) => {
    try {
      await apiFetch.put(`/api/categories/${id}/`, {name: data.name})
      mutate()
      setEditingId(null)
      return true
    } catch(error) {
      handleApiError(error, "カテゴリーの更新に失敗しました。")
      return false
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await apiFetch.del(`/api/categories/${id}/`)
      mutate()
    } catch(error) {
      handleApiError(error, "カテゴリーの削除に失敗しました。")
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
        カテゴリーの取得に失敗しました。
      </p>
    </div>
  );

  return (
    <div className="px-6 py-5">
      <PageHeader pageTitle="カテゴリー" />

      <ul className="flex flex-col gap-3">
        <li>
          <CategoryForm
            mode="new"
            defaultValues={initialData}
            placeholder="新しいカテゴリーを入力（例：内科）"
            onSubmit={handleCreate}
            disabled={false}
          />
        </li>

        {
          categories.map((cat) => {
            return (
              <li
                key={cat.id}
                className={
                  cat.id === editingId
                    ? ""
                    : "flex justify-between items-center bg-white px-3 py-2.5 rounded-[5px] border border-(--color-bg) max-w-136 w-full"
                }
              >
                {cat.id === editingId ? (
                  <CategoryForm
                    mode="edit"
                    defaultValues={{ name: cat.name }}
                    placeholder="新しいカテゴリーを入力（例：内科）"
                    onSubmit={(data) => handleUpdate(cat.id, data)}
                    disabled={false}
                    onCancel={() => setEditingId(null)}
                  />
                ) : (
                  <>
                    <p className="text-sm font-medium">{cat.name}</p>
                    <div className="flex gap-2.5">
                      <button
                        onClick={() => handleEdit(cat.id)}
                        type="button"
                        className="w-9 h-9 flex justify-center items-center bg-white rounded-[5px] border border-(--color-text)/20 duration-300 hover:border-(--color-primary) hover:bg-(--color-bg) group cursor-pointer">
                        <RecordIcon className="w-3.5 duration-300 group-hover:text-(--color-primary)" />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        type="button"
                        className="w-9 h-9 flex justify-center items-center bg-white rounded-[5px] border border-(--color-text)/20 duration-300 hover:border-(--color-danger) hover:bg-(--color-danger-bg) group cursor-pointer"
                      >
                        <DeleteIcon className="w-3.5 duration-300 group-hover:text-(--color-danger)" />
                      </button>
                    </div>
                  </>
                )}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}