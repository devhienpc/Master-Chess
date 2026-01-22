import React, {useEffect, useState} from 'react';
import {
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    CircularProgress,
    Paper
} from '@mui/material';
import NavigationBar from "@/Components/NavigationBar/NavigationBar.jsx";
import {MainArea} from "@/Components/General/MainArea.jsx";
import useWebSocket from "react-use-websocket";
import {useNavigate} from "react-router-dom";

const token = localStorage.getItem("access_token")
const WS_URL = `ws://localhost:8080/api/matchmaking/ws?token=${token}`


function Queue() {
    const [selectedType, setSelectedType] = useState('');
    const [searchingForMatch, setSearchingForMatch] = useState(false);
    const [confirmMatchDetails, setConfirmMatchDetails] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0); // New state for tracking elapsed time

    const navigate = useNavigate();

    const startQueue = async () => {
        setSearchingForMatch(true);
        console.log("entering queue message")

        const response = await fetch("http://localhost:8080/api/matchmaking/enter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access_token")
            },
            body: JSON.stringify({
                token: localStorage.getItem("access_token")
            })
        });

    };

    const leaveQueue = async () => {
        setSearchingForMatch(false);
        console.log("leaving queue message")
        const response = await fetch("http://localhost:8080/api/matchmaking/leave", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access_token")
            },
            body: JSON.stringify({
                token: localStorage.getItem("access_token")
            })
        });
    };

    useEffect(() => {
        fetch("http://localhost:8080/api/matchmaking/queue", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access_token")
            },
        }).then((response) => {
            if (response.status === 200) {
                response.json().then(data => {
                    if (data.matchFound) {
                        console.log("Match found!");

                        fetch("http://localhost:8080/api/matches/getCurrentMatch", {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Bearer " + localStorage.getItem("access_token")
                            },
                        }).then((response) => {
                            if (response.status === 200) {
                                response.text().then(data => {
                                    navigate("/match/" + data);
                                })
                            }
                        })

                    }
                })
            }
        })
    }, [])

    // queue ping
    useEffect(() => {
        let matchCheckInterval;
        let countdownInterval;

        if (searchingForMatch) {

            countdownInterval = setInterval(() => {
                setElapsedTime(prev => prev + 1);
            }, 1000);

            matchCheckInterval = setInterval(async () => {
                console.log("Checking for match...");

                try {
                    fetch("http://localhost:8080/api/matchmaking/queue", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("access_token")
                        },
                    }).then((response) => {
                        if (response.status === 200) {
                            response.json().then(data => {
                                if (data.matchFound) {
                                    console.log("Match found!");

                                    clearInterval(matchCheckInterval);
                                    clearInterval(countdownInterval);

                                    fetch("http://localhost:8080/api/matches/getCurrentMatch", {
                                        method: "GET",
                                        headers: {
                                            "Content-Type": "application/json",
                                            "Authorization": "Bearer " + localStorage.getItem("access_token")
                                        },
                                    }).then((response) => {
                                        if (response.status === 200) {
                                            response.text().then(data => {
                                                navigate("/match/" + data);
                                            })
                                        }
                                    })

                                }
                            })
                        }
                    })
                } catch (error) {
                    console.error("Error checking for match:", error);
                }
            }, 5000);
        }

        return () => {
            // Clear both intervals when component is unmounted or searchingForMatch is false
            if (matchCheckInterval) {
                clearInterval(matchCheckInterval);
            }
            if (countdownInterval) {
                clearInterval(countdownInterval);
                setElapsedTime(0); // Reset elapsed time when stopping the search
            }
        };
    }, [searchingForMatch]);



    // Format elapsed time into a readable format (e.g., MM:SS)
    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };


    return (
        <>
            <NavigationBar/>
            <MainArea>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 20,
                    height: "100%"
                }}>
                    <h1>Chess Matchmaking</h1>
                    <br/><br/>

                    {searchingForMatch && confirmMatchDetails == null ? (<>
                        <CircularProgress/>
                        <br/>
                        Searching for a match
                        <br/>
                        Time Elapsed: {formatTime(elapsedTime)}
                        <br/>
                        <Button variant="contained" color="primary" style={{margin: 10}} onClick={leaveQueue}>
                            Leave Queue
                        </Button>
                    </>) : (<>
                        <Button variant="contained" color="primary" style={{margin: 10}} onClick={startQueue}>
                            Enter Queue
                        </Button>
                    </>)}
                    {confirmMatchDetails != null ? (
                        <>
                            <Button variant="contained" color="primary" style={{margin: 10}} onClick={startQueue}>
                                Enter Queue
                            </Button>
                        </>
                    ) : null}

                </div>
            </MainArea>
        </>
    );
}

export default Queue;
