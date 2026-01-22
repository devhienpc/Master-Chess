import {MainArea} from "@/Components/General/MainArea.jsx";
import NavigationBar from "@/Components/NavigationBar/NavigationBar.jsx";
import {Box} from "@mui/system";

import {useState} from "react";

import styles from './Settings.module.css'
import {Account} from "@/Pages/Authenticated/Settings/pages/Account";
import {Security} from "@/Pages/Authenticated/Settings/pages/Security/index.jsx";
import {Privacy} from "@/Pages/Authenticated/Settings/pages/Privacy/index.jsx";
import {Preferences} from "@/Pages/Authenticated/Settings/pages/Preferences/index.jsx";
export const Settings = () => {

    const [activePage, setActivePage] = useState(0)

    return (
        <>
            <NavigationBar/>
            <MainArea>
                <div className={styles.contentContainer}>
                    <div className={styles.settingsTitle}>
                        <h1 style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            fontFamily: 'Inter',
                            paddingBlock: '25px'
                        }}>Settings</h1>
                    </div>
                    <div className={styles.mainContentContainer}>
                        <div className={styles.navigationContainer}>
                            <div className={`${styles.navigationOptionContainer} ${styles.navOptionTop} ${activePage === 0 && styles.navOptionSelected}`}
                                 onClick={() => {
                                     setActivePage(0)
                                 }}>
                                Account
                            </div>

                            <div className={`${styles.navigationOptionContainer} ${activePage === 1 && styles.navOptionSelected}`}
                                 onClick={() => {
                                     setActivePage(1)
                                 }}>
                                Security
                            </div>

                            <div className={`${styles.navigationOptionContainer} ${activePage === 2 && styles.navOptionSelected}`}
                                 onClick={() => {
                                     setActivePage(2)
                                 }}>
                                Privacy
                            </div>

                            <div className={`${styles.navigationOptionContainer} ${styles.navOptionBottom} ${activePage === 3 && styles.navOptionSelected}`}
                            onClick={() => {
                                setActivePage(3)
                            }}>
                                Preferences
                            </div>
                        </div>
                        <div className={styles.pageContainer}>
                            {activePage === 0 && <Account/>}
                            {activePage === 1 && <Security/>}
                            {activePage === 2 && <Privacy/>}
                            {activePage === 3 && <Preferences/>}
                        </div>
                    </div>
                </div>
            </MainArea>
        </>
    )
}

