import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import PokerTable from './components/PokerTable';
import LoginPage from './components/LoginPage';
import { useState, useEffect } from 'react';
import io from 'socket.io-client'
import API from './API-Interface/API-Interface';
import Home from './components/HomePage';
import CreateMatch from './components/CreateMatch';
import JoinMatch from './components/JoinMatch';

//let socket = null;

function App() {

  const [user, setUser] = useState(null);
  const [color, setColor] = useState(0);
  const [actionForMatch, setActionForMatch] = useState(null);
  const [socket, setSocket] = useState(null);
  const [roomName, setRoomName] = useState('default');
  const [arrayOfRooms, setArrayOfRooms] = useState([]);
  
  useEffect(() =>{
    if(socket !== null){
      socket.on("receive_message", (data) =>{
        //alert(data);
        console.log("color recieved is :", data);
        setColor(data);
      });
      socket.on("room_created", (data) =>{
        console.log("someone created room...", data);
        let temp = arrayOfRooms.splice();
        temp = [...temp, data];
        setArrayOfRooms(temp);
      })
    }
    
  }, [socket])


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
    setSocket(io.connect("http://localhost:3001"));
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
  setActionForMatch("done");
  socket.emit("createRoom", props);
  let temp = arrayOfRooms.splice();
  temp = [...temp, props];
  setArrayOfRooms(temp);
}


  return (
    <Box sx={{
      height: '100vh',
      width: '100vw',
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      { !user ?
      <LoginPage onSubmitInfo = {handleSignIn}/> : !actionForMatch? <Home user={user} socket = {socket} handleSignOut ={handleSignOut} handleMatchAction = {handleMatchAction} /> 
        : actionForMatch === "create" ? <CreateMatch handleCreateRoom={handleCreateRoom}/> : actionForMatch === "join" ? <JoinMatch/> : <PokerTable/>
      }
<Box sx={{backgroundColor: color%2 === 0 ? 'red':'blue', border: 1, width: '200px', height: '200px'}}>
                            <Button variant = "contained" color = "primary" onClick={handleTestUpdateClick}>
                                Click me
                            </Button>
                        </Box>
      
    </Box>
  );
}

export default App;
