import { supabase } from "./supabase"

const getAccessToken = async () => {
  const { data } = await supabase.auth.getSession()
  return data.session?.access_token ?? null
}

export const apiFetch = {
  // POST
  post: async <RequestType, ResponseType>(
    endpoint: string,
    payload: RequestType
  ) => {
    try {
      const token = await getAccessToken()
      if (!token) return null

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || "登録に失敗しました"
        throw new Error(errorMessage)
      }

      const data: ResponseType  = await response.json()

      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  // PUT
  put: async <RequestType, ResponseType>(
    endpoint: string,
    payload: RequestType
  ) => {
    try {
      const token = await getAccessToken()
      if (!token) return null

      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || "更新に失敗しました"
        throw new Error(errorMessage)
      }

      const data: ResponseType  = await response.json()

      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  // DELETE
  del: async <ResponseType>(
    endpoint: string,
  ) => {
    try {
      const token = await getAccessToken()
      if (!token) return null

      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || "削除に失敗しました"
        throw new Error(errorMessage)
      }

      const data: ResponseType  = await response.json()

      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}