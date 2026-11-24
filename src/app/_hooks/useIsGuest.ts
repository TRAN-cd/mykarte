import { useSupabaseSession } from "./useSupabaseSession"

export const useIsGuest = () => {
  const { session, isLoading } = useSupabaseSession()
  const sessionEmail = session?.user.email
  const guestEmail = process.env.NEXT_PUBLIC_GUEST_EMAIL

  // ゲストであるか判定
  const isGuest = !!sessionEmail && !!guestEmail && sessionEmail === guestEmail

  return {isGuest, isLoading}

}