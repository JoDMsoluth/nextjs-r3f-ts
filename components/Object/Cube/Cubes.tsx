import {cubeStore} from "../../../store/cubeStore";

import Cube from "./Cube";

export const Cubes = () => {
  // 전역으로 관리되고 있는 cubes를 가져온다.
  const [cubes] = cubeStore((state) => [state.cubes]);
  // 현재 등록된 cubes 만큼 반복하며 물체 Cube를 그려준다.
  return (
    <>
      {cubes.map(({key, pos, texture}) => {
        return <Cube key={key} position={pos} texture={texture} />;
      })}
    </>
  );
};
