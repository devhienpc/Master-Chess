import React, { useState } from "react";
import { Button, TextField, Grid, Container, Typography } from "@mui/material";
import { AccountCircle, LockRounded } from "@mui/icons-material";
import NavigationBar from "../../../Components/NavigationBar/NavigationBar.jsx";
import {WelcomeArea} from "./Sections/WelcomeArea";
import {FriendsArea} from "./Sections/FriendsArea";
import {FooterArea} from "@/Components/General/FooterArea/index.jsx"
import {MatchHistoryArea} from "@/Pages/Authenticated/Dashboard/Sections/MatchHistoryArea/index.jsx";
import {MainArea} from "@/Components/General/MainArea.jsx";

export const Dashboard = () => {

    return (
        <>
            <NavigationBar />

            <MainArea>
            {/* Body */}
            <Container style={{
                margin: "0",
                padding: "0",
                minWidth: "100%"
            }}>
                <WelcomeArea/>
                <FriendsArea/>
                {/*<MatchHistoryArea/>*/}
            </Container>

            </MainArea>
        </>
    );
};
