import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useLoader, useFrame ,extend, useThree} from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three';
import { OrbitControls as OrbitControlsImpl } from 'three/examples/jsm/controls/OrbitControls';

import {SpotLight, Stage } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@mui/material';
import { Vector3 } from 'three';
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

  // Updating textures if needed
  // gltf.scene.traverse((child) => {
  //   if (child.isMesh && child.name === "Poker_Table") {
  //     const textureLoader = new TextureLoader();
  //     child.material.map = textureLoader.load(`${texturePath}pokerfelt.png`);
  //     child.material.needsUpdate = true;
  //   }
  // });

  return <primitive object={gltf.scene} position={position} scale={[0.005, 0.005, 0.005]} />;
};
const AllChips = ({ position }) => {
  const gltf = useLoader(GLTFLoader, '/tabletextures/smallChips.glb', (loader) => {
    loader.setPath('/models/');
    loader.setResourcePath(texturePath);
    loader.manager = manager;
  });

  // Updating textures if needed
  // gltf.scene.traverse((child) => {
  //   if (child.isMesh && child.name === "Poker_Table") {
  //     const textureLoader = new TextureLoader();
  //     child.material.map = textureLoader.load(`${texturePath}pokerfelt.png`);
  //     child.material.needsUpdate = true;
  //   }
  // });

  return <primitive object={gltf.scene} position={position} scale={[0.05, 0.05, 0.05]} />;
};
// const Room = ({ position }) => {
//   const gltf = useLoader(GLTFLoader, '/tabletextures/roomtablechair.gltf', (loader) => {
//     loader.setPath('/models/');
//     loader.setResourcePath(texturePath);
//     loader.manager = manager;
//   });


//   gltf.scene.traverse((child) => {
//     console.log(child.name, "here");

//   });

//   return <primitive object={gltf.scene} position={position} scale={[0.05, 0.05, 0.05]} />;
// };
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

const Player1 = ({ isVisible }) => {
  const gltf = useLoader(GLTFLoader, '/tabletextures/player1.gltf');
  const meshRef = useRef();

  // Update the mesh visibility based on the state toggle
  if (meshRef.current) {
    meshRef.current.visible = isVisible;
  }

  return (
    <primitive ref={meshRef} object={gltf.scene} scale={[0.05, 0.05, 0.05]} />
  );
};

const Player2 = ({ isVisible }) => {
  const gltf = useLoader(GLTFLoader, '/tabletextures/player2.gltf');
  const meshRef = useRef();

  // Update the mesh visibility based on the state toggle
  if (meshRef.current) {
    meshRef.current.visible = isVisible;
  }

  return (
    <primitive ref={meshRef} object={gltf.scene} scale={[0.05, 0.05, 0.05]} />
  );
};
const Player3 = ({ isVisible }) => {
  const gltf = useLoader(GLTFLoader, '/tabletextures/player3.gltf');
  const meshRef = useRef();

  // Update the mesh visibility based on the state toggle
  if (meshRef.current) {
    meshRef.current.visible = isVisible;
  }

  return (
    <primitive ref={meshRef} object={gltf.scene} scale={[0.05, 0.05, 0.05]} />
  );
};
const Player4 = ({ isVisible }) => {
  const gltf = useLoader(GLTFLoader, '/tabletextures/player4.gltf');
  const meshRef = useRef();

  // Update the mesh visibility based on the state toggle
  if (meshRef.current) {
    meshRef.current.visible = isVisible;
  }

  return (
    <primitive ref={meshRef} object={gltf.scene} scale={[0.05, 0.05, 0.05]} />
  );
};
const Player5 = ({ isVisible }) => {
  const gltf = useLoader(GLTFLoader, '/tabletextures/player5.gltf');
  const meshRef = useRef();

  // Update the mesh visibility based on the state toggle
  if (meshRef.current) {
    meshRef.current.visible = isVisible;
  }

  return (
    <primitive ref={meshRef} object={gltf.scene} scale={[0.05, 0.05, 0.05]} />
  );
};
const Player6 = ({ isVisible }) => {
  const gltf = useLoader(GLTFLoader, '/tabletextures/player6.gltf');
  const meshRef = useRef();

  // Update the mesh visibility based on the state toggle
  if (meshRef.current) {
    meshRef.current.visible = isVisible;
  }

  return (
    <primitive ref={meshRef} object={gltf.scene} scale={[0.05, 0.05, 0.05]} />
  );
};

