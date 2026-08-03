'use client'

import { PageHeader } from "@/app/_components/PageHeader";
import { RecordIcon } from "@/app/_components/icons/RecordIcon";
import { DeleteIcon } from "@/app/_components/icons/DeleteIcon";
import { CategoryForm } from "@/app/_components/categories/CategoryForm";
import { CategoryFormInputs } from "@/app/_components/categories/CategoryForm";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import type { GetCategoryResponse } from "@/app/_type/GetCategoryResponse";
import { Category } from "@/generated/prisma/client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/app/_libs/apiFetch";

export default function CategoriesPage() {
  const { token } = useSupabaseSession()
  const initialData = { name: "" }
  const [categoriesData, setCategoriesData] = useState<Category[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)

  const getCategory = async () => {
    const response = await apiFetch("/api/categories/", "GET", token)

    if (!response || !response.ok) {
      alert("カテゴリーの取得に失敗しました。")
      return
    }

    const data: GetCategoryResponse = await response.json()
    setCategoriesData(data.categories)
  }

  useEffect(() => {
    if (!token) return
    getCategory()
  }, [token])

  const handleCreate = async (data: CategoryFormInputs) => {
    const body = JSON.stringify({ name: data.name })
    const response = await apiFetch("/api/categories/", "POST", token, body)

    if (response == null) return false
    if (response.ok) {
      getCategory()
      return true
    } else {
      const errorData = await response.json()
      console.log(errorData)
      alert(errorData.message)
      return false
    }
  }

  const handleEdit = (id: number) => {
    setEditingId(id)
  }

  const handleUpdate = async (id: number, data: CategoryFormInputs) => {
    const body = JSON.stringify({ name: data.name })
    const response = await apiFetch(`/api/categories/${id}/`, "PUT", token, body)

    if (response == null) return false
    if (response.ok) {
      getCategory()
      setEditingId(null)
      return true
    } else {
      const errorData = await response.json()
      console.log(errorData)
      alert(errorData.message)
      return false
    }
  }

  const handleDelete = async (id: number) => {
    const response = await apiFetch(`/api/categories/${id}/`, "DELETE", token)

    if (!response || !response.ok) {
      alert("カテゴリーの削除に失敗しました。")
      return
    } else {
      getCategory()
    }
  }

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
          categoriesData.map((cat) => {
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