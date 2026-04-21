import React from 'react';
import { ScrollControls, useScroll, Grid, Text, Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import OrbitalGallery from './OrbitalGallery';

const PREVIEW_IMAGES = [
  { src: "https://le-beurre.villagersyt.site/portfolio/Joel%20-%20horror.png", title: "Survival Horror", description: "Cinematic Elements" },
  { src: "https://le-beurre.villagersyt.site/portfolio/dream_saying.png", title: "Lore / Commentary", description: "Character Depth" },
  { src: "https://le-beurre.villagersyt.site/portfolio/mace_thumbnail.png", title: "Combat Highlight", description: "Dynamic Lighting" },
  { src: "https://le-beurre.villagersyt.site/portfolio/cpvp_montage_thumbnail.png", title: "CPVP Action", description: "High Impact" },
  { src: "https://le-beurre.villagersyt.site/portfolio/osh.png", title: "Creative Story", description: "Vibrant Composition" },
  { src: "https://le-beurre.villagersyt.site/portfolio/AyyLamar%20-%20I%20Mastered%20Hacks%20in%20Minecraft%20(v2).png", title: "Viral Bait", description: "High Contrast" }
];

// Camera flies DOWNWARD along the Y axis
function CameraFlight() {
  const scroll = useScroll();

  useFrame((state) => {
    const offset = scroll.offset;

    // Phase 1 (0–0.15): Stay at top, look at hero
    // Phase 2 (0.15–0.35): Descend to testimonials at Y=-8
    // Phase 3 (0.35–0.75): Descend to gallery ring at Y=-20, hold
    // Phase 4 (0.75–1.0): Descend to contact at Y=-40

    let targetY = 0;
    let targetZ = 5;

    if (offset < 0.15) {
      const p = offset / 0.15;
      targetY = -p * 2;
      targetZ = 5;
    } else if (offset < 0.35) {
      const p = (offset - 0.15) / 0.2;
      targetY = -2 - p * 6;
      targetZ = 5;
    } else if (offset < 0.75) {
      const p = (offset - 0.35) / 0.4;
      targetY = THREE.MathUtils.lerp(-8, -20, p);
      targetZ = 5;
    } else {
      const p = (offset - 0.75) / 0.25;
      targetY = THREE.MathUtils.lerp(-20, -40, Math.min(p, 1));
      targetZ = 5;
    }

    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.06);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.06);
    // Always look forward, no rotation noise
    state.camera.rotation.z = THREE.MathUtils.lerp(state.camera.rotation.z, 0, 0.1);
  });

  return null;
}

