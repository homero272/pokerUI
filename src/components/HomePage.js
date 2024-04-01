import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar1 from "../Avatar1.png";
import Avatar2 from "../Avatar2.png";
import { Avatar, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; 
import HomeIcon from '@mui/icons-material/Home';

const Home = (props) => {
    const socket = props.socket;
    const user = props.user;
    const userName = user.userName;
    const avatar = user.avatar === "avatar1" ? Avatar1 : Avatar2;
    const [money, setMoney] = useState(user.money);

    const [shoppingMenu, setShoppingMenu] = useState(false);

    const handleLogout = () =>{
         props.handleSignOut();
    }

    const handleAction = (text) =>{
        console.log("value being passed", text);
        props.handleMatchAction(text);
    }

    const handleShopClick = (boolean) => {
        setShoppingMenu(boolean);
        console.log("Shop icon clicked");
    }

    return (
         !shoppingMenu ? 
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
            <Box sx={{ position: 'absolute', top: 10, right: 10, display: 'flex', flexDirection: 'row' }}> {/* Position shop icon */}
                <Box sx={{mr: 20, mt: 1.5}}>
                    <Typography>Money: ${money}</Typography>
                </Box>
                <IconButton onClick={() =>handleShopClick(true)}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <ShoppingCartIcon fontSize='large' />
                        <Typography variant="caption">Shop</Typography> {/* Subtext */}
                    </Box>
                </IconButton>
            </Box>
            <Button variant ="contained" color="error" onClick={handleLogout}>
                Logout
            </Button>
        </Box> 
        :
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#f0f0f0', 
        }}>
            <Box sx={{position: 'absolute', top: 10, left: 10}}>
                <IconButton  onClick={()=>handleShopClick(false)}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <HomeIcon color='primary' fontSize='large'/> {/* Home icon */}
                        <Typography variant="caption">Return to Menu</Typography> {/* Subtext */}
                    </Box>
                </IconButton>
            </Box>
            <Box sx={{position: 'absolute', top: 10, right: 10}}>
                <Typography>Money: ${money}</Typography>       
            </Box>
            <Box sx={{}}>
            <Typography variant='h3'> Welcome To the Shop</Typography>

            </Box>

        </Box>
        
    );
};

export default Home;
