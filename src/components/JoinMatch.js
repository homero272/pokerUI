import React, { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import JoinMatchList from './JoinMatchList';
import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const heavy = createTheme({
    typography: {
      fontFamily: [
        'heavy',

      ].join(','),
    },
    palette: {
        primary: {
          main: '#9caab7', // replace with your desired hex color
        },
        // ... other color settings
      },
  });


const JoinMatch = (props) =>{
    const handleSelectMatchCallBack =  props.handleSelectMatch;
    let selectedMatch = "";
    
    const handleChoosingMatch = props =>{
        console.log("Selected Match is:", props);
        selectedMatch = props;
    }

    const handleSelectMatch =  props =>{
        console.log("JoinMatch Callback", selectedMatch);
        handleSelectMatchCallBack(selectedMatch);
    }

    const handleReturnToMenu = () => {
        // Stub for handling returning to menu
        props.setActionForMatch(null);
        console.log("Returning to menu...");
    }

    return (
        <Fragment>
            <ThemeProvider theme={heavy}>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '100vh',
                border: 1,
                backgroundColor:"#00000b"
            }}>

            <Box sx={{position: 'absolute', top: 10, left: 10}}>
                <IconButton  onClick={handleReturnToMenu}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <HomeIcon color='primary' fontSize='large'/> {/* Home icon */}
                        <Typography sx={{color:'white'}} variant="caption">Return to Menu</Typography> {/* Subtext */}
                    </Box>
                </IconButton>
            </Box> 
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '70vw',
                    height: '50vh',
                    border: 1                    
                }}>
                    <JoinMatchList arrayOfRooms={props.arrayOfRooms} handleSelectMatch = {handleChoosingMatch}></JoinMatchList>
                </Box>

                <Box sx={{ marginTop: '20px' }}>
                    <Button variant="contained" color="success" onClick={handleSelectMatch} >
                        Join
                    </Button>
                </Box>
            </Box>
            </ThemeProvider>
        </Fragment>
    );
}


export default JoinMatch;
