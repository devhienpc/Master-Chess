import React, {useEffect, useState} from 'react';
import {
    TextField,
    Box,
    LinearProgress,
    Button,
    FormControl,
    MenuItem,
    InputLabel,
    Select,
    FormHelperText, Typography
} from '@mui/material';
import NavigationBar from '../../../Components/NavigationBar/NavigationBar.jsx';
import {FooterArea} from '@/Components/General/FooterArea/index.jsx';
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {useAlertContext} from "@/Contexts/AlertContext/AlertContext.jsx";
import {useUser} from "@/Contexts/UserContext.jsx";
import {MainArea} from "@/Components/General/MainArea.jsx";
import IdentifierForm from "@/Pages/Authentication/ForgotPassword/Forms/IdentifierForm.jsx";
import VerificationForm from "@/Pages/Authentication/ForgotPassword/Forms/VerificationForm.jsx";
import PasswordForm from "@/Pages/Authentication/ChangePassword/Forms/PasswordForm.jsx";
const ForgotPassword = ({identifier = ''}) => {

    const [searchParams] = useSearchParams();
    const identifierParam = searchParams.get('identifier');

    console.log(identifierParam)

    const {createAlert} = useAlertContext();

    const {
        currentUser,
        isAuthenticated,
        loginUser,
        logoutUser,
        registerUser,
        verifyUser
    } = useUser();

    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        identifier: identifierParam || ''
    });

    const [formErrors, setFormErrors] = useState({
        identifier: '',
    });

    const showError = (field) => formErrors[field] && formErrors[field] !== '';

    const [currentPage, setCurrentPage] = useState(0);
    const pages = {
        0: <PasswordForm identifier={identifier} nextPage={() => setCurrentPage(3)}/>,
        1: <Typography variant="h5">Password reset successfully!</Typography>
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    return (
        <>
            <NavigationBar/>
            <MainArea>
                <div style={{height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {pages[currentPage]}
                </div>

                <div style={{width: "100vw", height: "100vh"}}>


                </div>
            </MainArea>

        </>
    );
};

export default ForgotPassword;
