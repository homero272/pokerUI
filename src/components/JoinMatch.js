import React, { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import JoinMatchList from './JoinMatchList';


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


    return (
        <Fragment>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '100vh',
                flexDirection:'column'

            }}>
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

                <Box sx={{}}>
                <Button variant="contained" color="success" onClick={handleSelectMatch} >
                    Join
                </Button>
            </Box>
            </Box>
            
        </Fragment>

    );
}


export default JoinMatch;