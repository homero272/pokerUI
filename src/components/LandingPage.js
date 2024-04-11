import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

const LandingPage = (props) => {
    const [tabValue, setTabValue] = useState(0);
    const{ setLandingPage }= props;
    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleSignIn = () => {
        // Implement sign-in functionality here
        console.log("Sign in button clicked");
        setLandingPage(false);
    };

    return (
        <>
            <AppBar position="absolute" sx={{ bgcolor: '#333333' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
                        App Name
                    </Typography>
                    <Tabs value={tabValue} onChange={handleChangeTab}>
                        <Tab label="Home" sx={{ color: 'white' }} />
                        <Tab label="About" sx={{ color: 'white' }} />
                    </Tabs>
                    <Button color="inherit" onClick={handleSignIn} sx={{ color: 'white' }}>Sign In</Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ paddingTop: '64px' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 'calc(100vh - 64px)', // Adjusted height to fill the remaining space
                        width: '100vw',
                        backgroundColor: '#1f1f1f', // Dark background color
                        color: 'white', // Text color
                        padding: '20px', // Added padding for content
                    }}
                >
                    {tabValue === 0 && (
                        <Box>
                            <Typography variant="h3" gutterBottom>
                                Welcome to Our App
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                This is the home section of our landing page.
                            </Typography>
                            {/* Add more content for the home section as needed */}
                        </Box>
                    )}
                    {tabValue === 1 && (
                        <Box mt={4}>
                            <Typography variant="h4" gutterBottom>
                                About Us
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                This is the about section of our landing page.
                            </Typography>
                            {/* Add more content for the about section as needed */}
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default LandingPage;
