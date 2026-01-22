import React from 'react';
import {Button} from '@mui/material';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {Box} from '@mui/system';
import Styles from './LandingPage.module.css';
import NavigationBar from '../../../Components/NavigationBar/NavigationBar.jsx'
import {Link} from 'react-router-dom';
import {blue} from "@mui/material/colors";
import {FooterArea} from "@/Components/General/FooterArea/index.jsx";
import {MainArea} from "@/Components/General/MainArea.jsx";
import {Title} from "@mui/icons-material";
import TwinklingStars from "@/Components/TwinklingStars.jsx";
import imgUrl from "@/Assets/CheckmateLogoInverted.png";

function LandingPage() {
    return (
        <>
            <NavigationBar/>
            <MainArea>
                <div style={{width: "100vw", height: "110vh", position: 'absolute', top: '-5vh', zIndex: 0}}  >

                    <TwinklingStars width={'100px'} height={'100px'}/>

                </div>
                <Container
                    maxWidth="100%"
                    style={{
                        height: "100vh",
                        width: "100vw",
                        zIndex: 10,
                    }}
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                    >
                        <img
                            src={imgUrl}
                            style={{ width: "200px", height: "200px", padding: '50px'}}
                            alt="logo"
                        />
                        <Box>
                            <Button
                                to="/login"
                                variant="contained"
                                fullWidth
                                component={Link}
                                style={{marginBottom: "15px", zIndex: 10}}
                            >
                                Sign in to an Existing Account
                            </Button>
                            <Button to="/register" variant="contained" fullWidth component={Link} style={{backgroundColor: 'white', color: "#1976d2", zIndex: 10}}>
                                Create an Account
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </MainArea>
        </>
    );
}

export default LandingPage;
