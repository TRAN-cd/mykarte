import { createClient } from "@supabase/supabase-js";

export const supabase = createClient (
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // 管理者権限ではない、ユーザー自身の権限
)