export const handleApiError = (error: unknown, fallbackMessage: string) => {
  if (error instanceof Error) {
    alert(error.message)
  } else {
    alert(fallbackMessage)
  }
}