import {usePlane} from "@react-three/cannon";

import textures from "../../statics/Texture";
import {CubeState, cubeStore} from "../../store/cubeStore";

export default function Ground() {
  // usePlane을 통해 평면을 구성하고 ref를 통해 접근한다.
  const [ref] = usePlane<THREE.Mesh>(() => ({
    rotation: [-Math.PI / 2, 0, 0], // 평면의 기울기
    position: [0, 0, 0], // 평면의 위치값
  }));

  const [addCube] = cubeStore((state: CubeState) => [state.addCube]);

  if (textures.groundTexture) {
    textures.groundTexture.repeat.set(100, 100);
  }

  return (
    // 다음에 mesh, planeBufferGeometry, meshStandardMaterial는 three-types.d.ts에 정의되어 있다.
    <mesh
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        // 마우스로 좌표를 클릭하면 세밀한 소수점 단위의 좌표가 선택된다. 우리는 블록 단위로 좌표를 구하기 때문에 반올림 해서 x, y, z를 각각 추출한다.
        const [x, y, z] = Object.values(e.point).map((val) => Math.ceil(val));
        addCube(x, y, z);
      }}>
      {/* mesh는 3D 화면을 구성하는 물체이며 ref를 통해 cannon을 통해 구성한 평면의 물리적인 속성을 적용한다. //
      물체(mesh)는 부피(Geometry)와 질감(Material)의 정보로 구성된다. */}
      <planeBufferGeometry attach='geometry' args={[100, 100]} />
      {textures.groundTexture && <meshStandardMaterial attach='material' map={textures.groundTexture} />}
    </mesh>
  );
}
