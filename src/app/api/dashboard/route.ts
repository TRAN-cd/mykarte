import { prisma } from "@/app/_libs/prisma";
import { supabase } from "@/app/_libs/supabase";
import { NextResponse } from "next/server";
import { startOfMonth, endOfMonth, subMonths } from "date-fns";

export type DashboardResponse = {
  thisMonthCount: number,
  lastMonthCount: number,
  visitCount: number
}

// 今月のサマリー取得
///////////////////
export const GET = async (request: Request) => {
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

    // テーブルの範囲設定
    const thisMonthWhere = {
      userId,
      recordAt: {
        gte: startOfMonth(new Date()),
        lte: endOfMonth(new Date()),
      },
    };
    const lastMonthWhere = {
      userId,
      recordAt: {
        gte: startOfMonth(subMonths(new Date(), 1)),
        lte: endOfMonth(subMonths(new Date(), 1)),
      },
    };

    const [thisMonthCount, lastMonthCount, visitCount] = await Promise.all([
      prisma.record.count({ where: thisMonthWhere }),
      prisma.record.count({ where: lastMonthWhere }),
      prisma.record.count({
        where: { ...thisMonthWhere, recordType: "MEDICAL" },
      }),
    ]);

    return NextResponse.json<DashboardResponse>(
      { thisMonthCount, lastMonthCount, visitCount },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 });
  }
};
