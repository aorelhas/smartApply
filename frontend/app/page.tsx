"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [ping, setPing] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/ping")
      .then((res) => res.json())
      .then((data) => setPing(data.status))
      .catch(() => setPing("error"));
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold">Backend Status: {ping}</h1>
    </main>
  );
}
