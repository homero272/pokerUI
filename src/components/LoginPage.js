import React, { useState, useEffect } from "react";
import API from '../API-Interface/API-Interface';
import { Button, Typography, TextField, Box, Avatar,useMediaQuery } from "@mui/material";
import { Fragment } from "react";
import { red,blue } from "@mui/material/colors";
import backgroundImage from "../pokerLogin.png";
import freeAvatars from "../avatars/FreeAvatars/free";
import bcrypt from 'bcryptjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { keyframes } from '@emotion/react';
import logo2 from '../croppedLogo.png';
import { useTheme } from '@mui/material/styles';




const normal = createTheme({
    typography: {
      fontFamily: [
        'normal',

      ].join(','),
    },
  });
  const heavy = createTheme({

    palette: {
        primary: {
          main: '#9caab7', // replace with your desired hex color
        },
        // ... other color settings
      },

      components: {
        MuiTypography: {
          defaultProps: {
            variantMapping: {
              h3: 'h1',
              h4: 'h2',
              body1: 'p',
            },
          },
        },
      },
      typography: {
        fontFamily: ['heavy',].join(','),
        h3: {
          fontSize: '1.5rem', // base size for desktop
          '@media (max-width:600px)': { // media query for devices smaller than 600px
            fontSize: '1.25rem', // smaller font size for mobile devices
          },
        },
        body1: {
          '@media (max-width:600px)': {
            fontSize: '0.875rem',
          },
        },
      },
  });

