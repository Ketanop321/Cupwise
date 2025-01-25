import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { Suspense } from 'react';
import SaraswatiModel from './SaraswatiModel'; // Ensure the correct path to your SaraswatiModel component



export function Scene3D() {
  return (
    <div className="h-[600px] w-full">
      <Canvas camera={{ position: [0, 2, 10], fov: 45 }}>
        <Suspense fallback={null}>
          <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
            <SaraswatiModel />
          </Float>
          <ambientLight intensity={0.7} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <Environment preset="sunset" />
          <OrbitControls
            target={[10, -1, 10]} // Center the orbit on the model
            enableZoom={true}
            enablePan={false} // Disable panning
            autoRotate={false} // Disable auto-rotation
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Scene3D;
