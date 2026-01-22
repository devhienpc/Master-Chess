import {MainArea} from "@/Components/General/MainArea.jsx";
import NavigationBar from "@/Components/NavigationBar/NavigationBar.jsx";
import {Box} from "@mui/system";

import {useEffect, useState} from "react";

import Styles from './relationships.module.css'

import {Friends} from './pages/Friends/Friends.jsx'
import {Following} from './pages/Following/Following.jsx'
import {Followers} from './pages/Followers/Followers.jsx'
import {Requests} from './pages/Requests.jsx'
import {useParams} from "react-router-dom";
const PageTab = ({area = 'middle', selected = false, onclick = () => {}, children}) => {

    return (
        <div
            className={`${Styles.NavTab} ${selected && Styles.NavTabSelected}`}
            style={{
            padding: '10px',
            paddingInline: '20px',
            borderTopLeftRadius: area === 'left' ? '10px' : '0px',
            borderBottomLeftRadius: area === 'left' ? '10px' : '0px',
            borderTopRightRadius: area === 'right' ? '10px' : '0px',
            borderBottomRightRadius: area === 'right' ? '10px' : '0px',

            borderLeft: area === 'left' ? '2px solid black' : 'none',
            borderRight: area === 'right' ? '2px solid black' : 'none',
            borderBlock: '2px solid black'
        }}

            onClick={onclick}

        >

            <span style={{
                fontSize: '24px',
                fontWeight: 'normal',
                fontFamily: 'Inter',
                paddingBlock: '25px'
            }}>
                {children}
            </span>
        </div>);
}

const pages = {
    friends: 0,
    following: 1,
    followers: 2,
    requests: 3,
}

export const Relationships = () => {


    const [activePage, setActivePage] = useState(
        0
    );

    return (
        <>
            <NavigationBar/>
            <MainArea>
                <Box style={{
                    width: '100vw',
                    height: '100vh',
                }}>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                        <span style={{
                            fontSize: '32px',
                            fontWeight: 'bolder',
                            fontFamily: 'Inter',
                            paddingBlock: '25px'
                        }}>
                            Relationships
                        </span>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            padding: '0px',
                            borderRadius: '10px',
                        }}>
                            <PageTab area={'left'} onclick={() => {
                                setActivePage(0);
                            }} selected={activePage === 0}>
                                Friends
                            </PageTab>
                            <PageTab onclick={() => {
                                setActivePage(1);
                            }} selected={activePage === 1}>
                                Following
                            </PageTab>

                            <PageTab onclick={() => [
                                setActivePage(2)
                            ]} selected={activePage === 2}>
                                Followers
                            </PageTab>

                            <PageTab area={'right'} onclick={() => {
                                setActivePage(3);
                            }} selected={activePage === 3}>
                                Requests
                            </PageTab>
                        </div>
                    </div>
                    <div style={{
                        paddingInline: '10%',
                    }}>
                        <Friends visible={activePage === 0}/>
                        <Following visible={activePage === 1}/>
                        <Followers visible={activePage === 2}/>
                        <Requests visible={activePage === 3}/>
                    </div>
                </Box>
            </MainArea>
        </>
    )
}

