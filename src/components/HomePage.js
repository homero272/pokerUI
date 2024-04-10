import React, { useEffect, useState } from 'react';
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
    const {socket, user, handleMatchAction, setActionForMatch, handleSelectMatch, setRoomName} = props;
    const userName = user.userName;

    const [avatar,setAvatar] = useState(freeAvatars[user.avatar] || buyableAvatars[user.avatar]);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [money, setMoney] = useState(user.money);
    const [shoppingMenu, setShoppingMenu] = useState(false);
    const [avatarPrice, setAvatarPrice] = useState(0);
    const [message, setMessage] = useState("");
    const [friendsPage, setFriendsPage] = useState(false);
    const [ownedAvatars,setOwnedAvatars] = useState([]);
    const [buttonMessage, setButtonMessage] = useState("Buy");
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [friendsRooms, setFriendsRooms] = useState([]);
    

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

    const handleAvatarClick = (avatarName,avatarPrice,owned) => {
        console.log("Selected Avatar1:", avatarName);
        setSelectedAvatar(avatarName);
        setAvatarPrice(avatarPrice);
        setMessage("");
        if(owned){
            setButtonMessage("Equip");
        }
        else{
            setButtonMessage("Buy and Equip");
        }
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
                const avatarInfo  = await api.searchAvatars(userName);
                setOwnedAvatars(avatarInfo);
                setButtonMessage("Equip");
                setAvatarPrice(0);

                setMessage("Purchased Successfully");
            } catch (error) {
                console.error("Error during updating money:", error);
                //setError("An error occurred during updating money.");
            }
        }
    }

    

    useEffect(() =>{
        socket.on("sendConnectedUsers", (data)=>{
            setOnlineUsers(data);
            console.log(data, "online Users");
        })
        socket.on("sendFriendsRooms", (data)=>{
            setFriendsRooms(data);
            console.log(data, "friends Rooms");
        })

    }, [socket]);

    const handleFriendsPageClick = (boolean) =>{
        console.log("navgating to friends page...");
        setFriendsPage(boolean);
        socket.emit("getConnectedUsers");
        console.log(friendsRooms, "people in games      onlineUsers: ", onlineUsers);

        

    }

    return (
        !shoppingMenu ? friendsPage ? <FriendsPage setRoomName={setRoomName} handleMatchAction = {handleMatchAction} setActionForMatch={setActionForMatch} handleSelectMatch={handleSelectMatch} friendsRooms ={friendsRooms} onlineUsers= {onlineUsers} socket = {socket} user={user} setFriendsPage={setFriendsPage} /> :
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
                overflow: 'auto', // Added overflow to the main container
            }}>
                <Box sx={{ position: 'absolute', top: 10, left: 10 }}>
                    <IconButton onClick={() => handleShopClick(false)}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <HomeIcon color='primary' fontSize='large' />
                            <Typography variant="caption">Return to Menu</Typography>
                        </Box>
                    </IconButton>
                </Box>
                <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                    <Typography>Money: ${money}</Typography>
                </Box>
                <Box sx={{ width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{  marginBottom: 'auto' }}>
                        <Typography variant='h3' mt={4}> Welcome To the Shop</Typography>
                    </Box>
                    <Box sx={{ width: "75vw", height: "75vh", overflowY: 'auto' }}> {/* Adjusted height to 75vh */}
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, mt: 4, border: '1px solid black', p: 2 }}>
                            {Object.entries(ownedAvatars).map(([avatarName, avatarScr]) => (
                                <Avatar
                                    key={avatarScr.avatar}
                                    src={freeAvatars[avatarScr.avatar] || buyableAvatars[avatarScr.avatar]}
                                    onClick={() => handleAvatarClick(avatarScr.avatar, 0, true)}
                                    sx={{ cursor: "pointer", border: selectedAvatar === avatarScr.avatar ? "2px solid blue" : "none", width: 120, height: 120 }}
                                />
                            ))}
                        </Box>
                        <Typography variant='h3' mt={4}> Buyable Avatars</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, mt: 4, border: '1px solid black', p: 2 }}>
                            {Object.entries(buyableAvatars).map(([avatarName, avatarSrc]) => (
                                ownedAvatars.some(obj => obj.avatar === avatarName) ? null : (
                                    <Avatar
                                        key={avatarName}
                                        src={freeAvatars[avatarName] || buyableAvatars[avatarName]}
                                        onClick={() => handleAvatarClick(avatarName, 10000, false)}
                                        sx={{ cursor: "pointer", border: selectedAvatar === avatarName ? "2px solid blue" : "none", width: 120, height: 120 }}
                                    />
                                )
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        
                    }}>
                        <Typography>Price: ${avatarPrice}</Typography>
                        <Button onClick={handleBuyAvatar} variant='contained' color='success' size='large'>
                            {buttonMessage}
                        </Button>
                        {message === "" ? "" :
                            <Typography color={message === "Insufficient Funds!!" ? "red" : "green"}>{message}</Typography>}
                    </Box>
                </Box>
            </Box>
            
    );
    
};

export default Home;
