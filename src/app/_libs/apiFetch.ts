export const apiFetch = async (
  url: string,
  method: string,
  token: string | null,
  body?: string | null
) => {
  if (!token) return null

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body,
    })

    return response
  } catch (error) {
    console.log("エラー", error);
    return null
  }
}