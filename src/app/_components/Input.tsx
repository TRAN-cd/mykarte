import { UseFormRegisterReturn } from "react-hook-form"

type Props = {
  htmlFor: string
  title: string;
  isRequired?: boolean;
  registerProps: UseFormRegisterReturn
} & React.InputHTMLAttributes<HTMLInputElement>
// React.InputHTMLAttributesにtype、id、placeholderが含まれている

export const Input = ({
  htmlFor,
  title,
  isRequired,
  registerProps,
  className,
  ...rest
}: Props) => {

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={htmlFor} className="text-[15px] font-medium flex gap-2 items-center">
        {title}
        {isRequired && (
          <span className="text-[10px] leading-1 text-(--color-danger) bg-(--color-danger-bg) px-1.5 py-1.5 rounded-[3px] ">必須</span>
        )}
      </label>
      <input 
        className={`border border-(--color-sub) rounded-[5px] px-3 py-2.5 text-xs ${className ?? ""}`} 
        {...registerProps}
        {...rest}
      />
    </div>
  )
}