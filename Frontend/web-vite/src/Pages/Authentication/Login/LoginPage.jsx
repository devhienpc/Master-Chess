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
import { FooterArea } from '@/Components/General/FooterArea/index.jsx';
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {useAlertContext} from "@/Contexts/AlertContext/AlertContext.jsx";
import {useUser} from "@/Contexts/UserContext.jsx";
import {MainArea} from "@/Components/General/MainArea.jsx";
import TwinklingStars from "@/Components/TwinklingStars.jsx";

const LoginPage = () => {

  const {createAlert} = useAlertContext();
    const [searchParams] = useSearchParams();

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
    identifier: '',
    password: '',

  });

  const [formErrors, setFormErrors] = useState({
    identifier: '',
    password: '',
  });

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
      const redirect = searchParams.get('redirect');

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
        try {
          const response = await fetch("http://localhost:8080/api/auth/login", {
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

              createAlert("Login Failed", "error")

          } else {

              // if redirect is set, redirect to that pa
              if (redirect) {
                  console.log("redirecting to " + redirect)
                  navigate(redirect)
              } else {
                    navigate("/")
              }
              createAlert("Login Successful")
              loginUser(responseData[0], responseData[1])
          }

          // Handle the response data as needed
          // e.g., navigate the user to a dashboard or show a success message
          console.log(responseData);


        } catch (error) {
            // Handle error as needed
            createAlert("Login Failed", "error")
          console.error(error)
        }
      }
    }

    const showError = (field) => formErrors[field] && formErrors[field] !== '';

    const handleForgotPassword = () => {
        // Logic to handle password reset
        navigate("/forgot-password" + (formValues.identifier !== '' ? '?identifier=' + formValues.identifier : '')); // Assuming you'll have a route set up for this
    };
    return (
        <>
          <NavigationBar/>
          <MainArea>
          <div style={{width: "100vw", height: "110vh", position: 'absolute', top: '-5vh', zIndex: 0}}  >

              <TwinklingStars width={'100px'} height={'100px'}/>

          </div>
            <div style={{height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
                    }}> Authentication</h1>
                  </Box>

                  <FormControl fullWidth style={{marginBottom: '5px'}}>
                    <TextField
                        required
                        label="Username or Email"
                        value={formValues.identifier}
                        onChange={handleInputChange("identifier")}
                        helperText={formErrors.identifier}
                    />
                  </FormControl>

                  <FormControl fullWidth style={{marginBlock: '5px'}}>
                    <TextField
                        required
                        label="Password"
                        type="password"
                        value={formValues.password}
                        onChange={handleInputChange("password")}
                        helperText={formErrors.password}
                        error={showError("password")}
                    />
                      <Typography
                          variant="body2"
                          style={{
                              marginTop: '8px', // Adjust as needed for alignment
                              cursor: 'pointer',
                              color: '#1565c0', // Use theme color
                              textDecoration: 'none',
                              fontWeight: 'bold'
                          }}
                          onClick={handleForgotPassword}
                      >
                          Forgot Your Password?
                      </Typography>
                  </FormControl>

                  <Button variant="contained" color="primary" onClick={handleSubmit} style={{marginTop: '20px'}}>
                    Login
                  </Button>

                  <Button variant="outlined" color="primary" style={{marginTop: '20px'}} component={Link} to='/register'>
                    Don't have an Account yet?
                  </Button>
                </Box>
                </div>

              <div style={{width: "100vw", height: "100vh"}}  >


              </div>
          </MainArea>

        </>
    );
  };

export default LoginPage;
