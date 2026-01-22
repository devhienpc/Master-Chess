import React, {useRef, useState, useEffect, useLayoutEffect} from 'react';
import {Button, TextField, Grid, Container, Typography, IconButton} from "@mui/material";
import {Box} from "@mui/system";
import styles from './index.module.css';
import {ArrowBack, ArrowForward} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

const FAKE_NAMES = ["John Doe", "Jane Smith", "Alice", "Bob", "Charlie", "David", "Ella", "Frank", "Grace", "Hannah"];

export const FriendsArea = () => {
    const scrollContainerRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState("Start");
    const navigate = useNavigate();

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

    const [friends, setFriends] = useState([]);

    function fetchFriends() {
        fetch('http://localhost:8080/api/users/relationship/getFriends', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setFriends(data);
                })
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        // fetch friends
        fetchFriends();
    }, []);

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
                    backgroundColor: "rgb(240,240,240)",
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
                        Friends {`(${friends.length})`}
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
                                {friends.map((friend, key) => {
                                    return (
                                        <div style={{
                                            backgroundColor: 'white',
                                            paddingTop: '25px',
                                            paddingBottom: '25px',
                                            marginInline: '10px',
                                            borderRadius: '10px',
                                            boxShadow: '3px 0px 10px rgba(0, 0, 0, 0.1)',
                                            border: '1px solid rgba(0, 0, 0, 0.1)',
                                            paddingInline: '25px',
                                            maxWidth: '250px',
                                        }} key={key}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                            }}>
                                                <div style={{
                                                    border: '1px solid black',
                                                    borderRadius: '100%',
                                                    width: '100px',
                                                    height: '100px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>

                                        <span style={{
                                            fontSize: '24px',
                                            fontWeight: 'bolder',
                                            fontFamily: 'Inter',
                                        }}>
                                            {friend.username.substring(0, 1).toUpperCase()}
                                        </span>

                                                </div>
                                            </div>
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',

                                                paddingTop: '10px'
                                            }}>
                                    <span style={{
                                        fontSize: '24px',
                                        fontWeight: 'bold',
                                        fontFamily: 'Inter',
                                    }}>
                                        {friend.displayName}
                                    </span>

                                                <span style={{
                                                    fontSize: '12px',
                                                    fontWeight: 'bold',
                                                    fontFamily: 'Inter',
                                                    paddingTop: '5px',
                                                    color: 'rgba(0, 0, 0, 0.5)'

                                                }}>
                                        @{friend.username}
                                    </span>
                                            </div>
                                            <div style={{
                                                paddingTop: '25px',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                <Button variant={'contained'} style={{
                                                    backgroundColor: 'rgb(118,220,147)',
                                                }}>
                                                    Challenge
                                                </Button>

                                            </div>
                                            <div style={{
                                                marginTop: '10px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}>
                                                <Button variant={'contained'} onClick={() => {
                                                    navigate('/profile/' + friend.userId);
                                                }}>
                                                    View Profile
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                })}
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
                                <span style={{
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    fontFamily: "Inter",
                                    color: "rgba(0, 0, 0, 0.5)"
                                }}>You seem a little lonely!</span>
                            </Box>
                        </>
                )}
            </Container>
        </>
    );
};
