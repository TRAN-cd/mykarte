'use client'

import { useForm, FieldValues, DefaultValues } from "react-hook-form";

export const useAuthForm = <T extends FieldValues>(defaultValues: DefaultValues<T>) =>  useForm<T>({defaultValues, mode: "all"})
