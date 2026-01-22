import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PageNotFound from '../Pages/Errors/PageNotFound.jsx'
import LandingPage from '../Pages/Public/LandingPage/LandingPage.jsx'
import LoginPage from '../Pages/Authentication/Login/LoginPage.jsx'
import RegistrationPage from '../Pages/Authentication/Registration/RegistrationPage.jsx'
import VerificationPage from "../Pages/Authentication/Verify/VerificationPage.jsx";
import {Dashboard} from "../Pages/Authenticated/Dashboard";
import {Match} from "@/Pages/Match/index.jsx";
import UserProfile from "@/Pages/Public/UserProfile/index.jsx";
import { useUser } from "@/Contexts/UserContext.jsx";
import loginPage from "../Pages/Authentication/Login/LoginPage.jsx";
import Play from "@/Pages/Authenticated/Play/index.jsx";
import SearchComponent from "@/Pages/Public/SearchPage/SearchPage.jsx";
import CreateAlert from "@/Private/CreateAlert/index.jsx";
import ForgotPassword from "@/Pages/Authentication/ForgotPassword";
import {Settings} from "@/Pages/Authenticated/Settings/index.jsx";
import ChangePassword from "@/Pages/Authentication/ChangePassword/index.jsx";
import AboutPage from "@/Pages/Public/AboutPage/AboutPage.jsx";
import {CompleteAccountSetup} from "@/Pages/Authenticated/CompleteAccountSetup/index.jsx";
import {Relationships} from "@/Pages/Authenticated/Relationships/index.jsx";  // import the hook

function RouteComponent() {
    const { isAuthenticated } = useUser(); // get the authentication status

    return (
        <Routes basename="/">
            {/* Use conditional rendering for the root route */}
            {isAuthenticated ? (
                <>
                    <Route path='/' element={<Dashboard/>} />

                    <Route path='/dashboard' element={<Dashboard/>} />

                    <Route path='/login' element={<Dashboard />} />
                    <Route path='/register' element={<Dashboard />} />

                    <Route path='/play' element={<Play />} />
                    <Route path={'/createAlert'} element={<CreateAlert />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />

                    <Route path='/settings' element={<Settings />} />

                    <Route path='/relationships' element={<Relationships/>} />
                    <Route path='/relationships/:relationshipPage' element={<Relationships/>} />

                    <Route path='/complete-account-setup' element={<CompleteAccountSetup/>} />

                </>

            ) : (
                <>
                    <Route path='/' element={<LandingPage/>} />

                    <Route path='/dashboard' element={<LandingPage/>} />

                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegistrationPage />} />

                    <Route path='/play' element={<LandingPage />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />

                </>
            )}
            {/* Authentication */}
            <Route path='/verify' element={<VerificationPage />} />

            {/* Authenticated */}
            <Route path='/profile/:userId' element={<UserProfile />} />


            {/* Match */}
            <Route path='/match/:matchId' element={<Match />} />
            <Route path='/search' element={<SearchComponent />} />
            <Route path='/change-password' element={<ChangePassword/>} />
            <Route path='/about' element={<AboutPage/>} />

            {/* Errors */}
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    )
}

export default RouteComponent;
