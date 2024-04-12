import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import banner from '../pokerbanner.png';
import logo from '../circleLogo.png';
import logo2 from '../croppedLogo.png';

import { keyframes } from '@emotion/react';
import { AutoAwesome } from '@mui/icons-material';

const LandingPage = (props) => {
    const [tabValue, setTabValue] = useState(0);
    const { setLandingPage } = props;

    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleSignIn = () => {
        // Implement sign-in functionality here
        console.log("Sign in button clicked");
        setLandingPage(false);
    };
    const rotate = keyframes`
    0% {
        transform: rotateY(0deg);
        filter: drop-shadow(5px 5px 15px rgba(255,255, 255, 0.6));
    }
    25% {
        transform: rotateY(90deg);
        filter: drop-shadow(0px 5px 10px rgba(255,255, 255, 0.3));
    }
    50% {
        transform: rotateY(180deg);
        filter: drop-shadow(-5px 5px 5px rgba(255,255, 255,0.1));
    }
    75% {
        transform: rotateY(270deg);
        filter: drop-shadow(0px 5px 10px rgba(255,255, 255, 0.3));
    }
    100% {
        transform: rotateY(360deg);
        filter: drop-shadow(5px 5px 15px rgba(255,255, 255, 0.6));
    }
`;
    return (
        <>
            <AppBar position="absolute" sx={{ bgcolor: '#00000b', height:'14%', justifyContent:'center'}}>
                <Toolbar >
                    {/* Place circular logo here */}
                    <Box
                        sx={{
                            perspective: '500px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            boxShadow: '0px 0px 0px rgba(0,0,0,0.6)',
                            position: 'relative',
                            transition: 'transform 0.5s, box-shadow 0.5s',
                            transform: 'rotateY(0deg)', // Start with no rotation
                            animation: `${rotate} 4s infinite linear`, // Add continuous rotation here
                            '&:hover': {
                                boxShadow: '0px 0px 5px rgba(255, 255, 255, 0.9)', // Move shadow with the rotation
                            },
                            '&:before': {
                                content: '""',
                                display: 'none',
                                position: 'absolute',
                                top: '10%',
                                bottom: '10%',
                                left: 0,
                                right: 0,
                                borderRadius: '50%',
                                transform: 'scale(0.9)',
                                transition: 'transform 0.5s, border 0.5s',
                                zIndex: 1, // Ensure the coin edge is not behind the avatar
                            },
                            zIndex: 2, // The avatar itself should be on top
                        }}
                    >
                        <img src={logo2} alt="Logo" style={{
                                background:'transparent',
                                 zIndex: 2,
                                 width: '100px',
                                 height: '100px',
                                 borderRadius: '50%',
                                 border: '2px solid black',
                                 position: 'relative', }} />
                    </Box>

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
            
            {/* Place banner here */}
            
            
            <Box sx={{ paddingTop: '64px' ,width:'100vw', position: 'fixed', top: '64px', left: '0'  }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 'calc(100vh - 64px)', // Adjusted height to fill the remaining space
                        width: '100vw',
                        backgroundColor: '#00000b', // Dark background color
                        color: 'white', // Text color
                        //paddingBottom:10,
                        overflowX:'auto',
                        //padding: '20px', // Added padding for content
                    }}
                >
                    
                    <img src={banner} alt="Banner" style={{ width: '100vw', maxHeight: '60vh', objectFit: 'cover', position: 'relative', marginTop:'30%'}} />

                    {tabValue === 0 && (
                        
                        <Box sx={{width:'50vw' ,position:'relative'}}>
                            
                            <Typography variant="h3" gutterBottom>
                                Welcome to Our App
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                            landing page.
                            This is the home section of our landing page.
                            Thi

                            </Typography>
                            <Typography variant="body1" gutterBottom>
                            landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.
                            This is the home section of our landing page.

                            </Typography>
                            {/* Add more content for the home section as needed */}
                        </Box>
                    )}
                    {tabValue === 1 && (
                        <Box sx={{width:'50vw' ,position:'relative'}}>
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
