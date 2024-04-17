import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three';
import { OrbitControls, SpotLight, Stage } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@mui/material';
const texturePath = '/tabletextures/';
const manager = new THREE.LoadingManager();
manager.setURLModifier((url) => {
  const newUrl = new URL(url, window.location.href);
  newUrl.pathname = `${texturePath}${newUrl.pathname.split('/').pop()}`;
  return newUrl.href;
});

const PokerTable = ({ position }) => {
  const gltf = useLoader(GLTFLoader, '/tabletextures/testtable.glb', (loader) => {
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

const Room = ({ position, onChairClick }) => {
  const gltf = useLoader(GLTFLoader, '/tabletextures/finalroom.gltf', (loader) => {
    loader.setPath('/models/');
    loader.setResourcePath(texturePath);
    loader.manager = manager;
  });

  const handleClick = (event, chair) => {
    
    console.log(`Chair clicked: ${chair.name}`);
  };

  return (
    <group position={position} scale={[0.05, 0.05, 0.05]}>
      {gltf.scene.children.map((child) => {
        console.log(child,"obj");
        if (child.children[0].isMesh && child.name.startsWith("chair")) {
          // Correctly applying the `onClick` handler to each chair mesh.
          console.log(child.name);
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
        } else {
          return <primitive key={child.name} object={child} />;
        }
      })}
    </group>
  );
};


const PokerTableWithPlayers = () => (
  <>
    <Canvas style={{ backgroundColor: 'black', position: 'absolute', top: 0, left: 0 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.1} />
        <SpotLight position={[0, 5, 0]} intensity={1} angle={0.3} penumbra={0.5} castShadow />
        <Stage
          intensity={1}
          environment="city"
          contactShadow={false}
          shadows={true}
        >
          {/* <PokerTable position={[0, 0, 0]} />*/}
          {/* <AllChips position={[0,.4,0]}/> */}
          <Room position={[0,1,0]}/>
        </Stage>
        <OrbitControls />
      </Suspense>
    </Canvas>
    <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 100 }}>
      <Button variant="contained" color="primary">
        My Button
      </Button>
    </div>
  </>
);

export default PokerTableWithPlayers;
