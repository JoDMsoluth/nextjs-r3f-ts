import { Physics } from "@react-three/cannon";
import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import FPVCamera from "../components/FPVCamera";
import Ground from "../components/Ground/Ground";
import { Menu } from "../components/Menu/Menu";
import { Cubes } from "../components/Object/Cube/Cubes";
import Pterosaur from "../components/Object/Gltf/Pterosaur";
import Player from "../components/Player/Player";
import TextureSelector from "../components/Texture/TextureSelector";

export default function Home() {
  return (
    <div className="container">
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.5} />
        <FPVCamera />
        <Physics>
          {/* 물리적인 영향을 받으니 Physics 내부에 추가해준다. */}
          <Player />
          <Cubes />
          <Suspense fallback={null}>
            <Pterosaur position={[1, 1, 1]} />
          </Suspense>
          <Ground />
        </Physics>
      </Canvas>
      {/* 간단한 조준점을 추가하자 */}
      <div className="absolute centered cursor">+</div>
      <TextureSelector />
      <Menu />
    </div>
  );
}
