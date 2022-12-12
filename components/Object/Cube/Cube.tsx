import {Triplet, useBox} from "@react-three/cannon";
import {useState} from "react";

import textures from "../../../statics/Texture";
import {cubeStore} from "../../../store/cubeStore";

interface Props {
  position?: Triplet;
  texture: string;
}

export default function Cube({position, texture}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const [ref] = useBox<THREE.Mesh>(() => ({
    type: "Static",
    position,
  }));

  const [addCube, removeCube] = cubeStore((state) => [state.addCube, state.removeCube]);

  const activeTexture = textures[`${texture}Texture`];

  return (
    <mesh
      // 현재 물체에 마우스 Pointer가 움직이는지
      onPointerMove={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      // 현재 물체에 마우스 Pointer가 벗어났는지
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        // 현재 물체의 이벤트가 발생한 면 Number를 가져온다.
        if (!e.faceIndex) {
          return;
        }

        const clickedFace = Math.floor(e.faceIndex / 2);

        // 물체의 위치값을 가져온다.
        const {x, y, z} = ref.current!.position;
        // 만약 이벤트가 alt가 눌린채로 발생했다면 현재 이벤트 발생 위치의 cube를 지워준다.
        if (e.altKey) {
          removeCube(x, y, z);
          return;
          // 이후부터는 이벤트가 발생한 면 Number에 따라서 각 위치에 맞춰 addCube를 발생시킨다.
        } else if (clickedFace === 0) {
          addCube(x + 1, y, z);
          return;
        } else if (clickedFace === 1) {
          addCube(x - 1, y, z);
          return;
        } else if (clickedFace === 2) {
          addCube(x, y + 1, z);
          return;
        } else if (clickedFace === 3) {
          addCube(x, y - 1, z);
          return;
        } else if (clickedFace === 4) {
          addCube(x, y, z + 1);
          return;
        } else if (clickedFace === 5) {
          addCube(x, y, z - 1);
          return;
        }
      }}
      ref={ref}>
      <boxBufferGeometry attach='geometry' />
      <meshStandardMaterial
        // 만약 물체가 Hover중 이라면, 질감에 색상을 추가한다.
        color={isHovered ? "gray" : "white"}
        map={activeTexture}
        // 투명도 적용을 위해 transparent 속성을 true로 설정
        transparent={true}
        // 만약 cube의 질감이 유리라면, opacity 값을 0.6으로 설정
        opacity={texture === "glass" ? 0.6 : 1}
        attach='material'
      />
    </mesh>
  );
}
