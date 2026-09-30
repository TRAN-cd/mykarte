import { prisma } from "@/app/_libs/prisma";
import { supabase } from "@/app/_libs/supabase";
import { NextResponse } from "next/server";
import { startOfMonth, endOfMonth, subMonths } from "date-fns";

export type DashboardResponse = {
  thisMonthCount: number;
  lastMonthCount: number;
  visitCount: number;
  records: {
    id: number;
    recordAt: Date;
    content: string;
    recordCategories: {
      id: number;
      categoryId: number;
      categories: {
        id: number;
        name: string;
      };
    }[];
  }[];
  analysisData: {
    _count: number,
    categoryId: number,
    name: string | undefined,
    percentage: number,
    diffFromLastMonth: number
  }[];
};

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

    // 今月のサマリー
    const [thisMonthCount, lastMonthCount, visitCount] = await Promise.all([
      prisma.record.count({ where: thisMonthWhere }),
      prisma.record.count({ where: lastMonthWhere }),
      prisma.record.count({
        where: { ...thisMonthWhere, recordType: "MEDICAL" },
      }),
    ]);

    // 最近の記録取得
    const recentRecords = await prisma.record.findMany({
      where: { userId },
      include: {
        recordCategories: {
          include: { categories: true },
        },
      },
      orderBy: {
        recordAt: "desc",
      },
      take: 5,
    });

    // カテゴリー分析
    const [
      grouped, //全期間のカテゴリー別件数
      thisMonthCategoryCount, //今月のカテゴリー別件数
      lastMonthCategoryCount, //先月のカテゴリー別件数
      categories, //カテゴリー名一覧
      totalRecordCount, //全記録数
    ] = await Promise.all([
      prisma.recordCategory.groupBy({
        by: ["categoryId"],
        where: { record: { userId } },
        orderBy: {
          _count: {
            categoryId: "desc",
          },
        },
        _count: true,
        take: 3,
      }),
      prisma.recordCategory.groupBy({
        by: ["categoryId"],
        where: { record: thisMonthWhere },
        _count: true,
      }),
      prisma.recordCategory.groupBy({
        by: ["categoryId"],
        where: { record: lastMonthWhere },
        _count: true,
      }),
      prisma.category.findMany({
        where: { userId },
      }),
      prisma.record.count({
        where: { userId },
      }),
    ]);

    const analysisData = grouped.map((g) => {
      const thisMonthCount = thisMonthCategoryCount.find((c) => c.categoryId === g.categoryId)?._count || 0;
      const lastMonthCount = lastMonthCategoryCount.find((c) => c.categoryId === g.categoryId)?._count || 0;
    
      return {
        ...g,
        name: categories.find((c) => c.id === g.categoryId)?.name,
        percentage: Math.round((g._count / totalRecordCount) * 100),
        diffFromLastMonth: thisMonthCount - lastMonthCount,
      };
    })

    return NextResponse.json<DashboardResponse>(
      { thisMonthCount, lastMonthCount, visitCount, records: recentRecords, analysisData },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 });
  }
};
