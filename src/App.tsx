import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three';
import { useGLTF, useFBX, PresentationControls, Environment, ContactShadows, Html } from '@react-three/drei'

export default function App() {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }} gl={{antialias: true}}>
      <ambientLight intensity={0.3} />
      <Light />
      <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        snap
        rotation={[0, 0.3, 0]}
        // polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
      >
        <Watch position={[0, 0.25, 0]} scale={4} />
      </PresentationControls>
      <ContactShadows rotation-x={Math.PI / 2} opacity={0.75} width={10} height={10} blur={2.6} far={2} />
      <Environment preset="city" />
    </Canvas>
  )
}

function Light() {
  const lightRef = useRef<any>();

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (!lightRef.current) return;
    lightRef.current.position.x = 10 * Math.sin(t / 0.5);
    lightRef.current.position.y = 20 * (1 + Math.cos(t / 0.5));
  })

  return <spotLight ref={lightRef} intensity={2} position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow />;
}

function Watch(props: any) {
  const ref = useRef<any>()
  const gltf = useGLTF('./fire.gltf') as any;
  console.log('scene', gltf);
  useFrame((state) => {
    const t = 0; // state.clock.getElapsedTime()
    ref.current!.rotation.x = -Math.PI / 1.75 + Math.cos(t / 4) / 8
    ref.current!.rotation.y = Math.sin(t / 4) / 8
    ref.current!.rotation.z = (1 + Math.sin(t / 1.5)) / 20
    ref.current!.position.y = (1 + Math.sin(t / 1.5)) / 10
  })
  return (
    <group ref={ref} {...props} dispose={null}>
      <primitive object={gltf.scene} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.2]} />
      {/* <mesh geometry={nodes.Scene} material={materials.FireExtinguisher}>
      </mesh> */}
      {/* <mesh castShadow receiveShadow geometry={nodes.Object006_watch_0.geometry} material={materials.watch} /> */}
    </group>
  )
}
