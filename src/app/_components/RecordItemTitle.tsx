type Props = {
  itemTitle: string
  htmlFor: string
}

export const RecordItemTitle = ({ itemTitle, htmlFor }: Props) => {
  return (
    <div className="pb-2.5 border-b border-b-(--color-sub)/20">
      <label 
        htmlFor={htmlFor}
        className="flex items-center gap-2 text-[13px] font-medium"
      >
        <span className="w-0.5 h-4 bg-(--color-primary) rounded-full" />
        {itemTitle}
      </label>
    </div>
  )
}