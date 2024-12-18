import React, { Suspense, useState, useEffect, useRef, Fragment } from 'react';
import { Canvas, useLoader, useFrame ,extend, useThree} from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three';
import { OrbitControls as OrbitControlsImpl } from 'three/examples/jsm/controls/OrbitControls';
import {SpotLight, Stage, Html, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Button, Box, Typography } from '@mui/material';
import { Vector3 } from 'three';
import { FirstPersonControls } from '@react-three/drei';
import { PointerLockControls } from '@react-three/drei';
import { Card } from '../poker_logic/Card';
import PlayerNamesAndCards from './PlayerNamesAndCards';
import API from '../API-Interface/API-Interface';
import { useGlobalAudioPlayer } from 'react-use-audio-player';
import lobbyMusic from '../Music/funk-casino-163105.mp3'

import logo2 from '../croppedLogo.png';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const heavy = createTheme({
  typography: {
    fontFamily: [
      'heavy',

    ].join(','),
  },
  palette: {
      primary: {
        main: '#9caab7', // replace with your desired hex color
      },
      secondary:{
        main:'#0000ff'
      },
      third:{
        main:'#BF40BF'
      }
      // ... other color settings
    },
});


extend({ Html, Box, Typography });
const { Deck } = require('../poker_logic/Deck');
const { PokerHand, numCardsInPokerHand } = require('../poker_logic/PokerHand');
const texturePath = '/tabletextures/';
const manager = new THREE.LoadingManager();


manager.setURLModifier((url) => {
  const newUrl = new URL(url, window.location.href);
  newUrl.pathname = `${texturePath}${newUrl.pathname.split('/').pop()}`;
  return newUrl.href;
});

const PokerTable = ({ position }) => {
  const gltf = useLoader(GLTFLoader, '/tabletextures/wholeroom.gltf', (loader) => {
    loader.setPath('/models/');
    loader.setResourcePath(texturePath);
    loader.manager = manager;
  });



  return <primitive object={gltf.scene} position={position} scale={[0.005, 0.005, 0.005]} />;
};
const AllChips = ({ position }) => {
  const gltf = useLoader(GLTFLoader, '/tabletextures/smallChips.glb', (loader) => {
    loader.setPath('/models/');
    loader.setResourcePath(texturePath);
    loader.manager = manager;
  });



  return <primitive object={gltf.scene} position={position} scale={[0.05, 0.05, 0.05]} />;
};

const Players = ({ visibility }) => {
  const gltf = useLoader(GLTFLoader, '/tabletextures/wholeroom3.gltf');
  return gltf.scene.children.filter(child => child.name.startsWith("player")).map(child => (
    <primitive
      key={child.name}
      object={child}
      visible={visibility[child.name]}
    />
  ));
};

const Room = ({ position, visibility, setVisibility }) => {
  const gltf = useLoader(GLTFLoader, '/tabletextures/wholeroom3.gltf');

  const handleClick = (event, chair) => {
    const playerName = `player${chair.name.replace(/\D/g, '')}`;
    setVisibility(prev => ({
      ...prev,
      [playerName]: !prev[playerName]
    }));
  };

  return (
    <group position={position} scale={[0.05, 0.05, 0.05]}>
      {gltf.scene.children.map(child => {
        if (child.children.length > 0 && child.children[0].isMesh && child.name.startsWith("chair")) {
          return (
            <mesh
              key={child.name}
              geometry={child.children[0].geometry}
              material={child.children[0].material}
              onClick={(event) => handleClick(event, child)}
              position={child.position}
              rotation={child.rotation}
              scale={child.scale}
            />
          );
        } else if (!child.name.startsWith("player")) {
          return <primitive key={child.name} object={child} visible={true} />;
        }
      })}
      
    </group>
  );
};


const SimpleRoom = ({ isVisible }) => {
  const gltf = useLoader(GLTFLoader, '/tabletextures/roomnochairorplayer.gltf');
  const meshRef = useRef();

  // Update the mesh visibility based on the state toggle
  if (meshRef.current) {
    meshRef.current.visible = isVisible;
  }

  return (
    <primitive ref={meshRef} object={gltf.scene} scale={[1, 1, 1]} />
  );
};

const Player = ({ id, isVisible }) => {
  const gltf = useLoader(GLTFLoader, `/tabletextures/player${id}.gltf`);
  const meshRef = useRef();
  if (meshRef.current) {
    meshRef.current.visible = isVisible;
  }

  return (
    <primitive ref={meshRef} object={gltf.scene} scale={[1, 1, 1]} visible={isVisible}  />
  );
};

const Chair = ({ id, togglePlayerVisibility, setCurrentSeat, seatNumber, user, roomName, socket }) => {
  const gltf = useLoader(GLTFLoader, `/tabletextures/chair${id}.gltf`);
  const meshRef = useRef();
  


  if (meshRef.current) {
    meshRef.current.visible = true;
  }
  return (
    <primitive
      ref={meshRef}
      object={gltf.scene}
      geometry={gltf.scene.children[0].geometry}
      material={gltf.scene.children[0].material}
      scale={[1, 1, 1]}
      onClick={() => togglePlayerVisibility(id)}
    />
  );
};



const Cards = ({ id, typeCard, card, cardPOS}) => {

  //console.log(`LOOK THIS IS THE CARD ${card.value + card.suit}`)

  const gltf = useLoader(GLTFLoader, `/tabletextures/pokerdeck/${card.value + card.suit}.glb`);
  const cardRef = useRef();
  let position, rotation, scale;
  // Define the position, rotation, and scale

  //if comunity card we will do a switch from 0-4 (passing CC, index 0-4).... switch to determine the postion to set it to
  //if player card we will do a switch from 1-6 (passing pc, index1-6 )... switch to determine and if condition (0 or 1)for each to determine position
  if(typeCard==="community"){
    switch (id) {
      case 0:
        position = new THREE.Vector3(1.871, 1.5039156776787426, -0.626);
        rotation = new THREE.Euler(0, -0.7582964141897087, 0); // Using Euler angles here
        scale = new THREE.Vector3(0.25, 0.25, 0.25); // Scale down the card
        
        break;
      case 1:
          
      position = new THREE.Vector3(1.560, 1.504, -0.911);
      rotation = new THREE.Euler(0, -0.7582964141897087, 0); // Using Euler angles here
      scale = new THREE.Vector3(0.25, 0.25, 0.25); // Scale down the card
        break;
      case 2:
        position = new THREE.Vector3(1.27, 1.504, -1.21);
        rotation = new THREE.Euler(0, -0.7582964141897087, 0); // Using Euler angles here
        scale = new THREE.Vector3(0.25, 0.25, 0.25); 
        break;
      case 3:
        position = new THREE.Vector3(0.938, 1.504, -1.481);
        rotation = new THREE.Euler(0, -0.7582964141897087, 0); // Using Euler angles here
        scale = new THREE.Vector3(0.25, 0.25, 0.25); 
        break;
      case 4:
        position = new THREE.Vector3(0.627, 1.504, -1.796);
        rotation = new THREE.Euler(0, -0.7582964141897087, 0); // Using Euler angles here
        scale = new THREE.Vector3(0.25, 0.25, 0.25); 
        break;
      default:
        console.log("Number is not between 1 and 6");
        break;
    }
   
  }
  else if(typeCard==="player"){
    switch (id) {
      case 0:
        if(cardPOS === 0){
          position = new THREE.Vector3(2.921, 1.912, 0.759);
          rotation = new THREE.Euler(-30, .1, 30.7); // Using Euler angles here
          scale = new THREE.Vector3(0.25, 0.25, 0.25); // Scale down the card
        }
        else if (cardPOS === 1){
          position = new THREE.Vector3(3.248, 1.912, .432);
          rotation = new THREE.Euler(-30, .1, 30.7); // Using Euler angles here
          scale = new THREE.Vector3(0.25, 0.25, 0.25); // Scale down the card
        }
        break;
      case 1:
        if(cardPOS === 0){
          position = new THREE.Vector3(3.454, 1.8, -0.265);
          rotation = new THREE.Euler(-89.59, -41.3, -86.5); // Using Euler angles here
          scale = new THREE.Vector3(0.25, 0.25, 0.25); // Scale down the card
        }
        else if (cardPOS === 1){
          position = new THREE.Vector3(3.454, 1.8, -0.739);
          rotation = new THREE.Euler(-89.59, -41.3, -86.5); // Using Euler angles here
          scale = new THREE.Vector3(0.25, 0.25, 0.25); // Scale down the card
        } // Scale down the card
        break;
      case 2:
        if(cardPOS === 0){
          position = new THREE.Vector3(3.074, 1.8, -1.503);
          rotation = new THREE.Euler(30,-.2, 5.5); // Using Euler angles here
          scale = new THREE.Vector3(0.25, 0.25, 0.25); // Scale down the card
        }
        else if (cardPOS === 1){
          position = new THREE.Vector3(2.786, 1.8, -1.845);
          rotation = new THREE.Euler(30,-.2, 5.5); // Using Euler angles here
          scale = new THREE.Vector3(0.25, 0.25, 0.25); // Scale down the card
        } 
        break;
      case 3:
        if(cardPOS === 0){
          position = new THREE.Vector3(1.319, 1.8, -2.818);
          rotation = new THREE.Euler(-155, -24.6, -121.94); // Using Euler angles here
          scale = new THREE.Vector3(0.25, 0.25, 0.25); // Scale down the card
        }
        else if (cardPOS === 1){
          position = new THREE.Vector3(0.979, 1.8, -3.136);
          rotation = new THREE.Euler(-155, -24.6, -121.94); // Using Euler angles here
          scale = new THREE.Vector3(0.25, 0.25, 0.25); // Scale down the card
        } 
        break;
      case 4:
        if(cardPOS === 0){
          position = new THREE.Vector3(0.282, 1.912, -3.441);
          rotation = new THREE.Euler(-54.14, -.1, 2.87); // Using Euler angles here
          scale = new THREE.Vector3(0.25, 0.25, 0.25); // Scale down the card
        }
        else if (cardPOS === 1){
          position = new THREE.Vector3(-0.210, 1.912, -3.441);
          rotation = new THREE.Euler(-54.14, -.1, 2.87); // Using Euler angles here
          scale = new THREE.Vector3(0.25, 0.25, 0.25); // Scale down the card
        } 
        break;
      case 5:
        if(cardPOS === 0){
          position = new THREE.Vector3(-0.631, 1.908, -2.923);
          rotation = new THREE.Euler(-42.03, 30.93, 40); // Using Euler angles here
          scale = new THREE.Vector3(0.25, 0.25, 0.25); // Scale down the card
        }
        else if (cardPOS === 1){
          position = new THREE.Vector3(-0.983, 1.912, -2.570);
          rotation = new THREE.Euler(-42.03, 30.93, 40); // Using Euler angles here
          scale = new THREE.Vector3(0.25, 0.25, 0.25); // Scale down the card
        } 
          break;
      default:
        console.log("Number is not between 1 and 6");
        break;
    }


  }



  return (
      <primitive
          ref={cardRef}
          object={gltf.scene}
          position={position}
          rotation={rotation}
          scale={scale}
      />
  );
};



