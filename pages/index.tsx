import {PerspectiveCamera, Stats} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import AnimatedBox from "../components/AnimatedBox";
import CameraOrbitController from "../components/CameraOrbitController";

export default function Home() {
  const testing = true;

  return (
    <div className='container'>
      <Canvas>
        <PerspectiveCamera makeDefault />
        {testing ? <Stats /> : null}
        {testing ? <axesHelper args={[2]} /> : null}
        {testing ? <gridHelper args={[10, 10]} /> : null}
        <CameraOrbitController />
        <ambientLight intensity={0.1} />
        <directionalLight color='red' position={[0, 0, 5]} />
        <AnimatedBox isTesting={testing} />
      </Canvas>
    </div>
  );
}
