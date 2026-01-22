import React, {useEffect, useState} from "react";
import {Typography, CircularProgress, Box} from "@mui/material";
import {CheckCircle, Error} from "@mui/icons-material";
import {useParams, useNavigate, useSearchParams} from "react-router-dom";
import {useUser} from "../../../Contexts/UserContext.jsx";

const VerificationPage = (props) => {
    const [searchParams] = useSearchParams();
    const tokenParam = searchParams.get('token');
    const userIdParam = searchParams.get('userId');

    const [verified, setVerified] = useState(false);
    const [stage, setStage] = useState(0);
    const [verifyingText, setVerifyingText] = useState("Verifying...");
    const [errored, setErrored] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const {verifyUser} = useUser();
    const navigate = useNavigate();




    useEffect(() => {
        if (!tokenParam || !userIdParam) {
            setStage(2);
            setVerified(false);
            setErrored(true);
            setVerifyingText("Verification failed.");
            setErrorMessage("There was a problem when verifying. Please try again or contact support if the problem persists.");
            return;
        }
        setStage(0);
        setTimeout(() => {
            fetch("http://localhost:8080/api/auth/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: tokenParam,
                    userId: userIdParam,
                }),
            })
                .then(response => {
                    if (!response.ok) {
                        setStage(2);
                        setErrored(true);
                        setVerifyingText("Verification failed.");
                        setErrorMessage("There was a problem when verifying. Please try again or contact support if the problem persists.");
                        setVerified(false);
                        throw new Error('Verification failed. Please try again or contact support if the problem persists.');
                    }
                    return response.json();
                })
                .then(data => {
                    if (!data.failure) {
                        setStage(1);
                        setVerified(true);
                        // If you have a function to update the user context, call it here
                        // e.g., verifyUser(data.user);
                        setVerifyingText("Verification successful!");

                        if(data.fields.refreshToken !== '') {
                            localStorage.setItem("refresh_token", data.fields.refreshToken)
                        }
                        if(data.fields.accessToken !== '') {
                            localStorage.setItem("access_token", data.fields.accessToken)
                        }

                        if (data.fields.redirect !== '') {
                            navigate(data.fields.redirect);
                        }


                    } else {
                        setErrorMessage("There was a problem when verifying. Please try again or contact support if the problem persists.");

                        throw new Error(data.message || 'Unknown error occurred during verification.');
                    }
                })
                .catch(err => {
                    setStage(2);
                    setErrored(true);
                    setVerifyingText("Verification failed.");
                    setErrorMessage("There was a problem when verifying. Please try again or contact support if the problem persists.");

                    console.error(err);
                });
        }, 1000);
    }, []);


    return (
        <Box
            style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                flexDirection: "column",
                placeItems: "center",
                justifyContent: "center",
                color: "black",
            }}
        >
            {stage === 2 ? (
                <>
                    <Error style={{width: '50px', height: '50px', color: 'red'}}/>
                    <Typography
                        style={{
                            marginTop: "30px",
                            fontFamily: "Roboto",
                            fontStyle: "normal",
                            fontWeight: "bold",
                        }}
                    >
                        {verifyingText}
                    </Typography>
                    {errored && (
                        <Typography color="error" style={{marginTop: "20px"}}>
                            {errorMessage}
                        </Typography>
                    )}
                </>
            ) : stage === 0 ? (
                <>
                    <CircularProgress style={{width: '50px', height: '50px'}}/>
                    <Typography
                        style={{
                            marginTop: "30px",
                            fontFamily: "Roboto",
                            fontStyle: "normal",
                            fontWeight: "bold",
                        }}
                    >
                        Verifying
                    </Typography>
                </>
            ) : stage === 1 ? (
                <>
                    <CheckCircle style={{width: '50px', height: '50px', color: 'green'}}/>
                    <Typography
                        style={{
                            marginTop: "30px",
                            fontFamily: "Roboto",
                            fontStyle: "normal",
                            fontWeight: "bold",
                        }}
                    >
                        Verification successful!
                    </Typography>
                </>
            ) : (
                <></>
            )
            }
        </Box>
    )
        ;
};

export default VerificationPage;