extend({ OrbitControlsImpl });

const OrbitControls = (props) => {
  const { camera, gl } = useThree();
  const controls = useRef();

  useFrame(() => {
    //console.log(camera,"cam");
    if (controls.current) {
      controls.current.update();
      props.setCameraData({
        position: camera.position.toArray(),
        rotation: camera.rotation.toArray(),
        zoom: camera.zoom
      });
    }
  });

  return <orbitControlsImpl ref={controls} args={[camera, gl.domElement]}       enableZoom={true} // Disable zooming
  enablePan={true}  // Disable panning
  enableRotate={true} // Enable rotation
  />;
};


let deck;
const bigBlindAmount = 100;
const smallBlindAmount = 50;
let currentSeat2;
let visibility2 = {
  player1: false,
  player2: false,
  player3: false,
  player4: false,
  player5: false,
  player6: false
}
let newEndingCycle;
let savedFirstPlayerTurn;
let lastRaise2 = -1;
let playerStatus2 = {
  player1: 'playing',
  player2: 'playing',
  player3: 'playing',
  player4: 'playing',
  player5: 'playing',
  player6: 'playing',
};
let gameStarted2 = false;
let playerTurnIndex2;
let _playerMoney;
let _totalPot = 0;
let _seatChipCount1 = 0;
let _seatChipCount2 = 0;
let _seatChipCount3 = 0;
let _seatChipCount4 = 0;
let _seatChipCount5 = 0;
let _seatChipCount6 = 0;



const PokerTableWithPlayers = (props) => {


  const[isMuted, setIsMuted] = useState(false);
  const { load } = useGlobalAudioPlayer();
  const audioRef = useRef(new Audio(lobbyMusic));
  useEffect(() => {
    audioRef.current.play();
    return () => {
      audioRef.current.pause(); // Cleanup audio on component unmount
    };
  }, []);
  
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };
  

  const [seatName1, setSeatName1] = useState(props.user.userName);
  const [seatName2, setSeatName2] = useState(props.user.userName);
  const [seatName3, setSeatName3] = useState(props.user.userName);
  const [seatName4, setSeatName4] = useState(props.user.userName);
  const [seatName5, setSeatName5] = useState(props.user.userName);
  const [seatName6, setSeatName6] = useState(props.user.userName);
  let _seatName1 =props.user.userName;
  let _seatName2 =props.user.userName;
  let _seatName3 =props.user.userName;
  let _seatName4 =props.user.userName;
  let _seatName5 =props.user.userName;
  let _seatName6 =props.user.userName;
  _playerMoney = props.playerMoney;
  const [seatChipCount1, setSeatChipCount1] = useState(0);
  const [seatChipCount2, setSeatChipCount2] = useState(0);
  const [seatChipCount3, setSeatChipCount3] = useState(0);
  const [seatChipCount4, setSeatChipCount4] = useState(0);
  const [seatChipCount5, setSeatChipCount5] = useState(0);
  const [seatChipCount6, setSeatChipCount6] = useState(0);

  
  const [totalPot, setTotalPot] = useState(0);
  

  const [currentSeat, setCurrentSeat] = useState(null);
  const [visibility, setVisibility] = useState({
    player1: false,
    player2: false,
    player3: false,
    player4: false,
    player5: false,
    player6: false
  });

  const namePositions = {
    player1: [3.923879107980736, 3.4749514605206433, 1.0414440423770173],
    player2: [4.399886094460785,3.4749514605206433, -0.8129757847962559],
    player3: [3.407375782191977, 3.4749514605206433,  -2.3160688005082415],
    player4: [1.6493022576347443,  3.4749514605206433, -3.704894706352383],
    player5: [-0.17391148652813393, 3.4749514605206433, -4.3423994958588175],
    player6: [-1.4384571787631077, 3.4749514605206433,  -3.4652850607946486]
  }
  let players2;
  const [players,setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [holeCards, setHoleCards] = useState([[], [], [], [], [], []]);
  let _holeCards = [[], [], [], [], [], []];
  const [communityCards, setCommunityCards] = useState([]);
  let _communityCards = [];
  const [dealerButton, setDealerButton] = useState(0);
  let _dealerButton = 0;
  const [smallBlind, setSmallBlind] = useState(0);
  let _smallBlind = 0;
  const [bigBlind, setBigBlind] = useState(0);
  let _bigBlind = 0;
  let seatsWithPlayers = [];
  const [bestHands, setBestHands] = useState([]);
  let _bestHands = [];
  const [playerTurn, setPlayerTurn] = useState(false);
  const [playerTurnIndex, setPlayerTurnIndex] = useState(null);
  const [canCheck, setCanCheck] = useState(true);
  const [minBet, setMinBet] = useState(bigBlindAmount); //the min bet should be set initially to big blind
  const [winnerName, setWinnerName] = useState("");
  let _winnerName;
  const[playerStatus, setPlayerStatus]= useState({
    player1: 'playing',
    player2: 'playing',
    player3: 'playing',
    player4: 'playing',
    player5: 'playing',
    player6: 'playing',
  })
  const [skipTurn, setSkipTurn] = useState(false);
  const[playerMoney, setPlayerMoney]= useState({
    player1: 0,
    player2: 0,
    player3: 0,
    player4: 0,
    player5: 0,
    player6: 0,
  }) // we need to set the big blind and small blind for these
  const[lastRaise, setLastRaise] = useState(-1); // keeps track of the last seat that raised
  //therewfore everyone must either call, reraise, or fold

  const[flop,setFlop] = useState(false);
  const[turn,setTurn] = useState(false);
  const[river,setRiver] = useState(false);
  const[showdown, setShowdown] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayColor, setOverlayColor] = useState('green');

  const [ammountToCall, setAmmountToCall] = useState(0);

  if(currentSeat){
    visibility2[`player${currentSeat}`] = true;
  }


    // returns all C(7, 5) combos of poker hands a player can have
    // given their 2 hole cards and the 5 community cards
    // 
    // returns 2d array
    function generateCombos(cards) {
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
        console.log(holeCards, "hole cards here");
        const holeCardsAndCommunityCards = holeCards.map(cards => {
            return cards.length !== 0 ? [...cards, ...communityCards] : [];
        });
        console.log(holeCardsAndCommunityCards, " look here in best hands");

        // combos is 3d array where the outter array is an array of size
        // 6 and the inner array is an array of arrays representing each
        // players C(7, 5) possible hand combos from that player's 2 hole 
        // cards and the 5 community cards
        const combos = [];
        for (let i = 0; i < holeCardsAndCommunityCards.length; i++) {        
            combos.push(generateCombos(holeCardsAndCommunityCards[i]));
        }
        console.log(combos, "combos");

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
        console.log(_bestHands, "best hands UI");

        props.socket.emit("playersBestHands", {
            bestHands: _bestHands,
            roomName: props.roomName
        });

        return _bestHands;
    }

        /**
         * Determines who has the best poker hand, or hands if multiple players 
         * have the best hand
         * @param {*} pokerHands - An array of size 6, where each element is a 
         *                          PokerHand object, or null if seat is empty
         */
        //emmit done to all players so we can disable the buttons and do what we want with winner/loser

        const getWinners = async (pokerHands) => {
          //console.log(pokerHands);

          let winnersHands = [];
          let winnersSeats = [];

          pokerHands.forEach( (hand, idx) => {
              if (!hand) return;
              if (winnersHands.length === 0 || hand.compareWith(winnersHands[0]) === 1) {
                  winnersHands = [hand];
                  winnersSeats = [idx + 1];
              } else if (hand.compareWith(winnersHands[0]) === 0) {
                  winnersHands.push(hand);
                  winnersSeats.push(idx + 1);
              }
                  
          });

          //console.log(winnersHands);
          //console.log(winnersSeats);
          let winnersString = '';

          winnersHands.forEach((hand, idx) => {
              winnersString += `Seat ${winnersSeats[0]} wins with a ${winnersHands[0].print()}, `;
              winnersHands[0].cards.forEach(card => {
                  winnersString += `${card.value}${card.suit}`;
              });
              winnersString += '\n';
          });

          console.log(winnersString, "WinnersString");
          const result = [];

          for (let i = 0; i < winnersHands.length; i++) {
            result.push({...winnersHands[i], seatNumber: winnersSeats[i]});
          }

          console.log(result, "Result");//emit here
          console.log("winner should be", result[0].seatNumber)
          setWinnerName(result[0].seatNumber);
          _winnerName= result[0].seatNumber;
          
          props.socket.emit("gameResult",{...result, roomName:props.roomName});
          //props.setPlayerMoney(props.playerMoney + 10000);
          const api = new API();
          console.log("currentChipcount for player UI",  eval(`_seatChipCount${currentSeat2}`));
          console.log("UI gamemoney total pot, ", _totalPot, "playermoney ",  _playerMoney);
          console.log("getwinners stuff", result[0].seatNumber, "current Seat", currentSeat2);
          try {
              if(result[0].seatNumber === currentSeat2){
                const userInfo = await api.updateGameMoney(_playerMoney + _totalPot+ eval(`_seatChipCount${currentSeat2}`),props.user.userName);
                props.setPlayerMoney(_playerMoney + _totalPot+ eval(`_seatChipCount${currentSeat2}`));
              }
              else{

                const userInfo = await api.updateGameMoney(_playerMoney+ eval(`_seatChipCount${currentSeat2}`),props.user.userName);
                props.setPlayerMoney(_playerMoney + eval(`_seatChipCount${currentSeat2}`));
              }
  
          }catch (error) {
              console.error("Error during updating money:", error);
              //setError("An error occurred during updating money.");
          }
          return result;
        };

        // shifts the dealer button, sb, and bb 1 spot to the left
        const rotateBlinds = () => {
          seatsWithPlayers = [];
  
          if (visibility["player1"]) seatsWithPlayers.push(1);
          if (visibility["player2"]) seatsWithPlayers.push(2);
          if (visibility["player3"]) seatsWithPlayers.push(3);
          if (visibility["player4"]) seatsWithPlayers.push(4);
          if (visibility["player5"]) seatsWithPlayers.push(5);
          if (visibility["player6"]) seatsWithPlayers.push(6);
  
          if (seatsWithPlayers.length < 2) return;
  
          // Move the big blind to the next position
          const newBigBlindIndex = (seatsWithPlayers.indexOf(bigBlind) + seatsWithPlayers.length - 1) % seatsWithPlayers.length;
          const newBigBlindSeat = seatsWithPlayers[newBigBlindIndex];
  
          // Set the small blind to the right of the big blind
          const newSmallBlindIndex = (newBigBlindIndex + 1) % seatsWithPlayers.length;
          const newSmallBlindSeat = seatsWithPlayers[newSmallBlindIndex];
  
          // Set the dealer button to the right of the small blind
          const newDealerButtonIndex = (newSmallBlindIndex + 1) % seatsWithPlayers.length;
          const newDealerButtonSeat = seatsWithPlayers[newDealerButtonIndex];
  
  
          //console.log(`%%%${newDealerButtonIndex} %%%${newDealerButtonSeat}`);
          //console.log(seatsWithPlayers.length, "#####");
  
          _dealerButton = newDealerButtonSeat;
          _smallBlind = newSmallBlindSeat;
          _bigBlind = newBigBlindSeat;
  
          setDealerButton(_dealerButton);
          setSmallBlind(_smallBlind);
          setBigBlind(_bigBlind);

          deductChips(_bigBlind, bigBlindAmount);
          deductChips(_smallBlind, smallBlindAmount);

          let tempPlayerTurnIndex = newSmallBlindSeat;
          setPlayerTurnIndex(tempPlayerTurnIndex);
          playerTurnIndex2 = tempPlayerTurnIndex;
          console.log(`newBBindex: ${newBigBlindIndex} newSBindex: ${newSmallBlindIndex} newButtonIndex: ${newDealerButtonIndex} playerTurn: ${tempPlayerTurnIndex}`)

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
  
          console.log("current persons turn is seat :", tempPlayerTurnIndex)
  
   
  
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
          _totalPot = newTotalPot;
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
      if (visibility["player1"]) seatsWithPlayers.push(1);
      if (visibility["player2"]) seatsWithPlayers.push(2);
      if (visibility["player3"]) seatsWithPlayers.push(3);
      if (visibility["player4"]) seatsWithPlayers.push(4);
      if (visibility["player5"]) seatsWithPlayers.push(5);
      if (visibility["player6"]) seatsWithPlayers.push(6);

      console.log(seatsWithPlayers, "initBlinds SWP");
      // not enough players
      if (seatsWithPlayers.length < 2) return;

      const randomIndex = Math.floor(Math.random() * seatsWithPlayers.length);
      const randomSeat = seatsWithPlayers[randomIndex];

      _dealerButton = randomSeat;
      _smallBlind = seatsWithPlayers[(randomIndex + seatsWithPlayers.length -1) % seatsWithPlayers.length];
      _bigBlind = seatsWithPlayers[(randomIndex + seatsWithPlayers.length-2) % seatsWithPlayers.length];

      let tempPlayerTurnIndex = _smallBlind;
      setPlayerTurnIndex(tempPlayerTurnIndex);
      savedFirstPlayerTurn = tempPlayerTurnIndex;
      console.log("FIRST PERSON TURN:", savedFirstPlayerTurn);
      playerTurnIndex2 = tempPlayerTurnIndex;

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
      
      let tempPlayerMoney = {...playerMoney};
      tempPlayerMoney[`player${_bigBlind}`] += bigBlindAmount;
      tempPlayerMoney[`player${_smallBlind}`] += smallBlindAmount;
      console.log("initial playermoney: ", tempPlayerMoney);

      setPlayerMoney(tempPlayerMoney);
      deductChips(_bigBlind, bigBlindAmount);
      deductChips(_smallBlind, smallBlindAmount);
      
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
      _totalPot= newTotalPot;
      props.socket.emit("updateTotalPot", {
        roomName: props.roomName, 
        totalPot: newTotalPot
      });
  }
  const dealRiver = () => {
    _communityCards = [...communityCards, deck.deal()]; 
    setCommunityCards(_communityCards);
    setAmmountToCall(0);
    setMinBet(50);
    setPlayerMoney((prev) => {
  const keys = Object.keys(prev);
  const updatedMoney = keys.reduce((obj, key) => {
    obj[key] = 0;
    return obj;
  }, {});

  return updatedMoney;
});
    props.socket.emit("dealRiver", {
        river: _communityCards,
        roomName: props.roomName,
        savedFirstPlayerTurn: savedFirstPlayerTurn,
        deck: deck
    });

    setPlayerTurnIndex(savedFirstPlayerTurn);
    playerTurnIndex2 = savedFirstPlayerTurn;

    
}

