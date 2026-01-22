import React, {useState} from 'react';
import {Button, TextField, FormControlLabel, Checkbox, Select, MenuItem, InputLabel, FormControl} from "@mui/material";
import {MainArea} from "@/Components/General/MainArea.jsx";
import NavigationBar from "@/Components/NavigationBar/NavigationBar.jsx";
import {useAlertContext} from "@/Contexts/AlertContext/AlertContext.jsx";
const CreateAlert = () => {
    const {createAlert} = useAlertContext();
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('info');
    const [duration, setDuration] = useState('');
    const [persist, setPersist] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const durationValue = persist ? null : duration ? parseInt(duration) : 5000;
        createAlert(message, severity, durationValue, 'custom', persist);
        // Reset the form
        setMessage('');
        setDuration('');
        setPersist(false);
    };

    return (
        <>
            <NavigationBar/>
            <MainArea>
                <div style={{
                    paddingBlock: '200px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <div style={{
                        height: 'max-content',
                        width: '500px',
                        borderRadius: '10px',
                        border: '1px solid black',
                        padding: '20px',
                    }}>
                    <h2>Create an Alert</h2>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Message"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="severity-label">Severity</InputLabel>
                            <Select
                                labelId="severity-label"
                                value={severity}
                                label="Severity"
                                onChange={(e) => setSeverity(e.target.value)}
                            >
                                <MenuItem value="error">Error</MenuItem>
                                <MenuItem value="warning">Warning</MenuItem>
                                <MenuItem value="info">Info</MenuItem>
                                <MenuItem value="success">Success</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Duration (ms)"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            disabled={persist}
                            type="number"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={persist}
                                    onChange={(e) => setPersist(e.target.checked)}
                                />
                            }
                            label="Persistent (no auto-dismiss)"
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Create Alert
                        </Button>
                    </form>
                    </div>
                </div>
            </MainArea>
        </>
    );
};

export default CreateAlert;
