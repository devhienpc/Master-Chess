import { Box, Typography, TextField, Button, Input } from '@mui/material';
import React from 'react';

export const MatchmakingQuestions = () => {
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
                    Matchmaking
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
