import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PresentationControls, Icosahedron } from '@react-three/drei';

export default function ArtifactLogo({ position }) {
  const meshRef = useRef();

  // Subtle ambient floating and spinning
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group position={position}>
      <PresentationControls
        global={false}
        cursor={true}
        snap={true}
        speed={1.5}
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        {/* Inner solid technical core */}
        <Icosahedron args={[1.5, 1]} ref={meshRef}>
          <meshStandardMaterial 
            color="#050505" 
            roughness={0.2} 
            metalness={0.8}
            wireframe={false}
          />
        </Icosahedron>
        
        {/* Outer holographic cage */}
        <Icosahedron args={[1.7, 1]}>
          <meshBasicMaterial color="white" wireframe={true} transparent opacity={0.05} />
        </Icosahedron>
      </PresentationControls>
    </group>
  );
}
