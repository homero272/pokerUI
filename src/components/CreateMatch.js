import React, { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField,IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
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


const CreateMatch = (props) =>{
    const {handleCreateRoom} = props;

    const [roomName, setRoomName] = useState('');
    const [error, setError] = useState('');


    const handleRoomName = (event) => {
        setRoomName(event.target.value);
        setError("");
    };

    const createRoom = (props) =>{
        console.log(roomName);
        handleCreateRoom(roomName);
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
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '100vh',
                backgroundColor: '#00000b'
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
                width: '50vw',
                height: '50vh',
                border: 1,
                flexDirection: 'column',
                backgroundColor: '#00000b'
            }}>
                <Typography sx={{color:'white'}}> Creating Room</Typography>
                
                <Box sx={{border:1, borderColor:'white',}}>
                <TextField
                        label="Room Name"
                        value={roomName}
                        onChange={handleRoomName}
                        margin="normal"
                        sx={{color:'white'}}
                        InputLabelProps={{
                            style: { color: 'white' } // Style for the label
                        }}


                        // this sets max length of input
                        inputProps={
                        
                            {
                                style: { color: 'white'} ,
                                maxLength: 15
                            }
                        }
                    />
                    </Box>

                    <Button  variant='contained' color='primary' onClick={() =>createRoom()} >
                        Create Match
                    </Button>
            </Box>
            

            </Box>
            </ThemeProvider>
        </Fragment>
    );
}

export default CreateMatch;