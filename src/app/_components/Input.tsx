import { UseFormRegisterReturn } from "react-hook-form"

type Props = {
  htmlFor: string
  title: string;
  registerProps: UseFormRegisterReturn
} & React.InputHTMLAttributes<HTMLInputElement>
// React.InputHTMLAttributesにtype、id、placeholderが含まれている

export const Input = ({
  htmlFor,
  title,
  registerProps,
  ...rest
}: Props) => {

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={htmlFor} className="text-[15px] font-bold">{title}</label>
      <input 
        className="border border-(--color-sub) rounded-[5px] px-3 py-2.5 text-xs" 
        {...registerProps}
        {...rest}
      />
    </div>
  )
}