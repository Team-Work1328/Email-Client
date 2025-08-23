"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <Card className="p-6 shadow-md rounded-2xl">
      <CardContent>
        <h1 className="text-2xl font-bold">Welcome to T3 App!</h1>
        <p className="mt-4">
          This is a starter template for your Next.js project. You can start
          editing the code in <code>src/app/page.tsx</code>.
        </p>
        <Button className="mt-6" onClick={() => alert("Hello, T3 App!")}>
          Click me
        </Button>
      </CardContent>
    </Card>
  );
}
