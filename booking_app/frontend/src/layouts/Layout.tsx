import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import { useLocation } from "react-router-dom";

interface Props {
    children: React.ReactNode;
}

const Layout = ({children}: Props) => {

    const location = useLocation(); // Get the current location

    // Check if the current location is not the home page
    const isNotHomePage = location.pathname !== "/";

    return (
    <div className="flex flex-col min-h-screen">
            <Header />
            <Hero />
        { isNotHomePage &&
        <div className="container mx-auto">
            <SearchBar/>
        </div>
        }
        <div className="container mx-auto py-10 flex-1">
            {children}
        </div>
        <Footer />
        
    </div>
    );
};

export default Layout;