'use client';

// Required because it's a client component
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // Prevents automatic re-fetching
      refetchOnMount: false, // Prevents refetch when mounting
      refetchOnReconnect: false, // Prevents refetch on network reconnect
      refetchOnWindowFocus: false, // Prevents refetch when switching tabs
    },
  },
});
export default function ReactQueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
