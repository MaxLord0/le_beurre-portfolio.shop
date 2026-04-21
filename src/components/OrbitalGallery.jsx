import React, { useRef } from 'react';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import ProjectMesh from './ProjectMesh';
import * as THREE from 'three';

export default function OrbitalGallery({ images, position }) {
  const groupRef = useRef();
  const scroll = useScroll();

  const count = images.length;
  const radius = 10; // ring radius

  // Each card occupies exactly (360/count) degrees
  const angleStep = (Math.PI * 2) / count;

  // Rotation tracking
  const currentRotationRef = useRef(0);
  const idlePhaseRef = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Gallery phase runs between scroll offset 0.35 → 0.75
    const phaseStart = 0.35;
    const phaseEnd = 0.75;

    const rawProgress = (scroll.offset - phaseStart) / (phaseEnd - phaseStart);
    const scrollProgress = Math.max(0, Math.min(rawProgress, 1));

    // Total rotation = exactly one full rotation (2PI) to show all N designs once
    // We step through count stops, each stop = angleStep
    // scrollProgress 0→1 maps to 0→(count-1) stops
    const targetStop = scrollProgress * (count - 1); // 0 to 5 for 6 images
    const targetRotation = targetStop * angleStep;

    // Snap to each stop with elastic ease — but always nudge forward slowly (idle creep)
    const snapRotation = Math.round(targetStop) * angleStep;
    const blendedTarget = THREE.MathUtils.lerp(snapRotation, targetRotation, 0.3);

    // Idle creep: tiny constant forward drift so it's never 100% frozen
    idlePhaseRef.current += delta * 0.04;
    const idleCreep = idlePhaseRef.current % angleStep; // wraps per slot so visually stays near snap

    const finalTarget = blendedTarget + Math.sin(idlePhaseRef.current * 0.5) * 0.015;
    currentRotationRef.current = THREE.MathUtils.lerp(currentRotationRef.current, finalTarget, 0.04);

    groupRef.current.rotation.y = currentRotationRef.current;
  });

  return (
    <group
      position={position}
      // Slight upward-left inclination of the ring plane
      rotation={[-0.12, 0, -0.1]}
      ref={groupRef}
    >
      {images.map((img, i) => {
        // Distribute cards evenly on the ring
        const angle = (i / count) * Math.PI * 2;

        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        // All at the same Y (centered between floor and ceiling) — clean, not staggered
        const yOffset = 0;

        return (
          <ProjectMesh
            key={i}
            url={img.src}
            position={[x, yOffset, z]}
            rotation={[0, angle, 0]}
            title={img.title}
            description={img.description}
            index={i}
          />
        );
      })}
    </group>
  );
}
