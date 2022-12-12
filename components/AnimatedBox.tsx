import {useHelper} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import {useRef} from "react";
import {BoxHelper} from "three";

interface Props {
  isTesting: boolean;
}
export default function AnimatedBox({isTesting}: Props) {
  const meshRef = useRef<THREE.Mesh>(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  isTesting ? useHelper(meshRef as any, BoxHelper, "blue") : null;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} scale={[0.5, 0.5, 0.5]}>
      <boxGeometry />
      <meshBasicMaterial color='royalblue' />
    </mesh>
  );
}
