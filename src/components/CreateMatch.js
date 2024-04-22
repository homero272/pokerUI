import React, { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField,IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
// const heavy = createTheme({
//     typography: {
//       fontFamily: [
//         'heavy',

//       ].join(','),
//     },
//     palette: {
//         primary: {
//           main: '#9caab7', // replace with your desired hex color
//         },
//         // ... other color settings
//       },
//   });


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
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '100vh',
                backgroundColor: 'lightgray'
            }}>
            <Box sx={{position: 'absolute', top: 10, left: 10}}>
                <IconButton  onClick={handleReturnToMenu}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <HomeIcon color='primary' fontSize='large'/> {/* Home icon */}
                        <Typography variant="caption">Return to Menu</Typography> {/* Subtext */}
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
                backgroundColor: 'lightskyblue'
            }}>
                <Typography> Creating Room</Typography>
                <TextField
                        label="Room Name"
                        value={roomName}
                        onChange={handleRoomName}
                        margin="normal"
                        
                        // this sets max length of input
                        inputProps={
                            {maxLength: 15}
                        }
                    />

                    <Button variant='contained' color='primary' onClick={() =>createRoom()} >
                        Create Match
                    </Button>
            </Box>
            

            </Box>
        </Fragment>
    );
}

export default CreateMatch;