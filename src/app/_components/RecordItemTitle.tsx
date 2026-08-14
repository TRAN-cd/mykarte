type Props = {
  itemTitle: string
}

export const RecordItemTitle = ({itemTitle}: Props) => {
  return (
    <div className="pb-2.5 border-b border-b-(--color-sub)/20">
      <label 
        htmlFor="recordDate"
        className="flex items-center text-[13px] font-medium pl-2 border-l-2 border-(--color-primary)"
      >
        {itemTitle}
      </label>
    </div>
  )
}