'use client'

import { PageHeader } from "@/app/_components/PageHeader";
import { ArrowIcon02 } from "@/app/_components/icons/ArrowIcon02";
import Link from "next/link";
import Image from "next/image";
import { useFetch } from "@/app/_hooks/useFetch";
import { DashboardResponse } from "@/app/api/dashboard/route";
import { formatDate } from "@/app/_libs/formatDate";

export default function HomePage() {

  const { data, isLoading, error } = useFetch<DashboardResponse>("/api/dashboard")
  const summaryData = data || {
    thisMonthCount: 0, lastMonthCount: 0, visitCount: 0,
    records: [],
    analysisData: []
  }

  if (isLoading) return (
    <div className="px-6 py-5">
      <p className="text-sm text-(--color-sub) text-center py-10">読み込み中...</p>
    </div>
  );

  if (error) return (
    <div className="px-6 py-5">
      <p className="text-sm text-(--color-danger) text-center py-10 bg-(--color-danger-bg) rounded-[5px] border border-(--color-danger)">
        データの取得に失敗しました。
      </p>
    </div>
  );

  return (
    <div className="px-6 py-5 w-full">
      <PageHeader pageTitle="ホーム" />

      <div className="flex flex-col gap-3">
        <ul className="flex gap-3 w-full">
          <li className="bg-white rounded-[20px] px-5 py-3 flex justify-between items-baseline border border-(--color-bg) flex-1 min-w-0">
            <p className="font-en text-4xl leading-none font-bold text-(--color-primary)">{summaryData.thisMonthCount}</p>
            <p className="text-[10px] text-(--color-sub)">今月の記録数</p>
          </li>
          <li className="bg-white rounded-[20px] px-5 py-3 flex justify-between items-baseline border border-(--color-bg) flex-1 min-w-0">
            <p className="font-en text-4xl leading-none font-bold text-(--color-primary)">{summaryData.lastMonthCount}</p>
            <p className="text-[10px] text-(--color-sub)">先月の記録数</p>
          </li>
          <li className="bg-white rounded-[20px] px-5 py-3 flex justify-between items-baseline border border-(--color-bg) flex-1 min-w-0">
            <p className="font-en text-4xl leading-none font-bold text-(--color-primary)">{summaryData.visitCount}</p>
            <p className="text-[10px] text-(--color-sub)">今月の受診回数</p>
          </li>
        </ul>

        <div className="bg-white rounded-[20px] p-5 border border-(--color-bg) w-full">
          <div className="flex justify-between pb-3">
            <h3 className="text-base font-bold">最近の記録</h3>
            <Link href="/mykarte/records/" className="flex items-center gap-1 text-(--color-sub) duration-300 hover:text-(--color-primary) hover:font-bold">
              <p className="text-xs">すべて見る</p>
              <ArrowIcon02 className="w-3.5" />
            </Link>
          </div>
          <ul className="px-3 divide-y divide-(--color-sub)/20">
            {summaryData.records.length === 0 ? (
              <li className="flex flex-col items-center">
                <p className="text-sm text-(--color-sub) text-center py-10">
                  最初の記録をつけてみましょう。
                </p>
                <Image src="/images/avatar/happy.png" alt="" width="100" height="100" />
              </li>
            ) : (
              summaryData.records.map((elem) => {
                return (
                  <li key={elem.id} className="flex items-start gap-2 py-3">
                    <div className="w-2.5 h-2.5 shrink-0 rounded-full bg-(--color-primary) mt-1.5"></div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <p className="text-[10px] text-(--color-primary) font-medium bg-(--color-bg) px-2 py-0.5 border border-(--color-primary) rounded-[10px]">{elem.recordCategories[0]?.categories.name ?? "選択なし"}</p>
                        <p className="text-[10px] text-(--color-sub)">{formatDate(elem.recordAt)}</p>
                      </div>
                      <p className="text-sm">{elem.content}</p>
                    </div>
                  </li>
                )
              })
            )}
          </ul>
        </div>

        <div className="bg-white rounded-[20px] p-5 border border-(--color-bg) w-full">
          <div className="flex justify-between pb-6">
            <h3 className="text-base font-bold">カテゴリー分析</h3>
            <Link href="/mykarte/categories/" className="flex items-center gap-1 text-(--color-sub) duration-300 hover:text-(--color-primary) hover:font-bold">
              <p className="text-xs">カテゴリーを編集する</p>
              <ArrowIcon02 className="w-3.5" />
            </Link>
          </div>
          <ul className="flex flex-col gap-1.5 px-3">
            {
              summaryData.analysisData.map((elem) => {
                return (
                  <li key={elem.categoryId} className="w-full flex justify-between items-center gap-3 bg-white border border-(--color-bg) rounded-[10px] px-2.5 py-3">
                    <div className="flex flex-col gap-2 max-w-[80%] w-full">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <p className="text-[10px] text-(--color-primary) font-medium bg-(--color-bg) px-2 py-0.5 border border-(--color-primary) rounded-[10px]">{elem.name}</p>
                          <p className="text-[10px]">{elem._count}件</p>
                          <div className="text-[10px] text-(--color-sub) flex items-center gap-0.5">
                            <Image src="/images/shared/icon_up.svg" alt="" width={12} height={12} />
                            <p>先月比<span>{elem.diffFromLastMonth}</span></p>
                          </div>
                        </div>
                        <Link href={`/mykarte/records?category=${elem.categoryId}`} className="flex items-center gap-1 text-(--color-sub) duration-300 hover:text-(--color-primary) hover:font-bold">
                          <p className="text-xs">記録を見る</p>
                          <ArrowIcon02 className="w-3.5" />
                        </Link>
                      </div>
                      <div className="w-full h-2 rounded-full bg-(--color-bg) overflow-hidden">
                        <div
                          className="h-full rounded-full bg-(--color-primary)"
                          style={{ width: `${elem.percentage}%` }} />
                      </div>
                    </div>
                    <p className="font-en text-(--color-primary) font-bold pr-2"><span className="text-2xl">{elem.percentage}</span><span className="text-base">%</span></p>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  );
}
