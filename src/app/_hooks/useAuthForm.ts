'use client'

import { useForm, FieldValues, DefaultValues } from "react-hook-form";

export function useAuthForm<T extends FieldValues>(defaultValues: DefaultValues<T>){
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: {
      isDirty,
      isValid,
      isSubmitting,
      errors,
    },
    reset
  } = useForm<T>({defaultValues, mode: "all"})

  return {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    isDirty,
    isValid,
    isSubmitting,
    errors,
    reset
  }
}