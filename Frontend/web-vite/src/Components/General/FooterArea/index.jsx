import imgUrl from '@/Assets/CheckmateLogo.png';
import { Container, Typography, Link } from "@mui/material";
import React from "react";
import { Box } from "@mui/system";

export const FooterArea = () => {
    return (
        <Box style={{
            minWidth: "100%",
            height: "max-content",
            paddingBlock: "20px",
            backgroundColor: "#1976d2",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
        }}>
            <Box style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "80%",
                marginBottom: "50px",
                paddingBlock: "40px"
            }}>
                <Box>
                    <Typography variant="h6">Pages</Typography>
                    <Link href="#" style={{color: "white", display: "block"}}>Landing Page</Link>
                    <Link href="#" style={{color: "white", display: "block"}}>Forums</Link>


                </Box>

                <Box>
                    <Typography variant="h6">Contact</Typography>
                    <Link href="mailto:example@example.com" style={{color: "white", display: "block"}}>Email</Link>
                    <Link href="#" style={{color: "white", display: "block"}}>X</Link>
                    <Link href="#" style={{color: "white", display: "block"}}>Instagram</Link>
                    <Link href="#" style={{color: "white", display: "block"}}>Facebook</Link>
                </Box>

                <Box>
                    <Typography variant="h6">Legal</Typography>
                    <Link href="#" style={{color: "white", display: "block"}}>Privacy Policy</Link>
                    <Link href="#" style={{color: "white", display: "block"}}>Terms of Service</Link>
                    <Link href="#" style={{color: "white", display: "block"}}>Disclaimer</Link>
                    <Link href="#" style={{color: "white", display: "block"}}>Cookie Policy</Link>
                </Box>

                <Box>
                    <Typography variant="h6">About Us</Typography>
                    <Link href="/about#OurStory" style={{color: "white", display: "block"}}>Our Story</Link>
                    <Link href="/about#OurTeam" style={{color: "white", display: "block"}}>Team</Link>
                    <Link href="/about#Careers" style={{color: "white", display: "block"}}>Careers</Link>
                </Box>
            </Box>

            <img
                src={imgUrl}
                style={{ width: "45px", height: "45px", transition: "all .3s" }}
                alt="logo"
            />
        </Box>
    )
}
