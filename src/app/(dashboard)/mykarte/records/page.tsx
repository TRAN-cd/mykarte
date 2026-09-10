'use client'

import { PageHeader } from "@/app/_components/PageHeader";
import { RecordIcon } from "@/app/_components/icons/RecordIcon";
import { useFetch } from "@/app/_hooks/useFetch";
import type { GetCategoryResponse } from "@/app/_type/GetCategoryResponse";
import Image from "next/image";
import { SevereIcon } from "@/app/_components/icons/SevereIcon";
import { ArrowIcon } from "@/app/_components/icons/ArrowIcon";
import Link from "next/link";
import { DeleteIcon } from "@/app/_components/icons/DeleteIcon";
import { RecordResponse } from "@/app/api/records/route";
import { RecordType, TimeZone } from "@/generated/prisma/enums";
import { MildIcon } from "@/app/_components/icons/MildIcon";
import { ModerateIcon } from "@/app/_components/icons/ModerateIcon";
import { HospitalIcon } from "@/app/_components/icons/HospitalIcon";

const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short'
  }).format(date);
};

const displayRecordType = (type: RecordType) => {
  switch (type) {
    case "DAILY":
      return {icon: RecordIcon, label: "日常の記録"};
    case "MEDICAL":
      return {icon: HospitalIcon, label: "診療の内容"};
    default:
      throw new Error("不正なrecordTypeの値です。");
  }
}

const displaySeverityLevel = (level: number | null) => {
  switch (level) {
    case 1:
      return {
        label: "軽度",
        icon: MildIcon,
        className: "w-fit flex items-center gap-1 text-xs py-0.5 px-1.5 border rounded-xl text-(--color-primary) font-medium border-(--color-primary) bg-(--color-bg)"
      };
    case 2:
      return {
        label: "中等度",
        icon: ModerateIcon,
        className: "w-fit flex items-center gap-1 text-xs py-0.5 px-1.5 border rounded-xl text-[#D97706] font-medium border-[#D97706] bg-[#FFF4E5]"
      };
    case 3:
      return {
        label: "重度",
        icon: SevereIcon,
        className: "w-fit flex items-center gap-1 text-xs py-0.5 px-1.5 border rounded-xl text-(--color-danger) font-medium border-(--color-danger) bg-(--color-danger-bg)"
      };
    case 0:
      return {
        label: "該当なし",
        icon: null,
        className: "w-fit flex items-center gap-1 text-xs py-0.5 px-1.5 border rounded-xl text-(--color-primary)  font-medium border-(--color-primary)  bg-(--color-bg)"
      };
    case null:
      return {
        label: "",
        icon: null,
        className: ""
      };
    default:
      throw new Error("不正なseverityLevelの値です。");
  }
}

const convertTimeZone = (tz: TimeZone) => {
  switch (tz) {
    case "MORNING":
      return "朝";
    case "AFTERNOON":
      return "昼";
    case "EVENING":
      return "夕";
    case "NIGHT":
      return "夜";
    case "ALL_DAY":
      return "終日";
    default:
      throw new Error("不正なTimeZoneの値です。");
  }
}

export default function NewRecords() {
  const { data: categoriesData } = useFetch<GetCategoryResponse>("/api/categories/")
  const categories = categoriesData?.categories || []

  const { data: recordsData, error, isLoading } = useFetch<RecordResponse>("/api/records");
  const records = recordsData?.records || []

  const handleDeleteConfirm = () => {
    const isConfirmed = confirm("削除しますか？")
    if (!isConfirmed) {
      return false
    } else {
      console.log("削除が実行されました。");
      return true
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
        記録の取得に失敗しました。
      </p>
    </div>
  );

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
        {records.map((elem) => {
          const category = categories.find((cat) => cat.id === elem.recordCategories[0].categoryId);
          const recordTypeInfo = displayRecordType(elem.recordType)
          const RecordTypeIcon = recordTypeInfo.icon
          const severityInfo = displaySeverityLevel(elem.severityLevel)
          const SeverityIcon = severityInfo.icon

          return (
            <li key={elem.id} className="relative bg-white p-5 rounded-[10px] border border-transparent shadow-none duration-300 hover:border-(--color-primary) hover:shadow-[0px_10px_50px_0px_rgba(28,43,36,0.1)]">
              <div className="flex items-center gap-4 pb-4">
                <p className="font-en text-sm font-medium">{formatDate(elem.recordAt)}</p>
                <div className="flex items-center gap-1.5">
                  <RecordTypeIcon className="transition-colors w-3.5 text-(--color-primary) -mb-0.75" />
                  <p className="text-xs font-medium">{recordTypeInfo.label}</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col gap-2.5 max-w-22.5 w-full py-2.5 pr-2.5 border-r border-(--color-sub)/20">
                  <p className="w-fit bg-(--color-bg) px-2 py-0.5 rounded-xl border border-(--color-primary) text-[10px] font-medium text-(--color-primary)">
                    {category?.name ?? "選択なし"}
                  </p>
                  {elem.severityLevel !== null &&
                    <div className={severityInfo.className}>
                      {SeverityIcon && <SeverityIcon className="w-3" />}
                      <span>{severityInfo.label}</span>
                    </div>
                  }
                  {
                    elem.recordTimeZones.length > 0 &&
                    <ul className="flex flex-wrap gap-1.5">
                      {
                        elem.recordTimeZones.map((tz) => (
                          <li key={tz.id} className="inline-block bg-(--color-bg) px-2 py-0.5 rounded-xl border border-(--color-primary) text-[10px] font-medium text-(--color-primary)">{convertTimeZone(tz.timeZone)}</li>
                        ))
                      }
                    </ul>
                  }
                </div>
                <div className="flex flex-col gap-3 py-2.5 pl-2.5 pr-10">
                  <p className="text-sm font-medium">{elem.content}</p>
                  <div className="w-fit flex flex-col gap-1.5 bg-(--color-card-bg) px-4 py-2.5 rounded-[10px]">
                    <dl className="flex gap-1.5 text-[10px] font-medium">
                      <dt className="text-(--color-sub) whitespace-nowrap">対処</dt>
                      <dd>{elem.treatment ? elem.treatment : "-"}</dd>
                    </dl>
                    <dl className="flex gap-1.5 text-[10px] font-medium">
                      <dt className="text-(--color-sub)">次回受診日</dt>
                      <dd className="font-en">
                        {elem.nextVisit ? formatDate(elem.nextVisit) : "-"}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="absolute right-5 bottom-5">
                <div className="flex gap-2">
                  <button onClick={handleDeleteConfirm} className="block w-7 h-7 bg-white rounded-[50%] border border-(--color-text)/20 duration-300 hover:border-(--color-danger) hover:bg-(--color-danger-bg) group cursor-pointer">
                    <div className="h-full flex justify-center items-center">
                      <DeleteIcon className="text-(--color-text) w-3 h-3 duration-300 group-hover:text-(--color-danger)" />
                    </div>
                  </button>
                  <Link href="/mykarte/records/1" className="block w-7 h-7 bg-(--color-primary) border border-transparent rounded-[50%] duration-300 hover:bg-white hover:border-(--color-primary) group">
                    <div className="h-full flex justify-center items-center">
                      <ArrowIcon className="text-white w-2 h-2.75 -mr-0.5 duration-300 group-hover:text-(--color-primary)" />
                    </div>
                  </Link>
                </div>
              </div>
            </li>
          )
        })}

      </ul>
    </div>
  )
}