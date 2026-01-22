import {Block, Fullscreen, PersonAdd} from "@mui/icons-material";
import React from "react";
import {useNavigate} from "react-router-dom";

import styles from './UserSearchCard.module.css';

export const UserSearchCard = ({userId, username, displayName}) => {
    const navigate = useNavigate();
    return (
        <>
            <div style={{
                width: '90%',
                minHeight: 'max-content',
                padding: '10px',
                paddingBlock: '20px',

                borderRadius: '10px',
                backgroundColor: 'white',

                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',

                boxShadow: '0px 0px, 0px 0px 8px rgb(200,200,200)'
            }}>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '100%',
                            backgroundColor: 'white',

                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid black'

                        }}>

                                                    <span style={{
                                                        fontSize: '32px'
                                                    }}>{username[0]?.toUpperCase()}</span>

                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginLeft: '10px',
                            justifyContent: 'space-between'
                        }}>
                                                    <span style={{
                                                        fontSize: '40px',
                                                        fontWeight: 'bolder',
                                                        fontFamily: 'inter'
                                                    }}>{displayName}</span>

                            <span style={{
                                fontSize: '25px',
                                fontFamily: 'inter',
                                fontWeight: 'normal',
                            }}>@{username}</span>
                        </div>
                    </div>
                </div>

                <div style={{
                    minWidth: 'max-content'
                }}>
                    <div className={styles.CardButton}

                         onClick={() => {
                             navigate('/profile/' + userId);
                         }}
                    >
                        <Fullscreen/>
                        <span style={{marginLeft: '10px', fontFamily: 'inter'}}>View Profile</span>
                    </div>
                </div>

            </div>
        </>
    )
}
