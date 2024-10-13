import React, { useEffect, useState } from "react";
import { SnackbarProvider } from "notistack";
import QR_Generator from "../../components/Health_Card/QR_Generator";

export default function RegPage() { // Changed from regPage to RegPage
    const [loading, setLoading] = useState(false);
    const [currentTile, setCurrentTile] = useState(1);


    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTile((prevTile) => (prevTile === 1 ? 2 : 1));
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    return (
        <SnackbarProvider>
            <div className="flex flex-col min-h-screen">
                <div className="sticky top-0 z-10">
                    {/* Add navbar or header if needed */}
                </div>
                <div className="flex flex-1">
                    <div className="hidden sm:block w-1/6">
                        {/* Add sidebar if needed */}
                    </div>
                    <div className="w-full sm:w-5/6 flex flex-col p-4 mt-1 sm:mt-0">

                        <QR_Generator/>
                    </div>
                </div>
            </div>
        </SnackbarProvider>
    );
}
