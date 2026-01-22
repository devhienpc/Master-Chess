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
    FormHelperText
} from '@mui/material';
import NavigationBar from '../../../Components/NavigationBar/NavigationBar.jsx';
import {FooterArea} from '@/Components/General/FooterArea/index.jsx';
import {Link, useNavigate} from "react-router-dom";
import {useUser} from "@/Contexts/UserContext.jsx";
import {useAlertContext} from "@/Contexts/AlertContext/AlertContext.jsx";
import {MainArea} from "@/Components/General/MainArea.jsx";
import TwinklingStars from "@/Components/TwinklingStars.jsx";

const RegistrationPage = () => {

    const {
        currentUser,
        isAuthenticated,
        loginUser,
        logoutUser,
        registerUser,
        verifyUser
    } = useUser();

    const {createAlert} = useAlertContext();

    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        username: '',
        emailAddress: '',
        month: '',
        day: '',
        year: '',
        password: '',
        confirmPassword: '',
    });

    const [formErrors, setFormErrors] = useState({
        username: '',
        emailAddress: '',
        month: '',
        day: '',
        year: '',
        password: '',
        confirmPassword: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const setInputError = (field, error) => {
        setFormErrors(prevValues => ({
            ...prevValues,
            [field]: error,
        }));
    };

    const handleInputChange = (field) => (event) => {
        setFormValues(prevValues => ({
            ...prevValues,
            [field]: event.target.value,
        }));
    };


    const handleSubmit = async () => {
        setIsSubmitting(true)
        // New form errors object
        const errors = {};

        // Basic validations
        for (const field in formValues) {
            if (formValues[field] === '') {
                setInputError(field, 'This field is required')
            }
        }

        if (formValues.emailAddress !== '') {
            // Email format validation
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailPattern.test(formValues.emailAddress)) {
                setInputError('emailAddress', 'Invalid email format');
            }
        }

        // Date validation: Ensure age is at least 13 years old
        if (formValues.month && formValues.day && formValues.year) {
            const selectedDate = new Date(formValues.year, months.indexOf(formValues.month), formValues.day);
            const currentDate = new Date();
            let ageDiff = currentDate.getFullYear() - selectedDate.getFullYear();
            const monthDiff = currentDate.getMonth() - selectedDate.getMonth();
            const dayDiff = currentDate.getDate() - selectedDate.getDate();

            if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                ageDiff--;
            }

            if (ageDiff < 13) {
                setInputError('year', 'You must be at least 13 years old to register');
            } else {
                errors.year = ''
                setInputError('year', '')
            }
        }

        // Passwords matching validation
        if (formValues.password !== formValues.confirmPassword) {
            setInputError('confirmPassword', 'Passwords do not match')
        }

        // Updating errors
        // If there are no errors, you can send the form data to the server or further process
        if (Object.values(errors).every((val) => val === "")) {
            console.log("No errors, submitting the form!");
            try {
                const response = await fetch("http://localhost:8080/api/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formValues)
                });


                const responseData = await response.json();
                if (!response.ok) {
                    if (responseData.failure) {
                        let keys = Object.keys(responseData.fields)
                        let values = Object.values(responseData.fields)


                        for (let i = 0; i < keys.length; i++) {
                            setInputError(keys[i], values[i])
                        }
                    }

                    setIsSubmitting(false);


                } else {
                    navigate("/login")
                    createAlert("Account created, please login")
                }

                // Handle the response data as needed
                // e.g., navigate the user to a dashboard or show a success message
                console.log(responseData);

            } catch (error) {
                console.error(error)
            }
        } else {
            setIsSubmitting(false);
        }
    };


    const [daysInMonth, setDaysInMonth] = useState(31);

    const generateYears = (start, end) => {
        return Array.from({length: end - start + 1}, (_, idx) => start + idx);
    };

    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };

    const currentYear = new Date().getFullYear();
    const years = generateYears(1900, currentYear);

    useEffect(() => {
        if (formValues.month === "February") {
            setDaysInMonth(isLeapYear(formValues.year) ? 29 : 28);
        } else if (["April", "June", "September", "November"].includes(formValues.month)) {
            setDaysInMonth(30);
        } else {
            setDaysInMonth(31);
        }
    }, [formValues.month, formValues.year]);

    const showError = (field) => formErrors[field] && formErrors[field] !== '';

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];


    return (
        <>
            <NavigationBar/>

            <MainArea>
                <div style={{width: "100vw", height: "110vh", position: 'absolute', top: '-5vh', zIndex: 0}}>

                    <TwinklingStars width={'100px'} height={'100px'}/>

                </div>
                <div style={{
                    height: "70vh",
                    paddingBlock: '100px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                    <Box
                        style={{
                            width: '500px',
                            minHeight: '420px',
                            borderRadius: '10px',
                            boxShadow: '1px 1px 4px 0px black',
                            backgroundColor: 'white',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            zIndex: 1
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
                            }}>Account Registration</h1>
                        </Box>

                        <FormControl fullWidth style={{marginBottom: '5px'}}>
                            <TextField
                                required
                                label="Username"
                                value={formValues.username}
                                onChange={handleInputChange("username")}
                                helperText={formErrors.username}
                                error={showError("username")}
                            />
                        </FormControl>

                        <FormControl fullWidth style={{marginBlock: '5px'}}>
                            <TextField
                                required
                                label="Email Address"
                                value={formValues.emailAddress}
                                onChange={handleInputChange("emailAddress")}
                                helperText={formErrors.emailAddress}
                                error={showError("emailAddress")}
                            />
                        </FormControl>

                        <Box display="flex" gap={2} style={{marginBlock: '5px'}}>
                            <FormControl required fullWidth style={{marginInlineEnd: "5px"}}>
                                <InputLabel id="month-select-label">Birth Month</InputLabel>
                                <Select
                                    labelId="month-select-label"
                                    id="month-select"
                                    label="Birth Month"
                                    value={formValues.month}
                                    onChange={handleInputChange('month')}
                                    error={showError("month")}
                                >
                                    {months.map(month => (
                                        <MenuItem key={month} value={month}>{month}</MenuItem>
                                    ))}
                                </Select>
                                {showError('month') && <FormHelperText>{formErrors.month}</FormHelperText>}
                            </FormControl>

                            <FormControl error={showError('day')} required fullWidth style={{marginInline: "5px"}}>
                                <InputLabel id="day-select-label">Birth Day</InputLabel>
                                <Select
                                    labelId="day-select-label"
                                    id="day-select"
                                    label="Birth Day"
                                    value={formValues.day}
                                    onChange={handleInputChange('day')}
                                    error={showError("day")}

                                >
                                    {Array.from({length: daysInMonth}, (_, idx) => idx + 1).map(day => (
                                        <MenuItem key={day} value={day}>{day}</MenuItem>
                                    ))}
                                </Select>
                                {showError('day') && <FormHelperText>{formErrors.day}</FormHelperText>}
                            </FormControl>

                            <FormControl error={showError('year')} required fullWidth
                                         style={{marginInlineStart: "5px"}}>
                                <InputLabel id="year-select-label">Birth Year</InputLabel>
                                <Select
                                    labelId="year-select-label"
                                    id="year-select"
                                    label="Birth Year"
                                    value={formValues.year}
                                    onChange={handleInputChange('year')}
                                    error={showError("year")}

                                >
                                    {years.map(year => (
                                        <MenuItem key={year} value={year}>{year}</MenuItem>
                                    ))}
                                </Select>
                                {showError('year') && <FormHelperText>{formErrors.year}</FormHelperText>}
                            </FormControl>
                        </Box>

                        <FormControl fullWidth style={{marginBlock: '5px'}}>
                            <TextField
                                required
                                type="password"
                                label="Password"
                                value={formValues.password}
                                onChange={handleInputChange("password")}
                                helperText={formErrors.password}
                                error={showError("password")}

                            />
                        </FormControl>

                        <FormControl fullWidth style={{marginTop: "5px"}}>
                            <TextField
                                required
                                type="password"
                                label="Confirm Password"
                                value={formValues.confirmPassword}
                                onChange={handleInputChange("confirmPassword")}
                                helperText={formErrors.confirmPassword}
                                error={showError("confirmPassword")}

                            />
                        </FormControl>

                        <Button variant="contained" color="primary" onClick={handleSubmit} style={{marginTop: '20px'}}
                                disabled={isSubmitting}>
                            Register
                        </Button>

                        <Button variant="outlined" color="primary" style={{marginTop: '20px'}} component={Link}
                                to='/login'>
                            Already have an Account?
                        </Button>
                    </Box>
                </div>

                <div style={{width: "100vw", height: "100vh"}}>


                </div>
            </MainArea>

        </>
    );
};

export default RegistrationPage;
