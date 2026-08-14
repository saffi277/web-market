const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1";

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

type Options = {
  method?: string;
  body?: unknown;
  token?: string | null;
  /** Revalidation window in seconds for server-side fetches. */
  revalidate?: number;
};

export async function api<T>(path: string, opts: Options = {}): Promise<T> {
  const { method = "GET", body, token, revalidate } = opts;

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    ...(revalidate !== undefined ? { next: { revalidate } } : { cache: "no-store" }),
  });

  if (res.status === 204) return undefined as T;

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new ApiError(data?.error ?? "تعذّر الاتصال بالخادم", res.status);
  }
  return data as T;
}
