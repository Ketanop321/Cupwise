import React from 'react';
import { useGLTF } from '@react-three/drei';

export function SaraswatiModel(props: any) {
  // Load the 3D model
  const { scene } = useGLTF('/models/saraswati.glb'); // Ensure the path matches your model file location

  return (
    // Render the model
    <primitive
    object={scene}
    {...props}
    position={[10,10, -9]} // Adjust position for centering
    rotation={[0, Math.PI, 0]} // Rotate to face the front
    scale={[0.5, 0.5, 0.5]} // Adjust scale as needed
  />
  );
}

// Ensure Three.js knows how to handle .glb files
useGLTF.preload('/models/saraswati.glb');
export default SaraswatiModel;