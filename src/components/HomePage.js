import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import avatar1 from "../Avatar1.png";
import avatar2 from "../Avatar2.png";
import { Avatar } from '@mui/material';
const Home = (props) => {
    const socket = props.socket;
    const user = props.user;
    const userName = user.userName;
    const avatar = user.avatar === "avatar1" ? avatar1 : avatar2


    const handleLogout = () =>{
         props.handleSignOut();

    }

    const handleAction = (text) =>{
        console.log("value being passed", text);
        props.handleMatchAction(text);
    }


    console.log(avatar, "Look")
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw',
                backgroundColor: '#f0f0f0', 
            }}
        >
            <Box>
                <Typography variant="h4" gutterBottom>
                    Welcome, {userName}
                </Typography>
                {/* Placeholder for avatar */}
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Avatar src={avatar} sx={{width: 100, height: 100}}/>
                </Box>
            </Box>
            <Box>
                <Button variant="contained" color="primary" sx={{ marginRight: 2 }} onClick={() =>handleAction("create")}>
                    Create Match
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleAction("join")}>
                    Join Match
                </Button>
                
            </Box>
            <Button variant ="contained" color = "error" onClick = {handleLogout}>
                    Logout
            </Button>
        </Box>
    );
};

export default Home;
