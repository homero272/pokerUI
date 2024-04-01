import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import API from '../API-Interface/API-Interface';
import { Avatar, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; 
import HomeIcon from '@mui/icons-material/Home';
import freeAvatars from "../avatars/FreeAvatars/free";
import buyableAvatars from "../avatars/BuyableAvatars/buy"

const Home = (props) => {
    const socket = props.socket;
    const user = props.user;
    const userName = user.userName;
    const [avatar,setAvatar] = useState(freeAvatars[user.avatar] || buyableAvatars[user.avatar]);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [money, setMoney] = useState(user.money);
    const [shoppingMenu, setShoppingMenu] = useState(false);
    const [avatarPrice, setAvatarPrice] = useState(0);
    const [message, setMessage] = useState("");

    const handleLogout = () => {
        props.handleSignOut();
    };

    const handleAction = (text) => {
        console.log("value being passed", text);
        props.handleMatchAction(text);
    };

    const handleShopClick = (boolean) => {
        setShoppingMenu(boolean);
        console.log("Shop icon clicked");
        setMessage("");
    };

    const handleAvatarClick = (avatarPath,avatarPrice) => {
        setSelectedAvatar(avatarPath);
        setAvatarPrice(avatarPrice);
        setMessage("");
        // Do whatever you want with the selected avatar path
        console.log("Selected Avatar:", avatarPath);
    };
    const handleBuyAvatar = async() =>{
        if(money < avatarPrice){
            console.log("Insufficient Funds!!")
            setMessage("Insufficient Funds!!");
        }
        else{
            console.log("Purchased Successfully!!")
            setMoney(money - avatarPrice);
            const api = new API();
            setAvatar(freeAvatars[selectedAvatar] || buyableAvatars[selectedAvatar]);
            try {
                const userInfo = await api.updateMoney(money - avatarPrice,userName, selectedAvatar);
                setMessage("Purchased Successfully");
            } catch (error) {
                console.error("Error during updating money:", error);
                //setError("An error occurred during updating money.");
            }
        }
    }

    return (
        !shoppingMenu ? 
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#f0f0f0', 
        }}>
            <Box>
                <Typography variant="h4" gutterBottom>
                    Welcome, {userName}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Avatar src={avatar} sx={{ border: 1, borderWidth: 2, width: 120, height: 120 }}/>
                </Box>
            </Box>
            <Box>
                <Button variant="contained" color="primary" sx={{ marginRight: 2 }} onClick={() => handleAction("create")}>
                    Create Match
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleAction("join")}>
                    Join Match
                </Button>
            </Box>
            <Box sx={{ position: 'absolute', top: 10, right: 10, display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ mr: 20, mt: 1.5 }}>
                    <Typography>Money: ${money}</Typography>
                </Box>
                <IconButton onClick={() => handleShopClick(true)}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <ShoppingCartIcon fontSize='large' />
                        <Typography variant="caption">Shop</Typography>
                    </Box>
                </IconButton>
            </Box>
            <Button variant="contained" color="error" onClick={handleLogout}>
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
            <Box sx={{ position: 'absolute', top: 10, left: 10 }}>
                <IconButton  onClick={() => handleShopClick(false)}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <HomeIcon color='primary' fontSize='large'/> {/* Home icon */}
                        <Typography variant="caption">Return to Menu</Typography> {/* Subtext */}
                    </Box>
                </IconButton>
            </Box>
            <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                <Typography>Money: ${money}</Typography>       
            </Box>
            <Typography variant='h3' mt={4}> Welcome To the Shop</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, mt: 4, border: '1px solid black', p: 2 }}>
                {Object.entries(buyableAvatars).map(([avatarName, avatarSrc]) => (
                    <Avatar
                        key={avatarName}
                        src={avatarSrc}
                        onClick={() => handleAvatarClick(avatarName, 10000)}
                        sx={{ cursor: "pointer", border: selectedAvatar === avatarName ? "2px solid blue" : "none", width: 120, height: 120 }}
                    />
                ))}
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 5
            }}>
                <Typography>Price: ${avatarPrice}</Typography>
                <Button onClick = {handleBuyAvatar} variant='contained' color='success' size='large'>
                    Buy
                </Button>
                {message === "" ? "" : 
                <Typography color={message === "Insufficient Funds!!" ? "red" : "green"}>{message}</Typography>}
            </Box>
            
        </Box>
    );
};

export default Home;
