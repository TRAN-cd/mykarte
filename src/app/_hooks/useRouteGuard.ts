import { useSupabaseSession } from "./useSupabaseSession";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useRouteGuard = () => {
  const router = useRouter()
  const { session, isLoading } = useSupabaseSession()

  useEffect(() => {
    if (isLoading) return

    const fetcher = async () => {
      if (session === null) {
        router.replace('/login')
      }
    }

    fetcher()
  }, [router, isLoading, session])
}