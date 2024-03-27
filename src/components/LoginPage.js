import React, { useState } from "react";
import API from '../API-Interface/API-Interface';
import { Button, Typography, TextField, Box, Avatar } from "@mui/material";
import { Fragment } from "react";
import { red,blue } from "@mui/material/colors";
import backgroundImage from "../pokerLogin.png";
import avatar1 from "../Avatar1.png";
import avatar2 from "../Avatar2.png";

const LoginPage = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [create, setCreate] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    //test for update (remove after done testing)
    const [color, setColor] = useState('red');


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        setError("");
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setError("");
    };

    const handleSubmit = () => {
        if (username === "" || password === "") {
            console.log("Username and Password cant be empty");
            setError("Username and Password cant be empty!!!");
            return;
        }
        console.log("Username:", username);
        console.log("Password:", password);
        const api = new API();
        async function passwordCheck() {// this is still worked
            api.verifyUser(username)
                .then( userInfo => {
                console.log(`api returns user info and it is: ${JSON.stringify(userInfo)}`);
                //const user = userInfo.status;
                if( userInfo.user.userPassword == password ) {
                    console.log(userInfo.user.userPassword);
                    console.log("right password");
                    // setUser(user);
                    props.onSubmitInfo(userInfo); //sets next page
                } else  {
                    //console.log("IT FAILED@@@");
                    console.log(userInfo.user.userPassword);
                    console.log(password);
                    console.log("wrong password");
                    setError("WORNG PASSWORD!");
                    //console.log(user.userID);
                    //console.log(userInfo.data.status);
                    //setVerifyUser(false);
                    //setAuthFailed(true);
                }
            });
        }
        async function accountCheck() {// this is still worked
            api.verifyUser(username)
                .then( userInfo => {
                console.log(`api returns user info and it is: ${JSON.stringify(userInfo)}`);
                const user = userInfo.status;
                if( user == "OK" ) {
                    console.log(user.user)
                    console.log(userInfo.user.userPassword);
                    console.log("userInfo.userPassword");
                    passwordCheck();
                    //props.onSubmitInfo();
                } else  {
                    //console.log("IT FAILED@@@");
                    console.log("Username does not exist");
                    setError("Username does not exist!");
                    //console.log(user.userID);
                    //console.log(userInfo.data.status);
                    //setVerifyUser(false);
                    //setAuthFailed(true);
                }
            });
        }

        accountCheck();
         //moves to next page
        
    };

    const handleCreateAccount = () => {
        setCreate(true);

    };
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
    
            const api = new API();
    
            // Verify user asynchronously
            const userInfo = await api.verifyUser(username);
    
            console.log(`API returns user info: ${JSON.stringify(userInfo)}`);
            if (userInfo.status !== "OK") {
                console.log(`User ${username} doesn't exist, creating it.`);
                await api.createUser(username, password, selectedAvatar);
                const userInfo = await api.verifyUser(username);
                // Handle user creation success (if needed)
                props.onSubmitInfo(userInfo);
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


    const handleTestUpdateClick = () =>{
        //logic here
        color === 'red' ? setColor('blue') : setColor('red');
    }

    return (
        <Fragment>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                    backgroundImage: `url(${backgroundImage})`,
                    width: "100vw",
                    height: "100vh",
                    backgroundSize: "cover"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1
                    }}
                >
                    <Typography variant="h5">Login</Typography>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={handleUsernameChange}
                        margin="normal"
                        fullWidth
                        // this sets max length of input
                        inputProps={
                            {maxLength: 15}
                        }
                    />
                    <TextField
                        type="password"
                        label="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        margin="normal"
                        fullWidth
                        // this sets max length of input
                        inputProps={
                            {maxLength: 15}
                        }
                    />
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
                            <Typography variant="caption" style={{ marginRight: 1 }}>
                                Don't have an account?
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={handleCreateAccount}
                            >
                                Create Account
                            </Button>
                        </Box>
                    ) : 
                    (
                        <Box sx={{display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'center', gap: 5}}>
                            <Typography>Choose your Avatar</Typography>
                            <Box sx={{ display: "flex", flexDirection: "row", gap: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <Avatar
                                    src={avatar1}
                                    onClick={() => handleAvatarClick("avatar1")}
                                    sx={{ cursor: "pointer", border: selectedAvatar === "avatar1" ? "2px solid blue" : "none" }}
                                />
                                <Avatar
                                    src={avatar2}
                                    onClick={() => handleAvatarClick("avatar2")}
                                    sx={{ cursor: "pointer", border: selectedAvatar === "avatar2" ? "2px solid blue" : "none" }}
                                />
                            </Box>
                            <Button variant="contained" color="success" onClick={handleNewSubmit}>
                                Create
                            </Button>
                        </Box>
                    )}
                        <Box sx={{backgroundColor: color, border: 1, width: '200px', height: '200px'}}>
                            <Button variant = "contained" color = "primary" onClick={handleTestUpdateClick}>
                                Click me
                            </Button>
                        </Box>
                </Box>
            </Box>



        </Fragment>
    );
};

export default LoginPage;
