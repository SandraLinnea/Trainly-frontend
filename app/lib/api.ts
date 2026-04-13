const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim()

export function getApiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  const localhostFallback =
    typeof window !== "undefined" && window.location.hostname === "localhost"
      ? "http://localhost:3001"
      : ""
  const baseUrl =
    configuredApiUrl?.replace(/\/$/, "") ?? localhostFallback

  return `${baseUrl}${normalizedPath}`
}

export async function readApiError(response: Response, fallback: string) {
  try {
    const data = (await response.json()) as {
      message?: unknown
      error?: unknown
    }

    const candidate = data.message ?? data.error

    if (typeof candidate === "string") {
      return candidate
    }

    if (
      candidate &&
      typeof candidate === "object" &&
      "message" in candidate &&
      typeof (candidate as { message?: unknown }).message === "string"
    ) {
      return (candidate as { message: string }).message
    }

    return fallback
  } catch {
    return fallback
  }
}
