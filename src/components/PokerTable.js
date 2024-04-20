import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button  from '@mui/material/Button';
import { useState, useEffect, Fragment } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { red } from '@mui/material/colors';
const { Deck } = require('../poker_logic/Deck');
const { PokerHand, numCardsInPokerHand } = require('../poker_logic/PokerHand');


const numCommunityCards = 5;
const cardBoxHeight = 60;
const cardBoxWidth = 40;
const spaceBetweenCards = 5;
const playerBoxHeight = cardBoxHeight + 50;
const playerBoxWidth = (cardBoxWidth * 2) + spaceBetweenCards;
const tableHeight = 315;
const tableWidth = 585;

const bigBlindAmount = 100;
const smallBlindAmount = 50;
let deck = [];

const CardBox = props => {  
    // set to true to see other users cards, false to only see your cards
    const [showDown, setShowDown] = useState(false);
    
    return !props.card || (!props.communityCard && props.user !== props.name && !showDown) ? (
        <Box sx={{
            height: cardBoxHeight,
            width: cardBoxWidth,
            backgroundColor: props.communityCard? '' : '#ff00ff',
            borderRadius: '10%'
        }}>

        </Box>
    ) : (
        <Box sx={{
            height: cardBoxHeight,
            width: cardBoxWidth,
            backgroundColor: props.card.suit === 'c' ? '#158c11' :
                             props.card.suit === 'd' ? '#116ad8' :
                             props.card.suit === 'h' ? '#f02b35' :
                                                       '#555555',
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
    const isCurrentPlayer = props.isCurrentTurn; // Received from props
    const [timer, setTimer] = useState(10); // Initialize the timer for 10 seconds
    //console.log("!!!!!! ", props.chipCount);

    useEffect(() => {
        let interval = null;
        if (isCurrentPlayer) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer > 0 ? prevTimer - 1 : 0);
            }, 1000);
        } else {
            setTimer(10); // Reset timer when it's not this player's turn
        }

        return () => clearInterval(interval);
    }, [isCurrentPlayer]);

    return (
        <Fragment>
        <Box sx={{
            height: playerBoxHeight,
            width: playerBoxWidth,
            borderRadius: '5%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: "center",   
            border: isCurrentPlayer ? '3px solid yellow' : 'none'
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
                {props.mostRecentUser}
            </Typography>
            <Typography sx={{color: '#eeeeee'}}>
                {props.seatChipCount}
            </Typography>
        </Box>
                </Fragment>
    );
};


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
              props.setSeatChipCount1(10000);
              props.socket.emit("selectSeat", {
                user: props.user, 
                roomName: props.roomName, 
                seatNumber: 1,
                chipCount: 10000
              });
              break;
            case 2:
              console.log("Two");
              props.setSeat2(true);
              props.setCurrentSeat(2);
              props.setSeatChipCount2(10000);
              props.socket.emit("selectSeat", {
                user: props.user, 
                roomName: props.roomName, 
                seatNumber: 2,
                chipCount: 10000
              });
              break;
            case 3:
              console.log("Three");
              props.setSeat3(true);
              props.setCurrentSeat(3);
              props.setSeatChipCount3(10000);
              props.socket.emit("selectSeat", {
                user: props.user, 
                roomName: props.roomName, 
                seatNumber: 3,
                chipCount: 10000
              });
              break;
            case 4:
              console.log("Four");
              props.setSeat4(true);
              props.setCurrentSeat(4);
              props.setSeatChipCount4(10000);
              props.socket.emit("selectSeat", {
                user: props.user, 
                roomName: props.roomName, 
                seatNumber: 4,
                chipCount: 10000
              });
              break;
            case 5:
              console.log("Five");
              props.setSeat5(true);
              props.setCurrentSeat(5);
              props.setSeatChipCount5(10000);
              props.socket.emit("selectSeat", {
                user: props.user, 
                roomName: props.roomName, 
                seatNumber: 5,
                chipCount: 10000
              });
              break;
            case 6:
              console.log("Six");
              props.setSeat6(true);
              props.setCurrentSeat(6);
              props.setSeatChipCount6(10000);
              props.socket.emit("selectSeat", {
                user: props.user, 
                roomName: props.roomName, 
                seatNumber: 6,
                chipCount: 10000
              });
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

  const startGame = () => {
    props.initBlinds();
    props.setGameStarted(true);
    props.socket.emit("startGame", {
        roomName: props.roomName
    });
  } 

  useEffect(() => {

    const deductChips = (seat, amount) => {
      switch(seat) {
          case 1:
              const newChipCount1 = props.seatChipCount1 - amount;
              props.setSeatChipCount1(newChipCount1);
              props.socket.emit("updateChipCount", {
                room: props.roomName, 
                seatNumber: 1,
                chipCount: newChipCount1
              });
              break;
          case 2:
            const newChipCount2 = props.seatChipCount2 - amount;
              props.setSeatChipCount2(newChipCount2);
              props.socket.emit("updateChipCount", {
                room: props.roomName, 
                seatNumber: 2,
                chipCount: newChipCount2
              });
              break;
          case 3:
              const newChipCount3 = props.seatChipCount3 - amount;
              props.setSeatChipCount3(newChipCount3);
              props.socket.emit("updateChipCount", {
                room: props.roomName, 
                seatNumber: 3,
                chipCount: newChipCount3
              });
              break;
          case 4:
              const newChipCount4 = props.seatChipCount4 - amount;
              props.setSeatChipCount4(newChipCount4);
              props.socket.emit("updateChipCount", {
                room: props.roomName, 
                seatNumber: 4,
                chipCount: newChipCount4
              });
              break;
          case 5:
              const newChipCount5 = props.seatChipCount5 - amount;
              props.setSeatChipCount5(newChipCount5);
              props.socket.emit("updateChipCount", {
                room: props.roomName, 
                seatNumber: 5,
                chipCount: newChipCount5
              });
              break;
          case 6:
              const newChipCount6 = props.seatChipCount6 - amount;
              props.setSeatChipCount6(newChipCount6);
              props.socket.emit("updateChipCount", {
                room: props.roomName, 
                seatNumber: 6,
                chipCount: newChipCount6
              });
              break;
          default:
        }
      };

      // Deduct big blind
      if (props.bigBlind) {
          deductChips(props.bigBlind, bigBlindAmount);
      }

      // Deduct small blind
      if (props.smallBlind) {
          deductChips(props.smallBlind, smallBlindAmount);
      }
    }, [props.bigBlind, props.smallBlind, bigBlindAmount, smallBlindAmount]);

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
                <Typography sx={{ mt: 9, ml: 7 }}>{
                    props.smallBlind === 3 ? smallBlindAmount : 
                    props.bigBlind === 3 ? bigBlindAmount : 
                    props.dealer === 3 ? "button" : ""
                }</Typography>
                <Typography sx={{ mb: 9, ml: 7 }}>{
                    props.smallBlind === 2 ? smallBlindAmount : 
                    props.bigBlind === 2 ? bigBlindAmount : 
                    props.dealer === 2 ? "button" : ""
                }</Typography>
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
                    <Typography sx={{ m: 1 }}>{
                        props.smallBlind === 4 ? smallBlindAmount : 
                        props.bigBlind === 4 ? bigBlindAmount : 
                        props.dealer === 4 ? "button" : ""
                    }</Typography>
                    <Typography>Total pot: {props.totalPot}</Typography>
                </Box>
                {props.gameStarted || props.host !== props.user ? (   
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
                ) : props.host === props.user ? (
                    <Box sx={{
                        height: cardBoxHeight,
                        width: (cardBoxWidth * numCommunityCards) + 
                               (spaceBetweenCards * (numCommunityCards - 1)),
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        <Button variant="contained" color="success" onClick={startGame}>Start Game</Button>
                    </Box>
                ) : ""
                }
                <Box sx={{
                    height: (tableHeight / 2) - (cardBoxHeight / 2),
                    width: (cardBoxWidth * numCommunityCards) + 
                           (spaceBetweenCards * (numCommunityCards - 1)),
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }}>
                    <Typography sx={{ m: 1 }}>{
                        props.smallBlind === 1 ? smallBlindAmount : 
                        props.bigBlind === 1 ? bigBlindAmount : 
                        props.dealer === 1 ? "button" : ""
                    }</Typography>
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
                <Typography sx={{ mt: 9, mr: 7 }}>{
                    props.smallBlind === 5 ? smallBlindAmount : 
                    props.bigBlind === 5 ? bigBlindAmount : 
                    props.dealer === 5 ? "button" : ""
                }</Typography>
                <Typography sx={{ mb: 9, mr: 7 }}>{
                    props.smallBlind === 6 ? smallBlindAmount : 
                    props.bigBlind === 6 ? bigBlindAmount : 
                    props.dealer === 6 ? "button" : ""
                }</Typography>
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

    const [seatChipCount1, setSeatChipCount1] = useState(0);
    const [seatChipCount2, setSeatChipCount2] = useState(0);
    const [seatChipCount3, setSeatChipCount3] = useState(0);
    const [seatChipCount4, setSeatChipCount4] = useState(0);
    const [seatChipCount5, setSeatChipCount5] = useState(0);
    const [seatChipCount6, setSeatChipCount6] = useState(0);

    const [currentSeat, setCurrentSeat] = useState(0);
    let mostRecentUser = props.user.userName;

    const [gameStarted, setGameStarted] = useState(false);
    const [isFirstHand, setIsFirstHand] = useState(true);

    const [holeCards, setHoleCards] = useState([[], [], [], [], [], []]);
    let _holeCards = [[], [], [], [], [], []];
    const [communityCards, setCommunityCards] = useState([]);
    let _communityCards = [];
    let seatsWithCards = [];
    let seatsWithPlayers = [];

    const [dealerButton, setDealerButton] = useState(0);
    let _dealerButton = 0;
    const [smallBlind, setSmallBlind] = useState(0);
    let _smallBlind = 0;
    const [bigBlind, setBigBlind] = useState(0);
    let _bigBlind = 0;

    const [bestHands, setBestHands] = useState([]);
    let _bestHands = [];
    const [playerTurn, setPlayerTurn] = useState(false);
    const [playerTurnIndex, setPlayerTurnIndex] = useState(null);
    const [totalPot, setTotalPot] = useState(0);

    
    
    // returns all C(7, 5) combos of poker hands a player can have
    // given their 2 hole cards and the 5 community cards
    // 
    // returns 2d array
    const generateCombos = (cards) => {
        let combos = [];
        const combo = new Array(numCardsInPokerHand);
    
        const generate = (start, index) => {
            if (index === numCardsInPokerHand) {
                combos.push(combo.slice()); 
                return;
            }
            for (let i = start; i < cards.length; i++) {
                combo[index] = cards[i];
                generate(i + 1, index + 1);
            }
        };
    
        generate(0, 0);
        return combos;
    }

    // returns all the players best poker hand
    const getPlayersBestHands = () => {
        // maps players hole cards to the 5 community cards
        const holeCardsAndCommunityCards = _holeCards.map(cards => {
            return cards.length !== 0 ? [...cards, ..._communityCards] : [];
        });
        console.log(holeCardsAndCommunityCards);

        // combos is 3d array where the outter array is an array of size
        // 6 and the inner array is an array of arrays representing each
        // players C(7, 5) possible hand combos from that player's 2 hole 
        // cards and the 5 community cards
        const combos = [];
        for (let i = 0; i < holeCardsAndCommunityCards.length; i++) {        
            combos.push(generateCombos(holeCardsAndCommunityCards[i]));
        }
        console.log(combos);

        combos.forEach(playerCombos => {
            let bestHand = null;
            playerCombos.forEach(combo => {
                const pokerHand = new PokerHand(combo);
                if (!bestHand || pokerHand.compareWith(bestHand) > 0) {
                    bestHand = pokerHand;
                }
            });
            _bestHands.push(bestHand);
        });
        setBestHands(_bestHands);
        console.log(_bestHands);

        props.socket.emit("playersBestHands", {
            bestHands: _bestHands,
            roomName: props.roomName
        });
    }
    
    // shifts the dealer button, sb, and bb 1 spot to the left
    const rotateBlinds = () => {
        seatsWithPlayers = [];

        if (seat1) seatsWithPlayers.push(1);
        if (seat2) seatsWithPlayers.push(2);
        if (seat3) seatsWithPlayers.push(3);
        if (seat4) seatsWithPlayers.push(4);
        if (seat5) seatsWithPlayers.push(5);
        if (seat6) seatsWithPlayers.push(6);

        if (seatsWithPlayers.length < 2) return;

        // Move the big blind to the next position
        const newBigBlindIndex = (seatsWithPlayers.indexOf(bigBlind) + 1) % seatsWithPlayers.length;
        const newBigBlindSeat = seatsWithPlayers[newBigBlindIndex];

        // Set the small blind to the right of the big blind
        const newSmallBlindIndex = (newBigBlindIndex + seatsWithPlayers.length - 1) % seatsWithPlayers.length;
        const newSmallBlindSeat = seatsWithPlayers[newSmallBlindIndex];

        // Set the dealer button to the right of the small blind
        const newDealerButtonIndex = (newSmallBlindIndex + seatsWithPlayers.length - 1) % seatsWithPlayers.length;
        const newDealerButtonSeat = seatsWithPlayers[newDealerButtonIndex];


        //console.log(`%%%${newDealerButtonIndex} %%%${newDealerButtonSeat}`);
        //console.log(seatsWithPlayers.length, "#####");
        console.log(`newBBindex: ${newBigBlindIndex} newSBindex: ${newSmallBlindIndex} newButtonIndex: ${newDealerButtonIndex}`)

        _dealerButton = newDealerButtonSeat;
        _smallBlind = newSmallBlindSeat;
        _bigBlind = newBigBlindSeat;

        setDealerButton(_dealerButton);
        setSmallBlind(_smallBlind);
        setBigBlind(_bigBlind);

        let tempPlayerTurnIndex = newSmallBlindSeat;
        setPlayerTurnIndex(tempPlayerTurnIndex);

	      switch (tempPlayerTurnIndex) {
            case 1:
              setPlayerTurn(seatName1)
              break;
            case 2:
              setPlayerTurn(seatName2)
              break;
            case 3:
              setPlayerTurn(seatName3)
              break;
            case 4:
              setPlayerTurn(seatName4)
              break;
            case 5:
              setPlayerTurn(seatName5)
              break;
            case 6:
              setPlayerTurn(seatName6)
              break;
            default:
              console.log("Number is not between 1 and 6");
              break;
        }

        console.log("current persons turn is seat :", _dealerButton)

 

        console.log(seatsWithPlayers);
        console.log(`button: ${_dealerButton} sb: ${_smallBlind} bb: ${_bigBlind}`);

        props.socket.emit("rotateBlinds", {
            dealerButton: _dealerButton,
            smallBlind: _smallBlind,
            bigBlind: _bigBlind,
            roomName: props.roomName,
            playerTurnIndex: tempPlayerTurnIndex
        });

        let newTotalPot = smallBlindAmount + bigBlindAmount;
        console.log(`in UI pokerTable newTotatlPot: ${newTotalPot}`);
        setTotalPot(newTotalPot);
        props.socket.emit("updateTotalPot", {
          roomName: props.roomName, 
          totalPot: newTotalPot
        });

    }

    // used at start of game, picks a random seat with a player
    // to be in the dealer button. the next seat to his left with a 
    // player will be the small blind, and the next seat with a
    // player to the left of the sb will be the big blind. If only
    // 2 players, the button is the sb and other player is bb
    const initBlinds = () => {
        if (seat1) seatsWithPlayers.push(1);
        if (seat2) seatsWithPlayers.push(2);
        if (seat3) seatsWithPlayers.push(3);
        if (seat4) seatsWithPlayers.push(4);
        if (seat5) seatsWithPlayers.push(5);
        if (seat6) seatsWithPlayers.push(6);

        // not enough players
        if (seatsWithPlayers.length < 2) return;

        const randomIndex = Math.floor(Math.random() * seatsWithPlayers.length);
        const randomSeat = seatsWithPlayers[randomIndex];

        _dealerButton = randomSeat;
        _smallBlind = seatsWithPlayers[(randomIndex + 1) % seatsWithPlayers.length];
        _bigBlind = seatsWithPlayers[(randomIndex + 2) % seatsWithPlayers.length];

        let tempPlayerTurnIndex = _smallBlind;
        setPlayerTurnIndex(tempPlayerTurnIndex);

        switch (tempPlayerTurnIndex) {
            case 1:
              setPlayerTurn(seatName1)
              break;
            case 2:
              setPlayerTurn(seatName2)
              break;
            case 3:
              setPlayerTurn(seatName3)
              break;
            case 4:
              setPlayerTurn(seatName4)
              break;
            case 5:
              setPlayerTurn(seatName5)
              break;
            case 6:
              setPlayerTurn(seatName6)
              break;
            default:
              console.log("Number is not between 1 and 6");
              break;
        }
        setDealerButton(_dealerButton);
        setSmallBlind(_smallBlind);
        setBigBlind(_bigBlind);
        
        
        console.log("current persons turn is seat :", _dealerButton);


        console.log(seatsWithPlayers);
        console.log(`button: ${_dealerButton} sb: ${_smallBlind} bb: ${_bigBlind}`);
        console.log(`ITS seats ${tempPlayerTurnIndex} TURN!! (caller)`);

        props.socket.emit("initBlinds", {
            dealerButton: _dealerButton,
            smallBlind: _smallBlind,
            bigBlind: _bigBlind,
            roomName: props.roomName,
            playerTurnIndex: tempPlayerTurnIndex
        });

        let newTotalPot = smallBlindAmount + bigBlindAmount;
        console.log(`in UI pokerTable newTotatlPot: ${newTotalPot}`);
        setTotalPot(newTotalPot);
        props.socket.emit("updateTotalPot", {
          roomName: props.roomName, 
          totalPot: newTotalPot
        });
    }

    const dealRiver = () => {
        _communityCards = [..._communityCards, deck.deal()]; 
        setCommunityCards(_communityCards);

        props.socket.emit("dealRiver", {
            river: _communityCards,
            roomName: props.roomName
        });
    }

    const dealTurn = () => {
        _communityCards = [..._communityCards, deck.deal()]; 
        setCommunityCards(_communityCards);

        props.socket.emit("dealTurn", {
            turn: _communityCards,
            roomName: props.roomName
        });
    }

    const dealFlop = () => {
        _communityCards = [deck.deal(), deck.deal(), deck.deal()];
        setCommunityCards(_communityCards);

        props.socket.emit("dealFlop", {
            flop: _communityCards,
            roomName: props.roomName
        });
    }
    
    const dealHoleCards = () => {
        //console.log(deck);
        deck = new Deck();
        deck.shuffle();

        if (!isFirstHand) {
          rotateBlinds();
        }

        if (isFirstHand)
          setIsFirstHand(false);

        seatsWithCards = [];

        if (seat1) {
          _holeCards[0] = [deck.deal(), deck.deal()];
          seatsWithCards.push(1);
        }
        if (seat2) {
          _holeCards[1] = [deck.deal(), deck.deal()];
          seatsWithCards.push(2);
        } 
        if (seat3) {
          _holeCards[2] = [deck.deal(), deck.deal()];
          seatsWithCards.push(3);
        } 
        if (seat4) {
          _holeCards[3] = [deck.deal(), deck.deal()];
          seatsWithCards.push(4);
        } 
        if (seat5) {
          _holeCards[4] = [deck.deal(), deck.deal()];
          seatsWithCards.push(5);
        }
        if (seat6) {
          _holeCards[5] = [deck.deal(), deck.deal()];
          seatsWithCards.push(6);
        }
        
        setHoleCards(_holeCards);
        console.log(_holeCards);

        props.socket.emit("dealHoleCards", {
            deck: deck, 
            holeCards: _holeCards, 
            roomName: props.roomName
        });

        dealFlop();
        dealTurn();
        dealRiver();
        console.log(`seaaaat: ${currentSeat}`)
        console.log(`communnnnity cards: ${communityCards}`)
        getPlayersBestHands();

    }

    useEffect(() => {
        if(props.socket !== null) {
        
         props.socket.on("receiveSeatNumber", (data) => {
            //alert(data);
            console.log("Seat number recieved is :", data);

            //we have seat number of what they chose and we have the username of the person who chose it
           // console.log("temp user:", tempuser, " most recent user: ", mostRecentUser );

            switch (data.seatNumber) {
                case 1:
                  setSeat1(true);
                  setSeatName1(data.user.userName);
                  setSeatChipCount1(data.chipCount);
                  break;
                case 2:
                  setSeat2(true);
                  setSeatName2(data.user.userName);
                  setSeatChipCount2(data.chipCount);
                  break;
                case 3:
                  setSeat3(true);
                  setSeatName3(data.user.userName);
                  setSeatChipCount3(data.chipCount);
                  break;
                case 4:
                  setSeat4(true);
                  setSeatName4(data.user.userName);
                  setSeatChipCount4(data.chipCount);
                  break;
                case 5:
                  setSeat5(true);
                  setSeatName5(data.user.userName);
                  setSeatChipCount5(data.chipCount);
                  break;
                case 6:
                  setSeat6(true);
                  setSeatName6(data.user.userName);
                  setSeatChipCount6(data.chipCount);
                  break;
                default:
                  console.log("Number is not between 1 and 6");
                  break;
            }
          });

          props.socket.on("update_room",(data) => {
            //console.log("RRR ", props.user.userName, " RRR");
            console.log(">>>>>> ", data);
            console.log("IT GOT CALLED IN UI UPDATE_ROOM, array is: ", data);
                data.forEach((obj,idx) =>{
                    switch (obj.seatNumber) {
                        case 1:
                          setSeat1(true);
                          setSeatName1(obj.userName);
                          setSeatChipCount1(obj.chipCount);
                          console.log(`seat1 chip count: ${obj.chipCount}`);
                          break;
                        case 2:
                          setSeat2(true);
                          setSeatName2(obj.userName);
                          setSeatChipCount2(obj.chipCount);
                          console.log(`seat2 chip count: ${obj.chipCount}`);
                          break;
                        case 3:
                          setSeat3(true);
                          setSeatName3(obj.userName);
                          setSeatChipCount3(obj.chipCount);
                          console.log(`seat3 chip count: ${obj.chipCount}`);
                          break;
                        case 4:
                          setSeat4(true);
                          setSeatName4(obj.userName);
                          setSeatChipCount4(obj.chipCount);
                          console.log(`seat4 chip count: ${obj.chipCount}`);
                          break;
                        case 5:
                          setSeat5(true);
                          setSeatName5(obj.userName);
                          setSeatChipCount5(obj.chipCount);
                          console.log(`seat5 chip count: ${obj.chipCount}`);
                          break;
                        case 6:
                          setSeat6(true);
                          setSeatName6(obj.userName);
                          setSeatChipCount6(obj.chipCount);
                          console.log(`seat6 chip count: ${obj.chipCount}`);
                          break;
                        default:
                          console.log("Number is not between 1 and 6");
                          break;
                    }
                })

          });

          props.socket.on("groupUpdate_room", (data) => {
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

          props.socket.on("recievedUpdateTotalPot", data => {
            setTotalPot(data.totalPot);
          });

          props.socket.on("recievedDealHoleCards", (data) => {
            console.log("&&&&&&& ",data.deck);
            console.log(data.holeCards);
            setHoleCards(data.holeCards);
            deck = data.deck;
          });

          props.socket.on("recievedDealFlop", (data) => {
            setCommunityCards(data.flop);
          });

          props.socket.on("recievedDealTurn", (data) => {
            setCommunityCards(data.turn);
          });

          props.socket.on("recievedDealRiver", (data) => {
            setCommunityCards(data.river);
          });

          props.socket.on("recievedInitBlinds", (data) => {
            setDealerButton(data.dealerButton);
            setSmallBlind(data.smallBlind);
            setBigBlind(data.bigBlind);
            setPlayerTurnIndex(data.playerTurnIndex);
            console.log(`button: ${data.dealerButton} sb: ${data.smallBlind} bb: ${data.bigBlind}`);
            console.log(`ITS seats ${data.playerTurnIndex} TURN!! (calleeeeee)`);
            switch (data.playerTurnIndex) {
                case 1:
                  setPlayerTurn(seatName1)
                  break;
                case 2:
                    setPlayerTurn(seatName2)
                  break;
                case 3:
                    setPlayerTurn(seatName3)
                  break;
                case 4:
                    setPlayerTurn(seatName4)
                  break;
                case 5:
                    setPlayerTurn(seatName5)
                  break;
                case 6:
                    setPlayerTurn(seatName6)
                  break;
                default:
                  console.log("Number is not between 1 and 6");
                  break;
            }
          });

          props.socket.on("recievedRotateBlinds", (data) => {
            setDealerButton(data.dealerButton);
            setSmallBlind(data.smallBlind);
            setBigBlind(data.bigBlind);
            setPlayerTurnIndex(data.playerTurnIndex)
            console.log(`button: ${data.dealerButton} sb: ${data.smallBlind} bb: ${data.bigBlind}`);
            console.log("current persons turn is seat: ", data.dealerButton);
            switch (data.playerTurnIndex) {
                case 1:
                  setPlayerTurn(seatName1)
                  break;
                case 2:
                    setPlayerTurn(seatName2)
                  break;
                case 3:
                    setPlayerTurn(seatName3)
                  break;
                case 4:
                    setPlayerTurn(seatName4)
                  break;
                case 5:
                    setPlayerTurn(seatName5)
                  break;
                case 6:
                    setPlayerTurn(seatName6)
                  break;
                default:
                  console.log("Number is not between 1 and 6");
                  break;
            }

          });
    
          props.socket.on("recievedStartGame", (data) => {
            setGameStarted(true);
          });

          props.socket.on("recievedPlayersBestHands", (data) => {
            let pokerHands = [];
            data.bestHands.forEach(hand => {
                const newPokerHand = !hand ? null : new PokerHand(hand.cards);
                pokerHands.push(newPokerHand);
            });
            setBestHands(pokerHands);
            console.log(pokerHands);
          });
          props.socket.on("recievedCheckAction", (data)=>{
            setPlayerTurnIndex(data.playerTurnIndex)
            setPlayerTurn(data.playerTurn);

            console.log("check action called from other user, new players turn is :", data.playerTurn);
          })
        }
        
    }, [props.socket])

    console.log("host is :", props.host);

    const handleLeaveGame = () => {
        props.setActionForMatch(null);
        props.socket.emit("leaveGame");
    }
    const checkAction = () =>{
        seatsWithPlayers = [];

        if (seat1) seatsWithPlayers.push(1);
        if (seat2) seatsWithPlayers.push(2);
        if (seat3) seatsWithPlayers.push(3);
        if (seat4) seatsWithPlayers.push(4);
        if (seat5) seatsWithPlayers.push(5);
        if (seat6) seatsWithPlayers.push(6);

        const newPlayerActionIndex = (seatsWithPlayers.indexOf(playerTurnIndex) + 1) % seatsWithPlayers.length;
        const newPlayerActionSeat = seatsWithPlayers[newPlayerActionIndex];
        setPlayerTurnIndex(newPlayerActionSeat);
        let _playerTurn;

        switch (newPlayerActionSeat) {
            case 1:
              setPlayerTurn(seatName1)
              _playerTurn = seatName1;
              break;
            case 2:
                setPlayerTurn(seatName2)
                _playerTurn = seatName2;
              break;
            case 3:
                setPlayerTurn(seatName3)
                _playerTurn = seatName3;
              break;
            case 4:
                setPlayerTurn(seatName4)
                _playerTurn = seatName4;
              break;
            case 5:
                setPlayerTurn(seatName5)
                _playerTurn = seatName5;
              break;
            case 6:
                setPlayerTurn(seatName6)
                _playerTurn = seatName6;
              break;
            default:
              console.log("Number is not between 1 and 6");
              break;
        }
        props.socket.emit("playerCheckAction", {
          roomName: props.roomName, 
          playerTurn: _playerTurn, 
          playerTurnIndex: newPlayerActionSeat
        });
    }

    return (
        <Box sx={{
            height: '100vh',
            width: '100vw',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: '#111111',
            flexDirection: 'column'
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
                    (currentSeat !== 0 && !seat4) ? "" :
                    !seat4 ? <EmptySeat mostRecentUser={mostRecentUser} 
                             user={props.user} roomName={props.roomName} 
                             socket={props.socket} currentSeat={currentSeat} 
                             setCurrentSeat={setCurrentSeat} seat4={seat4} 
                             setSeat4={setSeat4} seatNumber={4} 
                             setSeatChipCount4={setSeatChipCount4}
                             /> 
                    : <PlayerBox isCurrentTurn={playerTurnIndex === 4} 
                        mostRecentUser={seatName4} roomName={props.roomName} 
                        socket={props.socket} user={props.user} 
                        holeCards={holeCards[3]} name={seatName4}
                        seatChipCount={seatChipCount4}
                        setSeatChipCount={setSeatChipCount4}
                      />
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
                              (currentSeat !== 0 && !seat3) ? "" :
                              !seat3 ? <EmptySeat mostRecentUser={mostRecentUser} 
                                        user={props.user} roomName={props.roomName} 
                                        socket={props.socket} currentSeat={currentSeat}
                                        setCurrentSeat={setCurrentSeat} seat3={seat3} 
                                        setSeat3={setSeat3} seatNumber={3}
                                        setSeatChipCount3={setSeatChipCount3}
                                       /> 
                              : <PlayerBox isCurrentTurn={playerTurnIndex === 3} 
                                 mostRecentUser={seatName3} roomName={props.roomName} 
                                 socket={props.socket} user={props.user} 
                                 holeCards={holeCards[2]} name={seatName3}
                                 seatChipCount={seatChipCount3}
                                 setSeatChipCount={setSeatChipCount3}
                                 />
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
                              (currentSeat !== 0 && !seat2) ? "" :
                              !seat2 ? <EmptySeat mostRecentUser={mostRecentUser} 
                                        user={props.user} roomName={props.roomName}
                                        socket={props.socket} currentSeat={currentSeat}
                                        setCurrentSeat={setCurrentSeat} seat2={seat2} 
                                        setSeat2={setSeat2} seatNumber={2}
                                        setSeatChipCount2={setSeatChipCount2}
                                       /> 
                              : <PlayerBox isCurrentTurn={playerTurnIndex === 2}
                                 mostRecentUser={seatName2} roomName={props.roomName} 
                                 socket={props.socket} user={props.user} 
                                 holeCards={holeCards[1]} name={seatName2}
                                 seatChipCount={seatChipCount2}
                                 setSeatChipCount={setSeatChipCount2}
                                />
                            }
                        </Box>
                    </Box>
                    
                    <PokerTable communityCards={communityCards} dealer={dealerButton} smallBlind={smallBlind}
                                bigBlind={bigBlind} gameStarted={gameStarted} setGameStarted={setGameStarted} 
                                host={props.host} user={props.user.userName} roomName={props.roomName}
                                socket={props.socket} initBlinds={initBlinds} 
                                seatChipCount1={seatChipCount1} seatChipCount2={seatChipCount2}
                                seatChipCount3={seatChipCount3} seatChipCount4={seatChipCount4}
                                seatChipCount5={seatChipCount5} seatChipCount6={seatChipCount6}
                                setSeatChipCount1={setSeatChipCount1} setSeatChipCount2={setSeatChipCount2}
                                setSeatChipCount3={setSeatChipCount3} setSeatChipCount4={setSeatChipCount4}
                                setSeatChipCount5={setSeatChipCount5} setSeatChipCount6={setSeatChipCount6}
                                totalPot={totalPot} setTotalPot={setTotalPot}
                                >
                    </PokerTable>

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
                              (currentSeat !== 0 && !seat5) ? "" :
                              !seat5 ? <EmptySeat mostRecentUser={mostRecentUser} 
                                        user={props.user} roomName={props.roomName} 
                                        socket={props.socket} currentSeat={currentSeat} 
                                        setCurrentSeat={setCurrentSeat} seat5={seat5} 
                                        setSeat5={setSeat5} seatNumber={5}
                                        setSeatChipCount5={setSeatChipCount5}
                                       /> 
                              : <PlayerBox isCurrentTurn={playerTurnIndex === 5} 
                                 mostRecentUser={seatName5} roomName={props.roomName} 
                                 socket={props.socket} user={props.user} 
                                 holeCards={holeCards[4]} name={seatName5}
                                 seatChipCount={seatChipCount5}
                                 setSeatChipCount={setSeatChipCount5}
                                 />
                            }
                        </Box>
                        <Box sx={{
                            height: playerBoxHeight,
                            width: playerBoxWidth,
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            {
                              (currentSeat !== 0 && !seat6) ? "" :
                              !seat6 ? <EmptySeat mostRecentUser={mostRecentUser} 
                                        user={props.user} roomName={props.roomName} 
                                        socket={props.socket} currentSeat={currentSeat} 
                                        setCurrentSeat={setCurrentSeat} seat6={seat6} 
                                        setSeat6={setSeat6} seatNumber={6}
                                        setSeatChipCount6={setSeatChipCount6}
                                       /> 
                              : <PlayerBox isCurrentTurn={playerTurnIndex === 6} 
                                 mostRecentUser={seatName6} roomName={props.roomName} 
                                 socket={props.socket} user={props.user} 
                                 holeCards={holeCards[5]} name={seatName6}
                                 seatChipCount={seatChipCount6}
                                 setSeatChipCount={setSeatChipCount6}
                                 />
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
                }}> 
                    {
                      (currentSeat !== 0 && !seat1) ? "" :
                      !seat1 ? <EmptySeat mostRecentUser={mostRecentUser} 
                                user={props.user} roomName={props.roomName} 
                                socket={props.socket} currentSeat={currentSeat} 
                                setCurrentSeat={setCurrentSeat} seat1={seat1} 
                                setSeat1={setSeat1} seatNumber={1}
                                setSeatChipCount1={setSeatChipCount1}
                               /> 
                      : <PlayerBox isCurrentTurn={playerTurnIndex === 1} 
                         mostRecentUser={seatName1} roomName={props.roomName} 
                         socket={props.socket} user={props.user} 
                         holeCards={holeCards[0]} name={seatName1}
                         seatChipCount={seatChipCount1}
                         setSeatChipCount={setSeatChipCount1}
                        />
                    }
                </Box>
                
            </Box>
            { props.host === props.user.userName ?
            <Button variant="contained" color="success" onClick={dealHoleCards}>
                Deal
            </Button> : ""
            } 
            <Typography sx={{
                color: "#eeeeee"
            }}>{
                bestHands[currentSeat - 1]?.print() || ""
            }</Typography>
            { playerTurnIndex === currentSeat ?
                <Button variant='contained' color='success' onClick={checkAction}>Check</Button>
                : ""
            }


        </Box>
    );
}

export default PokerTableWithPlayers;