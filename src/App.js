import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import PokerTable from './components/PokerTable';
import LoginPage from './components/LoginPage';
import { useState, useEffect } from 'react';
import io from 'socket.io-client'
import API from './API-Interface/API-Interface';
import Home from './components/HomePage';

//let socket = null;

function App() {

  const [user, setUser] = useState(null);
  const [color, setColor] = useState(0);
  const [createMatch, setCreateMatch] = useState("false");
  const [joinMatch, setJoinMatch] = useState("false");
  const [socket, setSocket] = useState(null);
  
  useEffect(() =>{
    if(socket !== null){
      socket.on("receive_message", (data) =>{
        //alert(data);
        console.log("color recieved is :", data);
        setColor(data);
      })
    }
    
  }, [socket])


  const handleTestUpdateClick = async () => {
    if(!socket){
      return;
    }
    setColor(color+1);
    socket.emit("changeColor", {color:color + 1} );
    

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


  return (
    <Box sx={{
      height: '100vh',
      width: '100vw',
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      { !user ?
      <LoginPage onSubmitInfo = {handleSignIn}/> : <Home user={user} socket = {socket} handleSignOut ={handleSignOut}/>
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
