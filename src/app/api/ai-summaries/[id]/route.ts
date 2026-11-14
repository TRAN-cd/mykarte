import { prisma } from "@/app/_libs/prisma";
import { supabase } from "@/app/_libs/supabase";
import { NextResponse } from "next/server";

export type AiSummaryActionRequestBody = {
  action?: "save" | "cancel";
};

// AI要約生成後、保存またはキャンセル
///////////////////
export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const token = request.headers.get("Authorization") ?? "";
  const { data, error } = await supabase.auth.getUser(token);
  if (error)
    return NextResponse.json({ status: error.message }, { status: 401 });

  const { id } = await params;

  try {
    const body = await request.json();
    const { action }: AiSummaryActionRequestBody = body;
    if (action !== "save" && action !== "cancel")
      return NextResponse.json(
        { message: "操作の種類が正しくありません。" },
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

    // 対象のAI要約を取得
    const aiSummary = await prisma.aiSummary.findFirst({
      where: {
        userId,
        id: parseInt(id),
      },
    });
    if (!aiSummary)
      return NextResponse.json(
        { message: "該当のAI要約がありません。" },
        { status: 404 }
      );
    if (aiSummary.savedAt || aiSummary.deletedAt)
      return NextResponse.json(
        { message: "この要約はすでに保存またはキャンセルされています。" },
        { status: 400 }
      );

    // AI要約の保存orキャンセル処理
    const updatedSummary = await prisma.aiSummary.update({
      where: {
        userId,
        id: aiSummary.id,
      },
      data:
        action === "save" ? { savedAt: new Date() } : { deletedAt: new Date() },
    });

    return NextResponse.json(
      { aiSummary: updatedSummary }, 
      { status: 200 }
      );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
