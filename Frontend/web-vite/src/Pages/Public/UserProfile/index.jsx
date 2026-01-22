import React, {useEffect} from 'react';
import NavigationBar from "@/Components/NavigationBar/NavigationBar.jsx";
import {FooterArea} from "@/Components/General/FooterArea/index.jsx";
import {MainArea} from "@/Components/General/MainArea.jsx";
import {Skeleton, Box, Typography, Grid, Button, Link} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";


import styles from './UserProfile.module.css';
import {useUser} from "@/Contexts/UserContext.jsx";

const UserProfile = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {userId} = params;

    const {currentUser} = useUser();

    const [userData, setUserData] = React.useState({
        userId: 1,
        username: 'nick',
        displayName: 'Nicholas Donahue',
        biography: '',

        friendCount: 0,
        followingCount: 0,
        followerCount: 0,

        friends: false,
        friendRequestSent: false,
        requestingFriendship: false,

        following: false, // user is following client
        follower: false, // client is following user

        ownProfile: false,
    });

    useEffect(() => {
        fetch("http://localhost:8080/api/users/getUserProfile?userId=" + userId, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                navigate('/404');
                throw new Error("Failed to fetch user profile");
            }
        }).then(data => {
            setUserData(data);
        }).catch(error => {
            console.log(error);
        })
    }, [])


    function sendFriendRequest() {
        fetch("http://localhost:8080/api/users/relationship/sendFriendRequest?userId=" + userData.userId, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            }
        }).then(response => {
            if (response.ok) {
                setUserData({
                    ...userData,
                    friendRequestSent: true,
                })
            } else {
                throw new Error("Failed to send friend request");
            }
        })
    }

    function cancelFriendRequest() {
        fetch("http://localhost:8080/api/users/relationship/cancelFriendRequest?userId=" + userData.userId, {
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

    function acceptFriendRequest() {
        fetch("http://localhost:8080/api/users/relationship/acceptFriendRequest?userId=" + userData.userId, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            }
        }).then(response => {
            if (response.ok) {
                setUserData({
                    ...userData,
                    friends: true,
                    friendCount: userData.friendCount + 1,
                    requestingFriendship: false,
                })
            } else {
                throw new Error("Failed to accept friend request");
            }
        })
    }

    function denyFriendRequest() {
        fetch("http://localhost:8080/api/users/relationship/denyFriendRequest?userId=" + userData.userId, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            }
        }).then(response => {
            if (response.ok) {
                setUserData({
                    ...userData,
                    requestingFriendship: false,
                })
            } else {
                throw new Error("Failed to deny friend request");
            }
        })
    }

    function removeFriend() {
        fetch("http://localhost:8080/api/users/relationship/unfriendUser?userId=" + userData.userId, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            }
        }).then(response => {
            if (response.ok) {
                setUserData({
                    ...userData,
                    requestingFriendship: false,
                    friends: false,
                    friendRequestSent: false,
                    friendCount: userData.friendCount - 1,
                })
            } else {
                throw new Error("Failed to deny friend request");
            }
        })
    }

    function followUser() {
        fetch("http://localhost:8080/api/users/relationship/followUser?userId=" + userData.userId, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            }
        }).then(response => {
            if (response.ok) {
                setUserData({
                    ...userData,
                    following: true,
                    followerCount: userData.followerCount + 1,
                })
            } else {
                throw new Error("Failed to deny friend request");
            }
        })
    }

    function unfollowUser() {
        fetch("http://localhost:8080/api/users/relationship/unfollowUser?userId=" + userData.userId, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            }
        }).then(response => {
            if (response.ok) {
                setUserData({
                    ...userData,
                    following: false,
                    followerCount: userData.followerCount - 1,
                })
            } else {
                throw new Error("Failed to deny friend request");
            }
        })
    }

    function numberToFormattedString(number) {
        if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + "M";
        } else if (number >= 1000) {
            return (number / 1000).toFixed(1) + "K";
        } else {
            return number;
        }
    }

    useEffect(() => {
        console.log(userData)
    }, [userData]);


    return (
        <>

            <NavigationBar/>
            <MainArea>
                {/* First Section */}
                <Box style={{
                    width: '100vw',
                    minHeight: '100vh',
                }}>

                    <div style={{height: '50px'}}></div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <div style={{
                            marginTop: '25px'
                        }}>
                            <Skeleton variant="circular" width={150} height={150}/>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginTop: '25px'
                        }}>
                            <Typography variant="h4">
                                {userData.displayName}
                            </Typography>
                            <Typography variant="h6" style={{
                                color: 'gray',
                            }}>
                                @{userData.username}
                            </Typography>
                        </div>


                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: '25px',
                            backgroundColor: 'lightgray',
                            borderRadius: '25px',
                            padding: '25px'
                        }}>
                            {/* Friends */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginRight: '25px'
                            }}>
                                <div>
                                    <Typography variant="h6">
                                        {numberToFormattedString(userData.friendCount)}
                                    </Typography>
                                </div>
                                <div>
                                    <Typography variant="h5" fontWeight={"bolder"}>
                                        Friends
                                    </Typography>
                                </div>
                            </div>

                            {/* Following */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                                <div>
                                    <Typography variant="h6">
                                        {numberToFormattedString(userData.followingCount)}
                                    </Typography>
                                </div>
                                <div>
                                    <Typography variant="h5" fontWeight={"bolder"}>
                                        Following
                                    </Typography>
                                </div>
                            </div>

                            {/* Followers */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginLeft: '25px'
                            }}>
                                <div>
                                    <Typography variant="h6">
                                        {numberToFormattedString(userData.followerCount)}
                                    </Typography>
                                </div>
                                <div>
                                    <Typography variant="h5" fontWeight={"bolder"}>
                                        Followers
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        {(!userData.ownProfile && currentUser) && (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: '25px',
                            backgroundColor: 'lightgray',
                            borderRadius: '25px',
                            padding: '25px'
                        }}>
                            {/* Friend Buttons */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginRight: '25px'
                            }}>
                                { userData.requestingFriendship && (
                                    <>
                                    <Button variant="contained" style={{
                                        backgroundColor: 'rgb(118,220,147)',
                                    }} onClick={acceptFriendRequest}>
                                        Accept Friend Request
                                    </Button>

                                    <Button variant="contained" style={{
                                        backgroundColor: 'rgb(239,33,74)',
                                        marginTop: '10px'
                                    }} onClick={cancelFriendRequest}>
                                        Deny Friend Request
                                    </Button>
                                    </>
                                )}

                                {userData.friendRequestSent && (
                                    <Button variant="contained" onClick={cancelFriendRequest} style={{
                                        backgroundColor: 'grey'
                                    }}>
                                        Cancel Request
                                    </Button>
                                )}

                                {userData.friends && (
                                    <Button variant="contained" onClick={removeFriend} style={{
                                        backgroundColor: 'rgb(239,33,74)',
                                    }}>
                                        Unfriend
                                    </Button>
                                )}

                                {(!userData.friends && !userData.friendRequestSent && !userData.requestingFriendship) && (
                                    <Button variant="contained" color="primary" onClick={sendFriendRequest}>
                                        Add Friend
                                    </Button>
                                )}

                            </div>

                            {/* Following Buttons */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                                {userData.following ? (
                                    <Button variant="contained" onClick={unfollowUser} style={{
                                        backgroundColor: 'rgb(239,33,74)',
                                    }}>
                                        Unfollow
                                    </Button>
                                ) : (
                                    <Button variant="contained" color="primary" onClick={followUser}>
                                        Follow
                                    </Button>
                                )}
                            </div>
                        </div>)}

                        {!currentUser && (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: '25px',
                                backgroundColor: 'lightgray',
                                borderRadius: '25px',
                                padding: '25px'
                            }}>
                                <Button component={Link} href={`/login?redirect=${document.location.pathname}`}>Login</Button> or <Button component={Link} href={`/register?redirect=${document.location.pathname}`}>Register</Button> to interact with {userData.username}.
                            </div>
                        )}
                    </div>
                    <div style={{height: '50px'}}></div>

                </Box>
            </MainArea>
        </>
    );
}

export default UserProfile;
