'use client'

import { Input } from "@/app/_components/Input"
import { PageHeader } from "@/app/_components/PageHeader"
import { useAuthForm } from "@/app/_hooks/useAuthForm"
import { useFetch } from "@/app/_hooks/useFetch"
import { apiFetch } from "@/app/_libs/apiFetch"
import { supabase } from "@/app/_libs/supabase"
import Image from "next/image"
import { ChangeEvent, useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserRequestBody, UserResponse } from "@/app/api/users/route"

type ProfileValues = {
  name: string;
  avatarKey: string
}

export default function Profile() {
  const { data, error, isLoading } = useFetch<UserResponse>("/api/users/");
  const userName = data?.name;
  const userIcon = data?.avatarKey ?? "";

  // フォーム初期化
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { isDirty, isValid, isSubmitting, errors },
    reset,
    watch
  } = useAuthForm<ProfileValues>({ name: userName, avatarKey: userIcon })

  // 初期値セット
  useEffect(() => {
    if (!isLoading) {
      reset({ name: userName, avatarKey: userIcon })
    }
  }, [isLoading, userName, userIcon])

  // 成功メッセージ用の状態
  const [submitSuccess, setSubmitSuccess] = useState(false);
  // アイコンプレビュー用の状態
  const [avatarUrl, setAvatarUrl] = useState<null | string>(null);

  // アイコンアップロード
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

  // 監視系
  const nameValue = watch("name")
  const avatarKeyValue = watch("avatarKey");

  useEffect(() => {
    if (!avatarKeyValue) return

    const fetcher = async () => {
      const { data: { publicUrl } } = await supabase.storage
        .from("avatar")
        .getPublicUrl(avatarKeyValue)

      setAvatarUrl(publicUrl)
    }

    fetcher()
  }, [avatarKeyValue])

  useEffect(() => {
    setSubmitSuccess(false)
  }, [nameValue, avatarKeyValue])

  // 送信処理
  const onSubmit = async (data: ProfileValues) => {
    try {
      await apiFetch.put<UpdateUserRequestBody, UserResponse>("/api/users", {
        name: data.name,
        avatarKey: data.avatarKey,
      })
      setSubmitSuccess(true)
    } catch (error) {
      setError("root.serverError", {
        type: "manual",
        message: "プロフィール情報の更新に失敗しました。"
      })
    }
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
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white border border-(--color-sub)/20 rounded-[10px] p-5"
        >
          <h3 className="text-[16px] font-bold text-(--color-text) pb-3 border-b border-(--color-sub)/20 mb-3">ユーザー名・アイコン画像の変更</h3>

          <div className="flex flex-col gap-1.5 pb-10">
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
            <label htmlFor="avatarKey" className="text-[15px] font-medium" >
              アイコン画像
            </label>
            <div className="w-16 h-16 rounded-full bg-(--color-bg) border border-(--color-sub)/20 overflow-hidden flex items-center justify-center shrink-0">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt="アイコン画像"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-(--color-sub)">未設定</span>
              )}
            </div>

            <label
              htmlFor="avatarKey"
              className="w-30 text-xs text-(--color-primary) border border-(--color-primary) rounded-[8px] px-4 py-2 hover:opacity-80 duration-300 cursor-pointer"
            >
              画像を選択する
              <input
                type="file"
                id="avatarKey"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>


          <button
            type="submit"
            className="bg-(--color-primary) text-white text-sm font-medium rounded-[8px] px-4 py-2 hover:opacity-90 duration-300 disabled:opacity-50 cursor-pointer"
            disabled={!isDirty || !isValid || isSubmitting}
          >
            プロフィールを変更
          </button>
        </form>
        {submitSuccess && (
          <p className="text-(--color-primary) text-xs border border-(--color-primary) bg-(--color-bg) w-full text-center p-3 rounded-[10px] mt-3">
            プロフィール情報を変更しました。
          </p>
        )}
      </div>
    </div>
  )
}