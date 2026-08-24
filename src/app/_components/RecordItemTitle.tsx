type Props = {
  itemTitle: string
  htmlFor: string
  required?: boolean
}

export const RecordItemTitle = ({ itemTitle, htmlFor, required }: Props) => {
  return (
    <div className="pb-2.5 border-b border-b-(--color-sub)/20">
      <label 
        htmlFor={htmlFor}
        className="flex items-center gap-2 text-[13px] font-medium"
      >
        <span className="w-0.5 h-4 bg-(--color-primary) rounded-full" />
        {itemTitle}
        {required && <span className="text-(--color-primary) text-[8px] bg-(--color-bg) px-1 border border-(--color-primary) rounded-[10px] mb-[-2px]">必須</span>}
      </label>
    </div>
  )
}