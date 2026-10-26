'use client'

import { Input } from "@/app/_components/Input"
import { PageHeader } from "@/app/_components/PageHeader"
import { useAuthForm } from "@/app/_hooks/useAuthForm"
import { useFetch } from "@/app/_hooks/useFetch"
import { supabase } from "@/app/_libs/supabase"
import { UserResponse } from "@/app/api/users/route"
import { ChangeEvent, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'

type ProfileValues = {
  name: string;
  avatarKey: string
}

export default function Profile() {
  const { data, error, isLoading } = useFetch<UserResponse>("/api/users/");
  const userName = data?.name;
  const userIcon = data?.avatarKey ?? "";
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { isDirty, isValid, isSubmitting, errors },
    reset
  } = useAuthForm<ProfileValues>({ name: userName, avatarKey: userIcon })

  useEffect(() => {
    if (!isLoading) {
      reset({ name: userName, avatarKey: userIcon })
    }
  }, [isLoading, userName, userIcon])

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const files = event.target.files;
    if (!files || files.length === 0) return

    const file = files[0];
    const filePath = `private/${uuidv4()}`;

    const { data, error } = await supabase.storage
      .from("avatar")
      .upload(filePath, file)

    if (error) {
      alert(error.message)
      return
    }

    setValue("avatarKey", data.path, { shouldValidate: true, shouldDirty: true })
  }

  if (isLoading) return (
    <div className="px-6 py-5">
      <p className="text-sm text-(--color-sub) text-center py-10">読み込み中...</p>
    </div>
  );

  if (error) return (
    <div className="px-6 py-5">
      <p className="text-sm text-(--color-danger) text-center py-10 bg-(--color-danger-bg) rounded-[5px] border border-(--color-danger)">
        プロフィール情報の取得に失敗しました。
      </p>
    </div>
  );

  return (
    <div className="px-6 py-5 w-full">
      <PageHeader pageTitle="プロフィール変更" />

      <div className="flex flex-col gap-8 max-w-121 w-full">
        <form
          // onSubmit={handleSubmit(onSubmitEmail)}
          className="bg-white border border-(--color-sub)/20 rounded-[10px] p-5"
        >
          <h3 className="text-[16px] font-bold text-(--color-text) pb-3 border-b border-(--color-sub)/20 mb-3">ユーザー名・アイコン画像の変更</h3>

          <div className="flex flex-col gap-1.5 pb-6">
            <Input
              htmlFor="name"
              title="ユーザー名"
              type="text"
              id="name"
              placeholder={userName}
              registerProps={register("name", {
                required: "ユーザー名が入力されていません。",
              })}
            />
            {errors.name &&
              <span className="text-(--color-danger) text-xs">{errors.name.message}</span>
            }
          </div>

          <div className="flex flex-col gap-3 pb-4">
            <label
              htmlFor="avatarKey"
              className="text-[15px] font-medium"
            >
              アイコン画像
            </label>
            <input
              type="file"
              id="avatarKey"
              onChange={handleImageChange}
              className="border border-(--color-sub) rounded-[5px] px-3 py-2.5 text-xs"
              accept="image/*"
            />
          </div>


          <button
            type="submit"
            className="bg-(--color-primary) text-white text-sm font-medium rounded-[8px] px-4 py-2 hover:opacity-90 duration-300 disabled:opacity-50 cursor-pointer"
          // disabled={!isDirty || !isValid || isSubmitting}
          >
            プロフィールを変更
          </button>
        </form>
      </div>
    </div>
  )
}