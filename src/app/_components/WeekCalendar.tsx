import { addDays, eachDayOfInterval, format } from "date-fns"

export const WeekCalendar = () => {
  const today = new Date()
  const weekDay = eachDayOfInterval({
    start: addDays(today, -1),
    end: addDays(today, 5)
  })
  const todayKey = format(today, 'yyyy-MM-dd');
  const year = format(today, 'yyyy');
  const month = format(today, 'MMM');

  return (
    <div className="font-en pt-10">
      <p className="text-(--color-primary) font-bold text-center pb-2.5">{month}. {year}</p>
      <ul className="flex gap-2">
        {
          weekDay.map((date: Date) => {
            const dayKey = format(date, 'yyyy-MM-dd')
            const dayOfWeek = format(date, 'EEEEEE')
            const day = format(date, 'd')
            return (
              <li key={dayKey}>
                <time
                  dateTime={dayKey}
                  className={`flex flex-col items-center gap-2.5 w-8 py-2.5 rounded-4xl ${dayKey == todayKey ?
                      "bg-(--color-primary) text-white" :
                      "bg-transparent"
                    }`}>
                  <span className="text-[10px]">{dayOfWeek}</span>
                  <span className="font-bold">{day}</span>
                </time>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}