import * as THREE from "three";
import {CatmullRomLine, useAnimations, useGLTF} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";

import {useEffect, useMemo, useRef, useState} from "react";

export default function Pterosaur(props: JSX.IntrinsicElements["mesh"]) {
  const group = useRef<THREE.Group>(new THREE.Group());
  const {scene, animations} = useGLTF("/gltf/dsungaripterus/source/model.gltf");

  const {ref, actions, names} = useAnimations(animations);

  const [index] = useState(1);

  const path = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-8, 6, -5),
        new THREE.Vector3(-2, 3, 7),
        new THREE.Vector3(6, 4.5, 3),
        new THREE.Vector3(0.5, 8, -1),
      ]),
    []
  );

  useFrame((state, delta) => {
    const {clock} = state;
    const time = clock.oldTime;

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
      <CatmullRomLine
        points={[
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(-8, 6, -5),
          new THREE.Vector3(-2, 3, 7),
          new THREE.Vector3(6, 4.5, 3),
          new THREE.Vector3(0.5, 8, -1),
        ]}
        closed={false}
        curveType={"centripetal"}
        tension={0.5}
        segments={20}
        color={"red"}
        lineWidth={3}
        dashed={true}
      />
      <group ref={group} dispose={null}>
        <group ref={ref as any}>
          <primitive object={scene} {...props} />
        </group>
      </group>
    </>
  );
}
