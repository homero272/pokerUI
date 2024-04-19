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

const Player = ({ id, isVisible }) => {
  const gltf = useLoader(GLTFLoader, `/tabletextures/player${id}.gltf`);
  const meshRef = useRef();
  // console.log(gltf,"gltf");
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

// const Cards = ({ id, togglePlayerVisibility, setCurrentSeat, seatNumber, user, roomName, socket }) => {
//   const gltf = useLoader(GLTFLoader, `/tabletextures/pokerdeck/2h.glb`);
//   const meshRef = useRef();
//   console.log(gltf,"gltf card");
//   //first card POS x: 1.7257951269120029, y: 1.5039156776787426, z: -0.8002722586972699
// //Rotation EULER 
// /**_order
// : 
// "XYZ"
// _x
// : 
// 0
// _y
// : 
// -0.7582964141897087
// _z
// : 
// 0 */
//   if (meshRef.current) {
//     meshRef.current.visible = true;
//   }
//   return (
//     <primitive
//       ref={meshRef}
//       object={gltf.scene}
//       geometry={gltf.scene.children[0].geometry}
//       material={gltf.scene.children[0].material}
//       scale={[1, 1, 1]}
      
//     />
//   );
// };


const Cards = ({ id }) => {
  const gltf = useLoader(GLTFLoader, `/tabletextures/pokerdeck/${id}h.glb`);
  const cardRef = useRef();
  let position, rotation, scale;
  // Define the position, rotation, and scale

  //if comunity card we will do a switch from 0-4 (passing CC, index 0-4).... switch to determine the postion to set it to
  //if player card we will do a switch from 1-6 (passing pc, index1-6 )... switch to determine and if condition (0 or 1)for each to determine position
  switch (id) {
    case 2:
      position = new THREE.Vector3(1.871, 1.5039156776787426, -0.626);
      rotation = new THREE.Euler(0, -0.7582964141897087, 0); // Using Euler angles here
      scale = new THREE.Vector3(0.25, 0.25, 0.25); // Scale down the card
      
      break;
    case 3:
        
    position = new THREE.Vector3(1.560, 1.504, -0.911);
    rotation = new THREE.Euler(0, -0.7582964141897087, 0); // Using Euler angles here
    scale = new THREE.Vector3(0.25, 0.25, 0.25); // Scale down the card
      break;
    case 4:
      position = new THREE.Vector3(1.27, 1.504, -1.21);
      rotation = new THREE.Euler(0, -0.7582964141897087, 0); // Using Euler angles here
      scale = new THREE.Vector3(0.25, 0.25, 0.25); 
      break;
    case 5:
      position = new THREE.Vector3(0.938, 1.504, -1.481);
      rotation = new THREE.Euler(0, -0.7582964141897087, 0); // Using Euler angles here
      scale = new THREE.Vector3(0.25, 0.25, 0.25); 
      break;
    case 6:
      position = new THREE.Vector3(0.627, 1.504, -1.796);
      rotation = new THREE.Euler(0, -0.7582964141897087, 0); // Using Euler angles here
      scale = new THREE.Vector3(0.25, 0.25, 0.25); 
      break;
    default:
      console.log("Number is not between 1 and 6");
      break;
}



  // UseFrame to animate or react to changes (optional)
  // useFrame(() => {
  //     if (cardRef.current) {
  //         // Example: Rotate the card slowly around its y-axis
  //         cardRef.current.rotation.y += 0.01;
  //     }
  // });

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

// extend({ OrbitControlsImpl });

// const OrbitControls = () => {
//   const { camera, gl } = useThree();
//   const controls = useRef();

//   useEffect(() => {
//     // This sets the focus point of the controls which effectively is the point around which the camera will rotate
//     controls.current.target.set(0,0, 0); // Adjust this target to where you want the head to be focused initially.
//     controls.current.update();
//   }, [camera]);

//   useFrame(() => controls.current && controls.current.update());

//   return (
//     <orbitControlsImpl
//       ref={controls}
//       fov={1}
//       args={[camera, gl.domElement]}
      // enableZoom={true} // Disable zooming
      // enablePan={false}  // Disable panning
      // enableRotate={true} // Enable rotation
//     />
//   );
// };

extend({ OrbitControlsImpl });

const OrbitControls = (props) => {
  const { camera, gl } = useThree();
  const controls = useRef();

  useFrame(() => {
    console.log(camera,"cam");
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
  const cameraRef = useRef();

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
    const key = `player${id}`;
    if (currentSeat) return;
    if(visibility[key] == true){
      return;
    }
    setCurrentSeat(id);
    props.socket.emit("selectSeat", { user: props.user, roomName: props.roomName, seatNumber: id });
   // const key = `player${id}`;
    setVisibility(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    switch (id) {
      case 1:
        
      if (cameraRef.current) {
        cameraRef.current.position.copy(new THREE.Vector3(0.8380562280321286, 0.6806835769896427, 4.218280283917921));
        cameraRef.current.rotation.copy(new THREE.Euler(-0.3007774255261268, 0.49802849238603664, 0.1471048406142235));
        cameraRef.current.updateProjectionMatrix(); // Update if FOV, aspect, near, or far planes are changed
    }
        break;
      case 2:
        
      if (cameraRef.current) {
        cameraRef.current.position.copy(new THREE.Vector3(1.6710115161376544, 0.4364528681116143, 1.974999831526403));
        cameraRef.current.rotation.copy(new THREE.Euler(-1.3239257819428438, 1.2958940056050277, 1.3147029049612715));
        cameraRef.current.updateProjectionMatrix(); // Update if FOV, aspect, near, or far planes are changed
    }
        break;
      case 3:
        if (cameraRef.current) {
          cameraRef.current.position.copy(new THREE.Vector3(0.83003736190289, 0.5609178299067229, 0.20790864120295688));
          cameraRef.current.rotation.copy(new THREE.Euler(-2.4956862450862594, 0.8177242272838758, 2.6387951344603144));
          cameraRef.current.updateProjectionMatrix(); // Update if FOV, aspect, near, or far planes are changed
      }
          
        break;
      case 4:
        if (cameraRef.current) {
          cameraRef.current.position.copy(new THREE.Vector3(-0.94166520077328, 0.6978245972933373, -1.1792269063118446));
          cameraRef.current.rotation.copy(new THREE.Euler(-2.552163561376754, 0.3634024154516776, 2.9082196515008523));
          cameraRef.current.updateProjectionMatrix(); // Update if FOV, aspect, near, or far planes are changed
      }
          
        break;
      case 5:
        if (cameraRef.current) {
          cameraRef.current.position.copy(new THREE.Vector3(-2.581770352521738, 0.8935528294076593, -1.628236846383945));
          cameraRef.current.rotation.copy(new THREE.Euler(-2.5055065161550516, -0.07284732502723025, -3.0878957450863758));
          cameraRef.current.updateProjectionMatrix(); // Update if FOV, aspect, near, or far planes are changed
      }
          
        break;
      case 6:
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
      fov: 75,
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
  return (
    <>
  <Canvas
    style={{ backgroundColor: 'white', position: 'absolute', top: 0, left: 0 }}
    onCreated={onCanvasCreated}
    adjustCamera={true} // Allows Three.js to adjust the camera based on canvas dimensions initially
>
        <Suspense fallback={null}>
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
                <Chair id={i + 1} togglePlayerVisibility={togglePlayerVisibility} isVisible={true} setCurrentSeat={setCurrentSeat} seatNumber={i+1} user = {props.user} roomName ={props.roomName} socket={props.socket}/>
              </React.Fragment>
            ))}
            <Cards id={2}/>
            <Cards id={3}/>
            <Cards id={4}/>
            <Cards id={5}/>
            <Cards id={6}/>
            
          </Stage>
          {/* <OrbitControls setCameraData={setCameraData}/> */}

        </Suspense>
      </Canvas>
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 100 }}>
        <button onClick={handleLeaveGame}>
          Leave
        </button>
        <input
          type="range"
          min="0.5"
          max="200"
          step="0.1"
          value={cameraZoom}
          onChange={handleZoomChange}
          style={{ width: '300px' }}
        />
        <div>
          <p>Position: {cameraData.position.join(', ')}</p>
          <p>Rotation: {cameraData.rotation.join(', ')}</p>
          <p>Zoom: {cameraData.zoom.toFixed(2)}</p>
          
        </div>
      </div>
    </>
  );
};

export default PokerTableWithPlayers;