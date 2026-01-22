import React, {createContext, useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useAlertContext} from "@/Contexts/AlertContext/AlertContext.jsx";

// Create the context
const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null); // Store the current logged-in user
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Store the authentication state
    const {createAlert} = useAlertContext();
    const navigate = useNavigate();

    async function refreshContext() {
        const storedAccess = localStorage.getItem("access_token");

        if (storedAccess == null) {
            return refreshAccessToken();
        }

        const response = await fetch("http://localhost:8080/api/users/getUserContext", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + storedAccess
            }
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    setCurrentUser(data);
                    setIsAuthenticated(true);
                })
            } else {
                refreshAccessToken();
            }
        });
    }

    async function refreshAccessToken() {
        const storedRefreshToken = localStorage.getItem('refresh_token');
        if (storedRefreshToken == null) {
            setIsAuthenticated(false);
            setCurrentUser(null);
            navigate("/login");
            return;
        }

        await fetch("http://localhost:8080/api/auth/refresh", {
            method: "GET",
            headers: {
                Authorization: "Refresh " + storedRefreshToken
            }
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    localStorage.setItem("refresh_token", data.refreshToken);
                    localStorage.setItem("access_token", data.accessToken);
                    localStorage.setItem("lastAccess", new Date().getTime().toString());

                    // refresh context
                    refreshContext();
                })
            } else {
                logoutUser();
            }
        })
    }

    useEffect(() => {

        let refreshInterval = setInterval(() => {
            if (localStorage.getItem("lastAccess") == null) {
                return;
            }

            if (localStorage.getItem("refresh_token") == null) {
                return;
            }

            const lastAccess = parseInt(localStorage.getItem("lastAccess"));

            const currentTime = new Date().getTime();
            const timeSinceLastAccess = currentTime - lastAccess;

            if (timeSinceLastAccess > 55 * 60 * 1000) {
                refreshAccessToken();
            }
        }, 60000);

        return () => {
            clearInterval(refreshInterval);
        }
    }, []); // Empty dependency array ensures this useEffect runs once, similar to componentDidMount


    /*
        Send Request Method
        - Sends a request and if the response is not ok, it will try to refresh the access token
        - If the access token is refreshed, it will retry the request
        - If the access token is not refreshed, it will log the user out
        - If the response is ok, it will return the response
     */
    const sendRequest = async (url, options) => {
        fetch(url, options).then(async (response) => {
            if (!response.ok) {
                if (response.status === 401) {
                    const refreshResponse = await fetch("http://localhost:8080/api/auth/refresh", {
                        method: "GET",
                        headers: {
                            'Authorization': 'Refresh ' + localStorage.getItem('refresh_token')
                        }
                    });

                    if (!refreshResponse.ok) {
                        logoutUser();
                        createAlert("Session Error, Please Log In Again", "error");
                    } else {
                        const responseData = await refreshResponse.json();
                        loginUser(responseData.refreshToken, responseData.accessToken)
                        return sendRequest(url, options);
                    }
                } else {
                    createAlert("Session Error, Please Log In Again", "error");
                    logoutUser();
                }
            } else {
                return response;
            }
        })
    }




    const loginUser = (refresh, access) => {
        localStorage.setItem("refresh_token", refresh)
        localStorage.setItem("access_token", access)
        localStorage.setItem("lastRefresh", new Date().getTime());
        localStorage.setItem("lastAccess", new Date().getTime());
        refreshContext();
    };

    const logoutUser = () => {
        setCurrentUser(null);
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("access_token");
        localStorage.removeItem("lastRefresh");
        localStorage.removeItem("lastAccess");
        setIsAuthenticated(false);
        navigate("/login");
    };

    useEffect(() => {
        if (currentUser == null) {
            setIsAuthenticated(false);
        } else {
            localStorage.setItem("context", JSON.stringify(currentUser));
        }
    }, [currentUser]);

    const value = {
        setCurrentUser,
        sendRequest,
        currentUser,
        isAuthenticated,
        loginUser,
        logoutUser
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
