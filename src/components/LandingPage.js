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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import logo2 from '../croppedLogo.png';
import GlobalStyle from './GlobalStyle';
import { keyframes } from '@emotion/react';
import { AutoAwesome } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const normal = createTheme({
    typography: {
      fontFamily: [
        'normal',

      ].join(','),
    },
  });
  const heavy = createTheme({
    typography: {
      fontFamily: [
        'heavy',

      ].join(','),
    },
  });

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
    let rotate = keyframes`
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

/**
 * bgcolor: 'rgba(0,0,0,.9)'
 */
    return (
        <>
        
        <ThemeProvider theme={heavy}>
            <AppBar position="fixed" sx={{ bgcolor: 'rgba(0,0,0,.9)', height:'19%', justifyContent:'center'}}>
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

                    <Typography variant="h6" component="div" sx={{marginLeft:5, flexGrow: 1, color: 'white'}}>
                        POKER
                    </Typography>
                    <Tabs value={tabValue} onChange={handleChangeTab}>
                        <Tab label="Home" sx={{ color: 'white' }} />
                        <Tab label="About" sx={{ color: 'white' }} />
                    </Tabs>
                    <Button color="inherit" onClick={handleSignIn} sx={{ color: 'white' }}>Sign In</Button>
                </Toolbar>
            </AppBar>
            </ThemeProvider>
            {/* Place banner here */}
            
            <ThemeProvider theme={normal}>
            <Box sx={{width:'100vw', position: 'fixed', left: '0'  }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 'calc(100vh)', // Adjusted height to fill the remaining space
                        width: '100vw',
                        backgroundColor: '#00000b', // Dark background color
                        color: 'white', // Text color
                        //paddingBottom:10,
                        overflowX:'auto',
                        //padding: '20px', // Added padding for content
                    }}
                >
                    {/* marginTOp is waht we will make into a ternary to hardcode the banner placement */}
                    <img src={banner} alt="Banner" style={{ width: '100vw', maxHeight: '60vh', objectFit: 'cover', position: 'relative', marginTop:'30%'}} />

                    {tabValue === 0 && (
                        
                        <Box sx={{width:'50vw' ,position:'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                            
                            <Typography variant="h3" gutterBottom>
                                Welcome to Our Poker Game!
                            </Typography>
                            <Typography variant="h4" gutterBottom>
                                Home

                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                Thank you for checking out our app. Below
                                are a few 'How Tos' for user convenience.
                            </Typography>
                            <Box sx={{ pl: 2 }}>
                                <Typography variant="h4" gutterBottom>
                                    Logging In/Creating Account
                                </Typography>
                                <Box component="ul" sx={{ listStyleType: 'disc', marginLeft: '20px', padding: 0 }}>
                                    <Typography component="li" variant="body1">
                                    If you already have an account, simply login and our api will verify that
                                    the info provided is accurate and either successfully log you in, or provide
                                    a helpful message indicating why you weren't logging in
                                    </Typography>
                                    <Typography component="li" variant="body1">
                                    If you dont have an account, no problem! You can create one by giving a unique username, and a password of your choice. 
                                    Your password will be hashed using the bcrypt library, so dont worry about your password being leaked. You will also need 
                                    to select an avatar of your choice to successfully create an account. If creating an account was not successful, you will
                                    also be prompted with a message indicating why it was unsuccessful.
                                    </Typography>

                            </Box>
                            <Box sx={{ pl: 2 }}>
                                <Typography variant="h4" gutterBottom>
                                    HomePage
                                </Typography>
                                <Box component="ul" sx={{ listStyleType: 'disc', marginLeft: '20px', padding: 0 }}>
                                    <Typography component="li" variant="body1">
                                   From the home you will have a few options
                                    </Typography>
                                    <Typography component="li" variant="body1">
                                    You may create a match
                                    </Typography>
                                    <Typography component="li" variant="body1">
                                    You may join a match
                                    </Typography>
                                    <Typography component="li" variant="body1">
                                    You may view the friends page
                                    </Typography>
                                    <Typography component="li" variant="body1">
                                    You may chceck out the shop
                                    </Typography>
                                    <Typography component="li" variant="body1">
                                    You may logout
                                    </Typography>

                            </Box>
                            
                        </Box>
                        <Box sx={{ pl: 2 }}>
                                <Typography variant="h4" gutterBottom>
                                    Friends Page
                                </Typography>
                                <Box component="ul" sx={{ listStyleType: 'disc', marginLeft: '20px', padding: 0 }}>
                                    <Typography component="li" variant="body1">
                                   From the Friends Page you will have a few options
                                    </Typography>
                                    <Typography component="li" variant="body1">
                                    You may view your Friends, will indicate online status, and may join if
                                    in a game
                                    </Typography>
                                    <Typography component="li" variant="body1">
                                    You may search for friends and send them as a request
                                    </Typography>
                                    <Typography component="li" variant="body1">
                                    You may view your pending friend requests and accept/reject their request
                                    </Typography>


                            </Box>
                            
                        </Box>
                        <Box sx={{ pl: 2 }}>
                                <Typography variant="h4" gutterBottom>
                                    Shop Page
                                </Typography>
                                <Box component="ul" sx={{ listStyleType: 'disc', marginLeft: '20px', padding: 0 }}>
                                    <Typography component="li" variant="body1">
                                   From the Shop you will have a few options
                                    </Typography>
                                    <Typography component="li" variant="body1">
                                    You may change any equip any owned avatars
                                    </Typography>
                                    <Typography component="li" variant="body1">
                                    You may purchase any avatars if you have sufficient funds
                                    </Typography>

                            </Box>
                        </Box>
                        <Box sx={{ pl: 2 }}>
                                <Typography variant="h4" gutterBottom>
                                    GamePlay
                                </Typography>
                                <Box component="ul" sx={{ listStyleType: 'disc', marginLeft: '20px', padding: 0 }}>
                                    <Typography component="li" variant="body1">
                                   From the Game you will have a few options
                                    </Typography>
                                    <Typography component="li" variant="body1">
                                    You will be promted with a poker table with chairs that are empty or filled
                                    </Typography>
                                    <Typography component="li" variant="body1">
                                    host will be able to start the game and then players will be dealt their hole cards
                                    which are only visible to yourself. 
                                    </Typography>
                                    <Typography component="li" variant="body1">
                                    From there, just like traditional poker, there will be betting rounds, and after each
                                    betting round, the flop, turn, and river will be revealed
                                    </Typography>
                                    <Typography component="li" variant="body1">
                                    As rounds progress, all hands will be compared and a winner will be determined and displayed
                                    </Typography>

                            </Box>
                        </Box>

                        </Box>
                       
                            {/* Add more content for the home section as needed */}
                        </Box>
                    )}
                    {tabValue === 1 && (
                        <Box sx={{width:'50vw' ,position:'relative'}}>
                            <Typography variant="h4" gutterBottom>
                                About Us
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                
                                This project was created by Diego Rivera, Homero Arellano, and Zach Gassner. 
                                We created this game for our CS470 Senior Research Project Spring 2024. 
                                We specifically decided to do a poker game because we all liked the idea of 
                                creating a multiplayer online game. We thought it would be a nice challenge
                                to utilize new tools such as websockets in order to distribute the state of
                                the game to everyone.
                            </Typography>
                            <Box sx={{ pl: 2 }}>
                                <Typography variant="h4" gutterBottom>
                                    Some Areas of Research
                                </Typography>
                                <Box component="ul" sx={{ listStyleType: 'disc', marginLeft: '20px', padding: 0 }}>
                                    <Typography component="li" variant="body1">
                                    Web Sockets
                                    </Typography>
                                    <Typography component="li" variant="body1">
                                    Poker Rules
                                    </Typography>
                                    <Typography component="li" variant="body1">
                                    API
                                    </Typography>
                                    <Typography component="li" variant="body1">
                                    Database Queries
                                    </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ pl: 2 }}>
                                <Typography variant="h4" gutterBottom>
                                    Hosting Everything
                                </Typography>
                                <Box component="ul" sx={{ listStyleType: 'disc', marginLeft: '20px', padding: 0 }}>
                                    <Typography component="li" variant="body1">
                                    Web Sockets (render.com)
                                    </Typography>
                                    <Typography component="li" variant="body1">
                                    UI - (front-end) - (render.com)
                                    </Typography>
                                    <Typography component="li" variant="body1">
                                    API (render.com)
                                    </Typography>
                                    <Typography component="li" variant="body1">
                                    Database (AWS)
                                    </Typography>
                            </Box>
                        </Box>
                            {/* Add more content for the about section as needed */}
                        </Box>
                    )}
                </Box>
            </Box>
            </ThemeProvider>
            
        </>
    );
};

export default LandingPage;
