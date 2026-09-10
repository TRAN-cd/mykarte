import { prisma } from "@/app/_libs/prisma";
import { supabase } from "@/app/_libs/supabase";
import { NextRequest, NextResponse } from "next/server";
import { RecordType, TimeZone } from "@/generated/prisma/enums";



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
  }
}


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
        { message: "ユーザー情報がありません" },
        { status: 404 }
      );
    const userId = dbUser.id;

    // 記録データ取得
    const getRecord = await prisma.record.findFirst({
      where: {
        userId,
        id: parseInt(id)
      },
      include: {
        recordCategories: true,
        recordTimeZones: true
      },
    })
    if (!getRecord) 
      return NextResponse.json(
        { message: "該当の記録がありません" },
        { status: 404 }
      );

    return NextResponse.json<RecordDetailResponse>({ record: getRecord}, {status: 200})
    

  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 });
  }
};
