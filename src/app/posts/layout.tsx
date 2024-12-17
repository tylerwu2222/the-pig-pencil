import Footer from "../components/Footer/Footer";
import NavBar from "../components/Navbar/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            <NavBar />
            <div className="px-4 lg:px-[20%]">{children}</div>
            <Footer />
        </div>
    );
}