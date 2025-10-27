// components/DirectionWrapper.tsx
"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function DirectionWrapper({ children }: { children: React.ReactNode }) {

    const [queryClient] = useState(() => new QueryClient());

    return (
        <html lang="en">

            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </html>
    );
}
