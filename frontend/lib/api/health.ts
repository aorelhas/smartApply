import { HealthResponse } from "@/lib/types/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchHealth(): Promise<HealthResponse> {
  const res = await fetch(`${API_URL}/health/ping`);
  if (!res.ok) {
    throw new Error("Failed to fetch health status");
  }
  return res.json();
}
