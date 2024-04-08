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
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FriendsPage from './FriendsPage';

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
    const [friendsPage, setFriendsPage] = useState(false);
    const [ownedAvatars,setOwnedAvatars] = useState([]);
    

    const handleLogout = () => {
        props.handleSignOut();
    };

    const handleAction = (text) => {
        console.log("value being passed", text);
        props.handleMatchAction(text);
    };

    const handleShopClick = async(boolean) => {
        setShoppingMenu(boolean);
        console.log("Shop icon clicked");
        setMessage("");
        const api = new API();
        let ownedAvatarList = await api.searchAvatars(userName);
        setOwnedAvatars(ownedAvatarList);
        console.log("ownedAvatarList: ", ownedAvatarList);
        Object.entries(ownedAvatarList).map(([avatarName, avatarScr]) => (
            console.log(avatarScr.avatar, "hello")
            
            
        ))
    };

    const handleAvatarClick = (avatarName,avatarPrice) => {
        console.log("Selected Avatar1:", avatarName);
        setSelectedAvatar(avatarName);
        setAvatarPrice(avatarPrice);
        setMessage("");
        // Do whatever you want with the selected avatar path
        console.log("Selected Avatar:", avatarName);
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
            props.setUser({...user,  avatar:selectedAvatar, money:money-avatarPrice});
            try {
                const userInfo = await api.updateMoney(money - avatarPrice,userName, selectedAvatar);

                //avatars call to save the bought avatar
                await api.insertAvatar(user.userID, userName, selectedAvatar);

                setMessage("Purchased Successfully");
            } catch (error) {
                console.error("Error during updating money:", error);
                //setError("An error occurred during updating money.");
            }
        }
    }

    const handleFriendsPageClick = (boolean) =>{
        console.log("navgating to friends page...");
        setFriendsPage(boolean);
    }

    return (
        !shoppingMenu ? friendsPage ? <FriendsPage user={user} setFriendsPage={setFriendsPage} /> :
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw',
                backgroundColor: '#f0f0f0',
            }}>
                <Box sx={{
                    position: 'absolute',
                    top: 10,
                    left: 10
                }}>
                    <IconButton onClick={() => handleFriendsPageClick(true)}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <PeopleAltIcon fontSize='large' color='primary' />
                            <Typography variant="caption">Friends</Typography>
                        </Box>
                    </IconButton>
                </Box>
                <Box>
                    <Typography variant="h4" gutterBottom>
                        Welcome, {userName}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <Avatar src={avatar} sx={{ border: 1, borderWidth: 2, width: 120, height: 120 }} />
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
                    <IconButton onClick={() => handleShopClick(false)}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <HomeIcon color='primary' fontSize='large' /> {/* Home icon */}
                            <Typography variant="caption">Return to Menu</Typography> {/* Subtext */}
                        </Box>
                    </IconButton>
                </Box>
                <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                    <Typography>Money: ${money}</Typography>
                </Box>
                <Typography variant='h3' mt={4}> Welcome To the Shop</Typography>
                
                {/* Display Owned Avatars at the Top */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, mt: 4, border: '1px solid black', p: 2 }}>
                    {console.log(ownedAvatars, "OWNED AVATARS")}
                {Object.entries(ownedAvatars).map(([avatarName, avatarScr]) => (
                        //console.log(avatarName);
                            <Avatar
                                key={avatarScr.avatar}
                                src={freeAvatars[avatarScr.avatar] || buyableAvatars[avatarScr.avatar]}
                                onClick={() => handleAvatarClick(avatarScr.avatar, 0)} // You can set different prices
                                sx={{ cursor: "pointer", border: selectedAvatar === avatarScr.avatar ? "2px solid blue" : "none", width: 120, height: 120 }}
                            />
                        
                    ))}
                </Box>
                
                <Typography variant='h3' mt={4}> Buyable Avatars</Typography>
                {/* Display Buyable Avatars at the Bottom */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, mt: 4, border: '1px solid black', p: 2 }}>
    {console.log(buyableAvatars, "buyable AVATARS2")}
    {Object.entries(buyableAvatars).map(([avatarName, avatarSrc]) => (
        ownedAvatars.some(obj => obj.avatar === avatarName) ? null : (
            <Avatar
                key={avatarName}
                src={freeAvatars[avatarName] || buyableAvatars[avatarName]}
                onClick={() => handleAvatarClick(avatarName, 10000)} // You can set different prices
                sx={{ cursor: "pointer", border: selectedAvatar === avatarName ? "2px solid blue" : "none", width: 120, height: 120 }}
            /> 
        )
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
                    <Button onClick={handleBuyAvatar} variant='contained' color='success' size='large'>
                        Buy
                    </Button>
                    {message === "" ? "" :
                        <Typography color={message === "Insufficient Funds!!" ? "red" : "green"}>{message}</Typography>}
                </Box>
    
            </Box>
    );
    
};

export default Home;
