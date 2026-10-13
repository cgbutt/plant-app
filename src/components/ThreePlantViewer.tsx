import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { GrowthStage } from '../types/plant';
import { getAssetUrl } from '../utils/assets';

interface ThreePlantViewerProps {
  modelUrl?: string; // Custom uploaded GLB URL
  species: string;
  stage: GrowthStage;
}

// Custom GLB Loader Component with robust pivot-wrapper auto-centering & scale normalization
function ExternalGLBModel({ url, species, stage }: { url: string; species: string; stage: GrowthStage }) {
  const [modelGroup, setModelGroup] = useState<THREE.Group | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setError(false);

    const loader = new GLTFLoader();
    const resolvedUrl = getAssetUrl(url);

    loader.load(
      resolvedUrl,
      (gltf) => {
        if (!isMounted) return;
        const rawScene = gltf.scene;

        // Calculate accurate bounding box of loaded GLTF mesh
        const box = new THREE.Box3().setFromObject(rawScene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Create a pivot wrapper group centered precisely at (0, 0, 0)
        const wrapper = new THREE.Group();
        
        // Offset inner scene so its geometric centroid aligns with wrapper origin (0, 0, 0)
        rawScene.position.set(-center.x, -center.y, -center.z);
        wrapper.add(rawScene);

        // Normalize scale to fit neatly inside ~2.4 unit viewport box
        const maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim > 0) {
          const targetScale = 2.4 / maxDim;
          wrapper.scale.set(targetScale, targetScale, targetScale);
        }

        // Enable shadows on all child meshes
        rawScene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        setModelGroup(wrapper);
      },
      undefined,
      (err) => {
        console.warn(`Could not load GLB at "${resolvedUrl}", falling back to procedural 3D model:`, err);
        if (isMounted) setError(true);
      }
    );

    return () => {
      isMounted = false;
    };
  }, [url]);

  if (error) {
    return <ProceduralPlantModel species={species} stage={stage} />;
  }

  if (!modelGroup) {
    return null;
  }

  return <primitive object={modelGroup} />;
}

// High Quality Procedural 3D Plant Model Generators (Fallback when no GLB is uploaded)
function ProceduralPlantModel({ species, stage }: { species: string; stage: GrowthStage }) {
  const groupRef = useRef<THREE.Group>(null);

  // Gentle floating / breathing animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  const isSnake = species.toUpperCase().includes('SANSEVIERIA') || species.toUpperCase().includes('SNAKE');
  const isAloe = species.toUpperCase().includes('ALOE');
  const isFiddle = species.toUpperCase().includes('FICUS') || species.toUpperCase().includes('FIDDLE');

  // Pot dimensions based on growth stage
  const potScale = stage === 1 ? 0.7 : stage === 2 ? 1.0 : 1.35;
  const plantScale = stage === 1 ? 0.65 : stage === 2 ? 1.0 : 1.45;

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* Terracotta Pot */}
      <group position={[0, 0, 0]} scale={[potScale, potScale, potScale]}>
        {/* Pot Base Body */}
        <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.55, 0.38, 0.8, 24]} />
          <meshStandardMaterial color="#c26d4d" roughness={0.7} metalness={0.05} />
        </mesh>
        {/* Pot Rim */}
        <mesh castShadow receiveShadow position={[0, 0.78, 0]}>
          <cylinderGeometry args={[0.6, 0.56, 0.12, 24]} />
          <meshStandardMaterial color="#b35f40" roughness={0.65} />
        </mesh>
        {/* Soil Base */}
        <mesh receiveShadow position={[0, 0.77, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.54, 24]} />
          <meshStandardMaterial color="#3a271d" roughness={0.95} />
        </mesh>
      </group>

      {/* Plant Stems & Foliage */}
      <group position={[0, 0.8 * potScale, 0]} scale={[plantScale, plantScale, plantScale]}>
        {isSnake ? (
          <SnakePlantFoliage stage={stage} />
        ) : isAloe ? (
          <AloeVeraFoliage stage={stage} />
        ) : isFiddle ? (
          <FiddleLeafFoliage stage={stage} />
        ) : (
          <MonsteraFoliage stage={stage} />
        )}
      </group>
    </group>
  );
}

