import NavigationBar from "@/Components/NavigationBar/NavigationBar.jsx";
import {FooterArea} from "@/Components/General/FooterArea/index.jsx";
import {Box, Button, CircularProgress, Fab, Select} from "@mui/material";
import {
    ArrowLeft,
    ArrowRight,
    Chat,
    Circle,
    CircleOutlined,
    Mail,
    PlayArrow,
    SkipNext,
    SkipPrevious
} from "@mui/icons-material";
import {MainArea} from "@/Components/General/MainArea.jsx";
import {useNavigate, useParams} from "react-router-dom";
import React, {Suspense, useEffect} from "react";
import axios from "axios";
import {Chessboard} from "react-chessboard";

import styles from './match.module.css';
import {useUser} from "@/Contexts/UserContext.jsx";
import Play from "@/Pages/Authenticated/Play/index.jsx";
import {Finished} from "@/Pages/Match/Pages/Finished/Finished.jsx";
import {InGame} from "@/Pages/Match/Pages/InGame/InGame.jsx";

export const Match = () => {

    const navigate = useNavigate();

    const params = useParams();
    const {matchId} = params;

    const {currentUser, setCurrentUser} = useUser();

    const [matchData, setMatchData] = React.useState({
        "matchId": 37,
        "whiteUserId": 3,
        "blackUserId": 1,
        "matchStatus": "PROGRESS",
        "matchType": "BLITZ",
        "matchMoves": "",
        "isFinished": false,
        "isAbandoned": false,
        "isForfeited": false,
        "isRated": true,
        "isDraw": false,
        "winnerUserId": null,
        "drawRequested": false,
        "drawRequesterId": null,
        "isWhiteTurn": true,
        "currentBoard": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
        "whiteTimeRemaining": 300,
        "blackTimeRemaining": 300,
        "lastWhitePing": 1701333997,
        "lastBlackPing": 1701334260,
        "lastMoveTime": null
    });

    async function fetchUserProfile(userId) {
        let userData;
        await fetch(`http://localhost:8080/api/users/getUserProfile?userId=${userId}`, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token")
            }
        })
            .then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        console.log(data)
                        userData = data;
                        return data;
                    })
                } else {
                    console.log(response);
                    return null;
                }
            })
            .catch(error => {
                console.log(error);
            });
        return userData;
    }

    function fetchMatchData() {
        fetch(`http://localhost:8080/api/matches/pingMatch?matchId=${matchId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access_token")
            },
        }).then(response => {
            if (response.ok) {
                response.json().then(newData => {
                    // Update state only if the turn or match status has changed
                    setMatchData(newData);
                })
            } else {
                navigate("/play");
                console.log(response)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    const [matchUpdateInterval, setMatchUpdateInterval] = React.useState(1000);

    useEffect(() => {
        const interval = setInterval(() => {

            if (matchData.isFinished) {
                clearInterval(interval);
            }

            if (matchData.whiteUserId !== currentUser?.userId && matchData?.blackUserId !== currentUser.userId) {
                setMatchUpdateInterval(10000);
            }

            fetchMatchData()

        }, matchUpdateInterval);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        console.log("Fetching match data")
        fetchMatchData()
    }, [])

    return (
        <>
            <NavigationBar/>

            <MainArea>

                {
                    matchData.matchStatus !== "FINISHED" && matchData.matchStatus !== "PROGRESS" &&
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: 'calc(100vh - 124px)',
                    }}>
                        {/* spinner */}
                        <h1 style={{
                            marginTop: '50px',
                        }}>Loading this Match</h1>
                        <CircularProgress style={{
                            marginTop: '10px',
                        }}/>
                    </div>
                }


                {
                    matchData.isFinished &&
                    <Finished matchData={matchData}/>
                }

                {
                    matchData.matchStatus === "PROGRESS" &&
                    <InGame matchData={matchData}/>
                }


            </MainArea>

        </>
    )

}