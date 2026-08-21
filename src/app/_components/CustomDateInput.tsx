import { forwardRef } from "react";
import { CalendarIcon } from "./icons/CalenderIcon";

interface Props {
  value?: string
  onClick?: () => void
  placeholder?: string
}

export const CustomDateInput = forwardRef<HTMLDivElement, Props>(({value, onClick, placeholder}, ref) => (
    <div
      onClick={onClick}
      ref={ref}
      className="bg-(--color-card-bg) p-3 rounded-[10px] border border-(--color-primary) font-en text-xs w-40 flex justify-between items-center mt-3"
    >
      <p className={value ? "text-(--color-text)" : "text-(--color-text)/20"}>
        {value ? value : placeholder}
      </p>
      <CalendarIcon className="text-(--color-sub) w-4 h-4"/>
    </div>
  )
)