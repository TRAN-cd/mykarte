'use client'

import Image from "next/image"
import Link from "next/link"

export default function Page() {

  return (
    <div className="flex flex-col max-w-208 w-full mx-auto pt-25 px-5">
      <section className="relative z-2">
        <div className="lead">
          <h2 className="text-2xl font-bold pb-3">プライバシーポリシー</h2>
          <p className="text-(--color-sub) text-[13px] pb-12">制定日：2026年6月5日</p>
          <p className="text-sm pb-9 border-b border-(--color-sub)/20">myカルテ（以下「当社」といいます。）は、当社の提供するサービス（以下「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます。）を定めます。</p>
        </div>
        <div className="index bg-white border border-(--color-sub) rounded-[10px] p-6 flex flex-col gap-4 mb-12">
          <div className="flex items-center gap-1.5">
            <Image src="/images/shared/icon_index.svg" width={14} height={14} alt="" />
            <p className="text-[13px] text-(--color-sub) leading-none">目次</p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-(--color-link) [&_a]:hover:opacity-70 [&_a]:duration-300">
            <Link href="#article-1">第1条　個人情報</Link>
            <Link href="#article-2">第2条　個人情報の収集方法</Link>
            <Link href="#article-3">第3条　個人情報を収集・利用する目的</Link>
            <Link href="#article-4">第4条　利用目的の変更</Link>
            <Link href="#article-5">第5条　個人情報の第三者提供</Link>
            <Link href="#article-6">第6条　個人情報の開示</Link>
            <Link href="#article-7">第7条　個人情報の訂正および削除</Link>
            <Link href="#article-8">第8条　個人情報の利用停止等</Link>
            <Link href="#article-9">第9条　Cookie等の技術の利用</Link>
            <Link href="#article-10">第10条　プライバシーポリシーの変更</Link>
            <Link href="#article-11">お問い合わせ窓口</Link>
          </div>
        </div>
      </section>

      <div className="relative z-1 flex flex-col gap-9 mb-25">
        <section id="article-1" className="pt-25 -mt-25">
          <div className="flex items-center gap-3 pb-3 border-b border-(--color-primary)">
            <p className="font-en text-xs text-(--color-primary) bg-(--color-bg) w-6 h-6 flex justify-center items-center rounded-[50%]">1</p>
            <h3>個人情報</h3>
          </div>
          <div className="pt-6 flex flex-col gap-3">
            <p className="leading-7">「個人情報」とは、個人情報の保護に関する法律（以下「個人情報保護法」といいます。）にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報及び容貌、指紋、声紋にかかるデータ、及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。</p>
          </div>
        </section>
        <section id="article-2" className="pt-25 -mt-25">
          <div className="flex items-center gap-3 pb-3 border-b border-(--color-primary)">
            <p className="font-en text-xs text-(--color-primary) bg-(--color-bg) w-6 h-6 flex justify-center items-center rounded-[50%]">2</p>
            <h3>個人情報の収集方法</h3>
          </div>
          <div className="pt-6 flex flex-col gap-3">
            <p className="leading-7">当社は、ユーザーが利用登録をする際にメールアドレスをお尋ねします。また、サービス利用中にユーザーが入力した健康記録データを収集します。</p>
            <p className="leading-7">当社が収集する主な個人情報は以下のとおりです。</p>
            <ul className="list-disc pl-6 leading-7">
              <li>メールアドレス</li>
              <li>端末情報（IPアドレス、Cookie情報、利用環境など）</li>
              <li>ユーザーが入力した健康記録（体調メモ、症状、診察内容、服薬情報など）</li>
            </ul>
          </div>
        </section>
        <section id="article-3" className="pt-25 -mt-25">
          <div className="flex items-center gap-3 pb-3 border-b border-(--color-primary)">
            <p className="font-en text-xs text-(--color-primary) bg-(--color-bg) w-6 h-6 flex justify-center items-center rounded-[50%]">3</p>
            <h3>個人情報を収集・利用する目的</h3>
          </div>
          <div className="pt-6 flex flex-col gap-3">
            <p className="leading-7">当社が個人情報を収集・利用する目的は、以下のとおりです。</p>
            <ul className="list-decimal pl-6 leading-7">
              <li>本サービスの提供・運営のため</li>
              <li>お問い合わせへの対応のため（本人確認を含む）</li>
              <li>メンテナンス、重要なお知らせなど必要に応じたご連絡のため</li>
              <li>利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をし、ご利用をお断りするため</li>
              <li>サービスの改善、新サービスの開発等に役立てるため</li>
            </ul>
          </div>
        </section>
        <section id="article-4" className="pt-25 -mt-25">
          <div className="flex items-center gap-3 pb-3 border-b border-(--color-primary)">
            <p className="font-en text-xs text-(--color-primary) bg-(--color-bg) w-6 h-6 flex justify-center items-center rounded-[50%]">4</p>
            <h3>利用目的の変更</h3>
          </div>
          <div className="pt-6 flex flex-col gap-3">
            <ul className="list-none leading-7">
              <li className="pl-[2em] indent-[-2em]">１．当社は、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。</li>
              <li className="pl-[2em] indent-[-2em]">２．利用目的の変更を行った場合には、変更後の目的について、当社所定の方法により、ユーザーに通知し、または本ウェブサイト上に公表するものとします。</li>
            </ul>
          </div>
        </section>
        <section id="article-5" className="pt-25 -mt-25">
          <div className="flex items-center gap-3 pb-3 border-b border-(--color-primary)">
            <p className="font-en text-xs text-(--color-primary) bg-(--color-bg) w-6 h-6 flex justify-center items-center rounded-[50%]">5</p>
            <h3>個人情報の第三者提供</h3>
          </div>
          <div className="flex flex-col gap-6 pt-6">
            <div className="flex flex-col gap-3">
              <p className="leading-7 pl-[2em] indent-[-2em]">１．当社は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。</p>
              <ul className="flex flex-col gap-2 pl-4 leading-7">
                <li className="pl-[1em] indent-[-1em]">a. 人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき</li>
                <li className="pl-[1em] indent-[-1em]">b. 公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき</li>
                <li className="pl-[1em] indent-[-1em]">c. 国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合</li>
              </ul>
            </div>
            <p className="leading-7 pl-[2em] indent-[-2em]">２．前項の定めにかかわらず、当社は、サービスの運営・提供のため、以下の事業者に個人情報の取扱いを委託します。委託先に対しては、適切な監督を行います。</p>
            <div className="flex flex-col gap-6 bg-(--color-bg) p-6 rounded-[0_5px_5px_0] border-l-4 border-(--color-primary)">
              <div className="flex flex-col gap-3">
                <p className="font-bold"><span className="font-en ">Supabase, Inc.</span>（米国）</p>
                <div>
                  <dl className="flex">
                    <dt>委託内容：</dt>
                    <dd>データベースの管理・認証機能の提供</dd>
                  </dl>
                  <dl className="flex">
                    <dt>取り扱うデータ：</dt>
                    <dd>メールアドレス、健康記録データ</dd>
                  </dl>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-bold"><span className="font-en ">Vercel Inc.</span>（米国）</p>
                <div>
                  <dl className="flex">
                    <dt>委託内容：</dt>
                    <dd>Webアプリケーションのホスティング</dd>
                  </dl>
                  <dl className="flex">
                    <dt>取り扱うデータ：</dt>
                    <dd>アクセスログ</dd>
                  </dl>
                </div>
              </div>
              <p className="leading-7">なお、Google・Appleのソーシャルログインを利用する場合、各社のプライバシーポリシーに従いアカウント情報が連携されます。</p>
            </div>
          </div>
        </section>
        <section id="article-6" className="pt-25 -mt-25">
          <div className="flex items-center gap-3 pb-3 border-b border-(--color-primary)">
            <p className="font-en text-xs text-(--color-primary) bg-(--color-bg) w-6 h-6 flex justify-center items-center rounded-[50%]">6</p>
            <h3>個人情報の開示</h3>
          </div>
          <div className="flex flex-col gap-6 pt-6">
            <div className="flex flex-col gap-3">
              <p className="leading-7 pl-[2em] indent-[-2em]">１．当社は、本人から個人情報の開示を求められたときは、本人に対し、遅滞なくこれを開示します。ただし、開示することにより次のいずれかに該当する場合は、その全部または一部を開示しないこともあります。</p>
              <ul className="flex flex-col gap-2 pl-4 leading-7">
                <li className="pl-[1em] indent-[-1em]">a. 本人または第三者の生命、身体、財産その他の権利利益を害するおそれがある場合</li>
                <li className="pl-[1em] indent-[-1em]">b. 当社の業務の適正な実施に著しい支障を及ぼすおそれがある場合</li>
                <li className="pl-[1em] indent-[-1em]">c. その他法令に違反することとなる場合</li>
              </ul>
            </div>
            <p className="leading-7 pl-[2em] indent-[-2em]">２．前項の定めにかかわらず、履歴情報および特性情報などの個人情報以外の情報については、原則として開示いたしません。</p>
          </div>
        </section>
        <section id="article-7" className="pt-25 -mt-25">
          <div className="flex items-center gap-3 pb-3 border-b border-(--color-primary)">
            <p className="font-en text-xs text-(--color-primary) bg-(--color-bg) w-6 h-6 flex justify-center items-center rounded-[50%]">7</p>
            <h3>個人情報の訂正および削除</h3>
          </div>
          <div className="flex flex-col gap-3 pt-6">
            <p className="leading-7 pl-[2em] indent-[-2em]">１．ユーザーは、当社の保有する自己の個人情報が誤った情報である場合には、当社が定める手続きにより、当社に対して個人情報の訂正、追加または削除（以下「訂正等」といいます。）を請求することができます。</p>
            <p className="leading-7 pl-[2em] indent-[-2em]">２．当社は、ユーザーから前項の請求を受けてその請求に応じる必要があると判断した場合には、遅滞なく、当該個人情報の訂正等を行うものとします。</p>
            <p className="leading-7 pl-[2em] indent-[-2em]">３．当社は、前項の規定に基づき訂正等を行った場合、または訂正等を行わない旨の決定をしたときは遅滞なく、これをユーザーに通知します。</p>
          </div>
        </section>
        <section id="article-8" className="pt-25 -mt-25">
          <div className="flex items-center gap-3 pb-3 border-b border-(--color-primary)">
            <p className="font-en text-xs text-(--color-primary) bg-(--color-bg) w-6 h-6 flex justify-center items-center rounded-[50%]">8</p>
            <h3>個人情報の利用停止等</h3>
          </div>
          <div className="flex flex-col gap-3 pt-6">
            <p className="leading-7 pl-[2em] indent-[-2em]">１．当社は、本人から、個人情報が、利用目的の範囲を超えて取り扱われているという理由、または不正の手段により取得されたものであるという理由により、その利用の停止または消去（以下「利用停止等」といいます。）を求められた場合には、遅滞なく必要な調査を行います。</p>
            <p className="leading-7 pl-[2em] indent-[-2em]">２．前項の調査結果に基づき、その請求に応じる必要があると判断した場合には、遅滞なく、当該個人情報の利用停止等を行います。</p>
            <p className="leading-7 pl-[2em] indent-[-2em]">３．当社は、前項の規定に基づき利用停止等を行った場合、または利用停止等を行わない旨の決定をしたときは、遅滞なく、これをユーザーに通知します。</p>
          </div>
        </section>
        <section id="article-9" className="pt-25 -mt-25">
          <div className="flex items-center gap-3 pb-3 border-b border-(--color-primary)">
            <p className="font-en text-xs text-(--color-primary) bg-(--color-bg) w-6 h-6 flex justify-center items-center rounded-[50%]">9</p>
            <h3>Cookie（クッキー）その他の技術の利用</h3>
          </div>
          <div className="flex flex-col gap-3 pt-6">
            <p className="leading-7">当社のサービスは、Cookie及びこれに類する技術を利用することがあります。これらの技術は、当社によるサービスの利用状況等の把握に役立ち、サービス向上に資するものです。Cookieを無効化されたいユーザーは、ウェブブラウザの設定を変更することによりCookieを無効化することができます。但し、Cookieを無効化すると、当社のサービスの一部の機能をご利用いただけなくなる場合があります。</p>
            <div className="flex flex-col gap-6 bg-(--color-bg) p-6 rounded-[0_5px_5px_0] border-l-4 border-(--color-primary)">
              <p className="leading-7">ログイン状態の維持のため、Supabaseが提供する認証機能においてCookieを使用しています。このCookieはサービスの提供に必要なもので、無効にするとログイン機能が正常に動作しない場合があります。</p>
            </div>
          </div>
        </section>
        <section id="article-10" className="pt-25 -mt-25">
          <div className="flex items-center gap-3 pb-3 border-b border-(--color-primary)">
            <p className="font-en text-xs text-(--color-primary) bg-(--color-bg) w-6 h-6 flex justify-center items-center rounded-[50%]">10</p>
            <h3>プライバシーポリシーの変更</h3>
          </div>
          <div className="flex flex-col gap-3 pt-6">
            <p className="leading-7 pl-[2em] indent-[-2em]">１．本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく、変更することができるものとします。</p>
            <p className="leading-7 pl-[2em] indent-[-2em]">２．当社が別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。</p>
          </div>
        </section>
        <section id="article-11" className="pt-25 -mt-25">
          <div className="flex items-center gap-3 pb-3 border-b border-(--color-primary)">
            <p className="font-en text-xs text-(--color-primary) bg-(--color-bg) w-6 h-6 flex justify-center items-center rounded-[50%]">11</p>
            <h3>お問い合わせ窓口</h3>
          </div>
          <div className="flex flex-col gap-3 pt-6">
            <p className="leading-7">本ポリシーに関するお問い合わせ、および個人情報の開示・訂正・利用停止等のご請求は、下記の窓口までお願いいたします。ご本人確認を行った上で、法令に基づき合理的な期間内に対応いたします。なお、手数料は無料です。</p>
            <div className="flex flex-col gap-6 bg-white p-6 rounded-[10px] border border-(--color-sub)">
              <dl className="flex gap-10 pb-3 border-b border-(--color-sub)/20">
                <dt className="flex gap-2.25 w-37">
                  <Image src="/images/shared/icon_office.svg" alt="" width={24} height={24}/>
                  <p className="text-(--color-sub)">事業者名</p>
                </dt>
                <dd>ダミー</dd>
              </dl>
              <dl className="flex gap-10 pb-3 border-b border-(--color-sub)/20">
                <dt className="flex gap-2.25 w-37">
                  <Image src="/images/shared/icon_place.svg" alt="" width={24} height={24}/>
                  <p className="text-(--color-sub)">所在地</p>
                </dt>
                <dd>ダミー</dd>
              </dl>
              <dl className="flex gap-10 pb-3 border-b border-(--color-sub)/20">
                <dt className="flex gap-2.25 w-37">
                  <Image src="/images/shared/icon_mail.svg" alt="" width={24} height={24}/>
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