const Chair1 = ({ isVisible }) => {
  const gltf = useLoader(GLTFLoader, '/tabletextures/chair1.gltf');
  const meshRef = useRef();

  // Update the mesh visibility based on the state toggle
  if (meshRef.current) {
    meshRef.current.visible = isVisible;
  }

  return (
    <primitive ref={meshRef} object={gltf.scene} scale={[0.05, 0.05, 0.05]} />
  );
};
const Chair2 = ({ isVisible }) => {
  const gltf = useLoader(GLTFLoader, '/tabletextures/chair2.gltf');
  const meshRef = useRef();

  // Update the mesh visibility based on the state toggle
  if (meshRef.current) {
    meshRef.current.visible = isVisible;
  }

  return (
    <primitive ref={meshRef} object={gltf.scene} scale={[0.05, 0.05, 0.05]} />
  );
};
const Chair3 = ({ isVisible }) => {
  const gltf = useLoader(GLTFLoader, '/tabletextures/chair3.gltf');
  const meshRef = useRef();

  // Update the mesh visibility based on the state toggle
  if (meshRef.current) {
    meshRef.current.visible = isVisible;
  }

  return (
    <primitive ref={meshRef} object={gltf.scene} scale={[0.05, 0.05, 0.05]} />
  );
};
const Chair4 = ({ isVisible }) => {
  const gltf = useLoader(GLTFLoader, '/tabletextures/chair4.gltf');
  const meshRef = useRef();

  // Update the mesh visibility based on the state toggle
  if (meshRef.current) {
    meshRef.current.visible = isVisible;
  }

  return (
    <primitive ref={meshRef} object={gltf.scene} scale={[0.05, 0.05, 0.05]} />
  );
};
const Chair5 = ({ isVisible }) => {
  const gltf = useLoader(GLTFLoader, '/tabletextures/chair5.gltf');
  const meshRef = useRef();

  // Update the mesh visibility based on the state toggle
  if (meshRef.current) {
    meshRef.current.visible = isVisible;
  }

  return (
    <primitive ref={meshRef} object={gltf.scene} scale={[0.05, 0.05, 0.05]} />
  );
};
const Chair6 = ({ isVisible }) => {
  const gltf = useLoader(GLTFLoader, '/tabletextures/chair6.gltf');
  const meshRef = useRef();

  // Update the mesh visibility based on the state toggle
  if (meshRef.current) {
    meshRef.current.visible = isVisible;
  }

  return (
    <primitive ref={meshRef} object={gltf.scene} scale={[0.05, 0.05, 0.05]} />
  );
};

