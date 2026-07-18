import { useForm } from "react-hook-form";

export type CategoryFormInputs = {
  category: string
}

interface Props {
  mode: 'new' | "edit"
  defaultValues: CategoryFormInputs
  onSubmit: (data: CategoryFormInputs) => void
  onDelete?: () => void
  disabled: boolean
}

export const CategoryForm = ({
  mode,
  defaultValues,
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
      <div className="flex justify-between items-center gap-2 bg-white px-3 py-2.5 rounded-[5px] border border-(--color-bg) max-w-136 w-full">
        <div className="flex items-center gap-1 max-w-108 w-full">
          <label htmlFor="category" className="sr-only">カテゴリー名</label>
          <input
            id="category"
            type="text"
            className="w-full border border-(--color-primary) rounded-[5px] px-2.5 py-1.5 text-sm font-medium placeholder:text-(--color-sub)"
            {...register("category", {
              required: "カテゴリーが入力されていません。",
              maxLength: { value: 20, message: "20文字以内で入力してください。" }
            })}
            disabled={disabled || isSubmitting}
          />
          {errors.category && (
            <span className="text---color-danger) text-xs">{errors.category.message}</span>
          )}
        </div>
      </div>
    </form>
  )
}