import { format } from "date-fns"
import { ja } from 'date-fns/locale';

type Props = {
  pageTitle : string
}

export const PageHeader = ({pageTitle} : Props) => {
  const todayKey = format(new Date(), 'yyyy年MM月dd日(EEEEE)', { locale: ja });

  return (
    <div className="flex flex-col gap-1.5 pb-6">
      <h2 className="text-2xl font-bold">{pageTitle}</h2>
      <time dateTime={todayKey} className="font-en text-sm text-(--color-sub)">今日 {todayKey}</time>
    </div>
  )
}