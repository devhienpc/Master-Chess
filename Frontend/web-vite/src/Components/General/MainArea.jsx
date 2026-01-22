import {FooterArea} from "@/Components/General/FooterArea/index.jsx";
import React from "react";
import {Button} from "@mui/material";

export const MainArea = ({ children }) => {
    return (
        <>
            <div style={{ height: '100vh', width: '100vw'}} >


                <div style={{ height: '64px', width: '100vw'}} >

                </div>

                <div>

                {children}

                </div>


                <FooterArea/>
            </div>
        </>
    )
}
