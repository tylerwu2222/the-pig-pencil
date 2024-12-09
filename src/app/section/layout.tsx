// import { usePathname } from "next/navigation";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {

    // const pathname = usePathname();
    // const hideNavbarRoutes = ['/me', '/multimedia/specific-article'];

    // console.log('section pn', pathname)

    return (
        <div>
            {/* {hideNavbarRoutes.includes(pathname) ? <></> : <NavBar />} */}
            <NavBar />
            {children}
            <Footer />
        </div>
    );
}