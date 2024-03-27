import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import PokerTable from './components/PokerTable';
import LoginPage from './components/LoginPage';
import { useState } from 'react';
import API from './API-Interface/API-Interface';
function App() {

  const [user, setUser] = useState(null);
  const [color, setColor] = useState(0);
  const handleTestUpdateClick = async () => {
    try {
        const api = new API();

        // Verify user asynchronously
        const userInfo = await api.verifyUser(user.userName);
        console.log(user, "@@@@@@");
        console.log(userInfo.user.stats,"!!!!!!");

        console.log(`API returns user info: ${JSON.stringify(userInfo)}`);
        if (userInfo.status == "OK") {
            console.log(`User ${user.userName} doesn't exist, creating it.`);
            await api.changeColor(user.userName);
            const userInfo = await api.verifyUser(user.userName);
            setColor(userInfo.user.stats);
            console.log("THIS IS THE COLOR",color);
            // Handle user creation success (if needed)

        } else {
            console.log("user.userName already exists");

        }
    } catch (error) {
        console.error("Error during user verification or creation:", error);
        // Handle error appropriately (e.g., display error message to user)

    }
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
      <LoginPage onSubmitInfo = {handleSignIn}/> : <PokerTable/>
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
