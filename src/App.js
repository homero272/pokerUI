import Box from '@mui/material/Box'
import PokerTable from './components/PokerTable';
import LoginPage from './components/LoginPage';
import { useState } from 'react';

function App() {

  const [user, setUser] = useState(null);

  const handleSignIn = (props) =>{
    setUser(true);
    console.log("called from app")
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
    </Box>
  );
}

export default App;
