import { prisma } from "@/app/_libs/prisma";
import { supabase } from "@/app/_libs/supabase";
import { NextResponse, NextRequest } from "next/server";

// カテゴリー新規作成
///////////////////

// あとで、コンポーネント化する
export type CreateCategoryRequestBody = {
  name: string;
};

// あとで、コンポーネント化する
export type CreateCategoryResponse = {
  id: number;
};

export const POST = async (request: Request) => {
  const token = request.headers.get("Authorization") ?? "";
  const { data, error } = await supabase.auth.getUser(token);
  if (error)
    return NextResponse.json({ status: error.message }, { status: 401 });

  try {
    const body = await request.json();
    const { name }: CreateCategoryRequestBody = body;

    // サーバー側でもバリデーション
    if (!name)
      return NextResponse.json(
        { message: "カテゴリーが入力されていません。" },
        { status: 400 }
      );
    if (name.length > 20)
      return NextResponse.json(
        { message: "20文字以内で入力してください。" },
        { status: 400 }
      );

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

    // 重複チェック
    const existing = await prisma.category.findFirst({
      where: {
        userId,
        name
      },
    });
    if(existing)
      return NextResponse.json(
        { message: "入力されたカテゴリーはすでに作成済みです。" },
        { status: 409 }
      );

    const newCategory = await prisma.category.create({
      data: {
        userId,
        name,
      },
    });

    return NextResponse.json<CreateCategoryResponse>({ id: newCategory.id });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 });
  }
};
