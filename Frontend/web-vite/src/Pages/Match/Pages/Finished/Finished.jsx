import NavigationBar from "@/Components/NavigationBar/NavigationBar.jsx";
import {FooterArea} from "@/Components/General/FooterArea/index.jsx";
import {Box, Button, Fab, Select} from "@mui/material";
import {
    ArrowLeft,
    ArrowRight,
    Chat,
    Circle,
    CircleOutlined,
    Mail, Pause,
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

export const Finished = ({
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

    const [boardMoveStates, setBoardMoveStates] = React.useState([]); // array of board states

    function boardNotationToArray(boardNotation) {
        let boardArray = [];
        let split = boardNotation.split("/");
        for (let i = 0; i < split.length; i++) {
            let row = split[i];
            let rowArray = [];
            for (let j = 0; j < row.length; j++) {
                let char = row[j];
                if (isNaN(char)) {
                    rowArray.push(char);
                } else {
                    for (let k = 0; k < parseInt(char); k++) {
                        rowArray.push("1");
                    }
                }
            }
            boardArray.push(rowArray);
        }
        return boardArray;
    }

    function boardArrayToNotation(boardArray) {
        let boardNotation = "";
        for (let i = 0; i < boardArray.length; i++) {
            let row = boardArray[i];
            let rowString = "";
            let counter = 0;
            for (let j = 0; j < row.length; j++) {
                let char = row[j];
                if (char === "1") {
                    counter++;
                } else {
                    if (counter > 0) {
                        rowString += counter;
                        counter = 0;
                    }
                    rowString += char;
                }
            }
            if (counter > 0) {
                rowString += counter;
                counter = 0;
            }
            boardNotation += rowString;
            if (i < boardArray.length - 1) {
                boardNotation += "/";
            }
        }
        return boardNotation;
    }

    function updateBoardState(boardArray, move) {
        let sourceSquare = move.substring(0, 2);
        let targetSquare = move.substring(2, 4);
        let sourceRank = 8 - parseInt(sourceSquare[1]);
        let sourceFile = sourceSquare.charCodeAt(0) - 97;
        let targetRank = 8 - parseInt(targetSquare[1]);
        let targetFile = targetSquare.charCodeAt(0) - 97;
        let piece = boardArray[sourceRank][sourceFile];
        boardArray[sourceRank][sourceFile] = "1";
        boardArray[targetRank][targetFile] = piece;
        return boardArray;
    }

    useEffect(() => {
        // match moves updated build list of move states for playback
        let split = matchMoves.split(",");

        let boardStates = [];
        let initialBoard = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
        boardStates.push(initialBoard);

        let boardArray = boardNotationToArray(initialBoard);


        for (let i = 0; i < split.length - 1; i++) {
            let move = split[i];
            boardArray = updateBoardState(boardArray, move);
            boardStates.push(boardArrayToNotation(boardArray));
        }

        setBoardMoveStates(boardStates);

        return () => {
            setBoardMoveStates([]);
        }
    }, [matchMoves]);


    const [currentMove, setCurrentMove] = React.useState(0);
    const [playbackSpeed, setPlaybackSpeed] = React.useState(1);
    const [playingBack, setPlayingBack] = React.useState(false);

    useEffect(() => {
        // interval that updates the board every second * playback speed
        const interval = setInterval(() => {
            if (!playingBack) {
                return clearInterval(interval);

            }

            if (currentMove >= boardMoveStates.length - 1) {
                setCurrentMove(0);
                return clearInterval(interval);
            } else {
                setCurrentMove(prevState => {
                    if (prevState >= boardMoveStates.length - 1) {
                        clearInterval(interval)
                        setPlayingBack(false);
                        return boardMoveStates.length - 1;
                    }

                    return prevState + 1;
                });
            }
        }, 1000 / playbackSpeed)
        return () => clearInterval(interval);
    }, [playingBack, playbackSpeed])


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

    const [shareCopyDisabled, setShareCopyDisabled] = React.useState(false);
    return (
        <>

            <div className={styles.pageContainer}>
                <div className={styles.mainContent}>
                    <div className={styles.gameContainer}>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: "1rem",
                            backgroundColor: "white",
                            borderRadius: "10px",
                            boxShadow: "1px 1px 4px 0px black",
                            paddingInline: "20px",
                            paddingBlock: "10px",
                        }}>
                            <div>
                                {
                                    boardOrientation === "white"
                                    && <PlayerInfo DisplayName={blackUser.displayName || "Black Player"}
                                                   Username={blackUser.username || "Black Player"} userId={blackUserId}
                                                   timeLeft={blackTimeLeft}
                                                   displayWinner={winnerUserId === blackUserId}/>
                                    || <PlayerInfo DisplayName={whiteUser.displayName || "White Player"}
                                                   Username={whiteUser.username || "White Player"} userId={whiteUserId}
                                                   timeLeft={whiteTimeLeft}
                                                   displayWinner={winnerUserId === whiteUserId}/>
                                }

                                <div style={{
                                    width: `${chessBoardSize}px`,
                                    height: `${chessBoardSize}px`,
                                }}>
                                    <Chessboard position={boardMoveStates[currentMove]} id={currentMove}
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
                                                   timeLeft={blackTimeLeft}
                                                   displayWinner={winnerUserId === blackUserId}/>
                                    || <PlayerInfo DisplayName={whiteUser.displayName || "White Player"}
                                                   Username={whiteUser.username || "White Player"} userId={whiteUserId}
                                                   timeLeft={whiteTimeLeft}
                                                   displayWinner={winnerUserId === whiteUserId}/>
                                }
                            </div>

                            {/* Playback Control */}
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                marginLeft: "25px",

                            }}>
                                <div>
                                    <Fab color="primary" aria-label="previous" style={{
                                        marginRight: "1rem",
                                    }} onClick={() => {
                                        setPlayingBack(false);
                                        setCurrentMove(prevState => {
                                            if (prevState <= 0) {
                                                return boardMoveStates.length - 1;
                                            }
                                            return prevState - 1;
                                        })
                                    }}>
                                        <SkipPrevious/>
                                    </Fab>

                                    <Fab color="primary" aria-label="play-control" onClick={() => {
                                        if (currentMove >= boardMoveStates.length - 1) {
                                            setCurrentMove(0);
                                        }
                                        setPlayingBack(prevState => !prevState)
                                    }}>
                                        {playingBack && <Pause/> || <PlayArrow/>}
                                    </Fab>

                                    <Fab color="primary" aria-label="next" style={{
                                        marginLeft: "1rem",
                                    }} onClick={() => {
                                        setPlayingBack(false);
                                        setCurrentMove(prevState => {
                                            if (prevState >= boardMoveStates.length - 1) {
                                                return 0;
                                            }
                                            return prevState + 1;
                                        })
                                    }}>
                                        <SkipNext/>
                                    </Fab>
                                </div>

                                <div style={{
                                    marginTop: "25px"
                                }}>
                                    <span style={{
                                        fontFamily: "Inter"
                                    }}>Playback Speed:</span>
                                    <select
                                        value={playbackSpeed}
                                        onChange={(event) => {
                                            setPlaybackSpeed(event.target.value);
                                        }}
                                        style={{
                                            width: "100px",
                                            marginLeft: "1rem",
                                            padding: "5px",
                                            borderRadius: "10px",
                                        }}
                                    >
                                        <option value={0.25}>0.25x</option>
                                        <option value={0.5}>0.5x</option>
                                        <option value={1}>1x</option>
                                        <option value={1.5}>1.5x</option>
                                        <option value={2}>2x</option>
                                        <option value={3}>3x</option>
                                    </select>
                                </div>

                                {/* List Of Moves */}
                                <div style={{
                                    marginTop: "25px",
                                    borderRadius: "10px",
                                }}>

                                    {!matchMoves || matchMoves.length === 0 ? (
                                        <span style={{color: "white"}}>No moves have been made yet</span>
                                    ) : (
                                        <div style={{
                                            display: "grid",
                                            gridTemplateColumns: "1fr 1fr 1fr 1fr",
                                        }}>
                                            {matchMoves.split(",").map((move, index) => {
                                                if (index % 2 === 0) {
                                                    return (
                                                        <div key={index} style={{
                                                            backgroundColor: `${currentMove === index ? "grey" : "rgba(255,255,255,1)"}`,
                                                            padding: "20px",
                                                            cursor: "pointer",
                                                        }} onClick={() => {
                                                            setCurrentMove(index);
                                                        }}>
                                                            <span style={{color: "black"}}>{index / 2 + 1}. </span>
                                                            <span style={{color: "black"}}>{move}</span>

                                                            <Chessboard position={boardMoveStates[index]} id={index}
                                                                        chessboardSize={1000}
                                                                        customBoardStyle={{
                                                                            boxShadow: "1px 1px 4px 0px black",
                                                                            borderRadius: "5px",
                                                                        }}/>

                                                        </div>
                                                    )
                                                }
                                                return (
                                                    <div key={index} style={{
                                                        padding: "20px",
                                                        backgroundColor: `${currentMove === index ? "grey" : "rgba(0,0,0,1)"}`,
                                                        cursor: "pointer",
                                                    }}
                                                         onClick={() => {
                                                             setCurrentMove(index);
                                                         }}
                                                    >
                                                        <span style={{color: "white"}}>{index + 1}. </span>
                                                        <span style={{color: "white"}}>{move || "Finished"}</span>

                                                        <Chessboard position={boardMoveStates[index]} id={index}
                                                                    chessboardSize={''}
                                                                    customBoardStyle={{
                                                                        boxShadow: "1px 1px 4px 0px black",
                                                                        borderRadius: "5px",
                                                                    }}/>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "1rem",
                        }}>

                            <Button variant={"contained"} disabled={shareCopyDisabled} onClick={(e) => {
                                // copy match link to clipboard
                                navigator.clipboard.writeText(`http://localhost:5173/match/${matchId}`)
                                e.target.innerText = "Match Link Copied!"
                                setTimeout(() => {
                                    e.target.innerText = "Share This Match"
                                }, 2000)
                            }}>Share This Match</Button>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