// 1. Monstera 3D Model
function MonsteraFoliage({ stage }: { stage: GrowthStage }) {
  const leafCount = stage === 1 ? 4 : stage === 2 ? 8 : 14;

  return (
    <group>
      {Array.from({ length: leafCount }).map((_, i) => {
        const angle = (i / leafCount) * Math.PI * 2 + (i % 2 === 0 ? 0.2 : -0.1);
        const radius = 0.15 + (i % 3) * 0.06;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const height = 0.5 + (i / leafCount) * 0.8 + (i % 2 === 0 ? 0.2 : 0);
        const rotX = 0.3 + (i % 3) * 0.15;
        const rotZ = (i % 2 === 0 ? 1 : -1) * (0.2 + (i % 4) * 0.1);
        const leafScale = 0.8 + (i / leafCount) * 0.6;

        return (
          <group key={i} position={[x, 0, z]} rotation={[0, angle, 0]}>
            <mesh castShadow position={[0, height / 2, 0]}>
              <cylinderGeometry args={[0.025, 0.035, height, 8]} />
              <meshStandardMaterial color="#4a7c43" roughness={0.4} />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              position={[0, height, 0.15]}
              rotation={[rotX, 0, rotZ]}
              scale={[leafScale, leafScale, leafScale]}
            >
              <sphereGeometry args={[0.35, 16, 16]} />
              <meshStandardMaterial color={i % 2 === 0 ? '#386633' : '#457a40'} roughness={0.35} metalness={0.05} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// 2. Snake Plant 3D Model
function SnakePlantFoliage({ stage }: { stage: GrowthStage }) {
  const bladeCount = stage === 1 ? 5 : stage === 2 ? 10 : 16;

  return (
    <group>
      {Array.from({ length: bladeCount }).map((_, i) => {
        const angle = (i / bladeCount) * Math.PI * 2;
        const radius = 0.08 + (i % 3) * 0.04;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const height = 0.8 + (i / bladeCount) * 0.9 + (i % 3) * 0.2;
        const rotZ = (Math.random() - 0.5) * 0.15;

        return (
          <group key={i} position={[x, 0, z]} rotation={[0, angle, rotZ]}>
            <mesh castShadow receiveShadow position={[0, height / 2, 0]} scale={[0.16, height, 0.03]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#2d5e38" roughness={0.3} />
            </mesh>
            <mesh position={[0, height / 2, 0]} scale={[0.18, height * 0.98, 0.025]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#c2b04c" roughness={0.4} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// 3. Aloe Vera 3D Model
function AloeVeraFoliage({ stage }: { stage: GrowthStage }) {
  const leafCount = stage === 1 ? 6 : stage === 2 ? 12 : 20;

  return (
    <group position={[0, 0.1, 0]}>
      {Array.from({ length: leafCount }).map((_, i) => {
        const angle = (i / leafCount) * Math.PI * 2.4;
        const radius = 0.05 + (i / leafCount) * 0.1;
        const height = 0.5 + (i / leafCount) * 0.5;
        const tilt = 0.4 + (i / leafCount) * 0.4;

        return (
          <group key={i} rotation={[0, angle, 0]}>
            <mesh
              castShadow
              receiveShadow
              position={[0, height * 0.4, radius]}
              rotation={[tilt, 0, 0]}
              scale={[0.12, height, 0.08]}
            >
              <coneGeometry args={[1, 1, 4]} />
              <meshStandardMaterial color="#4d8c58" roughness={0.3} metalness={0.05} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// 4. Fiddle Leaf Fig 3D Model
function FiddleLeafFoliage({ stage }: { stage: GrowthStage }) {
  const trunkHeight = stage === 1 ? 0.8 : stage === 2 ? 1.3 : 1.8;
  const leafCount = stage === 1 ? 5 : stage === 2 ? 10 : 18;

  return (
    <group>
      <mesh castShadow position={[0, trunkHeight / 2, 0]}>
        <cylinderGeometry args={[0.04, 0.06, trunkHeight, 12]} />
        <meshStandardMaterial color="#594635" roughness={0.8} />
      </mesh>

      {Array.from({ length: leafCount }).map((_, i) => {
        const pct = i / leafCount;
        const height = 0.3 + pct * (trunkHeight - 0.2);
        const angle = i * 2.2;
        const rotX = 0.3 + (i % 2) * 0.1;

        return (
          <group key={i} position={[0, height, 0]} rotation={[0, angle, 0]}>
            <mesh castShadow receiveShadow position={[0.22, 0, 0]} rotation={[rotX, 0, 0.2]} scale={[0.3, 0.1, 0.4]}>
              <sphereGeometry args={[1, 12, 12]} />
              <meshStandardMaterial color="#2d5930" roughness={0.35} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export const ThreePlantViewer: React.FC<ThreePlantViewerProps> = ({ modelUrl, species, stage }) => {
  const controlsRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const isIntentLockedRef = useRef<boolean>(false);

  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 860 || !!document.querySelector('.phone-mode-active');
  });

  useEffect(() => {
    const checkMobile = () => {
      const isNarrow = window.innerWidth <= 860;
      const isSimulated = !!document.querySelector('.phone-mode-active');
      setIsMobile(isNarrow || isSimulated);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Set touchAction: 'pan-y' and manage touch scroll intent
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (controlsRef.current?.domElement) {
      controlsRef.current.domElement.style.touchAction = 'pan-y';
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        isIntentLockedRef.current = false;
        if (controlsRef.current) {
          controlsRef.current.enabled = true;
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartRef.current || e.touches.length !== 1) return;

      const dx = Math.abs(e.touches[0].clientX - touchStartRef.current.x);
      const dy = Math.abs(e.touches[0].clientY - touchStartRef.current.y);

      // Distinguish vertical scroll vs horizontal model rotation
      if (!isIntentLockedRef.current && (dx > 7 || dy > 7)) {
        isIntentLockedRef.current = true;
        if (dy > dx) {
          // User is scrolling the page vertically: disable OrbitControls to yield to browser
          if (controlsRef.current) {
            controlsRef.current.enabled = false;
          }
        } else {
          // User is rotating horizontally: keep OrbitControls enabled
          if (controlsRef.current) {
            controlsRef.current.enabled = true;
          }
        }
      }
    };

    const handleTouchEnd = () => {
      touchStartRef.current = null;
      isIntentLockedRef.current = false;
      if (controlsRef.current) {
        controlsRef.current.enabled = true;
      }
    };

    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: true });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });
    el.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
      el.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        touchAction: 'pan-y'
      }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 0, 4.0], fov: 42 }}
        style={{
          background: '#d5dbd5',
          width: '100%',
          height: '100%',
          touchAction: 'pan-y'
        }}
        gl={{ antialias: true, preserveDrawingBuffer: true }}
      >
        {/* Isolated Studio Lighting Setup */}
        <ambientLight intensity={0.9} />
        <directionalLight
          position={[4, 6, 4]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />
        <directionalLight position={[-4, 3, -3]} intensity={0.4} color="#e0f0ff" />
        <directionalLight position={[0, -2, 4]} intensity={0.25} />

        <Suspense
          fallback={
            <Html center>
              <div
                style={{
                  fontFamily: 'sans-serif',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  color: '#000000',
                  textTransform: 'uppercase',
                  background: '#ffffff',
                  padding: '8px 16px',
                  border: '1px solid #000000'
                }}
              >
                LOADING 3D SPECIMEN...
              </div>
            </Html>
          }
        >
          {modelUrl ? (
            <ExternalGLBModel url={modelUrl} species={species} stage={stage} />
          ) : (
            <ProceduralPlantModel species={species} stage={stage} />
          )}
        </Suspense>

        {/* Studio Orbit Controls centered at [0, 0, 0] */}
        <OrbitControls
          ref={controlsRef}
          makeDefault
          target={[0, 0, 0]}
          enablePan={false}
          enableZoom={!isMobile}
          minDistance={2.0}
          maxDistance={7.0}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 1.75}
          rotateSpeed={0.7}
          zoomSpeed={0.8}
        />
      </Canvas>
    </div>
  );
};
