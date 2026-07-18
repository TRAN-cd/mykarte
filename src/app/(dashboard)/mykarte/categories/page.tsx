import { PageHeader } from "@/app/_components/PageHeader";
import { RecordIcon } from "@/app/_components/icons/RecordIcon";
import { DeleteIcon } from "@/app/_components/icons/DeleteIcon";

export default function CategoriesComponent() {

  return (
    <div className="px-6 py-5">
      <PageHeader pageTitle="カテゴリー" />

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center bg-white px-3 py-2.5 rounded-[5px] border border-(--color-bg) max-w-136 w-full">
          <p className="text-sm font-medium">皮膚科</p>
          <div>
            <button type="button" className="w-20 h-9 flex justify-center items-center gap-2 bg-white rounded-[5px] border border-(--color-text)/20 duration-300 hover:border-(--color-primary) hover:bg-(--color-bg) group cursor-pointer">
              <RecordIcon className="w-3.5 duration-300 group-hover:text-(--color-primary)" />
              <p className="te">追加</p>
            </button>
          </div>
        </div>

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