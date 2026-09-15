import { prisma } from "@/app/_libs/prisma";
import { supabase } from "@/app/_libs/supabase";
import { NextRequest, NextResponse } from "next/server";
import { RecordType, TimeZone } from "@/generated/prisma/enums";
import { CreateRecordRequestBody } from "../route";
import { convertRecordType, convertSeverityLevel } from "@/app/_libs/recordApiConverters";

export type RecordDetailResponse = {
  record: {
    id: number;
    recordAt: Date;
    recordType: RecordType;
    recordCategories: {
      id: number;
      createdAt: Date;
      updatedAt: Date;
      recordId: number;
      categoryId: number;
    }[];
    content: string;
    severityLevel: number | null;
    recordTimeZones: {
      id: number;
      recordId: number;
      timeZone: TimeZone;
    }[];
    treatment: string | null;
    nextVisit: Date | null;
  };
};

// 記録情報1件の取得
///////////////////
export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const token = request.headers.get("Authorization") ?? "";
  const { data, error } = await supabase.auth.getUser(token);
  if (error)
    return NextResponse.json({ status: error.message }, { status: 401 });

  const { id } = await params;

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

    // 記録データ取得
    const getRecord = await prisma.record.findFirst({
      where: {
        userId,
        id: parseInt(id),
      },
      include: {
        recordCategories: true,
        recordTimeZones: true,
      },
    });
    if (!getRecord)
      return NextResponse.json(
        { message: "該当の記録がありません" },
        { status: 404 }
      );

    return NextResponse.json<RecordDetailResponse>(
      { record: getRecord },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 });
  }
};

// 記録情報の更新
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

    // 記録データ取得
    const getRecord = await prisma.record.findFirst({
      where: {
        userId,
        id: parseInt(id),
      },
      include: {
        recordCategories: true,
        recordTimeZones: true,
      },
    });
    if (!getRecord)
      return NextResponse.json(
        { message: "該当の記録がありません" },
        { status: 404 }
      );

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

    // recordTypeの変換
    const recordTypeConverted = convertRecordType(recordType);

    // severityLevel（強さ・程度）の変換処理（string→number）
    const severityLevelNumber = convertSeverityLevel(severityLevel);

    const updatedRecord = await prisma.record.update({
      where: {
        id: parseInt(id),
      },
      data: {
        userId,
        recordAt: new Date(recordAt),
        recordType: recordTypeConverted,
        recordCategories: {
          deleteMany: {}, // 一旦、全部削除して、新しくつくる
          create: { categoryId: Number(recordCategory) },
        },
        content,
        severityLevel: severityLevelNumber,

        recordTimeZones: {
          deleteMany: {},
          create: (timeZone ?? []).map((tz) => ({
            timeZone: tz.toUpperCase() as TimeZone,
          })),
        },
        treatment,
        nextVisit: nextVisit ? new Date(nextVisit) : null,
      },
      include: {
        recordCategories: true,
        recordTimeZones: true
      },
    });

    return NextResponse.json<RecordDetailResponse>(
      { record: updatedRecord },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 });
  }
};
