import { useForm } from "react-hook-form";
import { CheckIcon } from "@/app/_components/icons/CheckIcon";
import Image from "next/image";

export type CategoryFormInputs = {
  name: string
}

interface Props {
  mode: 'new' | "edit"
  defaultValues: CategoryFormInputs
  placeholder?: string
  onSubmit: (data: CategoryFormInputs) => void
  onDelete?: () => void
  disabled: boolean
}

export const CategoryForm = ({
  mode,
  defaultValues,
  placeholder,
  onSubmit,
  onDelete,
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
  } = useForm<CategoryFormInputs>({
    defaultValues,
    mode: "all"
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=" bg-white px-3 py-2.5 rounded-[5px] border border-(--color-bg) max-w-136 w-full">
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-1 max-w-108 w-full">
            <Image src="/images/shared/icon_plus.svg" alt="" width="24" height="24" />
            <label htmlFor="name" className="sr-only">カテゴリー名</label>
            <input
              id="name"
              type="text"
              className="w-full border border-(--color-primary) rounded-[5px] px-2.5 py-1.5 text-sm font-medium placeholder:text-(--color-sub)"
              placeholder={placeholder}
              {...register("name", {
                required: "カテゴリーが入力されていません。",
                maxLength: { value: 20, message: "20文字以内で入力してください。" }
              })}
              disabled={disabled || isSubmitting}
            />
          </div>
          <div className="flex items-center gap-2">
            {mode === "edit" && (
              <button
                type="button"
                className="w-20 h-9 flex justify-center items-center gap-2 bg-white rounded-[5px] border border-(--color-text)/20 duration-300 hover:border-(--color-primary) hover:bg-white group cursor-pointer"
                disabled={isSubmitting}
              >
                <p className="text-xs font-medium duration-300 group-hover:text-(--color-primary)">
                  キャンセル
                </p>
              </button>
            )}

            <button
              type="submit"
              className="w-20 h-9 flex justify-center items-center gap-2 bg-(--color-primary) text-white rounded-[5px] border border-(--color-text)/20 duration-300 hover:border-(--color-primary) hover:bg-(--color-bg) group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-(--color-primary) disabled:hover:text-white disabled:hover:border-(--color-text)/20"
              disabled={!isDirty || !isValid || isSubmitting || disabled}
            >
              <CheckIcon className="w-4 duration-300 group-hover:text-(--color-primary) group-disabled:group-hover:text-white" />
              <p className="text-xs font-medium duration-300 group-hover:text-(--color-primary) group-disabled:group-hover:text-white">
                {mode === "new" ? "追加" : "保存"}
              </p>
            </button>
          </div>
        </div>
        <div className="pl-7">
        {errors.name && (
          <span className="text-(--color-danger) text-xs">{errors.name.message}</span>
          )}
          </div>
      </div>

    </form>
  )
}