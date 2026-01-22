import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Box,
    Menu,
    MenuItem
} from "@mui/material";
import { Link } from "react-router-dom";
import imgUrl from '@/Assets/CheckmateLogo.png';
import {useUser} from "@/Contexts/UserContext.jsx";
import * as path from "path";

function Authenticated() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const {
        currentUser,
        isAuthenticated,
        loginUser,
        logoutUser,
        sendRequest
    } = useUser();

    return (
        <>
            <AppBar position="relative">
                <Toolbar>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
                        <img
                            src={imgUrl}
                            style={{ width: "50px", height: "50px" }}
                            alt="logo"
                        />
                    </div>

                    <div style={{position: "relative", left: "15px", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Button color="inherit" component={Link} to="/">
                            Home
                        </Button>
                        <Button color="inherit" component={Link} to="/about">
                            About
                        </Button>
                        <Button color="inherit" component={Link} to="/search">
                            Search
                        </Button>
                    </div>


                    <div style={{ position: 'absolute', right: '25px', height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Button color="inherit" component={Link} to={`/login?redirect=${document.location.pathname}`}>
                            Login
                        </Button>
                        <Button color="inherit" component={Link} to="/register">
                            Register
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Authenticated;
