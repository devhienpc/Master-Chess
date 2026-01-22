import {useEffect, useState} from "react";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const Friends = ({ visible = false}) => {

    const navigate = useNavigate();

    const [friends, setFriends] = useState([])

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

    function removeFriend(userId) {
        fetch("http://localhost:8080/api/users/relationship/unfriendUser?userId=" + userId, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            }
        }).then(response => {
            if (response.ok) {
                fetchFriends();
            } else {
                throw new Error("Failed to deny friend request");
            }
        })
    }

    return (
        <>
            {/* grid that wraps into rows by 4 and starts from center */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)', // creates 4 columns
                gap: '20px', // space between grid items
                justifyContent: 'center', // center the grid on the page
                padding: '20px', // optional padding

                visibility: visible ? 'visible' : 'hidden',
                position: visible ? 'relative' : 'fixed',

            }}>
                {friends.map((friend, key) => {
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

                                    <Button variant={'contained'} style={{
                                        marginLeft: '10px',
                                        backgroundColor: 'rgb(239,33,74)',
                                    }} onClick={() => {
                                        removeFriend(friend.userId);
                                        setFriends(
                                            friends.filter((friend) => {
                                                return friend.userId !== friend.userId;
                                            })
                                        )
                                    }}>
                                        Unfriend
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
            </div>

            {(friends.length === 0 && visible) && <div style={{
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
                        No friends yet, maybe you should send some friend requests!
                    </span>
            </div>
            }
        </>
    )
}