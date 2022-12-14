import * as THREE from "three";
import { CatmullRomLine, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import { useEffect, useMemo, useRef, useState } from "react";

export default function Pterosaur({
  src,
  route,
  ...props
}: JSX.IntrinsicElements["mesh"] & { route: THREE.Vector3[]; src: string }) {
  const group = useRef<THREE.Group>(new THREE.Group());
  const { scene, animations } = useGLTF(src);

  const { ref, actions, names } = useAnimations(animations);

  const [index] = useState(1);

  const path = useMemo(() => new THREE.CatmullRomCurve3(route), [route]);

  useFrame((state, delta) => {
    const { clock } = state;
    const time = clock.oldTime * 0.00001;

    const currentPosition = new THREE.Vector3();
    const nextPosition = new THREE.Vector3();

    path.getPointAt(time % 1, currentPosition);
    path.getPointAt((time + 0.001) % 1, nextPosition);

    ref.current?.position.copy(currentPosition);

    ref.current?.lookAt(nextPosition.x, nextPosition.y, nextPosition.z);
  });

  useEffect(() => {
    actions[names[index]]?.reset().fadeIn(0.5).play();

    return () => {
      actions[names[index]]?.fadeOut(0.5);
    };
  }, [index, actions, names]);

  return (
    <>
      <group ref={group} rotation={[0, -Math.PI / 2, 0]}>
        <group ref={ref as any}>
          <primitive
            object={scene}
            {...props}
            rotation={[0, -Math.PI / 2, 0]}
          />
        </group>
      </group>
    </>
  );
}
