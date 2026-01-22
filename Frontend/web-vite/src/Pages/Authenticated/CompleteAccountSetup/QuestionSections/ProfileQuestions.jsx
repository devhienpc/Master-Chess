import { Box, Typography, TextField, Button, Input } from '@mui/material';
import React from 'react';

export const ProfileQuestions = () => {
    return (
        <Box sx={{
            minWidth: 700,
            minHeight: 600,
            borderRadius: 2,
            bgcolor: 'white',
            boxShadow: 1,
            position: 'relative',
            padding: '20px',
            boxSizing: 'border-box'
        }}>
            {/* Title */}
            <Box sx={{
                width: '100%',
                textAlign: 'center',
                py: 3
            }}>
                <Typography variant="h3" color="black">
                    Complete your Profile
                </Typography>
            </Box>

            {/* Questions */}
            <Box sx={{
                width: '100%',
                textAlign: 'center',
                py: 3,
                display: 'grid',
                gap: 2,
            }}>
                <TextField
                    required
                    label="Username"
                    value="nick"
                    disabled
                    sx={{ gridColumn: '1 / 2' }}
                />
                <TextField
                    required
                    label="Display Name"
                    sx={{ gridColumn: '1 / 2' }}
                />
                <Box sx={{
                    gridColumn: '2 / 3',
                    gridRow: '1 / 3',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    {/* Current Profile Picture */}
                    <Box sx={{
                        width: 150,
                        height: 150,
                        borderRadius: '50%',
                        bgcolor: 'white',
                        border: '1px solid black'
                    }} />

                    {/* Upload Profile Picture */}
                    <Input type="file" sx={{ mt: 1 }}/>
                </Box>

                <TextField
                    required
                    label="Biography"
                    multiline
                    rows={4}
                    sx={{
                        gridColumn: '1 / 3',
                        gridRow: '3 / 6',
                    }}
                    inputMode={"text"}
                    inputProps={{
                        maxLength: 300
                    }}
                    helperText={"Max Length: 300 Characters"}
                />
            </Box>

            {/* Bottom */}
            <Box sx={{
                height: 60,
                position: 'absolute',
                bottom: 0,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 'calc(100% - 30px)',
            }}>
                <Typography fontWeight="bold">Not Saved</Typography>
                <Button variant="contained">Next</Button>
            </Box>
        </Box>
    );
}
