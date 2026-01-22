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
import { FooterArea } from '@/Components/General/FooterArea/index.jsx';
import {Link, useNavigate} from "react-router-dom";
import {useAlertContext} from "@/Contexts/AlertContext/AlertContext.jsx";
import {useUser} from "@/Contexts/UserContext.jsx";
import {MainArea} from "@/Components/General/MainArea.jsx";
import NavigationBar from "@/Components/NavigationBar/NavigationBar.jsx";
import {CheckCircle, Circle, CircleOutlined} from "@mui/icons-material";

const PasswordForm = ({identifier=''}) => {

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
        password: '',
        confirmPassword: ''
    });

    const [formErrors, setFormErrors] = useState({
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (field) => (event) => {
        setFormValues(prevValues => ({
            ...prevValues,
            [field]: event.target.value,
        }));
    };

    const handleSubmit = async () => {
        console.log("Submitting form");

        // New form errors object
        const errors = {};

        let errored = false;
        // Basic validations
        for (const field in formValues) {
            if (formValues[field] === '') {
                errored = true;
                errors[field] = 'This field is required';
            }
        }

        // Check if passwords match
        if (formValues.password !== formValues.confirmPassword) {
            errored = true;
            errors.confirmPassword = "Passwords don't match";
        }

        // Check if all password requirements are met
        const allRequirementsMet = Object.values(passwordRequirements).every(Boolean);
        if (!allRequirementsMet) {
            errored = true;
            errors.password = 'Password does not meet all requirements';
        }

        // Updating errors
        setFormErrors(errors);

        // If there are no errors, you can send the form data to the server or further process
        if (!errored) {
            console.log("All checks passed, submitting the form!");
            try {
                const response = await fetch("http://localhost:8080/api/auth/change-password", { // Make sure this URL is correct for changing the password
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("access_token")
                    },
                    body: JSON.stringify({ password: formValues.password })
                });

                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message || 'An error occurred');
                }

                navigate("/login"); // Or whatever the appropriate route is
                createAlert("Password changed successfully");
                // You may also want to logout the user or ask them to login again with the new password

            } catch (error) {
                console.error(error);
                createAlert("An error occurred while changing the password", "error");
            }
        }
    };

    const showError = (field) => formErrors[field] && formErrors[field] !== '';


    const [passwordRequirements, setPasswordRequirements] = useState({
        minLength: false,
        oneUpper: false,
        oneLower: false,
        oneNumber: false,
        oneSpecial: false,
    });

    const updatePasswordRequirements = (password) => {
        setPasswordRequirements({
            minLength: password.length >= 8,
            oneUpper: /[A-Z]/.test(password),
            oneLower: /[a-z]/.test(password),
            oneNumber: /[0-9]/.test(password),
            oneSpecial: /[^A-Za-z0-9]/.test(password),
        });
    };

    // Existing handleInputChange remains unchanged

    useEffect(() => {
        updatePasswordRequirements(formValues.password);
    }, [formValues.password]);

    const RequirementCircle = ({ met }) => {
        return met ? (
            <CheckCircle style={{ color: 'black' }} />
        ) : (
            <CircleOutlined style={{ color: 'black' }} />
        );
    };


    return (
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
                    flexDirection: 'column',
                    marginBottom: '20px'
                }}>
                    <h1 style={{
                        fontSize: "24px",
                        fontWeight: "400",
                        fontFamily: "Inter"
                    }}>
                        Change your Password
                    </h1>

                </Box>

                <FormControl fullWidth style={{}}>
                    <TextField
                        required
                        label="New Password"
                        type="password"
                        value={formValues.password}
                        onChange={handleInputChange("password")}
                        helperText={formErrors.password}
                        error={showError("password")}
                    />
                </FormControl>

                <Box style={{ marginBlock: "10px"}}>
                    <Box display="flex" flexDirection="column" alignItems="flex-start">
                        <Box display="flex" alignItems="center">
                            <RequirementCircle met={passwordRequirements.minLength} />
                            <Typography variant="body2" style={{ marginLeft: '5px' }}>
                                At least 8 characters
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <RequirementCircle met={passwordRequirements.oneUpper} />
                            <Typography variant="body2" style={{ marginLeft: '5px' }}>
                                At least one uppercase letter
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <RequirementCircle met={passwordRequirements.oneLower} />
                            <Typography variant="body2" style={{ marginLeft: '5px' }}>
                                At least one lowercase letter
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <RequirementCircle met={passwordRequirements.oneNumber} />
                            <Typography variant="body2" style={{ marginLeft: '5px' }}>
                                At least one number
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <RequirementCircle met={passwordRequirements.oneSpecial} />
                            <Typography variant="body2" style={{ marginLeft: '5px' }}>
                                At least one special character
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <FormControl fullWidth style={{marginTop: "5px"}}>
                    <TextField
                        required
                        type="password"
                        label="Confirm your new Password"
                        value={formValues.confirmPassword}
                        onChange={handleInputChange("confirmPassword")}
                        helperText={formErrors.confirmPassword}
                        error={showError("confirmPassword")}

                    />
                </FormControl>


                <Button variant="contained" color="primary" onClick={handleSubmit} style={{marginTop: '20px'}}>
                    Confirm
                </Button>
            </Box>

        </>
    );
};

export default PasswordForm;
