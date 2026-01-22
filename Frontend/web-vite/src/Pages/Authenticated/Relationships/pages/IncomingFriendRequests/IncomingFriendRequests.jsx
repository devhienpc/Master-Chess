import {useEffect, useState} from "react";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const IncomingFriendRequests = ({ visible }) => {

    const navigate = useNavigate();

    const [friendRequests, setFriendRequests] = useState([])


    function fetchIncomingFriendRequests() {
        fetch('http://localhost:8080/api/users/relationship/getReceivedFriendRequests', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            }
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    setFriendRequests(data);
                })
            } else {
                throw new Error("Failed to fetch incoming friend requests");
            }
        })
    }

    useEffect(() => {
        fetchIncomingFriendRequests();

    }, [])

    function denyFriendRequest(userId) {
        fetch("http://localhost:8080/api/users/relationship/cancelFriendRequest?userId=" + userId, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            }
        }).then(response => {
            if (response.ok) {
                setUserData({
                    ...userData,
                    friendRequestSent: false,
                })
            } else {
                throw new Error("Failed to cancel friend request");
            }
        })
    }

    function acceptFriendRequest(userId) {
        fetch("http://localhost:8080/api/users/relationship/acceptFriendRequest?userId=" + userId, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            }
        }).then(response => {
            if (response.ok) {
                setFriendRequests(friendRequests.filter((friendRequest) => {
                    return friendRequest.userId !== userId;
                }))
            } else {
                throw new Error("Failed to accept friend request");
            }
        })
    }

    return (
        <>
            <div style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)', // creates 4 columns
                gap: '20px', // space between grid items
                justifyContent: 'center', // center the grid on the page
                padding: '20px', // optional padding
                visibility: visible ? 'visible' : 'hidden',
                position: visible ? 'relative' : 'fixed',

            }}>
                {friendRequests.map((friendRequest, key) => {
                    return (
                            <div style={{
                                backgroundColor: 'white',
                                paddingTop: '25px',
                                paddingBottom: '25px',
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
                                            {friendRequest.username.substring(0, 1).toUpperCase()}
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
                                        {friendRequest.displayName}
                                    </span>

                                    <span style={{
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        fontFamily: 'Inter',
                                        paddingTop: '5px',
                                        color: 'rgba(0, 0, 0, 0.5)'

                                    }}>
                                        @{friendRequest.username}
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
                                    }} onClick={() => {
                                        acceptFriendRequest(friendRequest.userId);
                                    }}>
                                        Accept
                                    </Button>

                                    <Button variant={'contained'} style={{
                                        marginLeft: '10px',
                                        backgroundColor: 'rgb(239,33,74)',
                                    }} onClick={() => {
                                        cancelFriendRequest(friendRequest.userId);
                                    }}>
                                        Deny
                                    </Button>
                                </div>
                                <div style={{
                                    marginTop: '10px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}>
                                    <Button variant={'contained'} onClick={() => {
                                        navigate('/profile/' + friendRequest.userId);
                                    }}>
                                        View Profile
                                    </Button>
                                </div>
                            </div>
                    )
                })}
            </div>

            {(friendRequests.length === 0 && visible) && <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
            }}>
                    <span style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        fontFamily: 'Inter',
                    }}>
                        No incoming friend requests, check back later!
                    </span>
            </div>
            }
        </>
    )
}