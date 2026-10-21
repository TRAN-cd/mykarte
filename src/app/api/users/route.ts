import { prisma } from "@/app/_libs/prisma";
import { supabase } from "@/app/_libs/supabase";
import { supabaseAdmin } from "@/app/_libs/supabaseAdmin";
import { NextResponse } from "next/server";

export type CreateNewUserResponse = {
  name: string;
};

// アカウント作成
export const POST = async (request: Request) => {
  const token = request.headers.get("Authorization") ?? "";
  const { data, error } = await supabase.auth.getUser(token);
  if (error)
    return NextResponse.json({ status: error.message }, { status: 401 });

  try {
    if (!data.user.email)
      return NextResponse.json(
        { message: "メールアドレスの登録がありません。" },
        { status: 404 }
      );

    const existingUser = await prisma.user.findUnique({
      where: {
        supabaseUserId: data.user.id,
      },
    });
    if (existingUser) {
      return NextResponse.json<CreateNewUserResponse>({
        name: existingUser.name,
      });
    } else {
      const newUser = await prisma.user.create({
        data: {
          supabaseUserId: data.user.id,
          email: data.user.email,
          name: "ゲスト",
        },
      });

      return NextResponse.json<CreateNewUserResponse>({ name: newUser.name }, { status: 201 });
    }
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 });
  }
};


// アカウント削除
export const DELETE = async (request: Request) => {
  const token = request.headers.get("Authorization") ?? "";
  const { data, error } = await supabase.auth.getUser(token);
  if (error)
    return NextResponse.json({ status: error.message }, { status: 401 });

  try {
    // ユーザー特定
    const dbUser = await prisma.user.findUnique({
      where: {
        supabaseUserId: data.user.id,
      },
    });
    if (!dbUser)
      return NextResponse.json(
        { message: "ユーザー情報がありません。" },
        { status: 404 }
      );
    const userId = dbUser.id;

    // DBの削除
    await prisma.user.delete({
      where: {
        id: userId
      },
    });

    // 認証基盤の削除
    await supabaseAdmin.auth.admin.deleteUser(data.user.id);

    return NextResponse.json(
      { message: "アカウントを削除しました。" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 });
  }
};

