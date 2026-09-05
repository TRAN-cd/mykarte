'use client'

import { PageHeader } from "@/app/_components/PageHeader";
import { RecordIcon } from "@/app/_components/icons/RecordIcon";
import { useFetch } from "@/app/_hooks/useFetch";
import type { GetCategoryResponse } from "@/app/_type/GetCategoryResponse";
import Image from "next/image";
import { SevereIcon } from "@/app/_components/icons/SevereIcon";
import { ArrowIcon } from "@/app/_components/icons/ArrowIcon";
import Link from "next/link";

export default function NewRecords() {
  const { data } = useFetch<GetCategoryResponse>("/api/categories/")
  const categories = data?.categories || []

  return (
    <div className="px-6 py-5 w-full">
      <PageHeader pageTitle="記録一覧" />

      <p className="text-xs pb-2 text-(--color-primary)">カテゴリーや期間から絞り込み</p>
      <div className="flex gap-3 mb-3">
        <div className="relative max-w-46 w-full">
          <Image src="/images/shared/icon_arrow02.svg" alt="" width="16" height="16" className="absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none" />
          <label htmlFor="category-select"></label>
          <select
            name="categories"
            id="category-select"
            className="w-full bg-(--color-card-bg) border border-(--color-sub) rounded-[10px] px-3 py-2 text-[10px] appearance-none"
          >
            <option value="全てのカテゴリー">全てのカテゴリー</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="relative max-w-46 w-full">
          <Image src="/images/shared/icon_arrow02.svg" alt="" width="16" height="16" className="absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none" />
          <label htmlFor="recordType-select"></label>
          <select
            name="recordType"
            id="recordType-select"
            className="w-full bg-(--color-card-bg) border border-(--color-sub) rounded-[10px] px-3 py-2 text-[10px] appearance-none"
          >
            <option value="すべての記録タイプ">すべての記録タイプ</option>
            <option value="日常の記録">日常の記録</option>
            <option value="診療の内容">診療の内容</option>
          </select>
        </div>

        <div className="relative max-w-46 w-full">
          <Image src="/images/shared/icon_arrow02.svg" alt="" width="16" height="16" className="absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none" />
          <label htmlFor="period-select"></label>
          <select
            name="period"
            id="period-select"
            className="w-full bg-(--color-card-bg) border border-(--color-sub) rounded-[10px] px-3 py-2 text-[10px] appearance-none"
          >
            <option value="直近1ヶ月">直近1ヶ月</option>
            <option value="直近2週間">直近2週間</option>
            <option value="直近2ヶ月">直近2ヶ月</option>
            <option value="直近3ヶ月">直近3ヶ月</option>
            <option value="今年(2026年)">今年(2026年)</option>
            <option value="昨年(2025年)">昨年(2025年)</option>
            <option value="全期間">全期間</option>
          </select>
        </div>
      </div>

      <ul className="flex flex-col gap-3">
        <li className="relative bg-white p-5 rounded-[10px] border border-transparent shadow-none duration-300 hover:border-(--color-primary) hover:shadow-[0px_10px_50px_0px_rgba(28,43,36,0.1)]">
          <div className="flex items-center gap-4 pb-4">
            <p className="font-en text-sm font-medium ">2026月5月30日(土)</p>
            <div className="flex items-center gap-1.5">
              <RecordIcon className="transition-colors w-3.5 text-(--color-primary) -mb-0.75" />
              <p className="text-xs font-medium">日常の記録</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col gap-2.5 max-w-22.5 w-full py-2.5 pr-2.5 border-r border-(--color-sub)/20">
              <p className="w-fit bg-(--color-bg) px-2 py-0.5 rounded-xl border border-(--color-primary) text-[10px] font-medium text-(--color-primary)">皮膚科</p>
              <div className="w-fit flex items-center gap-1 text-[10px] py-0.5 px-1.5 border rounded-xl text-(--color-danger) font-medium border-(--color-danger) bg-(--color-danger-bg)">
                <SevereIcon className="w-3" />
                <span className="">重度</span>
              </div>
              <ul className="flex flex-wrap gap-1.5">
                <li className="inline-block bg-(--color-bg) px-2 py-0.5 rounded-xl border border-(--color-primary) text-[10px] font-medium text-(--color-primary)">昼</li>
                <li className="inline-block bg-(--color-bg) px-2 py-0.5 rounded-xl border border-(--color-primary) text-[10px] font-medium text-(--color-primary)">夕</li>
              </ul>
            </div>
            <div className="flex flex-col gap-3 py-2.5 pl-2.5 pr-10">
              <p className="text-sm font-medium">ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダ</p>
              <div className="w-fit flex flex-col gap-1.5 bg-(--color-card-bg) px-4 py-2.5 rounded-[10px]">
                <dl className="flex gap-1.5 text-[10px] font-medium">
                  <dt className="text-(--color-sub) whitespace-nowrap">対処</dt>
                  <dd>もらった軟膏を塗った。</dd>
                </dl>
                <dl className="flex gap-1.5 text-[10px] font-medium">
                  <dt className="text-(--color-sub)">次回受診日</dt>
                  <dd className="font-en">2026年6月20日</dd>
                </dl>
              </div>
            </div>
          </div>

          <Link href="/mykarte/records/1" className="absolute w-7 h-7 bg-(--color-primary) border border-transparent rounded-[50%] right-5 bottom-5 duration-300 hover:bg-white hover:border-(--color-primary) group">
            <div className="h-full flex justify-center items-center">
              <ArrowIcon className="text-white w-2 h-2.75 -mr-0.5 duration-300 group-hover:text-(--color-primary)"/>
            </div>
          </Link>
        </li>

      </ul>
    </div>
  )
}