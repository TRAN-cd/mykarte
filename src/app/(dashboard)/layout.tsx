'use client'

import Image from "next/image";
import Link from "next/link";
import { useRouteGuard } from "../_hooks/useRouteGuard";
import { HomeIcon } from "../_components/icons/HomeIcon";
import { RecordIcon } from "../_components/icons/RecordIcon";
import { RecordsIcon } from "../_components/icons/RecordsIcon";
import { CategoryIcon } from "../_components/icons/CategoryIcon";
import { SettingIcon } from "../_components/icons/SettingIcon";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useRouteGuard()

  return (
    <div className="flex flex-col flex-1 bg-[url('/images/shared/bg.png')] bg-no-repeat bg-cover bg-fixed">
      <main className="flex-1 pt-16">
        <div className="flex px-5">
          <div className="max-w-[1300px] w-full mx-auto bg-(--color-bg)/50 rounded-[30px] shadow-[0px_4px_30px_0px_rgba(26,153,96,0.04)] p-[15px]">
            <div className="flex">
              <div className="max-w-[224px] max-lg:max-w-[80px] w-full flex flex-col gap-10.5 duration-300">
                <div className="flex justify-center pt-7.5 max-lg:hidden duration-300">
                  <Image src="/images/shared/logo.svg" alt="myカルテ" width="88" height="30" />
                </div>
                <div className="flex justify-center pt-7.5 lg:hidden ml-[-10px] duration-300">
                  <Image src="/images/shared/logo_mark.svg" alt="myカルテ" width="30" height="30" />
                </div>
                <div className="">
                  <ul className="ml-1.25 mr-5 border-b border-(--color-sub)">
                    <li className="rounded-[10px] mb-3.75 duration-300 hover:bg-white/80 group">
                      <Link href="/mykarte" className="flex items-center gap-2.5 p-2.5 max-lg:justify-center duration-300">
                        <HomeIcon className="text-(--color-muted) group-hover:text-(--color-primary) transition-colors" />
                        <p className="font-medium max-lg:hidden duration-300">ホーム</p>
                      </Link>
                    </li>
                    <li className="rounded-[10px] mb-3.75 duration-300 hover:bg-white/80 group">
                      <Link href="/mykarte/records/new" className="flex items-center gap-2.5 p-2.5 max-lg:justify-center duration-300">
                        <RecordIcon className="text-(--color-muted) group-hover:text-(--color-primary) transition-colors" />
                        <p className="font-medium max-lg:hidden duration-300">新規記録</p>
                      </Link>
                    </li>
                    <li className="rounded-[10px] mb-3.75 duration-300 hover:bg-white/80 group">
                      <Link href="/mykarte/records" className="flex items-center gap-2.5 p-2.5 max-lg:justify-center duration-300">
                        <RecordsIcon className="text-(--color-muted) group-hover:text-(--color-primary) transition-colors" />
                        <p className="font-medium max-lg:hidden duration-300">記録一覧</p>
                      </Link>
                    </li>
                    <li className="rounded-[10px] mb-3.75 duration-300 hover:bg-white/80 group">
                      <Link href="/mykarte/categories" className="flex items-center gap-2.5 p-2.5 max-lg:justify-center duration-300">
                        <CategoryIcon className="text-(--color-muted) group-hover:text-(--color-primary) transition-colors" />
                        <p className="font-medium max-lg:hidden duration-300">カテゴリー</p>
                      </Link>
                    </li>
                  </ul>
                  <ul className="ml-1.25 mr-5 mt-6">
                    <li className="rounded-[10px] mb-3.75 duration-300 hover:bg-white/80 group">
                      <Link href="/mykarte/setting" className="flex items-center gap-2.5 p-2.5 max-lg:justify-center duration-300">
                        <SettingIcon className="text-(--color-muted) group-hover:text-(--color-primary) transition-colors" />
                        <p className="font-medium max-lg:hidden duration-300">設定</p>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-white/50 w-full rounded-[15px] flex gap-10.5">
                <div className="flex-1">
                  {children}
                </div>
                <div className="bg-(--color-bg) rounded-[0_15px_15px_0] max-w-[304px] w-full p-[20px_12px]">
                  右アクションバー
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
