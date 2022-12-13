import * as THREE from "three";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import { useEffect, useMemo, useState } from "react";

export default function Pterosaur(props: JSX.IntrinsicElements["mesh"]) {
  const { scene, animations } = useGLTF(
    "/gltf/dsungaripterus/source/model.gltf"
  );

  const { ref, actions, names, ...gldd } = useAnimations(animations);

  const [index] = useState(1);

  const path = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(2000, -1100, -3000),
        new THREE.Vector3(-500, -900, 500),
        new THREE.Vector3(-1500, -800, -1500),
        new THREE.Vector3(1500, -700, -1500),

        new THREE.Vector3(1500, -600, 1500),
        new THREE.Vector3(-1500, -500, 1500),
        new THREE.Vector3(-1500, -400, -1500),
        new THREE.Vector3(1500, -300, -1500),

        new THREE.Vector3(1500, -200, 1500),
        new THREE.Vector3(-1500, 1500, 3500),
      ]),
    []
  );

  const points = path.getPoints(1000);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0x000000 });
  const pathLine = new THREE.Line(geometry, material);

  const { scene: renderrer } = useThree();

  const clock = new THREE.Clock();
  const time = clock.oldTime;

  renderrer.add(pathLine);

  // useFrame((state, delta) => {
  //   const currentPosition = new THREE.Vector3();
  //   const nextPosition = new THREE.Vector3(3);

  //   path.getPointAt(time % 1, currentPosition);
  //   path.getPointAt((time + 0.001) % 1, nextPosition);

  //   ref.current?.copy(new THREE.Vector3(currentPosition));
  // });

  useEffect(() => {
    actions[names[index]]?.reset().fadeIn(0.5).play();

    return () => {
      actions[names[index]]?.fadeOut(0.5);
    };
  }, [index, actions, names]);

  return (
    <mesh ref={ref as any} {...props}>
      <primitive object={scene} />
    </mesh>
  );
}
