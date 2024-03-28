import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import PokerTable from './components/PokerTable';
import LoginPage from './components/LoginPage';
import { useState, useEffect } from 'react';
import io from 'socket.io-client'
import API from './API-Interface/API-Interface';
import Home from './components/HomePage';

const socket = io.connect("http://localhost:3001");
function App() {

  const [user, setUser] = useState(null);
  const [color, setColor] = useState(0);
  const [createMatch, setCreateMatch] = useState("false");
  const [joinMatch, setJoinMatch] = useState("false");

  
  useEffect(() =>{
    socket.on("receive_message", (data) =>{
      //alert(data);
      console.log("color recieved is :", data);
      setColor(data);
    })
  }, [socket])


  const handleTestUpdateClick = async () => {
    setColor(color+1);
    socket.emit("changeColor", {color:color + 1} );
    

  };

  const handleSignIn = (props) =>{
    setUser(props.user);
    console.log("called from app, user is: ", props.user);
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
      <LoginPage onSubmitInfo = {handleSignIn}/> : <Home user={user}/>
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
