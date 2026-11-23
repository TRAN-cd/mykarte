import { supabaseAdmin } from "@/app/_libs/supabaseAdmin";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const POST = async () => {
  // 環境変数を読み込む
  const guestEmail = process.env.GUEST_EMAIL;
  const guestPassword = process.env.GUEST_PASSWORD;
  const guestUserId = process.env.GUEST_USER_ID;

  if (!guestEmail || !guestPassword || !guestUserId) {
    return NextResponse.json(
      { message: "ゲストログインの設定がありません。" },
      { status: 500 }
    );
  }

  // メールアドレスとパスワードを設定し直す
  const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
    guestUserId,
    {
      email: guestEmail,
      password: guestPassword,
      email_confirm: true,
    }
  );
  if (updateError) {
    return NextResponse.json(
      { message: "ゲストログインに失敗しました。" },
      { status: 500 }
    );
  }

  // このAPI専用のクライアントで、ゲストとしてログインする
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );

  const { data, error: signInError } = await supabase.auth.signInWithPassword({
    email: guestEmail,
    password: guestPassword,
  });
  if (signInError || !data.session) {
    return NextResponse.json(
      { message: "ゲストログインに失敗しました。" },
      { status: 500 }
    );
  }

  // トークンを返す
  return NextResponse.json(
    {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
    },
    { status: 200 }
  );
};
