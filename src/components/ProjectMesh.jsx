import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Text } from '@react-three/drei';
import * as THREE from 'three';

export default function ProjectMesh({ url, title, description, position, rotation, index }) {
  const groupRef = useRef(null);
  const auraRef = useRef(null);
  const texture = useTexture(url);

  // Gentle floating bob, offset per card
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 0.6 + index * 1.3) * 0.12;

    // Pulse the electric aura opacity
    if (auraRef.current) {
      auraRef.current.material.opacity = 0.25 + Math.sin(t * 2.5 + index) * 0.15;
    }
  });

  // Low curvature: large radius cylinder so bend is subtle
  const radius = 12;
  const panelWidth = 5.6; // 16:9 => height = 3.15
  const panelHeight = 3.15;
  const thetaLength = panelWidth / radius;

  // Electric aura: a slightly larger cylinder behind, emissive color shifted
  const auraRadius = radius + 0.08;
  const auraThetaLength = thetaLength + 0.04;

  // Per-card accent color cycling for electric aura
  const auraColors = ['#00ffff', '#ff7300', '#00ff88', '#ff00ff', '#ffff00', '#ff4466'];
  const auraColor = auraColors[index % auraColors.length];

  return (
    <group rotation={rotation} ref={groupRef}>
      {/* Electric aura glow layer — slightly bigger cylinder behind */}
      <mesh position={[0, 0, -auraRadius]} ref={auraRef}>
        <cylinderGeometry args={[auraRadius, auraRadius, panelHeight + 0.3, 32, 1, true, -auraThetaLength / 2, auraThetaLength]} />
        <meshBasicMaterial
          color={auraColor}
          transparent
          opacity={0.3}
          side={THREE.BackSide}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>

      {/* Main curved image panel */}
      <mesh position={[0, 0, -radius]}>
        <cylinderGeometry args={[radius, radius, panelHeight, 32, 1, true, -thetaLength / 2, thetaLength]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>

      {/* Title — below image, centered */}
      <Text
        position={[0, -panelHeight / 2 - 0.45, 0.2]}
        fontSize={0.36}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.12}
        toneMapped={false}
      >
        {title.toUpperCase()}
      </Text>

      {/* Description — to the RIGHT of image */}
      <Text
        position={[panelWidth / 2 + 1.1, 0, 0.1]}
        fontSize={0.2}
        color={auraColor}
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.06}
        toneMapped={false}
        maxWidth={2.5}
        lineHeight={1.6}
      >
        {description}
      </Text>

      {/* Technical tag — top left of panel */}
      <Text
        position={[-panelWidth / 2 + 0.2, panelHeight / 2 + 0.2, 0.1]}
        fontSize={0.12}
        color="#ff7300"
        anchorX="left"
        letterSpacing={0.25}
        toneMapped={false}
      >
        [ SYS.MEM // RETAIN ]
      </Text>
    </group>
  );
}
