import React, {useState} from "react";
import {Button, TextField, Grid, Container, Typography} from "@mui/material";
import {AccountCircle, LockRounded} from "@mui/icons-material";
import NavigationBar from "../../../Components/NavigationBar/NavigationBar.jsx";
import {MainArea} from "@/Components/General/MainArea.jsx";
import {Box} from "@mui/system";
import {ProfileQuestions} from "@/Pages/Authenticated/CompleteAccountSetup/QuestionSections/ProfileQuestions.jsx";
import {
    MatchmakingQuestions
} from "@/Pages/Authenticated/CompleteAccountSetup/QuestionSections/MatchmakingQuestions.jsx";

/*
    This page is presented to the user immediately after logging in for the first time,
    This is optional and defaults are will be in place if skipped

    Sections:
    1) Profile Information
        - Display Name
        - Profile Picture
        - Biography
    2) MatchMaking Information
        - Region (NA, EU, Asia, Any)
        - Personal Skill Level (Selection will play minorly in user's default ELO, should balance out after games)
    3) Security
        * inital step must be performed to access substep *
        - Change your email address
        - Confirm your email address
            - Enable 2FA
*/
export const CompleteAccountSetup = () => {

    return (
        <>
                {/* Body */}
                <Container style={{
                    margin: "0",
                    padding: "0",
                    minWidth: "100%",
                    minHeight: "100%"
                }}>
                    <Box style={{
                        textAlign: 'center',
                        paddingBlock: '50px'
                    }}>
                        <Typography variant="h1">
                            Lets finish getting you setup!
                        </Typography>
                    </Box>
                    <Box style={{
                        paddingBlock: '50px',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <MatchmakingQuestions/>
                    </Box>
                </Container>

        </>
    );
};
