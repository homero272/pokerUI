import React, { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

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