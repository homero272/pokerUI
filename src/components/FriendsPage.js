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
import { TextField} from '@mui/material';
import API from '../API-Interface/API-Interface';
import SearchIcon from '@mui/icons-material/Search';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import {List, Button} from '@mui/material';
import {ListItem} from '@mui/material';
import freeAvatars from "../avatars/FreeAvatars/free";
import buyableAvatars from "../avatars/BuyableAvatars/buy"
import AddIcon from '@mui/icons-material/Add';
import ClockIcon from '@mui/icons-material/AccessTime';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
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


const PendingRequestsPage = (props) => {
    const { arrayOfRequests, arrayOfUsers, user } = props;
    const [receivedRequests, setReceivedRequests] = useState(arrayOfRequests.filter(request => request.userName2 === user.userName));
    const [outgoingRequests] = useState(arrayOfRequests.filter(request => request.userName1 === user.userName));

    const handleReturnToFriendsPage = () => {
        props.setPendingFriends(false);
    }

    const handleAcceptFriendRequest = async(requestsUserName, requestUserID) => {
        console.log(`Accepting ${requestsUserName} with ID of ${requestUserID}`);
        // Remove the request from receivedRequests
        setReceivedRequests(prevRequests => prevRequests.filter(request => request.userName1 !== requestsUserName));
        const api = new API();
        api.acceptFriend(requestUserID, user.userID);
    }

    const handleRejectFriendRequest = async(requestsUserName, requestUserID) => {
        console.log(`Rejecting ${requestsUserName} with ID of ${requestUserID}`);
        // Remove the request from receivedRequests
        setReceivedRequests(prevRequests => prevRequests.filter(request => request.userName1 !== requestsUserName));
        const api = new API();
        api.rejectFriend(requestUserID, user.userID);

    }



    return (
        <Fragment>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: "100vw",
                height: '100vh',
                backgroundColor:'#00000b'
            }}>
                <Box sx={{ position: 'absolute', top: 10, left: 0 }}>
                    <IconButton onClick={handleReturnToFriendsPage}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <ArrowBackIcon sx={{ color: red[900] }} fontSize='large' />
                            <Typography sx={{color:'white'}} variant="caption">Return to Friends</Typography>
                        </Box>
                    </IconButton>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '100px' }}> {/* Display list vertically with padding */}
                    <Typography sx={{color:'white'}} variant="h6">Received Requests:</Typography>
                    {receivedRequests.map((friend) => {
                        // Get friend's user name (either userName1 or userName2)
                        const friendUserName = friend.userName1 !== user.userName ? friend.userName1 : friend.userName2;

                        // Find the friend's details from arrayOfUsers using their username
                        const friendDetails = arrayOfUsers.find(user => user.userName === friendUserName);

                        // Render list item if friend details are found
                        if (friendDetails) {
                            return (
                                <List key={friendDetails.userName} sx={{ border: 1, width: '100%', maxWidth: 360, bgcolor: 'lightgrey' }}>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt={friendDetails.userName} src={freeAvatars[friendDetails.avatar] || buyableAvatars[friendDetails.avatar]} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={friendDetails.userName}
                                            secondary={
                                                <Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {friendDetails.stats}
                                                    </Typography>
                                                    {" — Main Page..."}
                                                </Fragment>
                                            }
                                        />
                                        <IconButton onClick={() => handleAcceptFriendRequest(friendDetails.userName, friendDetails.userID)}>
                                            <CheckIcon sx={{ color: 'green' }} />
                                        </IconButton>
                                        <IconButton onClick={() => handleRejectFriendRequest(friendDetails.userName, friendDetails.userID)}>
                                            <CloseIcon sx={{ color: 'red' }} />
                                        </IconButton>
                                    </ListItem>
                                </List>
                            );
                        } else {
                            return null; // If friend details are not found, don't render anything
                        }
                    })}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '100px' }}> {/* Display list vertically with padding */}
                    <Typography sx={{color:'white'}} variant="h6">Outgoing Requests:</Typography>
                    {outgoingRequests.map((friend) => {
                        // Get friend's user name (either userName1 or userName2)
                        const friendUserName = friend.userName1 !== user.userName ? friend.userName1 : friend.userName2;

                        // Find the friend's details from arrayOfUsers using their username
                        const friendDetails = arrayOfUsers.find(user => user.userName === friendUserName);

                        // Render list item if friend details are found
                        if (friendDetails) {
                            return (
                                <List key={friendDetails.userName} sx={{ border: 1, width: '100%', maxWidth: 360, bgcolor: 'lightgrey' }}>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt={friendDetails.userName} src={freeAvatars[friendDetails.avatar] || buyableAvatars[friendDetails.avatar]} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={friendDetails.userName}
                                            secondary={
                                                <Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {friendDetails.stats}
                                                    </Typography>
                                                    {" — Main Page..."}
                                                </Fragment>
                                            }
                                        />
                                    </ListItem>
                                </List>
                            );
                        } else {
                            return null; // If friend details are not found, don't render anything
                        }
                    })}
                </Box>
            </Box>
        </Fragment>
    );
}






