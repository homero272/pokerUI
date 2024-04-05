import React, { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Fragment } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { red } from '@mui/material/colors';
import { TextField } from '@mui/material';
import API from '../API-Interface/API-Interface';
import SearchIcon from '@mui/icons-material/Search';


const PendingRequestsPage = (props) =>{


    const handleReturnToFriendsPage = () =>{

        props.setPendingFriends(false);
    }
    return (
        <Fragment>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: "100vw",
                    height: '100vh'
                }}>
                    <Box sx={{position: 'absolute', top: 10, left: 0}}>
                        <IconButton  onClick={handleReturnToFriendsPage}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <ArrowBackIcon sx={{ color: red[900] }} fontSize='large'/> {/* Home icon */}
                                <Typography variant="caption">Return to Friends</Typography> {/* Subtext */}
                            </Box>
                        </IconButton>
                    </Box> 
                </Box>
        </Fragment>
    )
}

const AddFriendsPage = (props) => {
    const [searchInput, setSearchInput] = useState("");

    const handleReturnToFriendsPage = () => {
        props.setAddFriends(false);
    }

    const handleSearch = () => {
        // Handle search logic here
        console.log("Searching for:", searchInput);
    }

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    }

    return (
        <Fragment>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: "100vw",
                height: '100vh'
            }}>
                <Box sx={{position: 'absolute', top: 10, left: 0}}>
                    <IconButton  onClick={handleReturnToFriendsPage}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <ArrowBackIcon sx={{ color: red[900] }} fontSize='large'/>
                            <Typography variant="caption">Return to Friends</Typography>
                        </Box>
                    </IconButton>
                </Box>
                <Box sx={{ position: 'absolute', top: 50 }}>
                    <TextField
                        label="Search For Users"
                        variant="outlined"
                        value={searchInput}
                        onChange={handleInputChange}
                    />
                    <IconButton  onClick={handleSearch}  sx={{ }}>
                        <SearchIcon color= 'success' fontSize='large' />
                    </IconButton>
                </Box>
            </Box>
        </Fragment>
    )
}



const FriendsPage = (props) => {
    const { user, setFriendsPage } = props;
    const [addFriends, setAddFriends] = useState(false);
    const [pendingFriends, setPendingFriends] = useState(false);
    const [arrayOfUsers, setArrayOfUsers] = useState(null);
    const [arrayOfFriends, setArrayOfFriends] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const api = new API();
                const allUsers = await api.getAllUsers();
                const friends = await api.showFriends(user.userName, user.userName, 'accepted');
                setArrayOfUsers(allUsers);
                setArrayOfFriends(friends);
                console.log("all user is:", allUsers);
                console.log("all friends for current user: ", friends);
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle error
            }
        };

        fetchData();
    }, [user.userName]);

    const handleReturnToMenu = () => {
        setFriendsPage(false);
    };

    const handleAddFriends = (boolean) => {
        setAddFriends(boolean);
    };
    
    const handlePendingFriends = (boolean) => {
        setPendingFriends(boolean);
    };

    return (
        <>
            {addFriends ? (
                <AddFriendsPage setAddFriends={setAddFriends} />
            ) : pendingFriends ? (
                <PendingRequestsPage setPendingFriends={setPendingFriends} />
            ) : (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: "100vw",
                    height: '100vh'
                }}>
                    <Box sx={{position: 'absolute', top: 10, left: 0}}>
                        <IconButton  onClick={handleReturnToMenu}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <HomeIcon color='primary' fontSize='large'/>
                                <Typography variant="caption">Return to Menu</Typography>
                            </Box>
                        </IconButton>
                    </Box> 
                    <Box sx={{position: 'absolute', top: 100, left: 0}}>
                        <IconButton  onClick={() => handleAddFriends(true)}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <GroupAddIcon color='primary' fontSize='large'/>
                                <Typography variant="caption">Add Friends</Typography>
                            </Box>
                        </IconButton>
                    </Box> 
                    <Box sx={{position: 'absolute', top: 200, left: -5}}>
                        <IconButton  onClick={() => handlePendingFriends(true)}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <AccessTimeIcon color='primary' fontSize='large'/>
                                <Typography variant="caption">Pending Requests</Typography>
                            </Box>
                        </IconButton>
                    </Box> 
                </Box>
            )}
        </>
    );
};

export default FriendsPage;

