import React from 'react';
import {Button} from '@mui/material';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {Box} from '@mui/system';
import NavigationBar from '../../../Components/NavigationBar/NavigationBar.jsx'
import {Link} from 'react-router-dom';
import {blue} from "@mui/material/colors";
import {FooterArea} from "@/Components/General/FooterArea/index.jsx";
import {MainArea} from "@/Components/General/MainArea.jsx";

function AboutPage() {
    return (
        <>
            <NavigationBar/>
            <MainArea>
                <Container
                    maxWidth="100%"
                    style={{
                        height: "400px",
                    }}
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                    >
                        <Typography variant="h2" gutterBottom>
                            About Us
                        </Typography>
                    </Box>
                </Container>
                <div style={{width: "100vw", height: "100vh"}}  >


                </div>
            </MainArea>
        </>
    );
}

export default AboutPage;
