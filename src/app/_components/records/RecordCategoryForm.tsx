import { useForm } from "react-hook-form"
import { PlusIcon } from "../icons/PlusIcon"
import { CheckIcon } from "../icons/CheckIcon"


export type RecordCategoryFormInputs = {
  name: string
}

interface Props {
  defaultValues: RecordCategoryFormInputs
  placeholder?: string
  onSubmit: (data: RecordCategoryFormInputs) => Promise<boolean>
  onCancel?: () => void
  disabled: boolean
}

export const RecordCategoryForm = ({
  defaultValues,
  placeholder,
  onSubmit,
  onCancel,
  disabled
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: {
      isDirty,
      isValid,
      isSubmitting,
      errors,
    },
    reset
  } = useForm<RecordCategoryFormInputs>({ defaultValues })

  return (
    <>
      <li className="flex items-center gap-2 px-2 py-1 bg-(--color-bg) rounded-[5px] border border-(--color-primary)">
        <div className="flex items-center gap-1 max-w-35 w-full">
          <label htmlFor="name" className="sr-only">カテゴリー名</label>
          <input
            id="name"
            type="text"
            className="w-full border border-(--color-sub) rounded-[5px] px-2.5 py-1 bg-white text-xs font-medium placeholder:text-(--color-sub)"
            placeholder={placeholder}
            {...register("name", {
              required: "カテゴリーが入力されていません。",
              maxLength: { value: 20, message: "20文字以内で入力してください。" }
            })}
            disabled={disabled || isSubmitting}
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSubmit(onSubmit)}
            type="button"
            className="w-15 h-6 flex justify-center items-center gap-2 bg-(--color-primary) text-white rounded-[5px] border border-(--color-primary) duration-300 hover:border-(--color-primary) hover:bg-(--color-bg) group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-(--color-primary) disabled:hover:text-white disabled:hover:border-(--color-text)/20"
            disabled={!isDirty || !isValid || isSubmitting || disabled}
          >
            <CheckIcon className="w-2 duration-300 group-hover:text-(--color-primary) group-disabled:group-hover:text-white" />
            <p className="text-xs font-medium duration-300 group-hover:text-(--color-primary) group-disabled:group-hover:text-white">
              保存
            </p>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-6 h-6 flex justify-center items-center gap-2 bg-white rounded-[5px] border border-(--color-text)/20 duration-300 hover:border-(--color-primary) hover:bg-white group cursor-pointer"
            disabled={isSubmitting}
          >
            <PlusIcon className="w-3 rotate-45" />
          </button>
        </div>
        <div className="pl-2 block">
          {errors.name && (
            <span className="text-(--color-danger) text-xs">{errors.name.message}</span>
          )}
        </div>
      </li>
    </>
  )
}