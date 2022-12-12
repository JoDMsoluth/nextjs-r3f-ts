import {useSphere} from "@react-three/cannon";
import {useFrame, useThree} from "@react-three/fiber";
import {useEffect, useRef} from "react";
import {Vector3} from "three";
import {useKeyboard} from "../../utils/hooks/useKeyboard";

const JUMP_FORCE = 4;
const SPEED = 4;

export default function Player() {
  const {moveBackward, moveForward, moveLeft, moveRight, jump} = useKeyboard(); // + 기존에 actions로 통칭되던 요소를 개별요소를 직접 다 가져오도록 변경
  const {camera} = useThree();
  const [ref, api] = useSphere<THREE.Mesh>(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 0, 0],
  }));

  const vel = useRef([0, 0, 0]);

  useEffect(() => {
    api.velocity.subscribe((v) => (vel.current = v));
  }, [api.velocity]);

  const pos = useRef([0, 0, 0]);

  useEffect(() => {
    api.position.subscribe((p) => (pos.current = p));
  }, [api.position]);

  useFrame(() => {
    camera.position.copy(new Vector3(pos.current[0], pos.current[1], pos.current[2]));

    const direction = new Vector3();

    // z(정면)축 기준으로 이동 계산
    // 만약 앞+뒤가 동시에 눌리면 -를 통해 값을 0으로 만들어 이동하지 않음
    const frontVector = new Vector3(0, 0, (moveBackward ? 1 : 0) - (moveForward ? 1 : 0));

    // x축 기준 이동 계산
    const sideVector = new Vector3((moveLeft ? 1 : 0) - (moveRight ? 1 : 0), 0, 0);

    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation);

    // 이동 속도를 반영
    api.velocity.set(direction.x, vel.current[1], direction.z);

    // + if 제약조건에 Math.abs(vel.current[1]) < 0.05를 추가하자
    if (jump && Math.abs(vel.current[1]) < 0.05) {
      api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2]);
    }
  });

  return <mesh ref={ref}></mesh>;
}
