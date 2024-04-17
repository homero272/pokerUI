import { Canvas, useLoader } from '@react-three/fiber';
import React, { Suspense, useState, useEffect,useRef, Button, Fragment } from 'react';
import { Html, OrbitControls,SpotLight, Stage } from '@react-three/drei';
import * as THREE from 'three';

import { TextureLoader } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const texturePath = '/tabletextures/';
const manager = new THREE.LoadingManager();
manager.setURLModifier((url) => {
  const newUrl = new URL(url, window.location.href);
  newUrl.pathname = `${texturePath}${newUrl.pathname.split('/').pop()}`;
  return newUrl.href;
});

const FBXModel2 = ({ url, x, y, z }) => {
  const fbx = useLoader(FBXLoader, url, (loader) => {
    loader.setPath('/models/');
    loader.setResourcePath(texturePath);
    loader.manager = manager;
  });
  useEffect(() => {
    fbx.position.set(x, y, z);
    fbx.traverse((child) => {
      if (child.isMesh) {
        const textureLoader = new THREE.TextureLoader(manager);
        child.material.map = textureLoader.load(`${texturePath}wds_001_b.jpg`);
        child.material.needsUpdate = true;
      }
    });
  }, [fbx, x, y, z]);
  return <primitive object={fbx} scale={0.005} />;
};

const GLBModel = ({ url, x, y, z }) => {
  const original = useLoader(GLTFLoader, url); // Load the original model
  const clone = useRef(null);

  useEffect(() => {
    if (!clone.current && original.scene) { // Ensure the original model is loaded
      clone.current = original.scene.clone(true); // Clone the scene deeply
    }

    if (clone.current) {
      const scene = clone.current;
      scene.position.set(x, y, z); // Set position for each instance
      const textureLoader = new THREE.TextureLoader(manager);
      scene.traverse((child) => {
        if (child.isMesh && !child.userData.isOutline) {
          console.log(child.name);
          child.material = new THREE.MeshMatcapMaterial({ color: 0xffffff });
            if(child.name == "Poker_Table"){
            child.material.map = textureLoader.load(`${texturePath}pokerfelt.png`);
            child.material.needsUpdate = true;
            }
            else if(child.name == "poker_table_desk"){
              child.material = new THREE.MeshMatcapMaterial({ color: 'darkgrey' });
              child.material.map = textureLoader.load(`${texturePath}greenvelvet.png`);
              child.material.needsUpdate = true;
              }
              else if(child.name == "chips_box"){
                child.material.map = textureLoader.load(`${texturePath}darkmetal.png`);
                child.material.needsUpdate = true;
                }
                else if(child.name == "Poker_Lamp"){
                  child.material.map = textureLoader.load(`${texturePath}darkmetal.png`);
                  child.material.needsUpdate = true;
                  }
            
            // Set a default material if none exists
            //child.material = new THREE.MeshMatcapMaterial({ color: 0x0000ff });
          

          // const outlineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
          // const outlineMesh = new THREE.Mesh(child.geometry, outlineMaterial);
          // outlineMesh.scale.multiplyScalar(1.05);
          // outlineMesh.position.copy(child.position);
          // outlineMesh.rotation.copy(child.rotation);
          // outlineMesh.userData.isOutline = true;
          // child.parent.add(outlineMesh);
        }
      });
    }
  }, [original, x, y, z]); // Dependencies to ensure updates propagate

  return clone.current ? <primitive object={clone.current} scale = {0.005}/> : null; // Conditionally render
};

// const GLBModel = ({ url, x, y, z }) => {
//   const original = useLoader(GLTFLoader, url); // Load the original model
//   const clone = useRef(null);

//   useEffect(() => {
//     if (!clone.current && original.scene) { // Ensure the original model is loaded
//       clone.current = original.scene.clone(true); // Clone the scene deeply
//     }

//     if (clone.current) {
//       const scene = clone.current;
//       scene.position.set(x, y, z); // Set position for each instance
//       scene.traverse((child) => {
//         if (child.isMesh && !child.userData.isOutline) {
//           if (!child.material) {
//             child.material = new THREE.MeshMatcapMaterial({ color: 0x0000ff });
//           } else if (Array.isArray(child.material)) {
//             child.material.forEach(mat => mat.color.set(0x0000ff));
//           } else {
//             child.material = new THREE.MeshMatcapMaterial({ color: 0x0000ff });
//           }

//           const outlineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
//           const outlineMesh = new THREE.Mesh(child.geometry, outlineMaterial);
//           outlineMesh.scale.multiplyScalar(1.05);
//           outlineMesh.position.copy(child.position);
//           outlineMesh.rotation.copy(child.rotation);
//           outlineMesh.userData.isOutline = true;
//           child.parent.add(outlineMesh);
//         }
//       });
//     }
//   }, [original, x, y, z]); // Dependencies to ensure updates propagate

//   return clone.current ? <primitive object={clone.current} scale = {0.005}/> : null; // Conditionally render
// };



export default function PokerTableWithPlayers() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    
    
    <div>
      
      {loading ? <div>Loading...</div> : null}
      
      <Canvas style={{ width: '100vw', height: '100vh' }}>
        <Suspense fallback={<Html>Loading...</Html>}>
          <ambientLight intensity={1} />
          {/* <FBXModel2 url="/tableasset.FBX" x={0} y={0} z={0} /> */}
          <GLBModel url="/tabletextures/testtable.glb" x={0} y={0} z={0} />
          {/* <GLBModel url="/tabletextures/pokerchips(one).glb" x={0.4} y={0.4} z={0} /> */}

          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
    
  );
}
