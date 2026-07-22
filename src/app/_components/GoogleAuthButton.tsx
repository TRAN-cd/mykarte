import { supabase } from "@/app/_libs/supabase";
import Image from "next/image";
const appUrl = process.env.NEXT_PUBLIC_APP_URL;

type Props = {
  label: string
}

export const GoogleAuthButton = ({label}: Props) => {

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${appUrl}/callback/google`
      },
    })
  }

  return (
    <div className="flex justify-center items-center gap-6">
      <button
        onClick={handleGoogleLogin}
        className="flex justify-center gap-3 w-full border border-(--color-sub) px-17.25 py-1.75 rounded-[5px] hover:opacity-70 duration-300 cursor-pointer">
        <Image src="/icons/google.png" alt="googleアカウント" width={30} height={26} />
        <p>{label}</p>
      </button>
    </div>
  )
}