// SearchComponent.js
import React, {useState} from 'react';
import {
    TextField,
    Button,
    Container,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    List, ListItem
} from '@mui/material';
import {MainArea} from "@/Components/General/MainArea.jsx";
import NavigationBar from "@/Components/NavigationBar/NavigationBar.jsx";
import axios from "axios";
import {useAlertContext} from "@/Contexts/AlertContext/AlertContext.jsx";
import {Block, Fullscreen, PersonAdd} from "@mui/icons-material";
import {UserSearchCard} from "@/Components/UserSearchCard/UserSearchCard.jsx";

export default function SearchComponent() {
    const [specifier, setSpecifier] = useState('users');
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const [searched, setSearched] = useState(false);

    const {createAlert} = useAlertContext();
    const handleSpecifierChange = (event) => {
        setSpecifier(event.target.value);
    };

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        setSearched(true);
        try {
            // fetches from the server
            const response = await fetch(`http://localhost:8080/api/users/searchForUsers?searchQuery=${encodeURIComponent(query)}`, {
                method: "GET"
            }).then(function(response) {
                // The response is a Response instance.
                // You parse the data into a useable format using `.json()`
                return response.json();
            }).then(function(data) {
                // `data` is the parsed version of the JSON returned from the above endpoint.
                console.log(data);  // { "userId": 1, "id": 1, "title": "...", "body": "..." }
                setResults(data)
            });
        } catch (err) {
            console.error('Failed to fetch search results:', err);
            setError('Failed to fetch search results');
            setResults([]); // Clear any previous results
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <NavigationBar/>

            <MainArea>
                <div style={{minWidth: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <form onSubmit={handleSubmit} style={{marginTop: '2rem'}}>
                            {/* Search In */}
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="specifier-label">Search In</InputLabel>
                                <Select
                                    labelId="specifier-label"
                                    id="specifier-select"
                                    value={specifier}
                                    label="Search In"
                                    onChange={handleSpecifierChange}
                                >
                                    <MenuItem value="users">Users</MenuItem>
                                    <MenuItem value="matches">Matches</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Search Query */}
                            <TextField
                                fullWidth
                                id="search-query"
                                label="Search Query"
                                margin="normal"
                                value={query}
                                onChange={handleQueryChange}
                            />

                            {/* Search Button */}
                            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                                {loading ? <CircularProgress size={24} /> : 'Search'}
                            </Button>
                        </form>
                        {loading && (
                            <CircularProgress />
                        )}
                        {!loading && error && (
                            <p>Error: {error}</p>
                        )}

                        {!loading && results.length > 0 && (
                            <List style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                minWidth: '100%',
                                marginTop: '25px',
                                minHeight: '100%'
                            }}>

                                {/* list of users */}
                                {results.map((result, index) => (
                                    <ListItem key={index} style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <UserSearchCard userId={result.userId} displayName={result.displayName} username={result.username} />
                                    </ListItem>
                                ))}
                            </List>
                        )}

                    {!loading && searched && results.length === 0 && (
                        <p>No results found</p>
                    )}

                </div>
            </MainArea>
        </>
    );
}
