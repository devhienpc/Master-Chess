import React, {useRef, useState, useEffect, useLayoutEffect} from 'react';
import {Button, TextField, Grid, Container, Typography, IconButton} from "@mui/material";
import {Box} from "@mui/system";
import styles from './index.module.css';
import {ArrowBack, ArrowForward} from "@mui/icons-material";

const FAKE_NAMES = ["John Doe", "Jane Smith", "Alice", "Bob", "Charlie", "David", "Ella", "Frank", "Grace", "Hannah"];

export const MatchHistoryArea = () => {
    const scrollContainerRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState("Start");
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({left: -150, behavior: 'smooth'});
        }
    }

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({left: 150, behavior: 'smooth'});
        }
    }

    const friends = new Array(10).fill(0).map(_ => FAKE_NAMES[Math.floor(Math.random() * FAKE_NAMES.length)]);

    const handleScroll = () => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            console.log(scrollContainer.scrollLeft)
        }
    }

    return (
        <>
            <Container
                style={{
                    minWidth: "100%",
                    backgroundColor: "rgb(255,255,255)",
                    padding: 0,
                    paddingBottom: "35px"
                }}>
                {/* Title */}
                <Container style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    minWidth: "100%",
                }}>
                    <h1 style={{
                        fontSize: "32px",
                        fontWeight: "400",
                        fontFamily: "Inter"
                    }}>
                        Match History
                    </h1>
                </Container>
                {friends.length > 0 ? (
                    <>
                        <Box className={styles.FriendsInteractiveArea}>

                            {/* Left Scroll Button */}
                            <Box className={styles.FriendsScrollButtonContainer}>
                                <IconButton
                                    style={{
                                        backgroundColor: 'rgba(50, 50, 50, 0.3)'
                                    }}
                                    onClick={scrollLeft}

                                >
                                    <ArrowBack style={{color: "white"}}/>
                                </IconButton>
                            </Box>

                            {/* Body */}
                            <Box className={styles.FriendCardsContainer} ref={scrollContainerRef}
                                 onScroll={handleScroll}>
                                {friends.map((name, index) => (
                                    <Box key={index} style={{
                                        width: "max-content",
                                        height: "150px",
                                        marginInline: "10px",
                                        paddingInline: "5px",
                                        paddingBlock: "5px",
                                        backgroundColor: "white",
                                        borderRadius: "10px",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <Box style={{
                                            width: "100px",
                                            height: "100px",
                                            borderRadius: "100%",
                                            backgroundColor: "grey"
                                        }}>
                                            <Box style={{
                                                width: "25px",
                                                height: "25px",
                                                borderRadius: "100%",
                                                backgroundColor: "#30A72D",
                                                position: "relative",
                                                top: "70px",
                                                left: "65px",
                                            }}/>
                                        </Box>
                                        <Typography style={{
                                            marginTop: "7.5px"
                                        }}>{name}</Typography>
                                    </Box>
                                ))}
                            </Box>

                            {/* Right Scroll Button */}
                            <Box className={styles.FriendsScrollButtonContainer}>
                                <IconButton
                                    style={{
                                        backgroundColor: 'rgba(50, 50, 50, 0.3)'
                                    }}
                                    onClick={scrollRight}
                                    disabled={false}
                                >
                                    <ArrowForward style={{color: "white"}}/>
                                </IconButton>
                            </Box>
                        </Box>
                    </>) : (
                        <>
                            <Box style={{
                                width: "100%",
                                height: "150px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                You seem a little lonely
                            </Box>
                        </>
                )}
            </Container>
        </>
    );
};
