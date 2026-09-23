import { prisma } from "@/app/_libs/prisma";
import { supabase } from "@/app/_libs/supabase";
import { NextResponse } from "next/server";
import { RecordType, TimeZone } from "@/generated/prisma/enums";
import {
  RecordCategoryType,
  SeverityLevel,
  TimeZoneType,
} from "@/app/_type/RecordTypes";
import { convertRecordType, convertSeverityLevel } from "@/app/_libs/recordApiConverters";
import { Prisma } from "@/generated/prisma/client";
import { subMonths, subWeeks, subYears, startOfYear, endOfYear } from "date-fns";

export type CreateRecordRequestBody = {
  recordAt: string;
  recordType: RecordCategoryType;
  recordCategory: string;
  content: string;
  severityLevel?: SeverityLevel;
  timeZone?: TimeZoneType[];
  treatment?: string;
  nextVisit?: string | null;
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

    // recordTypeの変換
    const recordTypeConverted = convertRecordType(recordType);

    // severityLevel（強さ・程度）の変換処理（string→number）
    const severityLevelNumber = convertSeverityLevel(severityLevel);

    const newRecord = await prisma.record.create({
      data: {
        userId,
        recordAt: new Date(recordAt),
        recordType: recordTypeConverted,
        recordCategories: {
          create: { categoryId: Number(recordCategory) },
        },
        content,
        severityLevel: severityLevelNumber,

        recordTimeZones: {
          create: (timeZone ?? []).map((tz) => ({
            timeZone: tz.toUpperCase() as TimeZone,
          })),
        },
        treatment,
        nextVisit: nextVisit ? new Date(nextVisit) : null,
      },
    });

    return NextResponse.json(
      { message: "記録を保存しました。" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 });
  }
};


export type RecordResponse = {
  records: {
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
  }[]
}

// 記録（一覧）情報取得
///////////////////
export const GET = async (request: Request) => {
  const token = request.headers.get("Authorization") ?? "";
  const { data, error } = await supabase.auth.getUser(token);
  if (error)
    return NextResponse.json({ status: error.message }, { status: 401 });

  // 絞り込み機能
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const type = url.searchParams.get("type");
  const period = url.searchParams.get("period");

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

    // 絞り込み機能
    const where: Prisma.RecordWhereInput = { userId }
    if (category) {
      where.recordCategories = { some: {categoryId: Number(category)}}
    }
    if (type) {
      where.recordType = convertRecordType(type as RecordCategoryType)
    }
    if (period === "1month") {
      where.recordAt = { gte: subMonths(new Date(), 1) }
    }
    if (period === "2weeks") {
      where.recordAt = { gte: subWeeks(new Date(), 2) }
    }
    if (period === "2months") {
      where.recordAt = { gte: subMonths(new Date(), 2) }
    }
    if (period === "3months") {
      where.recordAt = { gte: subMonths(new Date(), 3) }
    }
    if (period === "thisYear") {
      where.recordAt = { gte: startOfYear(new Date()) }
    }
    if (period === "lastYear") {
      where.recordAt = { 
        gte: startOfYear(subYears(new Date(), 1)),
        lte: endOfYear(subYears(new Date(), 1))
      }
    }

    // 記録データ取得
    const getRecords = await prisma.record.findMany({
      where,
      include: {
        recordCategories: true,
        recordTimeZones: true
      },
      orderBy: {
        recordAt: "desc"
      },
    })

    return NextResponse.json<RecordResponse>({ records: getRecords}, {status: 200})


  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 });
  }
};
