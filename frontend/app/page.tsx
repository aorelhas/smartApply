"use client";

import { useEffect, useState } from "react";
import { fetchHealth } from "@/lib/api";

export default function Home() {
  const [ping, setPing] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetchHealth()
      .then((data) => setPing(data.status))
      .catch(() => setError(true));
  }, []);

  if (error) {
    return <p>Failed to contact backend 😕</p>;
  }

  if (!ping) {
    return <p>Checking backend status...</p>;
  }

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold">Backend Status: {ping}</h1>
    </main>
  );
}
