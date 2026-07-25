'use client'

import { PageHeader } from "@/app/_components/PageHeader";
import { RecordIcon } from "@/app/_components/icons/RecordIcon";
import { DeleteIcon } from "@/app/_components/icons/DeleteIcon";
import { CheckIcon } from "@/app/_components/icons/CheckIcon";
import Image from "next/image";
import { CategoryForm } from "@/app/_components/categories/CategoryForm";
import { CategoryFormInputs } from "@/app/_components/categories/CategoryForm";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { Category } from "@/generated/prisma/client";
import { useEffect, useState } from "react";

export type GetCategoryResponse = {
  categories: Category[];
};

export default function CategoriesPage() {
  const { token } = useSupabaseSession()
  const initialData = { name: "" }
  const [categoriesData, setCategoriesData] = useState<Category[]>([])

  const getCategory = () => {
    const fetcher = async () => {
      if (!token) return

      try {
        const response = await fetch(`/api/categories/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        })

        if (!response.ok) {
          alert("カテゴリーの取得に失敗しました。")
          return
        }

        const data: GetCategoryResponse = await response.json()
        setCategoriesData(data.categories)
      } catch (error) {
        console.log("カテゴリー取得エラー", error);
      }
    }

    fetcher();
  }

  useEffect(() => {
    getCategory()
  }, [token])

  const handleCreate = async (data: CategoryFormInputs) => {
    if (!token) {
      alert("認証セッションが見つかりません。")
      return false
    }

    try {
      const response = await fetch(`/api/categories/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ name: data.name })
      });

      if (response.ok) {
        console.log("カテゴリーが作成されました。");
        getCategory()
        return true
      } else {
        const errorData = await response.json()
        console.log(errorData)
        alert(errorData.message)
        return false
      }
    } catch (error) {
      console.log("カテゴリー作成エラー", error);
      return false
    }
  }

  return (
    <div className="px-6 py-5">
      <PageHeader pageTitle="カテゴリー" />

      <ul className="flex flex-col gap-3">
        <CategoryForm
          mode="new"
          defaultValues={initialData}
          placeholder="新しいカテゴリーを入力（例：内科）"
          onSubmit={handleCreate}
          disabled={false}
        />

        {
          categoriesData.map((cat) => {
            return (
              <li key={cat.id} className="flex justify-between items-center bg-white px-3 py-2.5 rounded-[5px] border border-(--color-bg) max-w-136 w-full">
                <p className="text-sm font-medium">{cat.name}</p>
                <div className="flex gap-2.5">
                  <button type="button" className="w-9 h-9 flex justify-center items-center bg-white rounded-[5px] border border-(--color-text)/20 duration-300 hover:border-(--color-primary) hover:bg-(--color-bg) group cursor-pointer">
                    <RecordIcon className="w-3.5 duration-300 group-hover:text-(--color-primary)" />
                  </button>
                  <button type="button" className="w-9 h-9 flex justify-center items-center bg-white rounded-[5px] border border-(--color-text)/20 duration-300 hover:border-(--color-danger) hover:bg-(--color-danger-bg) group cursor-pointer">
                    <DeleteIcon className="w-3.5 duration-300 group-hover:text-(--color-danger)" />
                  </button>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}