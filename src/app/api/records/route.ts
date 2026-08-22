import { prisma } from "@/app/_libs/prisma";
import { supabase } from "@/app/_libs/supabase";
import { NextResponse } from "next/server";

export type CreateRecordRequestBody = {
  recordAt: string;
  recordType: "daily" | "medical";
  recordCategory: string;
  content: string;
  severityLevel: "mild" | "moderate" | "severe" | "na";
  timeZone: ("morning" | "daytime" | "evening" | "night" | "allDay")[];
  treatment: string;
  nextVisit: string | null;
};

// 新規記録作成
///////////////////
export const POST = async (request: Request) => {
  const token = request.headers.get("Authorization") ?? "";
  const { data, error } = await supabase.auth.getUser(token);
  if (error)
    return NextResponse.json({ status: error.message }, { status: 401 });

  try {
    const body = await request.json();
    const {
      recordAt,
      recordType,
      recordCategory,
      content,
      severityLevel,
      timeZone,
      treatment,
      nextVisit,
    }: CreateRecordRequestBody = body;

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

    // バリデーション
    if (!recordAt)
      return NextResponse.json(
        { message: "記録日を選択してください。" },
        { status: 400 }
      );
    if (!recordType)
      return NextResponse.json(
        { message: "記録の種類を選択してください。" },
        { status: 400 }
      );
    if (!recordCategory)
      return NextResponse.json(
        { message: "カテゴリーを選択してください。" },
        { status: 400 }
      );
    if (!content)
      return NextResponse.json(
        { message: "メモを入力してください。" },
        { status: 400 }
      );

    // severityLevel（強さ・程度）の変換処理（string→number）
    const convertSeverityLevel = (level: string) => {
      switch (level) {
        case "mild":
          return 1;
        case "moderate":
          return 2;
        case "severe":
          return 3;
        case "na":
          return null;
        default:
          throw new Error("不正なseverityLevelの値です。");
      }
    };
    const severityLevelNumber = convertSeverityLevel(severityLevel);


  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 });
  }
};