console.log(freeAvatars)
const LoginPage = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [create, setCreate] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [userInfo,setUserInfo] = useState({user:""});
    const [rotate,setRotate] = useState(keyframes`
    from {
      transform: rotateY(-20deg);
      box-shadow: 10px 10px 15px rgba(255,255, 255, 0.6);
    }
    to {
      transform: rotateY(20deg);
      box-shadow: -10px 10px 15px rgba(255,255, 255, 0.6);
    }
    `);

    const [login,setLogin] = useState(true);
    
    useEffect(() => {
        let timer;
        if(!login){
        // This timeout will run the function after 8000 milliseconds (8 seconds)
        timer = setTimeout(() => {
            console.log('This will run 8 seconds after login state changes.');
            // Set state or perform any action after the delay
            props.onSubmitInfo(userInfo);
        }, 4500);
        }

        // Cleanup function to clear the timer if the component unmounts or the dependencies change
        return () => clearTimeout(timer);
    }, [login]); // Dependencies array, this effect will rerun when `login` changes



    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        setError("");
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setError("");
    };

    // const handleSubmit = () => {
    //     if (username === "" || password === "") {
    //         console.log("Username and Password cant be empty");
    //         setError("Username and Password cant be empty!!!");
    //         return;
    //     }

        


    //     // console.log("Username:", username);
    //     // console.log("Password:", password);
    //     const api = new API();
    //     async function passwordCheck() {// this is still worked
    //         api.verifyUser(username)
    //             .then( userInfo => {
    //             console.log(`api returns user info and it is: ${JSON.stringify(userInfo)}`);
    //             //const user = userInfo.status;
    //             if( userInfo.user.userPassword == password ) {
    //                 console.log(userInfo.user.userPassword);
    //                 console.log("right password");
    //                 // setUser(user);
    //                 props.onSubmitInfo(userInfo); //sets next page
    //             } else  {
    //                 //console.log("IT FAILED@@@");
    //                 console.log(userInfo.user.userPassword);
    //                 console.log(password);
    //                 console.log("wrong password");
    //                 setError("WORNG PASSWORD!");
    //                 //console.log(user.userID);
    //                 //console.log(userInfo.data.status);
    //                 //setVerifyUser(false);
    //                 //setAuthFailed(true);
    //             }
    //         });
    //     }
    //     async function accountCheck() {// this is still worked
    //         api.verifyUser(username)
    //             .then( userInfo => {
    //             console.log(`api returns user info and it is: ${JSON.stringify(userInfo)}`);
    //             const user = userInfo.status;
    //             if( user == "OK" ) {
    //                 console.log(user.user)
    //                 console.log(userInfo.user.userPassword);
    //                 console.log("userInfo.userPassword");
    //                 passwordCheck();
    //                 //props.onSubmitInfo();
    //             } else  {
    //                 //console.log("IT FAILED@@@");
    //                 console.log("Username does not exist");
    //                 setError("Username does not exist!");
    //                 //console.log(user.userID);
    //                 //console.log(userInfo.data.status);
    //                 //setVerifyUser(false);
    //                 //setAuthFailed(true);
    //             }
    //         });
    //     }

    //     accountCheck();
    //      //moves to next page
        
    // };
    
    const handleSubmit = async () => {
        if (username === "" || password === "") {
            console.log("Username and Password cant be empty");
            setError("Username and Password cant be empty!!!");
            return;
        }


        
        console.log("Username:", username);
        console.log("Password:", password);
        const api = new API();
    
        try {
            const userInfo = await api.verifyUser(username);
    
            if (userInfo.status === "OK") {
                const hashedPassword = userInfo.user.userPassword;
                const passwordMatch = await bcrypt.compare(password, hashedPassword.replace(/slash/g,"/"));
    
                if (passwordMatch) {
                    console.log("Login successful");
                    setRotate(keyframes`
                    0% {
                        transform: rotateY(-360deg) scale(1);
                        box-shadow: 10px 10px 15px rgba(255,255, 255, 0.6);
                      }
                      50% {
                        transform: rotateY(0deg) scale(.5);
                        box-shadow: 0px 0px 15px rgba(255,255, 255, 0.6);
                      }
        
                      100% {
                        transform: rotateY(360deg) scale(0.25);
                        box-shadow: -10px 10px 15px rgba(255,255, 255, 0.6);
                      }
                    `);
                    setUserInfo(userInfo);
                    setLogin(false);
                    
                    //props.onSubmitInfo(userInfo); //sets next page
                } else {
                    console.log("Wrong password");
                    setError("Wrong password!");
                }
            } else {
                console.log("User not found.");
                setError("User not found!");
            }
        } catch (error) {
            console.error("Error during login:", error);
            setError("An error occurred during login.");
        }
    };
    

    const handleCreateAccount = () => {
        setCreate(true);
        

    };
    // const handleNewSubmit = async () => {
    //     try {
    //         if (username === "" || password === "") {
    //             console.log("Username and Password can't be empty");
    //             setError("Username and Password can't be empty!!!");
    //             return;
    //         }
    //         if (!selectedAvatar) {
    //             setError("Select an Avatar!!!");
    //             console.log("Select an Avatar!!!");
    //             return;
    //         }
    
    //         const api = new API();
    
    //         // Verify user asynchronously
    //         const userInfo = await api.verifyUser(username);
    
    //         console.log(`API returns user info: ${JSON.stringify(userInfo)}`);
    //         if (userInfo.status !== "OK") {
    //             console.log(`User ${username} doesn't exist, creating it.`);
    //             await api.createUser(username, password, selectedAvatar);
    //             const userInfo = await api.verifyUser(username);
    //             // Handle user creation success (if needed)
    //             props.onSubmitInfo(userInfo);
    //         } else {
    //             console.log("Username already exists");
    //             setError("Username already exists!");
    //         }
    //     } catch (error) {
    //         console.error("Error during user verification or creation:", error);
    //         // Handle error appropriately (e.g., display error message to user)
    //         setError("An error occurred. Please try again later.");
    //     }
    // };
    


