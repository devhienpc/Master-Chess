import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import {Box} from "@mui/system";
import Authenticated from "@/Components/NavigationBar/styles/Authenticated.jsx";
import Unauthenticated from "@/Components/NavigationBar/styles/Unauthenticated.jsx";
import {useUser} from "@/Contexts/UserContext.jsx";
import style from './NavStyles.module.css';
const NavigationBar = () => {
    // user context
    const {
        currentUser,
        isAuthenticated,
        loginUser,
        logoutUser,
        sendRequest
    } = useUser();

    // states
    const [showBar, setShowBar] = useState(true);
    const [hovering, setHovering] = useState(false); // new state to track hovering
    const [lastScrollTop, setLastScrollTop] = useState(0);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const currentScrollTop = window.scrollY;
    //         console.log(currentScrollTop)
    //         if (currentScrollTop > lastScrollTop) {
    //             if (currentScrollTop - lastScrollTop > 200) {
    //                 setShowBar(false);
    //                 setLastScrollTop(currentScrollTop)
    //             }
    //         } else {
    //             setLastScrollTop(currentScrollTop);
    //             setShowBar(true)
    //         }
    //
    //     };
    //
    //     window.addEventListener('scroll', handleScroll);
    //
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, [lastScrollTop]);

    // const handleMouseEnter = () => {
    //     setHovering(true);
    //     setShowBar(true); // Show the navigation bar when the top area is hovered over
    // };
    //
    // const handleMouseLeave = () => {
    //     setHovering(false); // User is no longer hovering
    //     // If we're not scrolling up, hide the bar
    //     if (window.scrollY > lastScrollTop) {
    //         setShowBar(false);
    //     }
    // };



    return (

        <>

            <div style={{
                position: "fixed",
                width: "100vw",
                height: "max-content",
                transition: 'transform 0.3s ease',
                zIndex: 100,
            }}>
                {isAuthenticated ? (
                    <Authenticated/>
                ) : (
                    <Unauthenticated/>
                )}
            </div>
        </>
    );
};

export default NavigationBar;
