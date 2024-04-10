import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button  from '@mui/material/Button';
import { useState, useEffect } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import { red } from '@mui/material/colors';
const { Deck } = require('../poker_logic/Deck');

const numCommunityCards = 5;
const cardBoxHeight = 60;
const cardBoxWidth = 40;
const spaceBetweenCards = 5;
const playerBoxHeight = cardBoxHeight + 50;
const playerBoxWidth = (cardBoxWidth * 2) + spaceBetweenCards;
const tableHeight = 315;
const tableWidth = 585;

let deck = [];

const CardBox = props => {  
    // set to true to see other users cards, false to only see your cards
    const [showDown, setShowDown] = useState(false);
    
    return !props.card || (!props.communityCard && props.user !== props.name && !showDown) ? (
        <Box sx={{
            height: cardBoxHeight,
            width: cardBoxWidth,
            backgroundColor: '#00ffff',
            borderRadius: '10%'
        }}>

        </Box>
    ) : (
        <Box sx={{
            height: cardBoxHeight,
            width: cardBoxWidth,
            backgroundColor: props.card.suit === 'c' ? '#00cc00' :
                             props.card.suit === 'd' ? '#0000cc' :
                             props.card.suit === 'h' ? '#cc0000' :
                                                       '#cccccc',
            borderRadius: '10%'
        }}>
            <Typography sx={{
                paddingLeft: 0.4, 
                fontSize: '20px'
            }}>
                {props.card.value === 'T' ? 10 : props.card.value}
            </Typography>
            <Typography sx={{
                paddingLeft: 0.4,
                fontSize: '22px'
            }}>{
                props.card.suit === 'c' ? '\u2663' :
                props.card.suit === 'd' ? '\u2666' :
                props.card.suit === 'h' ? '\u2665' :
                                          '\u2660'
            }</Typography>
        </Box>
    );
}

