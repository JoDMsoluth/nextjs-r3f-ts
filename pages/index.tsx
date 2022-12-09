import {Canvas} from "@react-three/fiber";
import AnimatedBox from "../components/AnimatedBox";
import CameraOrbitController from "../components/CameraOrbitController";

export default function Home() {
  return (
    <div className='container'>
      <Canvas>
        <CameraOrbitController />
        <ambientLight intensity={0.1} />
        <directionalLight color='red' position={[0, 0, 5]} />
        <AnimatedBox />
      </Canvas>
    </div>
  );
}