const AddFriendsPage = (props) => {
    const { setArrayOfRequests,arrayOfFriends, arrayOfUsers, user, arrayOfRequests } = props;
    const [searchInput, setSearchInput] = useState("");
    const [filteredSearchResults, setFilteredSearchResults] = useState([]);

    const handleReturnToFriendsPage = () => {
        props.setAddFriends(false);
    }

    const handleSearch = async () => {
        console.log("Searching for:", searchInput);
        
        const api = new API();
        const requests = await api.showFriends(user.userName, user.userName, 'pending');
        setArrayOfRequests(requests);
        const searchResults = await api.searchFriends(searchInput);

        // Filter out the current user
        const filteredResultsWithoutCurrentUser = searchResults.filter(result => {
            return result.userName !== user.userName;
        });

        // Filter out already added friends
        const filteredResults = filteredResultsWithoutCurrentUser.filter(result => {
            return !arrayOfFriends.some(friend => friend.userName1 === result.userName || friend.userName2 === result.userName);
        });

        setFilteredSearchResults(filteredResults);
    }


    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
        
    }

    const handleAddFriend = async (recieverUserName, recieverUserId, index) => {
        // Implement the logic to add the friend using the userName and userId
        console.log("Adding friend:", recieverUserName, recieverUserId);
        const api = new API();
        const result = await api.addFriend(user.userID, user.userName, recieverUserId, recieverUserName, 'pending');
        console.log("adding friend returned:", result);

        // Update the filteredSearchResults to replace the AddIcon with the ClockIcon
        const updatedResults = [...filteredSearchResults];
        updatedResults[index] = { ...updatedResults[index], isRequestPending: true };
        setFilteredSearchResults(updatedResults);
    }

    return (
        <Fragment>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: "100vw",
                height: '100vh',
                backgroundColor:'#00000b'
            }}>
                <Box sx={{ position: 'absolute', top: 10, left: 0 }}>
                    <IconButton onClick={handleReturnToFriendsPage}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <ArrowBackIcon sx={{ color: red[900] }} fontSize='large' />
                            <Typography sx={{color:'white'}} variant="caption">Return to Friends</Typography>
                        </Box>
                    </IconButton>
                </Box>
                <Box sx={{ position: 'absolute', top: 50 ,display:'flex', flexDirection:'row'}}>
                    <Box sx={{border:1, borderColor:'white'}}>

                    
                    

                    
                    <TextField
                        
                        label="Search For Users"
                        variant="outlined"
                        value={searchInput}
                        onChange={handleInputChange}
                        InputLabelProps={{
                            style: { color: 'white' } // Style for the label
                        }}
                        InputProps={{
                            style: { color: 'white' },
                            // Style for the input field
                        }}
                    /></Box>
                    
                    <IconButton onClick={handleSearch}>
                        <SearchIcon color='success' fontSize='large' />
                    </IconButton>
                </Box>
                {/* Render filtered search results */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',

                }}>
                    {filteredSearchResults.map((friendDetails, index) => {
                        // Check if the user is already in arrayOfRequests
                        const isRequestPending = arrayOfRequests.some(request => request.userName1 === friendDetails.userName || request.userName2 === friendDetails.userName);

                        return (
                            <List key={friendDetails.userName} sx={{ border: 1, width: '100%', maxWidth: 360, bgcolor: 'lightgrey' }}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt={friendDetails.userName} src={freeAvatars[friendDetails.avatar] || buyableAvatars[friendDetails.avatar]} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={friendDetails.userName}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {friendDetails.stats}
                                                </Typography>
                                                {" — Additional details here..."}
                                            </React.Fragment>
                                        }
                                    />
                                    {/* Render ClockIcon if request is pending, otherwise render AddIcon */}
                                    {friendDetails.isRequestPending || isRequestPending ? (
                                        <ClockIcon sx={{ color: 'black' }} fontSize='large' />
                                    ) : (
                                        <IconButton onClick={() => handleAddFriend(friendDetails.userName, friendDetails.userID, index)}>
                                            <AddIcon sx={{ color: 'white' }} fontSize='large' />
                                        </IconButton>
                                    )}
                                </ListItem>
                            </List>
                        );
                    })}
                </Box>
            </Box>
        </Fragment>
    );
}