const PlayerBox = props => {
    const userName = props.user.userName;
    //this should know what seat we are 

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
                <CardBox card={props.holeCards[0]} user={props.user.userName} name={props.name}/>
                <CardBox card={props.holeCards[1]} user={props.user.userName} name={props.name}/>
            </Box>
            <Typography sx={{color: '#eeeeee'}}>
                { props.mostRecentUser  } 
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
                    <CardBox card={props.communityCards[0]} communityCard={true}></CardBox>
                    <CardBox card={props.communityCards[1]} communityCard={true}></CardBox>
                    <CardBox card={props.communityCards[2]} communityCard={true}></CardBox>
                    <CardBox card={props.communityCards[3]} communityCard={true}></CardBox>
                    <CardBox card={props.communityCards[4]} communityCard={true}></CardBox>
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
    const [seatName1, setSeatName1] = useState(props.user.userName);
    const [seatName2, setSeatName2] = useState(props.user.userName);
    const [seatName3, setSeatName3] = useState(props.user.userName);
    const [seatName4, setSeatName4] = useState(props.user.userName);
    const [seatName5, setSeatName5] = useState(props.user.userName);
    const [seatName6, setSeatName6] = useState(props.user.userName);
    const [currentSeat, setCurrentSeat] = useState(0);
    let mostRecentUser = props.user.userName;
    const [cardsDealt, setCardsDealt] = useState([]);
    const [playerCards, setPlayerCards] = useState([[], [], [], [], [], []]);
    let playerHoleCards = [[], [], [], [], [], []];
    const [communityCards, setCommunityCards] = useState([]);

    

    const dealFlop = () => {
        let flop = [deck.deal(), deck.deal(), deck.deal()];
        setCommunityCards(flop);

        props.socket.emit("dealFlop", {
            flop: flop,
            roomName: props.roomName
        });
    }

    const dealTurn = () => {
        // const turn = deck.deal();
        // setCommunityCards(prevCards => [...prevCards, turn]);

        const turn = deck.deal(); // Deal a new turn card
        const newCommunityCards = [...communityCards]; // Create a copy of the current community cards
        newCommunityCards.push(turn); // Add the new turn card to the community cards

        setCommunityCards(newCommunityCards);

        props.socket.emit("dealTurn", {
            turn: turn,
            roomName: props.roomName
        });
    }
    
    const dealHoleCards = () => {
        //console.log(deck);
        deck = new Deck();
        deck.shuffle();

        if (seat1) playerHoleCards[0] = [deck.deal(), deck.deal()];
        if (seat2) playerHoleCards[1] = [deck.deal(), deck.deal()];
        if (seat3) playerHoleCards[2] = [deck.deal(), deck.deal()];
        if (seat4) playerHoleCards[3] = [deck.deal(), deck.deal()];
        if (seat5) playerHoleCards[4] = [deck.deal(), deck.deal()];
        if (seat6) playerHoleCards[5] = [deck.deal(), deck.deal()];
        
        setPlayerCards(playerHoleCards);
        console.log(playerHoleCards);

        props.socket.emit("dealHoleCards", {
            deck: deck, 
            cardsDealt: playerHoleCards, 
            roomName: props.roomName
        });

        dealFlop();
        //dealTurn();
    }

    useEffect(() =>{
        if(props.socket !== null){
          props.socket.on("receiveSeatNumber", (data) => {
            //alert(data);
            console.log("Seat number recieved is :", data);

            //we have seat number of what they chose and we have the username of the person who chose it
           // console.log("temp user:", tempuser, " most recent user: ", mostRecentUser );

            switch (data.seatNumber) {
                case 1:
                  setSeat1(true);
                  setSeatName1(data.user.userName);
                  break;
                case 2:
                  setSeat2(true);
                  setSeatName2(data.user.userName);
                  break;
                case 3:
                    setSeat3(true);
                    setSeatName3(data.user.userName);
                  break;
                case 4:
                    setSeat4(true);
                    setSeatName4(data.user.userName);
                  break;
                case 5:
                    setSeat5(true);
                    setSeatName5(data.user.userName);
                  break;
                case 6:
                    setSeat6(true);
                    setSeatName6(data.user.userName);
                  break;
                default:
                  console.log("Number is not between 1 and 6");
                  break;
            }
          });

          props.socket.on("update_room",(data) =>{

            console.log("IT GOT CALLED IN UI UPDATE_ROOM, array is: ", data);
                data.forEach((obj,idx) =>{
                    switch (obj.seatNumber) {
                        case 1:
                          setSeat1(true);
                          setSeatName1(obj.userName);
                          break;
                        case 2:
                          setSeat2(true);
                          setSeatName2(obj.userName);
                          break;
                        case 3:
                            setSeat3(true);
                            setSeatName3(obj.userName);
                          break;
                        case 4:
                            setSeat4(true);
                            setSeatName4(obj.userName);
                          break;
                        case 5:
                            setSeat5(true);
                            setSeatName5(obj.userName);
                          break;
                        case 6:
                            setSeat6(true);
                            setSeatName6(obj.userName);
                          break;
                        default:
                          console.log("Number is not between 1 and 6");
                          break;
                    }
                })

          });

          props.socket.on("groupUpdate_room", (data) =>{
            switch (data.seatLeaving) {
                case 1:
                  setSeat1(false);
                  setSeatName1(props.user.userName);
                  break;
                case 2:
                  setSeat2(false);
                  setSeatName2(props.user.userName);
                  break;
                case 3:
                    setSeat3(false);
                    setSeatName3(props.user.userName);
                  break;
                case 4:
                    setSeat4(false);
                    setSeatName4(props.user.userName);
                  break;
                case 5:
                    setSeat5(false);
                    setSeatName5(props.user.userName);
                  break;
                case 6:
                    setSeat6(false);
                    setSeatName6(props.user.userName);
                  break;
                default:
                  console.log("Number is not between 1 and 6");
                  break;
            }
           

          })

          props.socket.on("recievedDealHoleCards", (data) => {
            console.log("&&&&&&& ",data.deck);
            console.log(data.cardsDealt);
            setPlayerCards(data.cardsDealt);
            deck = data.deck;
          });

          props.socket.on("recievedDealFlop", (data) => {
            setCommunityCards(data.flop);
          });

          props.socket.on("recievedDealTurn", (data) => {
            setCommunityCards(data.turn);
          });
    
        }
        
      }, [props.socket])

      const handleLeaveGame = () =>{
        props.setActionForMatch(null);
        props.socket.emit("leaveGame");
      }

    return (
        <Box sx={{
            height: '100vh',
            width: '100vw',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: '#111111'
        }}>
            <Box sx={{position: 'absolute', top: 10, left: 10}}>
            <IconButton  onClick={handleLeaveGame}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <LogoutIcon  fontSize='large' sx={{ color: red[900] }}/> {/* Home icon */}
                        <Typography variant="caption" color= "white">Leave Game</Typography> {/* Subtext */}
                    </Box>
                </IconButton>
            </Box>

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
                   !seat4 ? <EmptySeat mostRecentUser={mostRecentUser} user={props.user} roomName={props.roomName} socket={props.socket} currentSeat={currentSeat} setCurrentSeat={setCurrentSeat} seat4={seat4} setSeat4={setSeat4} seatNumber={4}/> 
                   : <PlayerBox mostRecentUser={seatName4} roomName={props.roomName} socket={props.socket} user={props.user} holeCards={playerCards[3]} name={seatName4}/>
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
                   !seat3 ? <EmptySeat mostRecentUser={mostRecentUser} user={props.user} roomName={props.roomName} socket={props.socket} currentSeat={currentSeat} setCurrentSeat={setCurrentSeat} seat3={seat3} setSeat3={setSeat3} seatNumber={3}/> 
                   : <PlayerBox mostRecentUser={seatName3} roomName={props.roomName} socket={props.socket} user={props.user} holeCards={playerCards[2]} name={seatName3}/>
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
                   !seat2 ? <EmptySeat mostRecentUser={mostRecentUser} user={props.user} roomName={props.roomName} socket={props.socket} currentSeat={currentSeat} setCurrentSeat={setCurrentSeat} seat2={seat2} setSeat2={setSeat2} seatNumber={2}/> 
                   : <PlayerBox mostRecentUser={seatName2} roomName={props.roomName} socket={props.socket} user={props.user} holeCards={playerCards[1]} name={seatName2}/>
                }
                        </Box>
                    </Box>
                    
                    <PokerTable communityCards={communityCards}></PokerTable>

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
                   !seat5 ? <EmptySeat mostRecentUser={mostRecentUser} user={props.user} roomName={props.roomName} socket={props.socket} currentSeat={currentSeat} setCurrentSeat={setCurrentSeat} seat5={seat5} setSeat5={setSeat5} seatNumber={5}/> 
                   : <PlayerBox mostRecentUser={seatName5} roomName={props.roomName} socket={props.socket} user={props.user} holeCards={playerCards[4]} name={seatName5}/>
                }
                        </Box>
                        <Box sx={{
                            height: playerBoxHeight,
                            width: playerBoxWidth,
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            {
                    !seat6 ? <EmptySeat mostRecentUser={mostRecentUser} user={props.user} roomName={props.roomName} socket={props.socket} currentSeat={currentSeat} setCurrentSeat={setCurrentSeat} seat6={seat6} setSeat6={setSeat6} seatNumber={6}/> 
                    : <PlayerBox mostRecentUser={seatName6} roomName={props.roomName} socket={props.socket} user={props.user} holeCards={playerCards[5]} name={seatName6}/>
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
                   !seat1 ? <EmptySeat mostRecentUser={mostRecentUser} user={props.user} roomName={props.roomName} socket={props.socket} currentSeat={currentSeat} setCurrentSeat={setCurrentSeat} seat1={seat1} setSeat1={setSeat1} seatNumber={1}/> 
                   : <PlayerBox mostRecentUser={seatName1} roomName={props.roomName} socket={props.socket} user={props.user} holeCards={playerCards[0]} name={seatName1}/>
                }
                </Box>
                
            </Box>
            <Button variant="contained" color="success" onClick={dealHoleCards}>
                Deal
            </Button>
        </Box>
    );
}

export default PokerTableWithPlayers;