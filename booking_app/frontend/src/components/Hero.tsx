import React from "react";
import { useLocation } from "react-router-dom";
import falesiaImage from "../../../images/falesia.jpg"
import SearchBar from "./SearchBar";
import Typewriter from "../effects/Typewriter";

const Hero: React.FC = () => {

    const location = useLocation();

    // Check if the current location pathname matches the homepage path
    const isCurrentPageHomePage = location.pathname === "/";

    // Check if the current location is not the home page
        // Render regular background for other pages

        


        if(isCurrentPageHomePage){
            return (
                    <div style={{ position: "relative", overflow: "hidden", maxHeight: "600px"}}>
                        <img src={falesiaImage} style={{ width: "100%" }} alt="Falesia" />
                        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 100, 0.5)" }}></div>
                        <div className="container mx-auto" style={{ position: "absolute", top: "60%", left: "50%", transform: "translate(-50%, -50%)" }}>
                            <h1 className="text-5xl text-white font-bold mb-4 ${isVisible ? 'opacity-100' : 'opacity-0 transition-opacity duration-1000'}`">
                                <Typewriter text="Find your next stay" delay={80} />
                            </h1>
                            <p className="text-2xl text-white mb-28">
                            <Typewriter text="Search low prices on hotels for your dream vacation..." delay={30} /> 
                            </p>
                            {/* Assuming SearchBar is a valid component */}
                            <SearchBar />
                            <div className="text-white"  style={{ position: "absolute", top: "130%"}}>
                            Photo: <u>Praia da Falésia, Albufeira, Algarve</u>
                        </div>
                        </div>
                    </div>
            );

        } else {
            
        return (
            <div className="bg-blue-800 pb-16">
                <div className="container mx-auto flex flex-col gap-2">
                    <h1 className="text-5xl text-white font-bold">
                        Find your next stay
                    </h1>
                    <p className="text-2xl text-white">
                        Search low prices on hotels for your dream vacation...
                    </p>
                </div>
            </div>
        );
        }

};

export default Hero;
