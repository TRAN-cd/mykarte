'use client'

import { PageHeader } from "@/app/_components/PageHeader";
import { ArrowIcon02 } from "@/app/_components/icons/ArrowIcon02";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {

  return (
    <div className="px-6 py-5 w-full">
      <PageHeader pageTitle="ホーム" />

      <div className="flex flex-col gap-3">
        <ul className="flex gap-3 w-full">
          <li className="bg-white rounded-[20px] px-5 py-3 flex justify-between items-baseline border border-(--color-bg) flex-1 min-w-0">
            <p className="font-en text-4xl leading-none font-bold text-(--color-primary)">5</p>
            <p className="text-[10px] text-(--color-sub)">今月の記録数</p>
          </li>
          <li className="bg-white rounded-[20px] px-5 py-3 flex justify-between items-baseline border border-(--color-bg) flex-1 min-w-0">
            <p className="font-en text-4xl leading-none font-bold text-(--color-primary)">3</p>
            <p className="text-[10px] text-(--color-sub)">先月の記録数</p>
          </li>
          <li className="bg-white rounded-[20px] px-5 py-3 flex justify-between items-baseline border border-(--color-bg) flex-1 min-w-0">
            <p className="font-en text-4xl leading-none font-bold text-(--color-primary)">1</p>
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
            <li className="flex items-start gap-2 py-3">
              <div className="w-2.5 h-2.5 shrink-0 rounded-full bg-(--color-primary) mt-1.5"></div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <p className="text-[10px] text-(--color-primary) font-medium bg-(--color-bg) px-2 py-0.5 border border-(--color-primary) rounded-[10px]">カテゴリー名</p>
                  <p className="text-[10px] text-(--color-sub)">記録日</p>
                </div>
                <p className="text-sm">ダミーテキストダミーテキストダミーテキストダミーテキスト</p>
              </div>
            </li>
            <li className="flex items-start gap-2 py-3">
              <div className="w-2.5 h-2.5 shrink-0 rounded-full bg-(--color-primary) mt-1.5"></div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <p className="text-[10px] text-(--color-primary) font-medium bg-(--color-bg) px-2 py-0.5 border border-(--color-primary) rounded-[10px]">カテゴリー名</p>
                  <p className="text-[10px] text-(--color-sub)">記録日</p>
                </div>
                <p className="text-sm">ダミーテキストダミーテキストダミーテキストダミーテキスト</p>
              </div>
            </li>
            <li className="flex items-start gap-2 py-3">
              <div className="w-2.5 h-2.5 shrink-0 rounded-full bg-(--color-primary) mt-1.5"></div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <p className="text-[10px] text-(--color-primary) font-medium bg-(--color-bg) px-2 py-0.5 border border-(--color-primary) rounded-[10px]">カテゴリー名</p>
                  <p className="text-[10px] text-(--color-sub)">記録日</p>
                </div>
                <p className="text-sm">ダミーテキストダミーテキストダミーテキストダミーテキスト</p>
              </div>
            </li>
            <li className="flex items-start gap-2 py-3">
              <div className="w-2.5 h-2.5 shrink-0 rounded-full bg-(--color-primary) mt-1.5"></div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <p className="text-[10px] text-(--color-primary) font-medium bg-(--color-bg) px-2 py-0.5 border border-(--color-primary) rounded-[10px]">カテゴリー名</p>
                  <p className="text-[10px] text-(--color-sub)">記録日</p>
                </div>
                <p className="text-sm">ダミーテキストダミーテキストダミーテキストダミーテキスト</p>
              </div>
            </li>
            <li className="flex items-start gap-2 py-3">
              <div className="w-2.5 h-2.5 shrink-0 rounded-full bg-(--color-primary) mt-1.5"></div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <p className="text-[10px] text-(--color-primary) font-medium bg-(--color-bg) px-2 py-0.5 border border-(--color-primary) rounded-[10px]">カテゴリー名</p>
                  <p className="text-[10px] text-(--color-sub)">記録日</p>
                </div>
                <p className="text-sm">ダミーテキストダミーテキストダミーテキストダミーテキスト</p>
              </div>
            </li>
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
            <li className="w-full flex justify-between items-center gap-3 bg-white border border-(--color-bg) rounded-[10px] px-2.5 py-3">
              <div className="flex flex-col gap-2 max-w-[80%] w-full">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] text-(--color-primary) font-medium bg-(--color-bg) px-2 py-0.5 border border-(--color-primary) rounded-[10px]">カテゴリー名</p>
                    <p className="text-[10px]">件数</p>
                    <div className="text-[10px] text-(--color-sub) flex items-center gap-0.5">
                      <Image src="/images/shared/icon_up.svg" alt="" width={12} height={12} />
                      <p>先月比<span>+2</span></p>
                    </div>
                  </div>
                  <Link href="/mykarte/records/" className="flex items-center gap-1 text-(--color-sub) duration-300 hover:text-(--color-primary) hover:font-bold">
                    <p className="text-xs">記録を見る</p>
                    <ArrowIcon02 className="w-3.5" />
                  </Link>
                </div>
                <div className="w-full h-2 rounded-full bg-(--color-bg) overflow-hidden">
                  <div className="h-full rounded-full bg-(--color-primary) w-[60%]" />
                </div>
              </div>
              <p className="font-en text-(--color-primary) font-bold pr-2"><span className="text-2xl">60</span><span className="text-base">%</span></p>
            </li>
            <li className="w-full flex justify-between items-center gap-3 bg-white border border-(--color-bg) rounded-[10px] px-2.5 py-3">
              <div className="flex flex-col gap-2 max-w-[80%] w-full">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] text-(--color-primary) font-medium bg-(--color-bg) px-2 py-0.5 border border-(--color-primary) rounded-[10px]">カテゴリー名</p>
                    <p className="text-[10px]">件数</p>
                    <div className="text-[10px] text-(--color-sub) flex items-center gap-0.5">
                      <Image src="/images/shared/icon_up.svg" alt="" width={12} height={12} />
                      <p>先月比<span>+2</span></p>
                    </div>
                  </div>
                  <Link href="/mykarte/records/" className="flex items-center gap-1 text-(--color-sub) duration-300 hover:text-(--color-primary) hover:font-bold">
                    <p className="text-xs">記録を見る</p>
                    <ArrowIcon02 className="w-3.5" />
                  </Link>
                </div>
                <div className="w-full h-2 rounded-full bg-(--color-bg) overflow-hidden">
                  <div className="h-full rounded-full bg-(--color-primary) w-[30%]" />
                </div>
              </div>
              <p className="font-en text-(--color-primary) font-bold pr-2"><span className="text-2xl">30</span><span className="text-base">%</span></p>
            </li>
            <li className="w-full flex justify-between items-center gap-3 bg-white border border-(--color-bg) rounded-[10px] px-2.5 py-3">
              <div className="flex flex-col gap-2 max-w-[80%] w-full">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] text-(--color-primary) font-medium bg-(--color-bg) px-2 py-0.5 border border-(--color-primary) rounded-[10px]">カテゴリー名</p>
                    <p className="text-[10px]">件数</p>
                    <div className="text-[10px] text-(--color-sub) flex items-center gap-0.5">
                      <Image src="/images/shared/icon_up.svg" alt="" width={12} height={12} />
                      <p>先月比<span>+2</span></p>
                    </div>
                  </div>
                  <Link href="/mykarte/records/" className="flex items-center gap-1 text-(--color-sub) duration-300 hover:text-(--color-primary) hover:font-bold">
                    <p className="text-xs">記録を見る</p>
                    <ArrowIcon02 className="w-3.5" />
                  </Link>
                </div>
                <div className="w-full h-2 rounded-full bg-(--color-bg) overflow-hidden">
                  <div className="h-full rounded-full bg-(--color-primary) w-[5%]" />
                </div>
              </div>
              <p className="font-en text-(--color-primary) font-bold pr-2"><span className="text-2xl">5</span><span className="text-base">%</span></p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
