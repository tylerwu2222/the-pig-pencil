"use client";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="">
        <Navbar />
        <div className="px-1">{children}</div>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