const handleNewSubmit = async () => {
    try {
        if (username === "" || password === "") {
            console.log("Username and Password can't be empty");
            setError("Username and Password can't be empty!!!");
            return;
        }
        if (!selectedAvatar) {
            setError("Select an Avatar!!!");
            console.log("Select an Avatar!!!");
            return;
        }

        let hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        hashedPassword = hashedPassword.replace(/\//g, "slash");
        console.log(hashedPassword);
        const api = new API();

        // Verify user asynchronously
        const userInfo = await api.verifyUser(username);

        console.log(`API returns user info: ${JSON.stringify(userInfo)}`);
        if (userInfo.status !== "OK") {
            console.log(`User ${username} doesn't exist, creating it.`);
            await api.createUser(username, hashedPassword, selectedAvatar); // Use hashedPassword
            const userInfo = await api.verifyUser(username);
            // Handle user creation success (if needed)

            //insert created account 
            console.log("avatar stuff is here: ", userInfo.user, freeAvatars);
            Object.keys(freeAvatars).forEach(async (obj)=>{
                //console.log(obj);
                await api.insertAvatar(userInfo.user.userID, userInfo.user.userName, obj);
            });
            setRotate(keyframes`
            0% {
                transform: rotateY(-360deg) scale(1);
                box-shadow: 10px 10px 15px rgba(255,255, 255, 0.6);
              }
              50% {
                transform: rotateY(0deg) scale(.5);
                box-shadow: 0px 0px 15px rgba(255,255, 255, 0.6);
              }

              100% {
                transform: rotateY(360deg) scale(0.25);
                box-shadow: -10px 10px 15px rgba(255,255, 255, 0.6);
              }
              
            `);
            setUserInfo(userInfo);
            setLogin(false);
            //props.onSubmitInfo(userInfo);
        } else {
            console.log("Username already exists");
            setError("Username already exists!");
        }
    } catch (error) {
        console.error("Error during user verification or creation:", error);
        // Handle error appropriately (e.g., display error message to user)
        setError("An error occurred. Please try again later.");
    }
};




    const handleAvatarClick = (avatarPath) => {
        setSelectedAvatar(avatarPath);
        // Do whatever you want with the selected avatar path
        console.log("Selected Avatar:", avatarPath);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            if(create==false){
                handleSubmit();
            }
            else{
                handleNewSubmit();
            }
            
        }
    };
    

//     const rotate = keyframes`
//     0% {
//         transform: rotateY(0deg);
//         filter: drop-shadow(5px 5px 15px rgba(255,255, 255, 0.6));
//     }
//     25% {
//         transform: rotateY(90deg);
//         filter: drop-shadow(0px 5px 10px rgba(255,255, 255, 0.3));
//     }
//     50% {
//         transform: rotateY(180deg);
//         filter: drop-shadow(-5px 5px 5px rgba(255,255, 255,0.1));
//     }
//     75% {
//         transform: rotateY(270deg);
//         filter: drop-shadow(0px 5px 10px rgba(255,255, 255, 0.3));
//     }
//     100% {
//         transform: rotateY(360deg);
//         filter: drop-shadow(5px 5px 15px rgba(255,255, 255, 0.6));
//     }
// `;