const dealTurn = () => {

  _communityCards = [...communityCards, deck.deal()]; 
  console.log(_communityCards,"comCARDS");
  setCommunityCards(_communityCards);
  setAmmountToCall(0);
  setMinBet(50);
  setPlayerMoney((prev) => {
    const keys = Object.keys(prev);
    const updatedMoney = keys.reduce((obj, key) => {
      obj[key] = 0;
      return obj;
    }, {});
  
    return updatedMoney;
  });
  props.socket.emit("dealTurn", {
      turn: _communityCards,
      roomName: props.roomName,
      savedFirstPlayerTurn: savedFirstPlayerTurn,
      deck: deck
  });
  setPlayerTurnIndex(savedFirstPlayerTurn);
  playerTurnIndex2 = savedFirstPlayerTurn;
}

const dealFlop = () => {
  _communityCards = [deck.deal(), deck.deal(), deck.deal()];
  setCommunityCards(_communityCards);
  setAmmountToCall(0);
  setMinBet(50);
  setPlayerMoney((prev) => {
    const keys = Object.keys(prev);
    const updatedMoney = keys.reduce((obj, key) => {
      obj[key] = 0;
      return obj;
    }, {});
  
    return updatedMoney;
  });
  props.socket.emit("dealFlop", {
      flop: _communityCards,
      roomName: props.roomName,
      savedFirstPlayerTurn: savedFirstPlayerTurn,
      deck: deck
  });
  setPlayerTurnIndex(savedFirstPlayerTurn);
  playerTurnIndex2 = savedFirstPlayerTurn;
}

const deductChips = (seat, amount) => {

  //playerMoney[`player${seat}`] +=  amount;
  // setPlayerMoney(
  //   {
  //     ...playerMoney,
  //     [`player${seat}`]: playerMoney[`player${seat}`] + amount
  //   }
  // )


  switch(seat) {
      case 1:
          const newChipCount1 = seatChipCount1 - amount;
          setSeatChipCount1(newChipCount1);
          _seatChipCount1 = newChipCount1;
          props.socket.emit("updateChipCount", {
            room: props.roomName, 
            seatNumber: 1,
            chipCount: newChipCount1,
            amount:amount,

          });
          
          break;
      case 2:
        const newChipCount2 = seatChipCount2 - amount;
          setSeatChipCount2(newChipCount2);
          _seatChipCount2 = newChipCount2;
          props.socket.emit("updateChipCount", {
            room: props.roomName, 
            seatNumber: 2,
            chipCount: newChipCount2,
            amount:amount,
          });
          break;
      case 3:
          const newChipCount3 = seatChipCount3 - amount;
          setSeatChipCount3(newChipCount3);
          _seatChipCount3 = newChipCount3;
          props.socket.emit("updateChipCount", {
            room: props.roomName, 
            seatNumber: 3,
            chipCount: newChipCount3,
            amount:amount,
          });
          break;
      case 4:
          const newChipCount4 = seatChipCount4 - amount;
          setSeatChipCount4(newChipCount4);
          _seatChipCount4 = newChipCount4;
          props.socket.emit("updateChipCount", {
            room: props.roomName, 
            seatNumber: 4,
            chipCount: newChipCount4,
            amount:amount,
          });
          break;
      case 5:
          const newChipCount5 = seatChipCount5 - amount;
          setSeatChipCount5(newChipCount5);
          _seatChipCount5 = newChipCount5;
          props.socket.emit("updateChipCount", {
            room: props.roomName, 
            seatNumber: 5,
            chipCount: newChipCount5,
            amount:amount,
          });
          break;
      case 6:
          const newChipCount6 = seatChipCount6 - amount;
          setSeatChipCount6(newChipCount6);
          _seatChipCount6 = newChipCount6;
          props.socket.emit("updateChipCount", {
            room: props.roomName, 
            seatNumber: 6,
            chipCount: newChipCount6,
            amount:amount,
          });
          break;
      default:
    }
};

