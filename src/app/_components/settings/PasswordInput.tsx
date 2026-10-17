'use client'

import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { Input } from "../Input";

type PasswordInputProps = {
  htmlFor: string;
  title: string;
  registerProps: UseFormRegisterReturn;
  errorMessage?: string
}

export function PasswordInput({ htmlFor, title, registerProps, errorMessage }: PasswordInputProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="flex flex-col gap-3 pb-4">
      <div className="flex flex-col gap-1.5">
        <Input
          htmlFor={htmlFor}
          title={title}
          type={visible ? 'text' : 'password'}
          id={htmlFor}
          placeholder="••••••••"
          registerProps={registerProps}
        />
        {errorMessage &&
          <span className="text-(--color-danger) text-xs">{errorMessage}</span>
        }
      </div>
      <div className="flex justify-end items-center gap-2">
        <input
          type="checkbox"
          name="checkbox"
          id={`${htmlFor}-visible`}
          checked={visible}
          onChange={(e) => setVisible(e.target.checked)}
          className="border-(--color-primary)"
        />
        <label htmlFor={`${htmlFor}-visible`} className="text-[10px]">パスワードを表示</label>
      </div>
    </div>
  )
}