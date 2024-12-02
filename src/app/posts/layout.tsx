import NavBar from "../components/NavBar/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            <NavBar />
            <div className="px-4 lg:px-[20%]">{children}</div>
        </div>
    );
}