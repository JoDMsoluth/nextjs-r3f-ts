import { useAnimations, useGLTF } from "@react-three/drei";

import { useEffect, useState } from "react";

export default function Pterosaur(props: JSX.IntrinsicElements["mesh"]) {
  const { scene, animations } = useGLTF(
    "/gltf/dsungaripterus/source/model.gltf"
  );

  const { ref, actions, names } = useAnimations(animations);

  const [index] = useState(1);

  console.log(names);

  useEffect(() => {
    actions[names[index]]?.reset().fadeIn(0.5).play();

    return () => {
      actions[names[index]]?.fadeOut(0.5);
    };
  }, [index, actions, names]);

  return (
    <mesh ref={ref as any} {...props} scale={0.1}>
      <primitive object={scene} />
    </mesh>
  );
}
