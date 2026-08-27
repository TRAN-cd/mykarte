import { ComponentType } from "react";

type Props = {
  cardIcon: ComponentType<{ className?: string, strokeWidth?: string }>
  cardTitle: string
  cardDescription: string
  isSelected: boolean
  onClick?: () => void
  disabled?: boolean
}

export const RecordTypeCard = ({ cardIcon, cardTitle, cardDescription, isSelected, onClick, disabled }: Props) => {
  const CardIcon = cardIcon

  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={`max-w-55 w-full flex items-center gap-2.5 border p-3 rounded-[10px] cursor-pointer duration-300 ${isSelected
          ? "bg-(--color-bg) border-(--color-primary)"
          : "bg-(--color-card-bg) border-(--color-sub) hover:opacity-70"
        }`}
    >
      <CardIcon
        className={`transition-colors max-w-5.5 duration-300 ${isSelected ? "text-(--color-primary)" : "text-(--color-sub)"
          }`}
        strokeWidth={isSelected ? "2" : "1"}
      />
      <div className="flex flex-col gap-1">
        <p className="text-[14px] font-bold duration-300">
          {cardTitle}
        </p>
        <p className="text-[10px] text-(--color-sub)">{cardDescription}</p>
      </div>
    </div>
  )
}