// let rotate = keyframes`
// from {
//   transform: rotateY(-20deg);
//   box-shadow: 10px 10px 15px rgba(255,255, 255, 0.6);
// }
// to {
//   transform: rotateY(20deg);
//   box-shadow: -10px 10px 15px rgba(255,255, 255, 0.6);
// }
// `;

    return (
        <Fragment>
            <ThemeProvider theme={heavy}>
   
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                    //backgroundImage: `url(${backgroundImage})`,
                    backgroundColor:'#00000b',
                    width: "100vw",
                    height: "100vh",
                    backgroundSize: "cover",

                }}
            >

            
            <Box
                        sx={{
                            perspective: '500px',
                            borderRadius: '50%',
                            zIndex:0,
                            overflow: 'hidden',
                            boxShadow: '0px 0px 0px rgba(0,0,0,0.6)',
                            position: 'fixed',
                            transition: 'transform 0.5s, box-shadow 0.5s',
                            transform: 'rotateY(0deg)', // Start with no rotation
                            animation: `${rotate} 5s infinite alternate`, // Add continuous rotation here
                            '&:hover': {
                                boxShadow: '0px 0px 5px rgba(255, 255, 255, 0.9)', // Move shadow with the rotation
                            },
                            '&:before': {
                                content: '""',
                                display: 'none',
                                position: 'absolute',
                                top: '10%',
                                bottom: '10%',
                                left: 0,
                                right: 0,
                                borderRadius: '50%',
                                transform: 'scale(0.9)',
                                transition: 'transform 0.5s, border 0.5s',
                                zIndex: 0, // Ensure the coin edge is not behind the avatar
                            },
                            zIndex: 0, // The avatar itself should be on top
                        }}
                    >
                        <img src={logo2} alt="Logo" style={{
                                background:'transparent',
                                 zIndex: 0,
                                 width: '600px',
                                 height: '600px',
                                 borderRadius: '50%',
                                 border: '2px solid black',
                                 
                                  }} />
                    </Box> 

                    {login ? (
                    <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: create === false ? '20%' : '35%',
                        gap: 1,
                        border:3,
                        borderColor:'white',
                        position: 'relative', // Ensure it's positioned so zIndex takes effect
    zIndex: 1, // Higher zIndex to appear above the logo
    backgroundColor: 'rgba(0, 0, 11, 0.15)', // Semi-transparent white background
    backdropFilter: 'blur(5px)', // Optional: apply a blur to the content behind the box
    borderRadius: '10px', 
                    }}
                >

                    
                    <Box sx={{display:'flex', flexDirection:'column',alignContent:'center'}}>
                        
                    <Typography variant="h5" color="white">Login</Typography>
                    
                    <Box sx={{mt:'15px',border:1,borderRadius: '10px', backdropFilter: 'blur(500px)',borderColor:'rgba(7, 55, 68, 0)',height:'50%',display:'flex', flexDirection:'column', justifyContent:'center',alignItems:'center'}}>
                        <TextField
                            label="Username"
                            value={username}
                            onChange={handleUsernameChange}
                            margin="normal"
                            onKeyDown={handleKeyPress}
                            
                            // this sets max length of input
                            inputProps={
                                {maxLength: 15}
                            }
                            InputLabelProps={{
                                style: { color: 'white' } // Style for the label
                            }}
                            InputProps={{
                                style: { color: 'white' },
                                // Style for the input field
                            }}
                            
                        />
                    
                    
                    
                        <TextField
                            type="password"
                            label="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            margin="normal"
                            onKeyDown={handleKeyPress}
                            fullWidth
                                                // this sets max length of input
                            inputProps={
                                {maxLength: 15}
                            }
                            InputLabelProps={{
                                style: { color: 'white' } // Style for the label
                            }}

                            InputProps={{
                                style: { color: 'white'} ,
                                
                                // Style for the input field
                            }}
                        />
                    </Box>
                </Box>
                    {error !== "" ? (
                        <Typography color="red">
                            {error}
                        </Typography>
                    ) : (
                        ""
                    )}
                    
                    { !create ?
                        <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                          
                        tabIndex={0}                     
                    >
                        Login
                    </Button> : ""
                    }
                    {!create ? (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyItems: "flex-end",
                                alignItems: "baseline"
                            }}
                        >
                            <Typography variant="caption" style={{ marginRight: 1, color:'lightgrey' }}>
                                Don't have an account?
                            </Typography>
                            <Button
                                variant="contained"
                                
                                style={{ backgroundColor: '#132632', color: 'white' }}
                                size="small"
                                onClick={handleCreateAccount}
                            >
                                Create Account
                            </Button>
                        </Box>
                    ) : 
                    (
                        <Box sx={{display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'center', gap: 5, color:'white'}}>
                            <Typography>Choose your Avatar</Typography>
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 5, justifyContent: 'center', alignItems: 'center' }}>
                            {Object.entries(freeAvatars).map(([avatarName, avatarSrc]) => (
                                <Avatar
                                    key={avatarName}
                                    src={avatarSrc}
                                    onClick={() => handleAvatarClick(avatarName)}
                                    sx={{ cursor: "pointer", border: selectedAvatar === avatarName ? "2px solid blue" : "2px solid white" ,backgroundColor:'white'}}
                                    />
                             ))}
                        </Box>
                            <Button variant="contained" color="primary" onClick={handleNewSubmit}>
                                Create
                            </Button>
                        </Box>
                    )}

                </Box>
                ) : null}
            </Box>

            </ThemeProvider>

        </Fragment>
    );
};

export default LoginPage;