export default function Scene() {
  return (
    <ScrollControls pages={8} damping={0.2}>
      <CameraFlight />

      {/* Blueprint Wireframe Space Grids */}
      <Grid infiniteGrid fadeDistance={80} cellColor="rgba(255,255,255,0.04)" sectionColor="rgba(255,255,255,0.08)" cellSize={1} sectionSize={4} position={[0, 0, -2]} rotation={[Math.PI / 2, 0, 0]} />

      {/* Cosmic Forest Particles — float across the full vertical depth */}
      <Sparkles count={600} scale={[30, 60, 20]} size={2.5} speed={0.15} color="#00ff88" opacity={0.55} position={[0, -20, -5]} />
      <Sparkles count={600} scale={[30, 60, 20]} size={1.2} speed={0.35} color="#ffffff" opacity={0.25} position={[0, -20, -5]} />
      <Sparkles count={200} scale={[30, 60, 20]} size={3} speed={0.08} color="#ff7300" opacity={0.2} position={[0, -20, -5]} />

      {/* ---- PHASE 1: HERO (Y: 0) ---- */}
      <group position={[0, 0, -6]}>
        <Text position={[-3.5, 1.5, 0]} fontSize={2.2} fontWeight={900} color="white" anchorX="left" toneMapped={false}>
          NEXT-GEN
        </Text>
        <Text position={[-3.5, -0.3, 0]} fontSize={2.2} fontWeight={900} fillOpacity={0} strokeWidth={0.025} strokeColor="white" anchorX="left">
          ARTIST
        </Text>
        <Text position={[-3.5, -2, 0]} fontSize={0.28} color="rgba(255,255,255,0.55)" anchorX="left" letterSpacing={0.15} maxWidth={8}>
          High-end visuals tailored for high-tier creators.
        </Text>
      </group>

      {/* ---- PHASE 2: TESTIMONIALS (Y: -8) ---- */}
      <group position={[0, -8, -6]}>
        <Text position={[0, 1, 0]} fontSize={8} fillOpacity={0} strokeWidth={0.03} strokeColor="rgba(255,255,255,0.04)" depthTest={false}>
          EVALUATIONS
        </Text>
        <Text position={[-3.5, 0.8, 0]} fontSize={0.38} color="white" maxWidth={5} lineHeight={1.5}>
          {"\"His thumbnails pull literal millions of views. Unparalleled CTR.\""}
        </Text>
        <Text position={[-3.5, -0.8, 0]} fontSize={0.2} color="#ff7300" toneMapped={false} letterSpacing={0.1}>
          [ SYS.CLIENT // 01 ]
        </Text>
        <Text position={[3.5, 0.1, -1]} fontSize={0.38} color="white" maxWidth={5} textAlign="right" lineHeight={1.5}>
          {"\"The most cinematic composition in the scene right now.\""}
        </Text>
        <Text position={[3.5, -1, -1]} fontSize={0.2} color="#ff7300" toneMapped={false} textAlign="right" letterSpacing={0.1}>
          [ SYS.CLIENT // 02 ]
        </Text>
      </group>

      {/* ---- PHASE 3: ORBITAL GALLERY (Y: -20, slightly right so camera is left of center) ---- */}
      <Text position={[0, -14, -5]} fontSize={12} fillOpacity={0} strokeWidth={0.03} strokeColor="rgba(255,255,255,0.04)" depthTest={false}>
        WORKS
      </Text>
      <OrbitalGallery images={PREVIEW_IMAGES} position={[3, -20, -8]} />

      {/* ---- PHASE 4: CONTACT TERMINAL (Y: -40) ---- */}
      <Text position={[0, -34, -5]} fontSize={12} fillOpacity={0} strokeWidth={0.03} strokeColor="rgba(255,255,255,0.04)" depthTest={false}>
        ENGINE
      </Text>
      <group position={[0, -40, -8]}>
        <Text position={[0, 2.5, 0]} fontSize={1.4} color="white" anchorX="center" toneMapped={false} letterSpacing={0.1}>
          INITIATE CONTACT
        </Text>
        <Text position={[0, 1.2, 0]} fontSize={0.32} color="rgba(255,255,255,0.6)" anchorX="center" letterSpacing={0.25}>
          SECURE COMMS ONLINE
        </Text>

        {/* Discord Button — pure 3D glowing text panel */}
        <group position={[-3, -0.5, 0]}>
          <mesh>
            <planeGeometry args={[4.5, 0.9]} />
            <meshBasicMaterial color="#00ff88" transparent opacity={0.06} toneMapped={false} />
          </mesh>
          <mesh>
            <planeGeometry args={[4.5, 0.9]} />
            <meshBasicMaterial color="#00ff88" transparent opacity={0.0} wireframe />
          </mesh>
          {/* Border lines via line segments */}
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(4.5, 0.9)]} />
            <lineBasicMaterial color="#00ff88" toneMapped={false} />
          </lineSegments>
          <Text position={[0, 0, 0.05]} fontSize={0.28} color="#00ff88" anchorX="center" toneMapped={false} letterSpacing={0.1}>
            DISCORD // le_beurre6
          </Text>
        </group>

        {/* X Button */}
        <group position={[3, -0.5, 0]}>
          <mesh>
            <planeGeometry args={[4.5, 0.9]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.05} toneMapped={false} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(4.5, 0.9)]} />
            <lineBasicMaterial color="#ffffff" toneMapped={false} />
          </lineSegments>
          <Text position={[0, 0, 0.05]} fontSize={0.28} color="#ffffff" anchorX="center" toneMapped={false} letterSpacing={0.1}>
            X (TWITTER) // @Le_Beurre
          </Text>
        </group>

        <Text position={[0, -1.8, 0]} fontSize={0.18} color="rgba(255,255,255,0.3)" anchorX="center" letterSpacing={0.3}>
          DIRECT MESSAGE FOR BOOKING
        </Text>
      </group>

    </ScrollControls>
  );
}