const FriendsPage = (props) => {
    const { user, setFriendsPage, socket, onlineUsers, friendsRooms, handleMatchAction, setActionForMatch, handleSelectMatch, setRoomName} = props;
    const [addFriends, setAddFriends] = useState(false);
    const [pendingFriends, setPendingFriends] = useState(false);
    const [arrayOfUsers, setArrayOfUsers] = useState([]);
    const [arrayOfFriends, setArrayOfFriends] = useState([]);
    const [arrayOfRequests, setArrayOfRequests] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const api = new API();
                const allUsers = await api.getAllUsers();
                const friends = await api.showFriends(user.userName, user.userName, 'accepted');
                const requests = await api.showFriends(user.userName, user.userName, 'pending');

                setArrayOfUsers(allUsers);
                setArrayOfFriends(friends);
                setArrayOfRequests(requests);
                console.log("all user is:", allUsers);
                console.log("all friends for current user: ", friends);
                console.log("requests for user", requests)
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle error
            }
        };

        fetchData();
    }, [user.userName, addFriends, pendingFriends]);

    const handleReturnToMenu = () => {
        setFriendsPage(false);
    };

    const handleAddFriends = (boolean) => {
        setAddFriends(boolean);
    };
    
    const handlePendingFriends = (boolean) => {
        setPendingFriends(boolean);
    };
    const handleJoinGame = async (room) =>{
        console.log("room passed is: ", room);
        setActionForMatch("done");
        setRoomName(room);
        socket.emit("playerJoined", {userName: user.userName, room: room});
        props.setPlayerMoney(props.playerMoney - 10000);
        const api = new API();
        try {
            const userInfo = await api.updateGameMoney(props.playerMoney-10000,props.user.userName);

        }catch (error) {
            console.error("Error during updating money:", error);
            //setError("An error occurred during updating money.");
        }
    }

    return (
        <>
        <ThemeProvider theme={heavy}>
            {addFriends ? (
                <AddFriendsPage user={user}  setArrayOfRequests={setArrayOfRequests} arrayOfRequests={arrayOfRequests} arrayOfFriends={arrayOfFriends} arrayOfUsers={arrayOfUsers} setAddFriends={setAddFriends} />
            ) : pendingFriends ? (
                <PendingRequestsPage user={user} setPendingFriends={setPendingFriends} arrayOfUsers={arrayOfUsers} arrayOfRequests={arrayOfRequests}/>
            ) : (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: "100vw",
                    height: '100vh',
                    backgroundColor:'#00000b'
                }}>
                    <Box sx={{position: 'absolute', top: 10, left: 0}}>
                        <IconButton  onClick={handleReturnToMenu}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <HomeIcon color='primary' fontSize='large'/>
                                <Typography sx={{color:'white'}} variant="caption">Return to Menu</Typography>
                            </Box>
                        </IconButton>
                    </Box> 
                    <Box sx={{position: 'absolute', top: 100, left: 0}}>
                        <IconButton  onClick={() => handleAddFriends(true)}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <GroupAddIcon color='primary' fontSize='large'/>
                                <Typography sx={{color:'white'}} variant="caption">Add Friends</Typography>
                            </Box>
                        </IconButton>
                    </Box> 
                    <Box sx={{position: 'absolute', top: 200, left: -5}}>
                        <IconButton  onClick={() => handlePendingFriends(true)}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <AccessTimeIcon color='primary' fontSize='large'/>
                                <Typography sx={{color:'white'}} variant="caption">Pending Requests</Typography>
                            </Box>
                        </IconButton>
                    </Box> 
                    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', padding: '100px' }}>
    {/* Display list vertically with padding */}
    <Typography sx={{color:'white'}} variant="h6">My Friends:</Typography>
    {arrayOfFriends.map((friend) => {
        // Get friend's user name (either userName1 or userName2)
        const friendUserName = friend.userName1 !== user.userName ? friend.userName1 : friend.userName2;

        // Find the friend's details from arrayOfUsers using their username
        const friendDetails = arrayOfUsers.find(user => user.userName === friendUserName);
        const onlineUser = onlineUsers.find(user => user.user === friendUserName);
        const friendsInRoom = friendsRooms.find(user => user.userName === friendUserName);

        // Determine if the friend is online
        const isOnline = onlineUser !== undefined;

        // Log friendsInRoom to console for debugging
        console.log("Friend's Room:", friendsRooms);

        // Render list item if friend details are found
        if (friendDetails) {
            return (
                <List key={friendDetails.userName} sx={{ border: 1, width: '100%', maxWidth: 360, bgcolor: 'lightgrey' }}>
                    <ListItem alignItems="flex-start">
                        {isOnline ? <span style={{ width: '10px', height: '10px', backgroundColor: 'green', borderRadius: '50%', marginLeft: '10px' }}></span> : <span style={{ width: '10px', height: '10px', backgroundColor: 'red', borderRadius: '50%', marginLeft: '10px' }}></span>}
                        <ListItemAvatar>
                            <Avatar alt={friendDetails.userName} src={freeAvatars[friendDetails.avatar] || buyableAvatars[friendDetails.avatar]} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={friendDetails.userName}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {friendDetails.stats}
                                    </Typography>
                                    {" — Main Page..."}
                                </React.Fragment>
                            }
                        />
                        {/* Render join game button if friend is in a room */}
                        {friendsInRoom && (
                            <Button variant="contained" color="primary" onClick={() => handleJoinGame(friendsInRoom.room)}>
                                Join Game
                            </Button>
                        )}
                    </ListItem>
                </List>
            );
        } else {
            return null; // If friend details are not found, don't render anything
        }
    })}
</Box>



                </Box>
            )}
            </ThemeProvider>
        </>
    );
};

export default FriendsPage;

