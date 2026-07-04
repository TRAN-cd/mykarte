'use client'

import Image from "next/image"
import Link from "next/link"

export default function Page() {

  return (
    <div className="flex flex-col max-w-208 w-full mx-auto pt-25 px-5">
      <section className="relative z-2">
        <div className="lead">
          <h2 className="text-2xl font-bold pb-3">利用規約</h2>
          <p className="text-(--color-sub) text-[13px] pb-12">制定日：2026年6月5日</p>
          <p className="text-sm pb-9 border-b border-(--color-sub)/20">myカルテ（以下「当社」といいます。）は、当社の提供するサービス「myカルテ」（以下「本サービス」といいます。）の利用条件を、以下のとおり定めます。</p>
        </div>
        <div className="index bg-white border border-(--color-sub) rounded-[10px] p-6 flex flex-col gap-4 mb-12">
          <div className="flex items-center gap-1.5">
            <Image src="/images/shared/icon_index.svg" width={14} height={14} alt="" />
            <p className="text-[13px] text-(--color-sub) leading-none">目次</p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-(--color-link) [&_a]:hover:opacity-70 [&_a]:duration-300">
            <Link href="#article-1">第1条　適用</Link>
            <Link href="#article-2">第2条　利用登録</Link>
            <Link href="#article-3">第3条　アカウントの管理</Link>
            <Link href="#article-4">第4条　禁止事項</Link>
            <Link href="#article-5">第5条　免責事項</Link>
            <Link href="#article-6">第6条　サービスの変更・停止</Link>
            <Link href="#article-7">第7条　退会</Link>
            <Link href="#article-8">第8条　規約の変更</Link>
            <Link href="#article-9">第9条　準拠法・裁判管轄</Link>
            <Link href="#article-10">お問い合わせ窓口</Link>
          </div>
        </div>
      </section>

      <div className="relative z-1 flex flex-col gap-9 mb-25">
        <section id="article-1" className="pt-25 -mt-25">
          <div className="flex items-center gap-3 pb-3 border-b border-(--color-primary)">
            <p className="font-en text-xs text-(--color-primary) bg-(--color-bg) w-6 h-6 flex justify-center items-center rounded-[50%]">1</p>
            <h3>適用</h3>
          </div>
          <div className="pt-6 flex flex-col gap-3">
            <p className="leading-7">本規約は、ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。</p>
          </div>
        </section>
        <section id="article-2" className="pt-25 -mt-25">
          <div className="flex items-center gap-3 pb-3 border-b border-(--color-primary)">
            <p className="font-en text-xs text-(--color-primary) bg-(--color-bg) w-6 h-6 flex justify-center items-center rounded-[50%]">2</p>
            <h3>利用登録</h3>
          </div>
          <div className="pt-6 flex flex-col gap-3">
            <p className="leading-7 pl-[2em] indent-[-2em]">１．本サービスへの登録を希望する方は、本規約に同意の上、当社の定める方法によって利用登録を申請するものとします。</p>
            <p className="leading-7 pl-[2em] indent-[-2em]"> ２．当社は、利用登録の申請者に以下の事由があると判断した場合、利用登録を拒否することがあります。</p>
            <ul className="flex flex-col gap-2 pl-4 leading-7">
              <li className="pl-[1em] indent-[-1em]">a. 虚偽の事項を届け出た場合</li>
              <li className="pl-[1em] indent-[-1em]">b. 本規約に違反したことがある者からの申請である場合</li>
              <li className="pl-[1em] indent-[-1em]">c. その他、当社が利用登録を相当でないと判断した場合</li>
            </ul>
          </div>
        </section>
        <section id="article-3" className="pt-25 -mt-25">
          <div className="flex items-center gap-3 pb-3 border-b border-(--color-primary)">
            <p className="font-en text-xs text-(--color-primary) bg-(--color-bg) w-6 h-6 flex justify-center items-center rounded-[50%]">3</p>
            <h3>アカウントの管理</h3>
          </div>
          <div className="pt-6 flex flex-col gap-3">
            <p className="leading-7 pl-[2em] indent-[-2em]">１．ユーザーは、自己の責任においてアカウント情報を管理するものとします。</p>
            <p className="leading-7 pl-[2em] indent-[-2em]">２．ユーザーは、アカウント情報を第三者に譲渡・貸与・共有することはできません。</p>
            <p className="leading-7 pl-[2em] indent-[-2em]">３．アカウント情報の管理不十分または第三者による不正利用によって生じた損害について、当社は一切の責任を負いません。</p>
          </div>
        </section>
        <section id="article-4" className="pt-25 -mt-25">
          <div className="flex items-center gap-3 pb-3 border-b border-(--color-primary)">
            <p className="font-en text-xs text-(--color-primary) bg-(--color-bg) w-6 h-6 flex justify-center items-center rounded-[50%]">4</p>
            <h3>禁止事項</h3>
          </div>
          <div className="pt-6 flex flex-col gap-3">
            <p className="leading-7">ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません。</p>
            <ul className="flex flex-col gap-2 pl-2 leading-7">
              <li className="pl-[1em] indent-[-1em]">（1）法令または公序良俗に違反する行為</li>
              <li className="pl-[1em] indent-[-1em]">（2）他のユーザーへのなりすまし</li>
              <li className="pl-[1em] indent-[-1em]">（3）当社のサーバーまたはネットワークへの不正アクセス</li>
              <li className="pl-[1em] indent-[-1em]">（4）本サービスの運営を妨害するおそれのある行為</li>
              <li className="pl-[1em] indent-[-1em]">（5）その他、当社が不適切と判断する行為</li>
            </ul>
          </div>
        </section>
        <section id="article-5" className="pt-25 -mt-25">
          <div className="flex items-center gap-3 pb-3 border-b border-(--color-primary)">
            <p className="font-en text-xs text-(--color-primary) bg-(--color-bg) w-6 h-6 flex justify-center items-center rounded-[50%]">5</p>
            <h3>免責事項</h3>
          </div>
          <div className="flex flex-col gap-6 pt-6">
            <p className="leading-7 pl-[2em] indent-[-2em]">１．本サービスは、ユーザー個人が健康情報を記録・管理することを目的としたサービスです。医療行為・医療アドバイスの提供を目的とするものではありません。</p>
            <p className="leading-7 pl-[2em] indent-[-2em]">２．本サービスに記録された情報を医療上の判断の根拠として利用したことによって生じた損害について、当社は一切の責任を負いません。体調の異変や疾病に関しては、必ず医療機関にご相談ください。</p>
            <p className="leading-7 pl-[2em] indent-[-2em]">３．当社は、本サービスの内容の正確性・完全性を保証するものではありません。</p>
          </div>
        </section>
        <section id="article-6" className="pt-25 -mt-25">
          <div className="flex items-center gap-3 pb-3 border-b border-(--color-primary)">
            <p className="font-en text-xs text-(--color-primary) bg-(--color-bg) w-6 h-6 flex justify-center items-center rounded-[50%]">6</p>
            <h3>サービスの変更・停止</h3>
          </div>
          <div className="flex flex-col gap-6 pt-6">
            <p className="leading-7">当社は、ユーザーへの事前通知なく、本サービスの内容を変更し、または提供を停止することができるものとします。これによってユーザーに生じた損害について、当社は一切の責任を負いません。</p>
          </div>
        </section>
        <section id="article-7" className="pt-25 -mt-25">
          <div className="flex items-center gap-3 pb-3 border-b border-(--color-primary)">
            <p className="font-en text-xs text-(--color-primary) bg-(--color-bg) w-6 h-6 flex justify-center items-center rounded-[50%]">7</p>
            <h3>退会</h3>
          </div>
          <div className="flex flex-col gap-3 pt-6">
            <p className="leading-7 pl-[2em] indent-[-2em]">ユーザーは、当社の定める退会手続きにより、いつでも本サービスを退会できるものとします。</p>
          </div>
        </section>
        <section id="article-8" className="pt-25 -mt-25">
          <div className="flex items-center gap-3 pb-3 border-b border-(--color-primary)">
            <p className="font-en text-xs text-(--color-primary) bg-(--color-bg) w-6 h-6 flex justify-center items-center rounded-[50%]">8</p>
            <h3>規約の変更</h3>
          </div>
          <div className="flex flex-col gap-3 pt-6">
            <p className="leading-7">当社は、必要と判断した場合には、ユーザーへの通知なく本規約を変更することができるものとします。変更後の規約は、本ウェブサイトに掲載した時点から効力を生じるものとします。</p>
          </div>
        </section>
        <section id="article-9" className="pt-25 -mt-25">
          <div className="flex items-center gap-3 pb-3 border-b border-(--color-primary)">
            <p className="font-en text-xs text-(--color-primary) bg-(--color-bg) w-6 h-6 flex justify-center items-center rounded-[50%]">9</p>
            <h3>準拠法・裁判管轄</h3>
          </div>
          <div className="flex flex-col gap-3 pt-6">
            <p className="leading-7">本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して生じた紛争については、当社所在地を管轄する裁判所を専属的合意管轄とします。</p>
          </div>
        </section>
        <section id="article-10" className="pt-25 -mt-25">
          <div className="flex items-center gap-3 pb-3 border-b border-(--color-primary)">
            <p className="font-en text-xs text-(--color-primary) bg-(--color-bg) w-6 h-6 flex justify-center items-center rounded-[50%]">10</p>
            <h3>お問い合わせ窓口</h3>
          </div>
          <div className="flex flex-col gap-3 pt-6">
            <div className="flex flex-col gap-6 bg-white p-6 rounded-[10px] border border-(--color-sub)">
              <dl className="flex gap-10 pb-3 border-b border-(--color-sub)/20">
                <dt className="flex gap-2.25 w-37">
                  <Image src="/images/shared/icon_office.svg" alt="" width={24} height={24} />
                  <p className="text-(--color-sub)">事業者名</p>
                </dt>
                <dd>ダミー</dd>
              </dl>
              <dl className="flex gap-10 pb-3 border-b border-(--color-sub)/20">
                <dt className="flex gap-2.25 w-37">
                  <Image src="/images/shared/icon_place.svg" alt="" width={24} height={24} />
                  <p className="text-(--color-sub)">所在地</p>
                </dt>
                <dd>ダミー</dd>
              </dl>
              <dl className="flex gap-10 pb-3 border-b border-(--color-sub)/20">
                <dt className="flex gap-2.25 w-37">
                  <Image src="/images/shared/icon_mail.svg" alt="" width={24} height={24} />
                  <p className="text-(--color-sub)">メールアドレス</p>
                </dt>
                <dd>champagne1120@gmail.com</dd>
              </dl>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}