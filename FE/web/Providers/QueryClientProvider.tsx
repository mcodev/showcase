"use client"; // Required because it's a client component

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function ReactQueryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity, // Prevents automatic re-fetching
            refetchOnMount: false, // Prevents refetch when mounting
            refetchOnReconnect: false, // Prevents refetch on network reconnect
            refetchOnWindowFocus: false, // Prevents refetch when switching tabs
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
