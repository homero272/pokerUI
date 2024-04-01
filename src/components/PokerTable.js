import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button  from '@mui/material/Button';
import { useState, useEffect } from 'react';

const numCommunityCards = 5;
const cardBoxHeight = 60;
const cardBoxWidth = 40;
const spaceBetweenCards = 5;
const playerBoxHeight = cardBoxHeight + 50;
const playerBoxWidth = (cardBoxWidth * 2) + spaceBetweenCards;
const tableHeight = 315;
const tableWidth = 585;

const CardBox = props => {    

    return (
        <Box sx={{
            height: cardBoxHeight,
            width: cardBoxWidth,
            backgroundColor: '#00ffff',
            borderRadius: '10%'
        }}>

        </Box>
    );
}

const PlayerBox = props => {
    const userName = props.user.userName;

    return (
        <Box sx={{
            height: playerBoxHeight,
            width: playerBoxWidth,
            borderRadius: '5%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: "center",
        }}>
            <Box sx={{
                height: playerBoxHeight,
                width: playerBoxWidth,
                borderRadius: '5%',
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <CardBox/>
                <CardBox/>
            </Box>
            <Typography sx={{color: '#eeeeee'}}>
                {props.mostRecentUser === "" ? userName : props.mostRecentUser}
            </Typography>
            <Typography sx={{color: '#eeeeee'}}>
                chip count
            </Typography>
            
        </Box>
        
    );
}

const EmptySeat = props => {

    const handleClick = () => {
        if (props.currentSeat !== 0)
            return;

        if (!props.socket)
            return;

        switch (props.seatNumber) {
            case 1:
              console.log("One");
              props.setSeat1(true);
              props.setCurrentSeat(1);
              props.socket.emit("selectSeat", {user: props.user, roomName: props.roomName, seatNumber: 1 } );
              break;
            case 2:
              console.log("Two");
              props.setSeat2(true);
              props.setCurrentSeat(2);props.socket.emit("selectSeat", {user: props.user, roomName: props.roomName, seatNumber: 2} );
              break;
            case 3:
              console.log("Three");
              props.setSeat3(true);
              props.setCurrentSeat(3);
              props.socket.emit("selectSeat", {user: props.user, roomName: props.roomName, seatNumber: 3} );
              break;
            case 4:
              console.log("Four");
              props.setSeat4(true);
              props.setCurrentSeat(4);
              props.socket.emit("selectSeat", {user: props.user, roomName: props.roomName, seatNumber: 4} );
              break;
            case 5:
              console.log("Five");
              props.setSeat5(true);
              props.setCurrentSeat(5);
              props.socket.emit("selectSeat", {user: props.user, roomName: props.roomName, seatNumber: 5} );
              break;
            case 6:
              console.log("Six");
              props.setSeat6(true);
              props.setCurrentSeat(6);
              props.socket.emit("selectSeat", {user: props.user, roomName: props.roomName, seatNumber: 6} );
              break;
            default:
              console.log("Number is not between 1 and 6");
              break;
        }
    }

    console.log(`$$$$$$${props.currentSeat}`);

    return (
        <Box onClick={handleClick} sx={{
            height: 75,
            width: 75,
            borderRadius: '50%',
            border: '1px dashed #eeeeee',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#111111',
            '&:hover': {
                backgroundColor: '#222222',
                cursor: 'pointer'
            }
        }}>
            <Typography color='#eeeeee'>Seat {props.seatNumber}</Typography>
        </Box>
    );
}

const PokerTable = props => {
    
    return (
        <Box sx={{ 
            height: tableHeight,
            width: tableWidth,
            display: 'flex',
            backgroundColor: '#7755ff',
            borderRadius: '50%',
        }}>
            <Box sx={{
                height: tableHeight,
                width: (tableWidth / 2) - (( (cardBoxWidth * numCommunityCards) + 
                       (spaceBetweenCards * (numCommunityCards - 1)) ) / 2),
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <Typography sx={{ mt: 9, ml: 7 }}>action</Typography>
                <Typography sx={{ mb: 9, ml: 7 }}>action</Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Box sx={{
                    height: (tableHeight / 2) - (cardBoxHeight / 2),
                    width: (cardBoxWidth * numCommunityCards) + 
                           (spaceBetweenCards * (numCommunityCards - 1)),
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Typography sx={{ m: 1 }}>action</Typography>
                    <Typography>Total pot: </Typography>
                </Box>
                <Box sx={{
                    height: cardBoxHeight,
                    width: (cardBoxWidth * numCommunityCards) + 
                           (spaceBetweenCards * (numCommunityCards - 1)),
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <CardBox></CardBox>
                    <CardBox></CardBox>
                    <CardBox></CardBox>
                    <CardBox></CardBox>
                    <CardBox></CardBox>
                </Box>
                <Box sx={{
                    height: (tableHeight / 2) - (cardBoxHeight / 2),
                    width: (cardBoxWidth * numCommunityCards) + 
                           (spaceBetweenCards * (numCommunityCards - 1)),
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }}>
                    <Typography sx={{ m: 1 }}>action</Typography>
                </Box>
            </Box>
            <Box sx={{
                height: tableHeight,
                width: (tableWidth / 2) - (( (cardBoxWidth * numCommunityCards) + 
                       (spaceBetweenCards * (numCommunityCards - 1)) ) / 2),
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-end'
            }}>
                <Typography sx={{ mt: 9, mr: 7 }}>action</Typography>
                <Typography sx={{ mb: 9, mr: 7 }}>action</Typography>
            </Box>
        </Box>
    );
}

const PokerTableWithPlayers = props => { 
    const [seat1, setSeat1] = useState(false);
    const [seat2, setSeat2] = useState(false);
    const [seat3, setSeat3] = useState(false);
    const [seat4, setSeat4] = useState(false);
    const [seat5, setSeat5] = useState(false);
    const [seat6, setSeat6] = useState(false);
    const [currentSeat, setCurrentSeat] = useState(0);
    const [mostRecentUser, setMostRecentUser] = useState("");

    useEffect(() =>{
        if(props.socket !== null){
          props.socket.on("receiveSeatNumber", (data) => {
            //alert(data);
            console.log("Seat number recieved is :", data);
            setMostRecentUser(data.user.userName);

            switch (data.seatNumber) {
                case 1:
                  setSeat1(true);
                  break;
                case 2:
                  setSeat2(true);
                  break;
                case 3:
                    setSeat3(true);
                  break;
                case 4:
                    setSeat4(true);
                  break;
                case 5:
                    setSeat5(true);
                  break;
                case 6:
                    setSeat6(true);
                  break;
                default:
                  console.log("Number is not between 1 and 6");
                  break;
            }
          });
    
        }
        
      }, [props.socket])

    return (
        <Box sx={{
            height: '100vh',
            width: '100vw',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: '#111111'
        }}>

            <Box sx={{
                height: tableHeight + (playerBoxHeight * 2) + 25,
                width: tableWidth + (playerBoxWidth * 2),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Box sx={{
                    height: playerBoxHeight,
                    width: playerBoxWidth,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {
                   !seat4 ? <EmptySeat mostRecentUser={mostRecentUser} user={props.user} roomName={props.roomName} socket={props.socket} currentSeat={currentSeat} setCurrentSeat={setCurrentSeat} seat4={seat4} setSeat4={setSeat4} seatNumber={4}/> : <PlayerBox mostRecentUser={mostRecentUser} roomName={props.roomName} socket={props.socket} user={props.user}/>
                }
                </Box>

                <Box sx={{
                    width: tableWidth + (playerBoxWidth * 2),
                    display: 'flex',
                }}>
                    <Box sx={{
                        height: tableHeight,
                        width: playerBoxWidth,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <Box sx={{
                            height: playerBoxHeight,
                            width: playerBoxWidth,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end'
                        }}>
                            {
                   !seat3 ? <EmptySeat mostRecentUser={mostRecentUser} user={props.user} roomName={props.roomName} socket={props.socket} currentSeat={currentSeat} setCurrentSeat={setCurrentSeat} seat3={seat3} setSeat3={setSeat3} seatNumber={3}/> : <PlayerBox mostRecentUser={mostRecentUser} roomName={props.roomName} socket={props.socket} user={props.user}/>
                }
                        </Box>
                        <Box sx={{
                            height: playerBoxHeight,
                            width: playerBoxWidth,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end'
                        }}>
                            {
                   !seat2 ? <EmptySeat mostRecentUser={mostRecentUser} user={props.user} roomName={props.roomName} socket={props.socket} currentSeat={currentSeat} setCurrentSeat={setCurrentSeat} seat2={seat2} setSeat2={setSeat2} seatNumber={2}/> : <PlayerBox mostRecentUser={mostRecentUser} roomName={props.roomName} socket={props.socket} user={props.user}/>
                }
                        </Box>
                    </Box>
                    
                    <PokerTable></PokerTable>

                    <Box sx={{
                        height: tableHeight,
                        width: playerBoxWidth,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <Box sx={{
                            height: playerBoxHeight,
                            width: playerBoxWidth,
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            {
                   !seat5 ? <EmptySeat mostRecentUser={mostRecentUser} user={props.user} roomName={props.roomName} socket={props.socket} currentSeat={currentSeat} setCurrentSeat={setCurrentSeat} seat5={seat5} setSeat5={setSeat5} seatNumber={5}/> : <PlayerBox mostRecentUser={mostRecentUser} roomName={props.roomName} socket={props.socket} user={props.user}/>
                }
                        </Box>
                        <Box sx={{
                            height: playerBoxHeight,
                            width: playerBoxWidth,
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            {
                    !seat6 ? <EmptySeat mostRecentUser={mostRecentUser} user={props.user} roomName={props.roomName} socket={props.socket} currentSeat={currentSeat} setCurrentSeat={setCurrentSeat} seat6={seat6} setSeat6={setSeat6} seatNumber={6}/> : <PlayerBox mostRecentUser={mostRecentUser} roomName={props.roomName} socket={props.socket} user={props.user}/>
                    }
                        </Box>
                    </Box>
                </Box>
                
                <Box sx={{
                    height: playerBoxHeight,
                    width: playerBoxWidth,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}> {
                   !seat1 ? <EmptySeat mostRecentUser={mostRecentUser} user={props.user} roomName={props.roomName} socket={props.socket} currentSeat={currentSeat} setCurrentSeat={setCurrentSeat} seat1={seat1} setSeat1={setSeat1} seatNumber={1}/> : <PlayerBox mostRecentUser={mostRecentUser} roomName={props.roomName} socket={props.socket} user={props.user}/>
                }
                </Box>
                
            </Box>

        </Box>
    );
}

export default PokerTableWithPlayers;