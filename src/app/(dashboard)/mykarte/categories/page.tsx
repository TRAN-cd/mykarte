'use client'

import { PageHeader } from "@/app/_components/PageHeader";
import { RecordIcon } from "@/app/_components/icons/RecordIcon";
import { DeleteIcon } from "@/app/_components/icons/DeleteIcon";
import { CheckIcon } from "@/app/_components/icons/CheckIcon";
import Image from "next/image";
import { CategoryForm } from "@/app/_components/categories/CategoryForm";
import { CategoryFormInputs } from "@/app/_components/categories/CategoryForm";

export default function CategoriesPage() {
  const initialData = { category: "" }

  const handleCreate = async (data: CategoryFormInputs) => {
    try {
      const response = await fetch(`/api/categories/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ category: data.category})
      });

      if (response.ok) {
        console.log("カテゴリーが作成されました。");
      } else {
        alert("カテゴリーの作成に失敗しました。")
      }
    } catch (error) {
      console.log("カテゴリー作成エラー", error);
    }
  }


  return (
    <div className="px-6 py-5">
      <PageHeader pageTitle="カテゴリー" />

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center gap-2 bg-white px-3 py-2.5 rounded-[5px] border border-(--color-bg) max-w-136 w-full">
          <div className="flex items-center gap-1 max-w-108 w-full">
            <Image src="/images/shared/icon_plus.svg" alt="" width="24" height="24" />
            <label htmlFor="category" className="sr-only">カテゴリー名</label>
            <input
              type="text" 
              id="category"
              name="category" 
              placeholder="新しいカテゴリーを入力（例：内科）"
              className="w-full border border-(--color-primary) rounded-[5px] px-2.5 py-1.5 text-sm font-medium placeholder:text-(--color-sub)"
              />
          </div>
          <div>
            <button type="button" className="w-20 h-9 flex justify-center items-center gap-2 bg-white rounded-[5px] border border-(--color-text)/20 duration-300 hover:border-(--color-primary) hover:bg-(--color-bg) group cursor-pointer">
              <CheckIcon className="w-4 duration-300 group-hover:text-(--color-primary)" />
              <p className="text-xs font-medium duration-300 group-hover:text-(--color-primary)">追加</p>
            </button>
          </div>
        </div>
        <CategoryForm 
          mode="new"
          defaultValues={initialData}
          placeholder="新しいカテゴリーを入力（例：内科）"
          onSubmit={handleCreate}
          disabled={false}
        />

        {/* 1つのカテゴリーコンポーネント */}
        <div className="flex justify-between items-center bg-white px-3 py-2.5 rounded-[5px] border border-(--color-bg) max-w-136 w-full">
          <p className="text-sm font-medium">皮膚科</p>
          <div className="flex gap-2.5">
            <button type="button" className="w-9 h-9 flex justify-center items-center bg-white rounded-[5px] border border-(--color-text)/20 duration-300 hover:border-(--color-primary) hover:bg-(--color-bg) group cursor-pointer">
              <RecordIcon className="w-3.5 duration-300 group-hover:text-(--color-primary)" />
            </button>
            <button type="button" className="w-9 h-9 flex justify-center items-center bg-white rounded-[5px] border border-(--color-text)/20 duration-300 hover:border-(--color-danger) hover:bg-(--color-danger-bg) group cursor-pointer">
              <DeleteIcon className="w-3.5 duration-300 group-hover:text-(--color-danger)" />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center bg-white px-3 py-2.5 rounded-[5px] border border-(--color-bg) max-w-136 w-full">
          <p className="text-sm font-medium">皮膚科</p>
          <div className="flex gap-2.5">
            <button type="button" className="w-9 h-9 flex justify-center items-center bg-white rounded-[5px] border border-(--color-text)/20 duration-300 hover:border-(--color-primary) hover:bg-(--color-bg) group cursor-pointer">
              <RecordIcon className="w-3.5 duration-300 group-hover:text-(--color-primary)" />
            </button>
            <button type="button" className="w-9 h-9 flex justify-center items-center bg-white rounded-[5px] border border-(--color-text)/20 duration-300 hover:border-(--color-danger) hover:bg-(--color-danger-bg) group cursor-pointer">
              <DeleteIcon className="w-3.5 duration-300 group-hover:text-(--color-danger)" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}