const Player = ({ id, isVisible }) => {
  const gltf = useLoader(GLTFLoader, `/tabletextures/player${id}.gltf`);
  const meshRef = useRef();
  console.log(gltf,"gltf");
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

extend({ OrbitControlsImpl });

const OrbitControls = () => {
  const { camera, gl } = useThree();
  const controls = useRef();

  useEffect(() => {
    // This sets the focus point of the controls which effectively is the point around which the camera will rotate
    controls.current.target.set(0,0, 0); // Adjust this target to where you want the head to be focused initially.
    controls.current.update();
  }, [camera]);

  useFrame(() => controls.current && controls.current.update());

  return (
    <orbitControlsImpl
      ref={controls}
      fov={1}
      args={[camera, gl.domElement]}
      enableZoom={true} // Disable zooming
      enablePan={false}  // Disable panning
      enableRotate={true} // Enable rotation
    />
  );
};
const PokerTableWithPlayers = (props) => {

  const [seatName1, setSeatName1] = useState(props.user.userName);
  const [seatName2, setSeatName2] = useState(props.user.userName);
  const [seatName3, setSeatName3] = useState(props.user.userName);
  const [seatName4, setSeatName4] = useState(props.user.userName);
  const [seatName5, setSeatName5] = useState(props.user.userName);
  const [seatName6, setSeatName6] = useState(props.user.userName);
  const [currentSeat, setCurrentSeat] = useState(null);
  const [visibility, setVisibility] = useState({
    player1: false,
    player2: false,
    player3: false,
    player4: false,
    player5: false,
    player6: false
  });


  useEffect(() => {
    if(props.socket !== null) {
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
        switch (data.seatNumber) {
            case 1:
              
              setSeatName1(data.user.userName);
              break;
            case 2:
              
              setSeatName2(data.user.userName);
              break;
            case 3:
                
                setSeatName3(data.user.userName);
              break;
            case 4:
                
                setSeatName4(data.user.userName);
              break;
            case 5:
                
                setSeatName5(data.user.userName);
              break;
            case 6:
                
                setSeatName6(data.user.userName);
              break;
            default:
              console.log("Number is not between 1 and 6");
              break;
        }
      });
      props.socket.on("update_room",(data) => {
        //const key = `player${data.seatNumber}`;
       
        console.log("IT GOT CALLED IN UI UPDATE_ROOM, array is: ", data);
            data.forEach((obj,idx) =>{
              const key = `player${obj.seatNumber}`;
              setVisibility(prev => ({
                ...prev,
                [key]: true
              }));
                switch (obj.seatNumber) {
                    case 1:
                      
                      setSeatName1(obj.userName);
                      break;
                    case 2:
                      
                      setSeatName2(obj.userName);
                      break;
                    case 3:
                        
                        setSeatName3(obj.userName);
                      break;
                    case 4:
                        
                        setSeatName4(obj.userName);
                      break;
                    case 5:
                        
                        setSeatName5(obj.userName);
                      break;
                    case 6:
                        
                        setSeatName6(obj.userName);
                      break;
                    default:
                      console.log("Number is not between 1 and 6");
                      break;
                }
            })

      });

      props.socket.on("groupUpdate_room", (data) => {
        const key = `player${data.seatLeaving}`;
        setVisibility(prev => ({
          ...prev,
          [key]: false
        }));
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







    }
    }, [props.socket])


    const handleLeaveGame = () => {
      props.setActionForMatch(null);
      props.socket.emit("leaveGame");
  }
  const togglePlayerVisibility = (id) => {
    if(currentSeat){
      return;
    }
    setCurrentSeat(id);
    props.socket.emit("selectSeat", {user: props.user, roomName: props.roomName, seatNumber: id } );
    console.log(visibility,"viz");
    const key = `player${id}`;
    setVisibility(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
    // Define initial camera position and rotation //7,8,-8
    const [cameraPosition,setCameraPosition] = useState(new Vector3(0,0,0)); // Example position
  
  //[7, 4, -5], fov: 10
  return (
    <>
      <Canvas
        style={{ backgroundColor: 'black', position: 'absolute', top: 0, left: 0 }}
        camera={{ position: cameraPosition.toArray(), fov: 50 }} // Camera positioned at a height of 2 units, looking forward from a distance of 5 units
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.1} />

          <Stage intensity={1} environment="city" contactShadow={false} shadows={true}>
            <SimpleRoom isVisible={true}/>
            {Array.from({ length: 6 }, (_, i) => (
              <React.Fragment key={i}>
                <Player id={i + 1} isVisible={visibility[`player${i + 1}`]} />
                <Chair id={i + 1} togglePlayerVisibility={togglePlayerVisibility} isVisible={true} setCurrentSeat={setCurrentSeat} seatNumber={i+1} user = {props.user} roomName ={props.roomName} socket={props.socket}/>
              </React.Fragment>
            ))}
          </Stage>
          <OrbitControls />

        </Suspense>
      </Canvas>
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 100 }}>
        <button onClick={handleLeaveGame}>
          Leave
        </button>
      </div>
    </>
  );
};

export default PokerTableWithPlayers;