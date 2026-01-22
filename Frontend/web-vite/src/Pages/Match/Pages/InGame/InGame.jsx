import NavigationBar from "@/Components/NavigationBar/NavigationBar.jsx";
import {FooterArea} from "@/Components/General/FooterArea/index.jsx";
import {Box, Button, Fab, Select} from "@mui/material";
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

export const InGame = ({
                           matchData = {
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
                               "lastMoveTime": null,
                               "whiteUser": {},
                               "blackUser": {}
                           }
                       }) => {
    const navigate = useNavigate();
    const {currentUser, setCurrentUser} = useUser();

    const [matchId, setMatchId] = React.useState(matchData.matchId);
    const [whiteTurn, setWhiteTurn] = React.useState(matchData.isWhiteTurn);
    const [whiteUserId, setWhiteUserId] = React.useState(matchData.whiteUserId);
    const [blackUserId, setBlackUserId] = React.useState(matchData.blackUserId);
    const [whiteUser, setWhiteUser] = React.useState({});
    const [blackUser, setBlackUser] = React.useState({});

    const [matchStatus, setMatchStatus] = React.useState(matchData.matchStatus);
    const [matchType, setMatchType] = React.useState(matchData.matchType);
    const [matchMoves, setMatchMoves] = React.useState(matchData.matchMoves);
    const [isFinished, setIsFinished] = React.useState(matchData.isFinished);
    const [isAbandoned, setIsAbandoned] = React.useState(matchData.isAbandoned);
    const [isForfeited, setIsForfeited] = React.useState(matchData.isForfeited);
    const [isRated, setIsRated] = React.useState(matchData.isRated);
    const [isDraw, setIsDraw] = React.useState(matchData.isDraw);
    const [winnerUserId, setWinnerUserId] = React.useState(matchData.winnerUserId);
    const [drawRequested, setDrawRequested] = React.useState(matchData.drawRequested);
    const [drawRequesterId, setDrawRequesterId] = React.useState(matchData.drawRequesterId);
    const [isWhiteTurn, setIsWhiteTurn] = React.useState(matchData.isWhiteTurn);
    const [currentBoard, setCurrentBoard] = React.useState(matchData.currentBoard);
    const [whiteTimeLeft, setWhiteTimeLeft] = React.useState(matchData.whiteTimeRemaining);
    const [blackTimeLeft, setBlackTimeLeft] = React.useState(matchData.blackTimeRemaining);
    const [lastWhitePing, setLastWhitePing] = React.useState(matchData.lastWhitePing);
    const [lastBlackPing, setLastBlackPing] = React.useState(matchData.lastBlackPing);
    const [lastMoveTime, setLastMoveTime] = React.useState(matchData.lastMoveTime);

    const [chessBoardSize, setChessBoardSize] = React.useState(100);
    const [boardOrientation, setBoardOrientation] = React.useState("white");


    useEffect(() => {
        if (window.innerWidth > window.innerHeight)
            setChessBoardSize(window.innerHeight * 0.7);
        else
            setChessBoardSize(window.innerWidth * .7);

    })

    useEffect(() => {
        console.log("boardOrentation changed: ", boardOrientation)
    }, [boardOrientation])

    async function fetchUserProfile(userId) {
        return await fetch(`http://localhost:8080/api/users/getUserProfile?userId=${userId}`, {
            method: "GET",
        })
    }

    useEffect(() => {
        if (currentUser) {
            if (currentUser.userId === whiteUserId) {
                setBoardOrientation("white");
            }
            if (currentUser.userId === blackUserId) {
                setBoardOrientation("black");
            }
        }
    })

    // fetch user data
    React.useEffect(() => {
        if (whiteUserId) {
            console.log("fetching white user", whiteUserId)
            fetchUserProfile(whiteUserId).then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        setWhiteUser(data);
                    })
                }
            })
        }
    }, [whiteUserId])

    React.useEffect(() => {
        if (blackUserId) {
            fetchUserProfile(blackUserId).then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        setBlackUser(data);
                    })
                }
            })
        }

    }, [blackUserId])


    // update match data when necessary

    React.useEffect(() => {
        // if any current data is different from the match data, update it
        if (matchData.matchId !== matchId) {
            setMatchId(matchData.matchId);
        }

        if (matchData.isWhiteTurn !== whiteTurn) {
            setWhiteTurn(matchData.isWhiteTurn);
            // update times
            setWhiteTimeLeft(matchData.whiteTimeRemaining);
            setBlackTimeLeft(matchData.blackTimeRemaining);
        }

        if (matchData.whiteUserId !== whiteUserId) {
            setWhiteUserId(matchData.whiteUserId);
            if (matchData.whiteUserId === currentUser?.userId) {
                setBoardOrientation("white");
            }
        }

        if (matchData.blackUserId !== blackUserId) {
            setBlackUserId(matchData.blackUserId);
            if (matchData.blackUserId === currentUser?.userId) {
                setBoardOrientation("black");
            }
        }

        if (matchData.matchStatus !== matchStatus) {
            setMatchStatus(matchData.matchStatus);
        }

        if (matchData.matchType !== matchType) {
            setMatchType(matchData.matchType);
        }

        if (matchData.matchMoves !== matchMoves) {
            setMatchMoves(matchData.matchMoves);
        }

        if (matchData.isFinished !== isFinished) {
            setIsFinished(matchData.isFinished);
        }

        if (matchData.currentBoard !== currentBoard) {
            setCurrentBoard(matchData.currentBoard);
        }
    }, [matchData])


    // timer countdown
    React.useEffect(() => {
        const interval = setInterval(() => {
            if (whiteTimeLeft <= 0 || blackTimeLeft <= 0) {
                clearInterval(interval);
                return;
            }

            if (matchData.matchStatus === "FINISHED" || matchData.finished === true) {
                clearInterval(interval);
                return;
            }

            if (matchData.matchStatus === "PENDING") {
                return;
            }

            console.log("in progress")
            if (matchData.isWhiteTurn === true) {
                setWhiteTimeLeft(prevState => prevState - 1);
            } else {
                setBlackTimeLeft(prevState => prevState - 1);
            }
        }, 1000)

        console.log(whiteTurn, whiteTimeLeft, blackTimeLeft)

        return () => clearInterval(interval);
    }, [whiteTimeLeft, blackTimeLeft])

    function secondsToMinutesSeconds(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        // Adding leading zeros if minutes or seconds are less than 10
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    }

    function isDraggablePiece(piece) {
        console.log(piece)
        if (!currentUser) {
            console.log("No user logged in")
            return false;
        }

        if (currentUser.userId === whiteUserId && piece.color === "w") {
            return true;
        }

        if (currentUser.userId === blackUserId && piece.color === "b") {
            return true;
        }

        return true;
    }

    function dropPiece(sourceSquare, targetSquare) {
        console.log(sourceSquare, targetSquare);
        let success = false;
        fetch(`http://localhost:8080/api/matches/makeMove?matchId=${matchData.matchId}&move=${sourceSquare}${targetSquare}`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token"),
            }
        }).then(response => {
            if (response.ok) {
                console.log("Piece moved successfully!");
                success = true;
            } else {
                console.log(response);
                success = false;
            }
        })

        return success;
    }

    const PlayerInfo = ({Username, DisplayName, userId, timeLeft, displayWinner = false}) => {
        return (
            <>
                <div style={{
                    width: `${chessBoardSize}px`,

                    display: "flex",
                    justifyContent: "space-between",
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        cursor: "pointer",
                    }} onClick={() => {
                        navigate(`/profile/${userId}`)
                    }}>
                        <div style={{
                            marginRight: "1rem",
                        }}>
                            <div style={{
                                width: "50px",
                                height: "50px",
                                backgroundColor: "white",
                                borderRadius: "100%",
                                boxShadow: "1px 1px 4px 0px black",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <span style={{
                                    fontSize: "1.5rem",
                                    fontWeight: "bolder",
                                    fontFamily: "Inter",
                                }}>
                                    {DisplayName[0].toUpperCase()}
                                </span>
                            </div>
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            paddingBlock: "1rem",
                        }}>
                            <span style={{
                                fontSize: "1.5rem",
                                fontWeight: "bolder",
                                fontFamily: "Inter",
                            }}>
                                {DisplayName}
                            </span>
                            <span style={{
                                fontSize: "1rem",
                                fontWeight: "bold",
                                fontFamily: "Inter",
                                color: "gray"
                            }}>
                               @{Username}
                            </span>
                        </div>

                        {displayWinner && (
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginLeft: "1rem",
                            }}>
                                <div style={{
                                    paddingInline: '10px',
                                    paddingBlock: '10px',
                                    backgroundColor: "rgb(232,206,149)",
                                    borderRadius: "10px",
                                    boxShadow: "1px 1px 4px 0px black",
                                }}>
                                    <span style={{
                                        fontWeight: "bold",
                                        fontFamily: "Inter",
                                        color: "rgba(55,55,55,1)"
                                    }}>Winner 🏆</span>

                                </div>
                            </div>
                        )}

                    </div>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <div style={{
                            padding: "1rem",
                            backgroundColor: "white",
                            borderRadius: "10px",
                            boxShadow: "1px 1px 4px 0px black",
                            paddingBlock: "5px" +
                                ""
                        }}>
                            <span style={{
                                fontWeight: "bold",
                                fontFamily: "Inter",
                                color: "rgba(55,55,55,1)"
                            }}>{secondsToMinutesSeconds(timeLeft)}</span>

                        </div>
                    </div>
                </div>
            </>
        );
    }

    function requestDraw() {
        fetch(`http://localhost:8080/api/matches/requestDraw?matchId=${matchData.matchId}`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
            }
        })
    }

    function acceptDraw() {
        fetch(`http://localhost:8080/api/matches/acceptDraw?matchId=${matchData.matchId}`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),

            }
        }).then(response => {
            if (response.ok) {
                console.log("Draw accepted successfully!")
            }
        })
    }

    function denyDraw() {
        fetch(`http://localhost:8080/api/matches/declineDraw?matchId=${matchData.matchId}`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
            }
        }).then(response => {
            if (response.ok) {
                console.log("Draw denied successfully!")
            }
        })
    }

    function resignMatch() {
        fetch(`http://localhost:8080/api/matches/resignMatch?matchId=${matchData.matchId}`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
            }
        }).then(response => {
            if (response.ok) {
                console.log("Match resigned successfully!")
            }
        })
    }

    return (
        <>

            <div className={styles.pageContainer}>
                <div className={styles.mainContent}>
                    <div className={styles.gameContainer}>

                        {
                            boardOrientation === "white"
                            && <PlayerInfo DisplayName={blackUser.displayName || "Black Player"}
                                           Username={blackUser.username || "Black Player"} userId={blackUserId}
                                           timeLeft={blackTimeLeft} displayWinner={winnerUserId === blackUserId}/>
                            || <PlayerInfo DisplayName={whiteUser.displayName || "White Player"}
                                           Username={whiteUser.username || "White Player"} userId={whiteUserId}
                                           timeLeft={whiteTimeLeft} displayWinner={winnerUserId === whiteUserId}/>
                        }

                        <div style={{
                            width: `${chessBoardSize}px`,
                            height: `${chessBoardSize}px`,
                        }}>
                            <Chessboard position={currentBoard}
                                        draggablePieces={isDraggablePiece}
                                        onPieceDrop={dropPiece}
                                        boardSize={chessBoardSize}
                                        boardOrientation={boardOrientation}
                                        customBoardStyle={{
                                            boxShadow: "1px 1px 4px 0px black",
                                            borderRadius: "5px",
                                        }}
                            />
                        </div>

                        {
                            boardOrientation === "black"
                            && <PlayerInfo DisplayName={blackUser.displayName || "Black Player"}
                                           Username={blackUser.username || "Black Player"} userId={blackUserId}
                                           timeLeft={blackTimeLeft} displayWinner={winnerUserId === blackUserId}/>
                            || <PlayerInfo DisplayName={whiteUser.displayName || "White Player"}
                                           Username={whiteUser.username || "White Player"} userId={whiteUserId}
                                           timeLeft={whiteTimeLeft} displayWinner={winnerUserId === whiteUserId}/>
                        }

                        {(currentUser && (currentUser.userId === whiteUserId || currentUser.userId === blackUserId)) && (

                            <div style={{marginTop: '25px'}}>
                                {
                                    (matchData.drawRequested && matchData.drawRequesterId !== currentUser?.userId && ((currentUser?.userId === whiteUserId) || (currentUser?.userId === blackUserId))) && (
                                        <>
                                            <Button variant="contained" onClick={acceptDraw}>Accept Draw</Button>
                                            <Button variant="contained" style={{
                                                marginLeft: "1rem",
                                            }} onClick={denyDraw}>Deny Draw</Button>
                                        </>
                                    )
                                }
                                {matchData.drawRequested && matchData.drawRequesterId === currentUser?.userId && (
                                    <Button variant="contained" disabled>Draw Requested</Button>
                                )}
                                {!matchData.drawRequested && (
                                    <Button variant="contained" onClick={requestDraw}>Request Draw</Button>
                                )}
                                <Button variant="contained" style={{
                                    marginLeft: "1rem",
                                }} onClick={resignMatch}>Resign this Match</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}