const dealHoleCards = () => {
  //console.log(deck);
  if(!currentSeat){return;}
  initBlinds();
  //rotateBlinds();
  deck = new Deck();
  deck.shuffle();
  setAmmountToCall(bigBlindAmount);
  if (visibility["player1"]) _holeCards[0] = [deck.deal(), deck.deal()];
  if (visibility["player2"]) _holeCards[1] = [deck.deal(), deck.deal()];
  if (visibility["player3"]) _holeCards[2] = [deck.deal(), deck.deal()];
  if (visibility["player4"]) _holeCards[3] = [deck.deal(), deck.deal()];
  if (visibility["player5"]) _holeCards[4] = [deck.deal(), deck.deal()];
  if (visibility["player6"]) _holeCards[5] = [deck.deal(), deck.deal()];
  
  setHoleCards(_holeCards);
  console.log(_holeCards);
  console.log(deck, "Look for deck")

  props.socket.emit("dealHoleCards", {
      deck: deck, 
      holeCards: _holeCards, 
      roomName: props.roomName
  });

  // dealFlop();
  // dealTurn();
  // dealRiver();
  // console.log(`seaaaat: ${currentSeat}`)
  // console.log(`communnnnity cards: ${communityCards}`)
  // getPlayersBestHands();
  setGameStarted(true);
  gameStarted2 = true;
  props.socket.emit("startGame", {
    roomName: props.roomName
});

}


  const cameraRef = useRef();

  useEffect(() => {
    if(props.socket !== null) {
      console.log("socket called last");
      

      props.socket.on("receiveSeatNumber", (data) => {
        //alert(data);
        console.log("Seat number recieved is :", data);

        //we have seat number of what they chose and we have the username of the person who chose it
       // console.log("temp user:", tempuser, " most recent user: ", mostRecentUser );
       const key = `player${data.seatNumber}`;
       setVisibility(prev => ({
         ...prev,
         [key]: true
       }));
       visibility2[key] = true;
       console.log(visibility2, "player visibility");
        switch (data.seatNumber) {
            case 1:
              setSeatChipCount1(data.chipCount)
              _seatChipCount1 = data.chipCount;
              setSeatName1(data.user.userName);
              _seatName1=data.user.userName;
              break;
            case 2:
              setSeatChipCount2(data.chipCount)
              _seatChipCount2 = data.chipCount;
              setSeatName2(data.user.userName);
              _seatName2=data.user.userName;
              break;
            case 3:
              setSeatChipCount3(data.chipCount)
              _seatChipCount3 = data.chipCount;
                setSeatName3(data.user.userName);
                _seatName3=data.user.userName;
              break;
            case 4:
              setSeatChipCount4(data.chipCount)
              _seatChipCount4 = data.chipCount;
                setSeatName4(data.user.userName);
                _seatName4=data.user.userName;
              break;
            case 5:
              setSeatChipCount5(data.chipCount)
              _seatChipCount5 = data.chipCount;
                setSeatName5(data.user.userName);
                _seatName5=data.user.userName;
              break;
            case 6:
              setSeatChipCount6(data.chipCount)
              _seatChipCount6 = data.chipCount;
                setSeatName6(data.user.userName);
                _seatName6=data.user.userName;
              break;
            default:
              console.log("Number is not between 1 and 6");
              break;
        }
      });
      props.socket.on("update_room",(data) => {
        //const key = `player${data.seatNumber}`;
        if(currentSeat){
          visibility2[`player${currentSeat}`] = true;
        }
        console.log("IT GOT CALLED IN UI UPDATE_ROOM, array is: ", data);
            data.forEach((obj,idx) =>{
              const key = `player${obj.seatNumber}`;
              setVisibility(prev => ({
                ...prev,
                [key]: true
              }));
              visibility2[key] = true;
                switch (obj.seatNumber) {
                    case 1:
                      setSeatChipCount1(obj.chipCount)
                      _seatChipCount1 = obj.chipCount;
                      setSeatName1(obj.userName);
                      _seatName1 = obj.userName;

                      break;
                    case 2:
                      setSeatChipCount2(obj.chipCount)
                      _seatChipCount2 = obj.chipCount;
                      setSeatName2(obj.userName);
                      _seatName2 = obj.userName;
                      break;
                    case 3:
                      setSeatChipCount3(obj.chipCount)
                      _seatChipCount3 = obj.chipCount;
                      setSeatName3(obj.userName);
                      _seatName3 = obj.userName;
                      break;
                    case 4:
                      setSeatChipCount4(obj.chipCount)  
                      _seatChipCount4 = obj.chipCount;
                      setSeatName4(obj.userName);
                      _seatName4 = obj.userName;
                      break;
                    case 5:
                      setSeatChipCount5(obj.chipCount)  
                      _seatChipCount5 = obj.chipCount;
                      setSeatName5(obj.userName);
                      _seatName5 = obj.userName;
                      break;
                    case 6:
                        setSeatChipCount6(obj.chipCount)
                        _seatChipCount6 = obj.chipCount;
                        setSeatName6(obj.userName);
                        _seatName6 = obj.userName;
                      break;
                    default:
                      console.log("Number is not between 1 and 6");
                      break;
                }
            })

      });

      props.socket.on("groupUpdate_room", (data) => {
        const key = `player${data.seatLeaving}`;
        let tempArr = {...visibility2};
        tempArr[key] = false;
        setVisibility(prev => ({
          ...prev,
          [key]: false
        }));
        visibility2[key] = false;
        console.log(tempArr, "EMPTY FUCKING OBJECT");
        // Start at 'seatLeaving' and loop through the next 6 seats

        if(gameStarted2 && playerTurnIndex2 === data.seatLeaving){
          for (let i = data.seatLeaving + 6; i >= data.seatLeaving; i--) {
            // Using modulo to ensure the index stays within 1 to 6
            const adjustedIndex = (i - 1) % 6 + 1; // To maintain 1-based indexing
            console.log("seat value is ", adjustedIndex)
            // If 'tempArr' at the adjusted index is false, return the adjusted index
            if (tempArr[`player${adjustedIndex}`]) {
              console.log("new index is ", adjustedIndex)
                setPlayerTurnIndex(adjustedIndex)
                playerTurnIndex2 = adjustedIndex;
                break;
            }
          }
        }



        // console.log("Loooooooook", gameStarted)
        // if(gameStarted){
        //   console.log("playerTurn index is: ", playerTurnIndex, "and person leaving is :", data.seatLeaving);
        //   if(playerTurnIndex === data.seatLeaving){
        //     checkAction();
        //     console.log("player left should check here")
        //   }
        // }
        switch (data.seatLeaving) {
            case 1:
              
              setSeatName1(props.user.userName);
              break;
            case 2:
              
              setSeatName2(props.user.userName);
              break;
            case 3:
                
                setSeatName3(props.user.userName);
              break;
            case 4:
                
                setSeatName4(props.user.userName);
              break;
            case 5:
                
                setSeatName5(props.user.userName);
              break;
            case 6:
                
                setSeatName6(props.user.userName);
              break;
            default:
              console.log("Number is not between 1 and 6");
              break;
        }
       

      })

      props.socket.on("recievedUpdateTotalPot", data => {
        setTotalPot(data.totalPot);
        _totalPot = data.totalPot;
      });

      props.socket.on("recievedUpdateChipCount", data => {
        console.log("^&^&^&^&^&^%$%U&JNHY%", data)
        //setAmmountToCall(data.data.amount);
        // console.log(data.data.amount, "socked use effect updatachipcount");
        // let tempPlayerMoney = {...playerMoney};
        // tempPlayerMoney[`player${data.data.seatNumber}`] += data.data.amount;

        // setPlayerMoney(tempPlayerMoney);
        // playerMoney[`player${data.seatNumber}`] += data.amount;
        data.roomSeatLayout.forEach((obj,idx) =>{
          switch (obj.seatNumber) {
              case 1:
                //setSeat1(true);
                //setSeatName1(obj.userName);
                setSeatChipCount1(obj.chipCount);
                _seatChipCount1 = obj.chipCount;
                console.log(`seat1 chip count: ${obj.chipCount}`);
                break;
              case 2:
                //setSeat2(true);
                //setSeatName2(obj.userName);
                setSeatChipCount2(obj.chipCount);
                _seatChipCount2 = obj.chipCount;
                console.log(`seat2 chip count: ${obj.chipCount}`);
                break;
              case 3:
                //setSeat3(true);
                //setSeatName3(obj.userName);
                setSeatChipCount3(obj.chipCount);
                _seatChipCount3 = obj.chipCount;
                console.log(`seat3 chip count: ${obj.chipCount}`);
                break;
              case 4:
                //setSeat4(true);
                //setSeatName4(obj.userName);
                setSeatChipCount4(obj.chipCount);
                _seatChipCount4 = obj.chipCount;
                console.log(`seat4 chip count: ${obj.chipCount}`);
                break;
              case 5:
                //setSeat5(true);
                //setSeatName5(obj.userName);
                setSeatChipCount5(obj.chipCount);
                _seatChipCount5 = obj.chipCount;
                console.log(`seat5 chip count: ${obj.chipCount}`);
                break;
              case 6:
                //setSeat6(true);
                //setSeatName6(obj.userName);
                setSeatChipCount6(obj.chipCount);
                _seatChipCount6 = obj.chipCount;
                console.log(`seat6 chip count: ${obj.chipCount}`);
                break;
              default:
                console.log("Number is not between 1 and 6");
                break;
          }
      })
      });
      props.socket.on("recievedDealHoleCards", (data) => {
        console.log("&&&&&&& ",data.deck);
        console.log(data.holeCards);
        _holeCards = data.holeCards;
        setHoleCards(data.holeCards);
        setAmmountToCall(bigBlindAmount);
        
        deck = new Deck(data.deck['cards']);
        console.log(deck, "conversion using new constructor");
        
        players2 = [
          { name: _seatName1, cards: _holeCards[0], seatNumber: 1},
          { name: _seatName2, cards: _holeCards[1], seatNumber: 2 },
          { name: _seatName3, cards: _holeCards[2], seatNumber: 3 },
          { name: _seatName4, cards: _holeCards[3], seatNumber: 4 },
          { name: _seatName5, cards: _holeCards[4], seatNumber: 5 },
          { name: _seatName6, cards: _holeCards[5],seatNumber: 6  },
        ];
        console.log("players2",players2);
        const uniqueNames = new Set(); // Track unique player names
        players2 = players2.filter((player) => {
          if (player.cards.length <= 0) {
            return false; // Filter out if name is already in the Set
          } else {
            // uniqueNames.add(player.name); // Add new name to the Set
            return true; // Keep the player in the list
          }
        });
        console.log("players2 After", players2);
        setPlayers(players2);
      });

      props.socket.on("recievedDealFlop", (data) => {
        setCommunityCards(data.flop);
        setLastRaise(-1);
        lastRaise2 = -1;
        console.log("I got the call for flop in the use EFFECT!!! BEFORE THE SET", flop, "this is what we are setting it to", data.flop);
        setFlop(true);
        setAmmountToCall(0);
        setMinBet(50);
        setPlayerMoney((prev) => {
          const keys = Object.keys(prev);
          const updatedMoney = keys.reduce((obj, key) => {
            obj[key] = 0;
            return obj;
          }, {});
        
          return updatedMoney;
        });
        deck = new Deck(data.deck['cards']);
        setPlayerTurnIndex(data.savedFirstPlayerTurn);
        playerTurnIndex2 = data.savedFirstPlayerTurn;


      });

      props.socket.on("recievedDealTurn", (data) => {
        setCommunityCards(data.turn);
        setLastRaise(-1);
        lastRaise2 = -1;
        console.log("I got the call for TURN in the use EFFECT!!! BEFORE THE SET", turn, "this is what we are setting it to", data.turn);
        setTurn(true);
        setAmmountToCall(0);
        setMinBet(50);
        setPlayerMoney((prev) => {
          const keys = Object.keys(prev);
          const updatedMoney = keys.reduce((obj, key) => {
            obj[key] = 0;
            return obj;
          }, {});
        
          return updatedMoney;
        });
        deck = new Deck(data.deck['cards']);
        setPlayerTurnIndex(data.savedFirstPlayerTurn);
        playerTurnIndex2 = data.savedFirstPlayerTurn;
      });

      props.socket.on("recievedDealRiver", (data) => {
        setCommunityCards(data.river);
        setLastRaise(-1);
        lastRaise2 = -1;
        setRiver(true);
        setAmmountToCall(0);
        setMinBet(50);
        setPlayerMoney((prev) => {
          const keys = Object.keys(prev);
          const updatedMoney = keys.reduce((obj, key) => {
            obj[key] = 0;
            return obj;
          }, {});
        
          return updatedMoney;
        });
        deck = new Deck(data.deck['cards']);
        setPlayerTurnIndex(data.savedFirstPlayerTurn);
        playerTurnIndex2 = data.savedFirstPlayerTurn;
      });


      props.socket.on("recievedInitBlinds", (data) => {
        setDealerButton(data.dealerButton);
        setSmallBlind(data.smallBlind);
        setBigBlind(data.bigBlind);
        setPlayerTurnIndex(data.playerTurnIndex);
        playerTurnIndex2 = data.playerTurnIndex;
        savedFirstPlayerTurn = data.playerTurnIndex;
        console.log("FIRST PERSON TURN USE EFFECT:", savedFirstPlayerTurn);
        console.log(`button: ${data.dealerButton} sb: ${data.smallBlind} bb: ${data.bigBlind}`);
        let tempPlayerMoney = {...playerMoney};
        tempPlayerMoney[`player${data.bigBlind}`] += bigBlindAmount;
        tempPlayerMoney[`player${data.smallBlind}`] += smallBlindAmount;
        console.log("initial playermoney: ", tempPlayerMoney);
        setPlayerMoney(tempPlayerMoney);
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
        playerTurnIndex2 = data.playerTurnIndex;
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
        gameStarted2 = true;


      });

      props.socket.on("recievedPlayersBestHands", (data) => {
        let pokerHands = [];
        data.bestHands.forEach(hand => {
            console.log(hand);
            const newPokerHand = !hand ? null : new PokerHand(hand.cards);
            console.log(newPokerHand, "use effect ")
            pokerHands.push(newPokerHand);
        });
        setBestHands(pokerHands);
        console.log(pokerHands, "use effect best hands");
        setShowdown(true);
        //
      });
      props.socket.on("recievedCheckAction", (data)=>{
        setPlayerTurnIndex(data.playerTurnIndex)
        playerTurnIndex2 = data.playerTurnIndex;
        setPlayerTurn(data.playerTurn);


        console.log("check action called from other user, new players turn is :", data.playerTurn);
      
      
      })


      props.socket.on("recievedRaiseAction", (data)=>{

        console.log(data, "use Effect Raise Data");
          setMinBet(data.minBet);
          setFirstRound(false);
          setLastRaise(data.lastRaiseSeat);
          lastRaise2 = data.lastRaiseSeat;
          newEndingCycle = data.newEndingCycle;
          setAmmountToCall(data.minBet);
          console.log("totalPot", _totalPot, "deduct", data.deduct);
          setTotalPot(totalPot + data.deduct)
          _totalPot = _totalPot + data.deduct;
          console.log("totalPot-after", _totalPot, "deduct", data.deduct, "new min bet is: ", data.minBet);

      })
      props.socket.on("recievedAllInAction", (data)=>{

      })
      
      props.socket.on("recievedFoldAction", (data)=>{
        setPlayerStatus({
          ...playerStatus,
          [`player${data}`]: "folded"
        })
        playerStatus2[`player${data}`] = 'folded';
        console.log(`player${data} folded receieved from use effect`)
      })
      props.socket.on("recievedSkipTurn", (data)=>{
        console.log("skip turn recieved : ", data, " and current seat is ", currentSeat2);
        if(currentSeat2 === data){
          setSkipTurn(true)
        }
      })


      props.socket.on("recieveGameResult", async (data)=>{
        console.log("we got the data for everyone, Winner: ", data, "seatnumber:", data[0].seatNumber);
        console.log(data[0].seatNumber, "Heres the winner name")
        setWinnerName(data[0].seatNumber);
        _winnerName= data[0].seatNumber;
        const api = new API();
        console.log("currentChipcount for player UE",  eval(`_seatChipCount${currentSeat2}`));
        console.log("useEffect gamemoney total pot, ", _totalPot, "playermoney ",  _playerMoney);
        console.log("getwinners stuff UE", data[0].seatNumber, "current Seat", currentSeat2);
        try {
            if(data[0].seatNumber === currentSeat2){
              const userInfo = await api.updateGameMoney(_playerMoney+ _totalPot+ eval(`_seatChipCount${currentSeat2}`),props.user.userName);
              props.setPlayerMoney(_playerMoney + _totalPot+ eval(`_seatChipCount${currentSeat2}`));
            }
            else{
              const userInfo = await api.updateGameMoney(_playerMoney+ eval(`_seatChipCount${currentSeat2}`),props.user.userName);
              props.setPlayerMoney(_playerMoney + eval(`_seatChipCount${currentSeat2}`));

            }

        }catch (error) {
            console.error("Error during updating money:", error);
            //setError("An error occurred during updating money.");
        }
        
      })



    }

    }, [props.socket])


    console.log("host is: ", props.host);
    const handleLeaveGame = () => {
 
      props.setActionForMatch(null);
      props.setHost("");
      props.socket.emit("leaveGame");
  }




  const handleClickAvoidFPS = (event, buttonFunction) =>{
    event.stopPropagation(); //makes it so it does not turn on FPS controls
    buttonFunction(); //this functoin calls whatever function was passed in the button
  }
  const checkAction = () =>{
    
    seatsWithPlayers = [];
    console.log("PLAYER MONEY BRUH!, checkaction: ", playerMoney);
    if (visibility["player1"] ) seatsWithPlayers.push(1);
    if (visibility["player2"] ) seatsWithPlayers.push(2);
    if (visibility["player3"] ) seatsWithPlayers.push(3);
    if (visibility["player4"] ) seatsWithPlayers.push(4);
    if (visibility["player5"] ) seatsWithPlayers.push(5);
    if (visibility["player6"] ) seatsWithPlayers.push(6);
    const newPlayerActionIndex = (seatsWithPlayers.indexOf(playerTurnIndex)+seatsWithPlayers.length - 1) % seatsWithPlayers.length;
    const newPlayerActionSeat = seatsWithPlayers[newPlayerActionIndex];
    setPlayerTurnIndex(newPlayerActionSeat);
    let tempPrevPlayer = playerTurnIndex2;
    playerTurnIndex2 = newPlayerActionSeat;
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
    console.log("after check its player ", newPlayerActionSeat, " turn")
    console.log(playerTurnIndex, dealerButton, "debug check");
        // if(lastRaise != -1 && playerToLeft == playerTurnIndex){
    //   //same logic
    // }
    console.log(newEndingCycle, " new ending cycle and last raise is ", lastRaise);
    if(lastRaise2 != -1) {
      console.log("passed first condition")
      if(newEndingCycle === tempPrevPlayer){
      console.log("checkAction NEW CYCLE ENDING PLAYER");
      
      if(flop == false){
        dealFlop();
        setFlop(true);
        setLastRaise(-1);
        lastRaise2 = -1;
        console.log("SETTING FLOP!!! in check");
        return;

      }
      else if(!turn){
        dealTurn();
        setTurn(true);
        setLastRaise(-1);
        lastRaise2 = -1;
        console.log("SETTING TURN!!! in check");
        return;
      }
      else if(!river){
        dealRiver();
        setRiver(true);
        setLastRaise(-1);
        lastRaise2 = -1;
        console.log("SETTING RIVER!!! in check");
        return;
      }
      else if(!showdown){
        const hands = getPlayersBestHands();
        setShowdown(true);
        getWinners(hands);
        console.log("showdown!!!")
        //
        
      }
    }
  }
    else if(playerTurnIndex === dealerButton){
      console.log("checkAction last Player of round now going to new round");
      console.log(flop, "this is what flop is");
      if(flop == false){
        dealFlop();
        setFlop(true);
        setLastRaise(-1);
        lastRaise2 = -1;
        console.log("SETTING FLOP!!! in check");
        return;

      }
      else if(!turn){
        dealTurn();
        setTurn(true);
        setLastRaise(-1);
        lastRaise2 = -1;
        console.log("SETTING TURN!!! in check");
        return;
      }
      else if(!river){
        dealRiver();
        setRiver(true);
        setLastRaise(-1);
        lastRaise2 = -1;
        console.log("SETTING RIVER!!! in check");
        return;

      }
      else if(!showdown){
        const hands = getPlayersBestHands();
        setShowdown(true);
        getWinners(hands);
        console.log("showdown!!!")
      }
    }
    props.socket.emit("playerCheckAction", {roomName: props.roomName, playerTurn: _playerTurn, playerTurnIndex: newPlayerActionSeat});

    if(playerStatus2[`player${playerTurnIndex2}`] === 'folded'){
      console.log("the next player has folded so skip his turn");
      props.socket.emit("skipTurn", {roomName: props.roomName, skipTurn: playerTurnIndex2});
    }


  }



  if(skipTurn && (currentSeat2 === playerTurnIndex2)){
    checkAction();
  }

  const[firstRound,setFirstRound]= useState(true);
  
  const foldAction = (obj) =>{
      setPlayerStatus({
        ...playerStatus,
        [`player${currentSeat2}`]: 'folded'
      })
      playerStatus2[`player${currentSeat2}`] = 'folded';
      props.socket.emit("foldAction",{roomName: props.roomName, playerFolding: currentSeat});


    checkAction();
  }
  const callAction = (obj) =>{
    setCanCheck(false); // not used yet
    if(currentSeat === bigBlind && firstRound === true ){
      //if any other seat didnt raise then skip the turn
      let tempPlayerMoney = {...playerMoney};
      
      setPlayerMoney(tempPlayerMoney);
      checkAction();
      setTotalPot(totalPot +  (minBet - tempPlayerMoney[`player${currentSeat}`]))
      console.log((minBet - tempPlayerMoney[`player${currentSeat}`]), "callAction total pot");
      _totalPot +=(minBet - tempPlayerMoney[`player${currentSeat}`]);
      props.socket.emit("updateTotalPot", {
        roomName: props.roomName, 
        totalPot: _totalPot 
      });
      tempPlayerMoney[`player${currentSeat}`] += (minBet - tempPlayerMoney[`player${currentSeat}`]);
      return;
    }
    else if(currentSeat ===smallBlind && firstRound=== true){
      let tempPlayerMoney = {...playerMoney};
      
      setPlayerMoney(tempPlayerMoney);
      deductChips(currentSeat,minBet-playerMoney[`player${currentSeat}`]);
      setTotalPot(totalPot +  (minBet - tempPlayerMoney[`player${currentSeat}`]))
      console.log((minBet - tempPlayerMoney[`player${currentSeat}`]), "callAction total pot");
      _totalPot +=(minBet - tempPlayerMoney[`player${currentSeat}`]);
      props.socket.emit("updateTotalPot", {
        roomName: props.roomName, 
        totalPot: _totalPot
      });
      tempPlayerMoney[`player${currentSeat}`] += (minBet - tempPlayerMoney[`player${currentSeat}`]);
      checkAction();
      return;
    }

    let tempPlayerMoney = {...playerMoney};
    setTotalPot(totalPot +  (minBet - tempPlayerMoney[`player${currentSeat}`]));
    
    
    console.log((minBet - tempPlayerMoney[`player${currentSeat}`]), "callAction total pot");
    _totalPot +=(minBet - tempPlayerMoney[`player${currentSeat}`]);
    props.socket.emit("updateTotalPot", {
      roomName: props.roomName, 
      totalPot: _totalPot
    });
    tempPlayerMoney[`player${currentSeat}`] += (minBet - tempPlayerMoney[`player${currentSeat}`])
    setPlayerMoney(tempPlayerMoney);
    deductChips(currentSeat,minBet - playerMoney[`player${currentSeat}`]);
    checkAction();
  }
  const raiseAction = (obj) =>{ //called obj to avoid props confusion
    setLastRaise(currentSeat);
    lastRaise2 = currentSeat;
    for(let i = currentSeat + 1; i < currentSeat + 6; ++i){
      const adjustedIndex = (i - 1) % 6 + 1; // To maintain 1-based indexing
      console.log("seat value is ", adjustedIndex)
      // If 'tempArr' at the adjusted index is false, return the adjusted index
      if (visibility2[`player${adjustedIndex}`]) {
        console.log("new seat is ", adjustedIndex)
          
          newEndingCycle = adjustedIndex;
          break;
      }
    }
    // if(lastRaise != -1 && playerToLeft == playerTurnIndex){
    //   //same logic
    // }
    setAmmountToCall(minBet * 2);
    setMinBet(minBet * 2);
    setFirstRound(false);


    let amountToDeduct = (minBet * 2) - playerMoney[`player${currentSeat}`];
    deductChips(currentSeat, amountToDeduct);
    let tempPlayerMoney = {...playerMoney};
    tempPlayerMoney[`player${currentSeat}`] += amountToDeduct;
    setPlayerMoney(tempPlayerMoney);
    console.log("new Player Money is : ", tempPlayerMoney);
    console.log("totalPot UI", _totalPot, "deduct", amountToDeduct);
    setTotalPot(totalPot +  (minBet * 2) - amountToDeduct)
    _totalPot +=(amountToDeduct);
    console.log("totalPot-after UI", _totalPot, "deduct", amountToDeduct, "total player money: ", tempPlayerMoney, " min bet: ", minBet * 2);

    
    
      props.socket.emit("raiseAction", {minBet:minBet * 2, roomName:props.roomName ,type:"raiseAction", lastRaiseSeat:currentSeat, newEndingCycle: newEndingCycle, deduct: amountToDeduct});
    checkAction();
  }

  const allInAction = (obj) =>{
    let maxBet = eval(`seatChipCount${currentSeat2}`);
    setLastRaise(currentSeat);
    lastRaise2 = currentSeat;
    for(let i = currentSeat + 1; i < currentSeat + 6; ++i){
      const adjustedIndex = (i - 1) % 6 + 1; // To maintain 1-based indexing
      console.log("seat value is ", adjustedIndex)
      // If 'tempArr' at the adjusted index is false, return the adjusted index
      if (visibility2[`player${adjustedIndex}`]) {
        console.log("new seat is ", adjustedIndex)
          
          newEndingCycle = adjustedIndex;
          break;
      }
    }
    // if(lastRaise != -1 && playerToLeft == playerTurnIndex){
    //   //same logic
    // }
    setAmmountToCall(maxBet);
    setMinBet(maxBet);
    setFirstRound(false);


    let amountToDeduct = maxBet;
    deductChips(currentSeat, maxBet);
    let tempPlayerMoney = {...playerMoney};
    tempPlayerMoney[`player${currentSeat}`] += amountToDeduct;
    setPlayerMoney(tempPlayerMoney);
    console.log("new Player Money is : ", tempPlayerMoney);
    console.log("totalPot UI", _totalPot, "deduct", amountToDeduct);
    setTotalPot(totalPot +  maxBet)
    _totalPot +=(amountToDeduct);
    console.log("totalPot-after UI", _totalPot, "deduct", amountToDeduct, "total player money: ", tempPlayerMoney, " min bet: ", maxBet);

    
    
      props.socket.emit("raiseAction", {minBet:maxBet, roomName:props.roomName ,type:"raiseAction", lastRaiseSeat:currentSeat, newEndingCycle: newEndingCycle, deduct: amountToDeduct});
    checkAction();
  }


  const startGame =(obj)=>{
    dealHoleCards();
    players2 = [
      { name: seatName1, cards: _holeCards[0], seatNumber: 1},
      { name: seatName2, cards: _holeCards[1], seatNumber: 2 },
      { name: seatName3, cards: _holeCards[2], seatNumber: 3 },
      { name: seatName4, cards: _holeCards[3], seatNumber: 4 },
      { name: seatName5, cards: _holeCards[4], seatNumber: 5 },
      { name: seatName6, cards: _holeCards[5],seatNumber: 6  },
    ];
    const uniqueNames = new Set(); // Track unique player names
    players2 = players2.filter((player) => {
      if (player.cards.length <= 0) {
        return false; // Filter out if name is already in the Set
      } else {
        // uniqueNames.add(player.name); // Add new name to the Set
        return true; // Keep the player in the list
      }
    });
    setPlayers(players2);

    console.log(players,"heres what players looks like", players2)
  }



