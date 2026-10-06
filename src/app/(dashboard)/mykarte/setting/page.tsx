'use client'

import { PageHeader } from "@/app/_components/PageHeader"
import { SettingCard } from "@/app/_components/setting/SettingCard";


export default function Setting() {

  return (
    <div className="px-6 py-5 w-full">
      <PageHeader pageTitle="設定" />

      <div className="flex flex-col gap-9">
        <div className="bg-white border border-(--color-sub)/20 rounded-[10px] p-5 pb-2 max-w-121 w-full">
          <h3 className="text-[13px] font-medium pb-2.5">アカウント</h3>

          <SettingCard
            href="/mykarte/settings/account_info"
            iconPath="/images/shared/icon_setting_user.svg"
            label="アカウント情報変更"
            description="メールアドレス・パスワード変更"
          />
        </div>
        <div className="bg-white border border-(--color-sub)/20 rounded-[10px] p-5 pb-2 max-w-121 w-full">
          <h3 className="text-[13px] font-medium pb-2.5">その他</h3>

          <SettingCard
            href="/user_policy"
            iconPath="/images/shared/icon_setting_policy.svg"
            label="利用規約"
            description="サービスの利用条件"
          />
          <SettingCard
            href="/privacy"
            iconPath="/images/shared/icon_setting_privacy.svg"
            label="プライバシーポリシー"
            description="個人情報の取り扱いについて"
          />
          <SettingCard
            href="/contact"
            iconPath="/images/shared/icon_setting_contact.svg"
            label="お問い合わせ"
            description="ご意見・ご要望・不具合の報告"
          />
        </div>
        <div className="bg-white border border-(--color-sub)/20 rounded-[10px] p-5 pb-2 max-w-121 w-full">
          <h3 className="text-[13px] font-medium pb-2.5">アカウント削除</h3>

          <SettingCard
            variant="danger"
            href="/mykarte/settings/unsubscribe"
            iconPath="/images/shared/icon_setting_unsubscribe.svg"
            label="アカウント削除"
            description="退会"
          />
        </div>
      </div>
    </div>
  )
}