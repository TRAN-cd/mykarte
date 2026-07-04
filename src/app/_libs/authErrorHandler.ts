

export const getAuthErrorMessage = (errorCode: string | undefined) => {
  switch (errorCode) {
    case "invalid_credentials":
      return "メールアドレスまたはパスワードが正しくありません。";

    case "over_email_send_rate_limit":
      return "メールの送信回数が上限に達しました。しばらく時間をおいてから再度お試しください。";

    case "email_address_invalid":
      return "有効なメールアドレスを入力してください。";

    case "weak_password":
      return "パスワードが弱すぎます。半角英数字・記号を組み合わせて8字以上で設定してください。";

    case "session_not_found":
      return "セッションが切れました。新規登録から再度お試しください。";

    case "email_address_not_authorized":
      return "メールの送信に失敗しました。しばらく時間をおいてから再度お試しください。";

    case "email_exists":
      return "このメールアドレスはすでに登録されています。";

    case "user_already_exists":
      return "このメールアドレスはすでに登録されています。";

    case "email_not_confirmed":
      return "メールアドレスの確認が完了していません。確認メールをご確認ください。";
    
    case "email_provider_disabled":
      return "入力いただいたメールアドレスとパスワードは使用できません。";
    
    case "flow_state_expired":
      return "セッション期限が切れました。再度、ログインしてください。";

    case "otp_expired":
      return "確認コードの有効期限が切れています。再度、お試しください。";

    case "over_request_rate_limit":
      return "しばらく時間をおいてから、再度お試しください。";
    
    default:
      return "エラーが発生しました。もう一度お試しください。";
  } 
}