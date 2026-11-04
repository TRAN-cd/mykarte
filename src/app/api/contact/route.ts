import { prisma } from "@/app/_libs/prisma";
import { supabase } from "@/app/_libs/supabase";
import { NextResponse } from "next/server";
import { resend } from "@/app/_libs/resend";

export type ContactRequestBody = {
  name: string;
  email: string;
  content: string;
};

export const POST = async (request: Request) => {
  const token = request.headers.get("Authorization") ?? "";
  const { data, error } = await supabase.auth.getUser(token);

  let userId: number | null = null;

  try {
    if (!error && data.user) {
      const dbUser = await prisma.user.findUnique({
        where: {
          supabaseUserId: data.user.id,
        },
      });
      if (dbUser) {
        userId = dbUser.id;
      }
    }

    const body = await request.json();
    const { name, email, content }: ContactRequestBody = body;

    if (!name)
      return NextResponse.json(
        { message: "お名前を入力してください。" },
        { status: 400 }
      );
    if (!email)
      return NextResponse.json(
        { message: "メールアドレスを入力してください。" },
        { status: 400 }
      );
    if (!content)
      return NextResponse.json(
        { message: "お問い合わせの内容を入力してください。" },
        { status: 400 }
      );

    await prisma.contact.create({
      data: {
        name,
        email,
        content,
        userId,
      },
    });

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["mykartemogu@gmail.com"],
      subject: "【myカルテ】お問い合わせがありました",
      html: `
      <p>以下のお問い合わせがありました。<br>３日以内に内容を確認して、返信してください。</p>
      <p>お名前: ${name}</p>
      <p>メールアドレス: ${email}</p>
      <p>内容: ${content}</p>
      `,
    });

    return NextResponse.json(
      { message: "お問い合わせを受け付けました。" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 });
  }
};
