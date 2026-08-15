type Props = {
  itemTitle: string
  htmlFor: string
}

export const RecordItemTitle = ({itemTitle, htmlFor}: Props) => {
  return (
    <div className="pb-2.5 border-b border-b-(--color-sub)/20">
      <label 
        htmlFor={htmlFor}
        className="flex items-center text-[13px] font-medium pl-2 border-l-2 border-(--color-primary)"
      >
        {itemTitle}
      </label>
    </div>
  )
}