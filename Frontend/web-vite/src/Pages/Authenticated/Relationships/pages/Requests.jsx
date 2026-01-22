import {useState} from "react";
import styles from './Requests.module.css'
import {
    IncomingFriendRequests
} from "@/Pages/Authenticated/Relationships/pages/IncomingFriendRequests/IncomingFriendRequests.jsx";
import {
    OutgoingFriendRequests
} from "@/Pages/Authenticated/Relationships/pages/OutgoingFriendRequests/OutgoingFriendRequests.jsx";

function RequestTab({area = 'middle', selected = false, onClick = () => {}, children}) {
    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

                borderTopLeftRadius: area == 'left' ? '10px' : '0px',
                borderTopRightRadius: area == 'right' ? '10px' : '0px',

                borderLeft: area == 'left' ? '2px solid black' : 'none',
                borderRight: area == 'right' ? '2px solid black' : 'none',
                borderBlock: '2px solid black',

                width: '100%',
            }}
                 className={`${styles.RequestTab} ${selected && styles.RequestTabSelected}`}
                 onClick={onClick}>
                <span style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    fontFamily: 'Inter',
                    paddingBlock: '25px'
                }}>
                    {children}
                </span>
            </div>
        </>
    );
}

export const Requests = ({ visible = false }) => {

    const [activePage, setActivePage] = useState(0)

    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                visibility: visible ? 'visible' : 'hidden',
                position: visible ? 'relative' : 'fixed',
                width: '100%'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    marginTop: '25px',
                }}>
                    <RequestTab area={'left'} selected={activePage === 0} onClick={() => {
                        setActivePage(0);
                    }}>
                        Incoming Friend Requests
                    </RequestTab>

                    <RequestTab area={'right'} selected={activePage === 1} onClick={() => {
                        setActivePage(1);
                    }}>
                        Outgoing Friend Requests
                    </RequestTab>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                }}>
                    <IncomingFriendRequests visible={activePage === 0 && visible} />
                    <OutgoingFriendRequests visible={activePage === 1 && visible} />
                </div>
            </div>
        </>
    )
}