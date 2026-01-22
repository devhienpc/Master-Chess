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
    FormHelperText, Typography, CircularProgress
} from '@mui/material';
import {FooterArea} from '@/Components/General/FooterArea/index.jsx';
import {Link, useNavigate} from "react-router-dom";
import {useAlertContext} from "@/Contexts/AlertContext/AlertContext.jsx";
import {useUser} from "@/Contexts/UserContext.jsx";
import {MainArea} from "@/Components/General/MainArea.jsx";
import NavigationBar from "@/Components/NavigationBar/NavigationBar.jsx";


const IdentifierForm = ({identifier = '', nextPage = null}) => {

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
        identifier: identifier || '',
    });

    const [formErrors, setFormErrors] = useState({
        identifier: '',
    });

    const [loadingResponse, setLoadingResponse] = useState(false);

    const handleInputChange = (field) => (event) => {
        setFormValues(prevValues => ({
            ...prevValues,
            [field]: event.target.value,
        }));
    };

    const handleSubmit = async () => {
        console.log("Submitting login")
        // New form errors object
        const errors = {};

        let errored = false;
        // Basic validations
        for (const field in formValues) {
            console.log(field, formValues[field])
            if (formValues[field] === '') {
                errored = true;
                errors[field] = 'This field is required';
            }
        }

        // Updating errors
        setFormErrors(errors);

        // If there are no errors, you can send the form data to the server or further process
        if (!errored) {
            console.log("No errors, submitting the form!");
            setLoadingResponse(true);

            try {
                const response = await fetch('http://localhost:8080/api/auth/request-password-change', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formValues),
                });

                const data = await response.json();

                console.log(data);

                if (data.error) {
                    createAlert(data.error, 'error');
                } else {
                    createAlert(data.message, 'success');
                    if (nextPage !== null) {
                        nextPage();
                    }
                }
            } catch (e) {
                createAlert(e.message, 'error');
            }
        }
    }

    const showError = (field) => formErrors[field] && formErrors[field] !== '';

    return (
        <>
            {loadingResponse && <CircularProgress/> || (
                <>
                    <Box
                        style={{
                            width: '500px',
                            maxHeight: 'max-content',
                            borderRadius: '10px',
                            boxShadow: '1px 1px 4px 0px black',
                            backgroundColor: 'white',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >

                        <Box style={{
                            width: "100%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '20px'
                        }}>
                            <h1 style={{
                                fontSize: "24px",
                                fontWeight: "400",
                                fontFamily: "Inter"
                            }}>
                                Reset your Password
                            </h1>
                        </Box>

                        <FormControl fullWidth style={{marginBottom: '5px'}}>
                            <TextField
                                required
                                label="Username or Email"
                                value={formValues.identifier}
                                onChange={handleInputChange("identifier")}
                                helperText={formErrors.identifier}
                                error={showError("identifier")}

                            />
                        </FormControl>

                        <Button variant="contained" color="primary" onClick={handleSubmit} style={{marginTop: '20px'}}>
                            Request Verification
                        </Button>


                        <Button variant="contained" onClick={() => {
                            navigate('/login');
                        }} style={{marginTop: '20px', backgroundColor: 'grey', color: 'white'}}>
                            Go Back
                        </Button>
                    </Box>
                </>)}

        </>
    );
};

export default IdentifierForm;
