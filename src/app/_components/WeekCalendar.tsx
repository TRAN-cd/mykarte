

export const WeekCalendar = () => {
  return (
    <div className="font-en pt-10">
      <p className="text-(--color-primary) font-bold text-center pb-2.5">May. 2026</p>
      <ul className="flex gap-2">
        <li>
          <time dateTime="2026-05-25" className="flex flex-col items-center gap-2.5 bg-transparent w-8 py-2.5 rounded-4xl">
            <span className="text-[10px]">Mo</span>
            <span className="font-bold">25</span>
          </time>
        </li>
        <li>
          <time dateTime="2026-05-26" aria-current="date" className="flex flex-col items-center gap-2.5 bg-(--color-primary) w-8 py-2.5 rounded-4xl text-white">
            <span className="text-[10px]">Tu</span>
            <span className="font-bold">26</span>
          </time>
        </li>
        <li>
          <time dateTime="2026-05-27" className="flex flex-col items-center gap-2.5 bg-transparent w-8 py-2.5 rounded-4xl">
            <span className="text-[10px]">We</span>
            <span className="font-bold">27</span>
          </time>
        </li>
        <li>
          <time dateTime="2026-05-28" className="flex flex-col items-center gap-2.5 bg-transparent w-8 py-2.5 rounded-4xl">
            <span className="text-[10px]">Th</span>
            <span className="font-bold">28</span>
          </time>
        </li>
        <li>
          <time dateTime="2026-05-29" className="flex flex-col items-center gap-2.5 bg-transparent w-8 py-2.5 rounded-4xl">
            <span className="text-[10px]">Fr</span>
            <span className="font-bold">29</span>
          </time>
        </li>
        <li>
          <time dateTime="2026-05-30" className="flex flex-col items-center gap-2.5 bg-transparent w-8 py-2.5 rounded-4xl">
            <span className="text-[10px]">Sa</span>
            <span className="font-bold">30</span>
          </time>
        </li>
        <li>
          <time dateTime="2026-05-31" className="flex flex-col items-center gap-2.5 bg-transparent w-8 py-2.5 rounded-4xl">
            <span className="text-[10px]">Su</span>
            <span className="font-bold">31</span>
          </time>
        </li>
      </ul>
    </div>
  )
}