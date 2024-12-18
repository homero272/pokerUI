import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import PokerTable from './components/PokerTable';
import LoginPage from './components/LoginPage';
import { useState, useEffect, Fragment } from 'react';
import io from 'socket.io-client'
import API from './API-Interface/API-Interface';
import Home from './components/HomePage';
import CreateMatch from './components/CreateMatch';
import JoinMatch from './components/JoinMatch';
import LandingPage from './components/LandingPage';
import { setRandomFallback } from 'bcryptjs';
//let socket = null;
import GlobalStyle from './components/GlobalStyle';
function App() {

  const [user, setUser] = useState(null);
  const [color, setColor] = useState(0);
  const [actionForMatch, setActionForMatch] = useState(null);
  const [socket, setSocket] = useState(null);
  const [roomName, setRoomName] = useState('default');
  const [arrayOfRooms, setArrayOfRooms] = useState([]);
  const [host, setHost] = useState("");
  const [landingPage, setLandingPage] = useState(true);
  const [playerMoney, setPlayerMoney] = useState(0);
  
  useEffect(() =>{
    if(socket !== null){
      socket.emit("userConnected", {userName: user.userName});
      socket.on("receive_message", (data) =>{
        //alert(data);
        console.log("color recieved is :", data);
        setColor(data);
      });
      socket.on("room_created", (data) =>{
        console.log("someone created room...", data, "array: ", arrayOfRooms);
        

        // Use a functional update to ensure the previous state is correctly updated
        setArrayOfRooms(data);
        //setArrayOfRooms(temp);
      });
      socket.on("removeRoom", (data) =>{
        console.log("Current Rooms: ", arrayOfRooms);
        setArrayOfRooms(data);
        console.log("NEW ROOMS:", data);
        //setArrayOfRooms(prevRooms => prevRooms.filter(room => room !== data));

      });

    }
    
  }, [socket,user])


  const handleTestUpdateClick = async () => {
    if(!socket){
      return;
    }
    setColor(color+1);
    socket.emit("changeColor", {color:color + 1, roomName: roomName} );
    console.log("array of rooms: ",arrayOfRooms);
    

  };
  

  const handleSignIn = (props) =>{
    setUser(props.user);
    //setSocket(io.connect("http://localhost:3001"));
    setSocket(io.connect("https://pokerwebsocket.onrender.com"));
    

    setPlayerMoney(props.user.money);
    console.log("playerMoney set in app", props.user.money);
    console.log("called from app, user is: ", props.user);

    //so props.user is probably what we will add onto the db when logging in

  }
  // const handleSignOut = (props) =>{

  //   console.log("Logging out: ", socket.id);
  //   setUser(null);

  //   setSocket(io.disconnect("http://localhost:3001"));
  //   setSocket(null);
    
  // }
  const handleSignOut = () => {
    console.log("Logging out: ", socket.id);
    setUser(null);
    setLandingPage(true);

    if (socket) {
        socket.disconnect();
        setSocket(null);
        //probably make the login session ID null on db
    }
};

const handleMatchAction = (props) =>{
  console.log(props, "look here");
  setActionForMatch(props);
}

const handleCreateRoom =  (props) =>{
  //props contains room name
  if (props === "")
    return;
  console.log("creating room: (UI)", props);
  setRoomName(props);
  setHost(user.userName);
  setActionForMatch("done");
  socket.emit("createRoom", {roomName: props, userName: user.userName});
  setArrayOfRooms(prevRooms => [...prevRooms, props]);
}

const handleJoinMatch = async props =>{
  
  if(props ===""){
    console.log("SELECT A MATCH!!")
    return;
  }
  
  setActionForMatch("done");
  console.log("selected Room from APP.js", props);
  setRoomName(props);
  socket.emit("playerJoined", {userName: user.userName, room: props })
}

return (
  
  <Box sx={{
    height: '100vh',
    width: '100vw',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}>
    <GlobalStyle/>
    {landingPage ? (
      <LandingPage setLandingPage={setLandingPage} />
    ) : (
      !user ? (
        <LoginPage  onSubmitInfo={handleSignIn} />
      ) : !actionForMatch ? (
        <Home playerMoney = {playerMoney} setPlayerMoney={setPlayerMoney} setUser={setUser} user={user} socket={socket} handleSignOut={handleSignOut} handleMatchAction={handleMatchAction} setActionForMatch={setActionForMatch} handleSelectMatch={handleJoinMatch} setRoomName={setRoomName} />
      ) : actionForMatch === "create" ? (
        <CreateMatch user = {user} playerMoney = {playerMoney} setPlayerMoney={setPlayerMoney} setActionForMatch={setActionForMatch} handleCreateRoom={handleCreateRoom} />
      ) : actionForMatch === "join" ? (
        <JoinMatch user={user} playerMoney = {playerMoney}  setPlayerMoney={setPlayerMoney} setActionForMatch={setActionForMatch} arrayOfRooms={arrayOfRooms} handleSelectMatch={handleJoinMatch} />
      ) : (
        <Fragment>
          <PokerTable playerMoney = {playerMoney} setPlayerMoney={setPlayerMoney} host = {host} setHost={setHost} roomName={roomName} user={user} socket={socket} setActionForMatch={setActionForMatch} />
          {/* <Box sx={{ backgroundColor: color % 2 === 0 ? 'red' : 'blue', border: 1, width: '200px', height: '200px' }}>
            <Button variant="contained" color="primary" onClick={handleTestUpdateClick}>
              Click me
            </Button>
          </Box> */}
        </Fragment>
      )
    )}
  </Box>
);
}

export default App;