const [enableControls, setEnableControls] = useState(false);
  const togglePlayerVisibility = (id) => {
    const key = `player${id}`;
    console.log("key is :", key)
    if (currentSeat) return;
    if(visibility[key] == true){
      return;
    }
    setCurrentSeat(id);
    currentSeat2 = id;
    setEnableControls(true);
    props.socket.emit("selectSeat", { user: props.user, roomName: props.roomName, seatNumber: id, chipCount: 10000});
   // const key = `player${id}`;
    setVisibility(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    visibility2[key] = true;
    console.log(visibility2, "look here");

    switch (id) {
      case 1:
        setSeatChipCount1(10000);
        _seatChipCount1 = 10000;
      if (cameraRef.current) {
        cameraRef.current.position.copy(new THREE.Vector3(0.8380562280321286, 0.6806835769896427, 4.218280283917921));
        cameraRef.current.rotation.copy(new THREE.Euler(-0.3007774255261268, 0.49802849238603664, 0.1471048406142235));
        cameraRef.current.updateProjectionMatrix(); // Update if FOV, aspect, near, or far planes are changed
    }
        break;
      case 2:
        setSeatChipCount2(10000);
        _seatChipCount2 = 10000;
      if (cameraRef.current) {
        cameraRef.current.position.copy(new THREE.Vector3(1.6710115161376544, 0.4364528681116143, 1.974999831526403));
        cameraRef.current.rotation.copy(new THREE.Euler(-1.3239257819428438, 1.2958940056050277, 1.3147029049612715));
        cameraRef.current.updateProjectionMatrix(); // Update if FOV, aspect, near, or far planes are changed
    }
        break;
      case 3:
        setSeatChipCount3(10000);
        _seatChipCount3 = 10000;
        if (cameraRef.current) {
          cameraRef.current.position.copy(new THREE.Vector3(0.83003736190289, 0.5609178299067229, 0.20790864120295688));
          cameraRef.current.rotation.copy(new THREE.Euler(-2.4956862450862594, 0.8177242272838758, 2.6387951344603144));
          cameraRef.current.updateProjectionMatrix(); // Update if FOV, aspect, near, or far planes are changed
      }
          
        break;
      case 4:
        setSeatChipCount4(10000);
        _seatChipCount4 = 10000;
        if (cameraRef.current) {
          cameraRef.current.position.copy(new THREE.Vector3(-0.94166520077328, 0.6978245972933373, -1.1792269063118446));
          cameraRef.current.rotation.copy(new THREE.Euler(-2.552163561376754, 0.3634024154516776, 2.9082196515008523));
          cameraRef.current.updateProjectionMatrix(); // Update if FOV, aspect, near, or far planes are changed
      }
          
        break;
      case 5:
        setSeatChipCount5(10000);
        _seatChipCount5 = 10000;
        if (cameraRef.current) {
          cameraRef.current.position.copy(new THREE.Vector3(-2.581770352521738, 0.8935528294076593, -1.628236846383945));
          cameraRef.current.rotation.copy(new THREE.Euler(-2.5055065161550516, -0.07284732502723025, -3.0878957450863758));
          cameraRef.current.updateProjectionMatrix(); // Update if FOV, aspect, near, or far planes are changed
      }
          
        break;
      case 6:
        setSeatChipCount6(10000);
        _seatChipCount6 = 10000;
        if (cameraRef.current) {
          cameraRef.current.position.copy(new THREE.Vector3(-4.366071316545736, 0.7095759121349478, -1.0057159037192394));
          cameraRef.current.rotation.copy(new THREE.Euler(-2.3574436317654097, -0.7914534928891457, -2.524452382954885));
          cameraRef.current.updateProjectionMatrix(); // Update if FOV, aspect, near, or far planes are changed
      }
          
        break;
      default:
        console.log("Number is not between 1 and 6");
        break;
  }
  //   setCameraConfig(prevConfig => ({
  //     ...prevConfig,
  //     position: new THREE.Vector3(0.8380562280321286, 0.6806835769896427, 4.218280283917921), //  position
  //     rotation: new THREE.Euler(-0.3007774255261268, 0.49802849238603664, 0.1471048406142235), //  rotation
  // }));

  // if (cameraRef.current) {
  //     cameraRef.current.position.copy(new THREE.Vector3(0.8380562280321286, 0.6806835769896427, 4.218280283917921));
  //     cameraRef.current.rotation.copy(new THREE.Euler(-0.3007774255261268, 0.49802849238603664, 0.1471048406142235));
  //     cameraRef.current.updateProjectionMatrix(); // Update if FOV, aspect, near, or far planes are changed
  // }
  

    // if (cameraSettingsBySeat[id] && cameraRef.current) {
    //   cameraRef.current.position.set(...cameraSettingsBySeat[id].position);
    //   cameraRef.current.rotation.set(...cameraSettingsBySeat[id].rotation);
    //   cameraRef.current.updateProjectionMatrix(); // Important if FOV or other camera properties change
    // }
  };
  
  
  ///1.00366714127953, 0.4708959151536942, 4.030343197750313
    // Define initial camera position and rotation //7,8,-8
    const [cameraPosition,setCameraPosition] = useState(new Vector3(0,0,0)); // Example position
    const [cameraFov, setCameraFov] = useState(50);
    const [cameraZoom, setCameraZoom] = useState(1);

    const [player1Cam, setPlayer1Cam] = useState({
      position: [0.8380562280321286, 0.6806835769896427, 4.218280283917921],
      rotation: [-0.3007774255261268, 0.49802849238603664, 0.1471048406142235],
      zoom: 1
    })
    const [cameraData, setCameraData] = useState({
      position: [0.8914996876342017, 3.015910144726076, -1.4035605706911727],
      rotation: [-2.1212578348181106, 0.43804076394137353, 2.536853770348328],
      zoom: 1
    });
    const cameraSettingsBySeat = {
      1: {
        position: [0.8380562280321286, 0.6806835769896427, 4.218280283917921],
        rotation: [-0.3007774255261268, 0.49802849238603664, 0.1471048406142235],
        zoom: 1
      },
      2: {
        position: [1, 2, 3], // Example values
        rotation: [0, 0, 0],
        zoom: 1
      },
      // Add more seats as necessary
    };

    const [cameraConfig, setCameraConfig] = useState({
      position: new THREE.Vector3(0.8914996876342017, 3.015910144726076, -1.4035605706911727), // Default position
      rotation: new THREE.Euler(-2.1212578348181106, 0.43804076394137353, 2.536853770348328), // Default rotation
      fov: 85,
      near: 0.1,
      far: 1000
  });
  





// This function is called when the Canvas component has mounted
// It will set the camera reference and apply initial configuration
const onCanvasCreated = ({ camera }) => {
  cameraRef.current = camera;
  camera.position.copy(cameraConfig.position);
  camera.rotation.copy(cameraConfig.rotation);
  camera.fov = cameraConfig.fov;
  camera.near = cameraConfig.near;
  camera.far = cameraConfig.far;
  camera.updateProjectionMatrix();
};

    const handleZoomChange = (event) => {
      const newZoom = parseFloat(event.target.value);
      setCameraZoom(newZoom);
    };
  //[7, 4, -5], fov: 10

  function disableClicks(duration = 1300) {
    const preventClick = (event) => {
      console.log("input disbaled")
      event.stopPropagation();
      event.preventDefault();
    };
  
    // Add the event listener to disable clicks
    document.addEventListener('click', preventClick, true);
  
    // Remove the listener after the specified duration
    setTimeout(() => {
      console.log("input enabled")
      document.removeEventListener('click', preventClick, true);
    }, duration);
  }


  useEffect(() => {
    if (showOverlay) {
      setTimeout(() => {
        setShowOverlay(false);
        // Proceed to reset the game or handle next game logic here
        //startNewGame(); // A function to reset the game state
      }, 15000); // 10 seconds delay
    }
  }, [showOverlay]);
  
  const displayOverlay = (isWinner) => {
    setOverlayColor(isWinner ? 'green' : 'red');

    setShowOverlay(true);
  };

  useEffect(()=>{
    console.log("showdown overlay winnerName,", winnerName, "currentSeat", currentSeat2);
      if(currentSeat2 == winnerName){
        displayOverlay(true);
        console.log("IWON!!!!");
      }
      else{
        displayOverlay(false);
        console.log("ILOST!!!!");
      }
    
  },[winnerName])


  const startNewGame = () => {
    // Reset all state variables related to the game progress, scores, and player statuses
    // For example:


  
    
    setTotalPot(0);
    
  


 
    setGameStarted(false);
    setHoleCards([[], [], [], [], [], []]);
    _holeCards = [[], [], [], [], [], []];
    setCommunityCards([]);
    _communityCards = [];
    //const [dealerButton, setDealerButton] = useState(0);
    //let _dealerButton = 0;
    //const [smallBlind, setSmallBlind] = useState(0);
    //let _smallBlind = 0;
   //const [bigBlind, setBigBlind] = useState(0);
    //let _bigBlind = 0;
    //let seatsWithPlayers = [];
    setBestHands([]);
    _bestHands = [];
    setPlayerTurn(false);
    setPlayerTurnIndex(null);
    setCanCheck(true);
    setMinBet(bigBlindAmount); //the min bet should be set initially to big blind
    setWinnerName("");
    _winnerName = "";

    setSkipTurn(false);
    // const[playerMoney, setPlayerMoney]= useState({
    //   player1: 0,
    //   player2: 0,
    //   player3: 0,
    //   player4: 0,
    //   player5: 0,
    //   player6: 0,
    // }) // we need to set the big blind and small blind for these
    setLastRaise(-1); // keeps track of the last seat that raised
    //therewfore everyone must either call, reraise, or fold
  
    setFlop(false);
    setTurn(false);
    setRiver(false);
    setShowdown(false);
    setShowOverlay(false);
    setOverlayColor('green');
  
    setAmmountToCall(0);
    // setPlayerHands([]);
    // setCommunityCards([]);
    // setCurrentPlayer(null);
    // More resets based on your state design
    startGame();
  };
  
  const GameOverlay = ({ show, color, timer }) => {
    if (!show) return null;
  
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: color,
        opacity: 0.5, // Adjust transparency here
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '24px',
        zIndex: 0 // Ensure this is below your top UI layer
      }}>
        <div style={{zIndex:3}}>
          {color === 'green' ? 'Winner!' : 'Better luck next time!'}
          <br />
          <Typography>Next round in {timer} seconds...</Typography>
        </div>
      </div>
    );
  };
  





  return (
    <>
    <ThemeProvider theme={heavy}>
  <Canvas
    style={{ backgroundColor: '#00000b', position: 'absolute', top: 0, left: 0 }}
    onCreated={onCanvasCreated}
    adjustCamera={true} // Allows Three.js to adjust the camera based on canvas dimensions initially
>
<Suspense fallback={
  <Html center>
    <img src={logo2} alt="Logo" style={{
      position: 'absolute', // Position it absolutely within the relative parent

      transform: 'translate(-40%, -70%)', // This will center the logo
      background: 'transparent',
      width: '400px',
      height: '400px',
      borderRadius: '50%',
      border: '2px solid black',
    }} />
    <Typography style={{
      position: 'absolute', // Position it absolutely within the relative parent
      top: 'calc(50% + 150px)', // Move it down by 50% plus half the height of the logo
      left: 35,
      transform: 'translate(-60%, -70%)', // Center the text
      color: 'white'
    }}>...Loading</Typography>
  </Html>
}>
          <ambientLight intensity={0.1} />

          <Stage
  intensity={1}
  environment="city"
  contactShadow={false}
  shadows={true}
  adjustCamera={false} // This prop prevents Stage from adjusting the camera
  
>
            <SimpleRoom isVisible={true}/>
            {Array.from({ length: 6 }, (_, i) => (
              <React.Fragment key={i}>
                <Player id={i + 1} isVisible={visibility[`player${i + 1}`]} />
                {visibility[`player${i + 1}`] ?
                <>
                <Html position={namePositions[`player${i+1}`]} transform occlude>
                  <div style={{ color: 'white', background: 'green', padding: '2px 5px', borderRadius: '5px' }}>
                    {eval(`seatChipCount${i + 1}`)} 
                  </div>
                </Html> 
                <Html position={[namePositions[`player${i+1}`][0],namePositions[`player${i+1}`][1] + 0.6, namePositions[`player${i+1}`][2]]} transform occlude>
                <div style={{ color: 'white', background: playerStatus2[`player${i+1}`] === 'folded' ? 'red' : playerTurnIndex === (i+1) ? 'yellow' :'rgba(0, 0, 0, 0.5)', padding: '2px 5px', borderRadius: '5px' }}>
                  {eval(`seatName${i + 1}`)} 
                </div>
                </Html>
                </>
                : ""
                }
                <Chair id={i + 1} togglePlayerVisibility={togglePlayerVisibility} isVisible={true} setCurrentSeat={setCurrentSeat} seatNumber={i+1} user = {props.user} roomName ={props.roomName} socket={props.socket}/>
              </React.Fragment>
            ))}

            {/* if(visible["player1"])
            <Card id{0} typeCard="player1" card={holeCrads[0]/>
            <Card id{1} typeCard="player1" card={holeCrads[1]/> */}
            {gameStarted && (
              <>
              <Cards id={currentSeat-1} typeCard={'player'} card={holeCards[currentSeat-1][0]} cardPOS={0}/>
                <Cards id={currentSeat-1} typeCard={'player'} card={holeCards[currentSeat-1][1]} cardPOS={1}/>
                </>
            )}
            
            {gameStarted && communityCards.length > 0 && (
              <>
                {flop && (
                  <>
                  <Cards id={0} typeCard={'community'} card={communityCards[0]} />
                  <Cards id={1} typeCard={'community'} card={communityCards[1]} />
                  <Cards id={2} typeCard={'community'} card={communityCards[2]} />
                  
                  </>
                )}
                {turn && communityCards.length > 3 && (
                  <>
                  <Cards id={3} typeCard={'community'} card={communityCards[3]} />
                  </>
                )}
                {river && communityCards.length > 4 && (
                  <>
                    <Cards id={4} typeCard={'community'} card={communityCards[4]} />
                  </>
                )}
              </>
            )}

          </Stage>
          {/* <OrbitControls setCameraData={setCameraData}/> */}
          {enableControls && (
            <PointerLockControls
              camera={cameraRef.current}
              domElement={document.body}
              onUnlock={() =>disableClicks()}
            />
          )}

        </Suspense>
      </Canvas>
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 100, gap:200, }}>
        <Button variant="contained" color="error"onClick={(event) =>handleClickAvoidFPS(event,handleLeaveGame)}>
          Leave
        </Button>
        <Button  variant="contained" color="primary"onClick={toggleMute}>
          Mute/Unmute
        </Button>
        {/* <input
          type="range"
          min="0.5"
          max="200"
          step="0.1"
          value={cameraZoom}
          onChange={handleZoomChange}
          style={{ width: '300px' }}
        /> */}
        <div>
          {/* <p>Position: {cameraData.position.join(', ')}</p>
          <p>Rotation: {cameraData.rotation.join(', ')}</p>
          <p>Zoom: {cameraData.zoom.toFixed(2)}</p> */}
          
        </div>
      </div>

      <Box sx={{position: 'absolute',top: 20, right: 20, zIndex:2}}>
      { props.host === props.user.userName ?
            <Button variant="contained" color="success" onClick={(event) =>handleClickAvoidFPS(event,startGame)}>
                Start Game
            </Button> : ""
      } 
      </Box>
      <Box sx={{zIndex:2, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute',bottom: 20, gap: '50px'}}>
      {showdown? "": !gameStarted ? "" : playerTurnIndex === currentSeat ?
              <Fragment>
                <Button variant='contained' color='error' onClick={(event) =>handleClickAvoidFPS(event, foldAction)}>
                    Fold
                </Button> 
                {console.log(minBet - playerMoney[`player${currentSeat2}`] <=0, "min bet", minBet, " playerMoney: ", playerMoney )}
                {ammountToCall - playerMoney[`player${currentSeat2}`] <=0 ? 
                  <Button variant='contained' color='success' onClick={(event) =>handleClickAvoidFPS(event, checkAction)}>
                  Check 
                  </Button> : ""
                }
                {console.log("Amount put in for current player",playerMoney[`player${currentSeat2}`], " and minbet is:", minBet)}
                {/* minBet - playerMoney[`player${currentSeat2}`] */}

                {ammountToCall - playerMoney[`player${currentSeat2}`] <=0 ? "": eval(`_seatChipCount${currentSeat2}`) <= 0 ? "":
                <Button variant='contained' color='secondary' onClick={(event) =>handleClickAvoidFPS(event, callAction)}>
                    {/* Call ${currentSeat === bigBlind && firstRound === true ? minBet-bigBlindAmount : currentSeat === smallBlind && firstRound === true ? minBet-smallBlindAmount:minBet } */}
                    Call ${minBet - playerMoney[`player${currentSeat2}`]}
                </Button>
                }
                  {eval(`_seatChipCount${currentSeat2}`) <= 0 ? "" :
                <Button variant='contained' color='success' onClick={(event) =>handleClickAvoidFPS(event, raiseAction)}>
                    {ammountToCall === 0 ? "Bet" : "Raise" } ${minBet*2}
                </Button>
                }
                <Button variant='contained' color='third' onClick={(event) =>handleClickAvoidFPS(event, allInAction)}>
                    All-in
                </Button>

                </Fragment>
                : ""
      }
      
       </Box>
       
       <Box
      sx={{
        position: 'absolute',
        top: 10,
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '10px',
        borderRadius: '5px',
        display: 'flex',
        gap: '10px',
        zIndex:2,
      }}
    >
      {communityCards.map((card, index) => (
        <Box
          key={index}
          sx={{
            width: '70px',
            height: '90px',
            backgroundColor: 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '5px',
            
          }}
        >
          {/* Using dynamic import to get the image based on card value and suit */}
          <img
            src={`/tabletextures/cardpng/${card.value + card.suit}.png`}
            alt={`${card.value} of ${card.suit}`}
            style={{ width: '650%', height: '650%', objectFit: 'contain' }}
          />
        </Box>
      ))}
  
    </Box>
    <PlayerNamesAndCards displayOverlay={displayOverlay}players={players} username ={props.user.userName} showdown={showdown} winner = {winnerName} bestHands = {bestHands} playerTurnIndex={playerTurnIndex}/>
    
    {showdown? <GameOverlay show={showOverlay} color={overlayColor} timer={10} />: ""}
    {/* <Button variant ='contained' onClick={() => displayOverlay(true)} >Test Winner Overlay</Button>
<Button variant ='contained' onClick={() => displayOverlay(false)}>Test Loser Overlay</Button> */}


</ThemeProvider>
    </>
  );
};

export default PokerTableWithPlayers;