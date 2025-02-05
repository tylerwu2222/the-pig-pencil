"use client";
// import { usePathname } from "next/navigation";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Layout({ children }: { children: React.ReactNode }) {
  // const pathname = usePathname();
  // const hideNavbarRoutes = ['/me', '/multimedia/specific-article'];

  // console.log('section pn', pathname)

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        {/* {hideNavbarRoutes.includes(pathname) ? <></> : <Navbar />} */}
        <Navbar />
        {children}
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
