import {nanoid} from "nanoid";
import create from "zustand";
import {isClient} from "../utils/lib/browser";

export interface CubeState {
  texture: string;
  cubes: {key: string; pos: [number, number, number]; texture: string}[];
  addCube: (x: number, y: number, z: number) => void;
  removeCube: (x: number, y: number, z: number) => void;
  setTexture: (texture: string) => void;
  saveWorld: () => void;
  resetWorld: () => void;
}

// + localStorege를 저장 및 가져오기 위해 선언
const getLocalStorage = (key: string) => (isClient ? JSON.parse(window.localStorage.getItem(key)!) : null);
const setLocalStorage = (key: string, value: any) =>
  isClient ? window.localStorage.setItem(key, JSON.stringify(value)) : null;

export const cubeStore = create<CubeState>()((set) => ({
  texture: "dirt",
  cubes: [getLocalStorage("cubes") || []],
  addCube: (x, y, z) => {
    set((prev) => ({
      cubes: [
        ...prev.cubes,
        {
          key: nanoid(),
          pos: [x, y, z],
          texture: prev.texture,
        },
      ],
    }));
  },
  // removeCube는 position 값을 받아와 filter를 이용해 삭제 대상 위치값을 가진 cubes 항목을 걸러준다.
  removeCube: (x, y, z) => {
    set((prev: CubeState) => ({
      cubes: prev.cubes.filter((cube) => {
        const [X, Y, Z] = cube.pos;
        return X !== x || Y !== y || Z !== z;
      }),
    }));
  },
  setTexture: (texture) => {
    set(() => ({
      texture,
    }));
  },
  // 저장 시 localStorege에 cubes 내용을 저장
  saveWorld: () => {
    set((prev) => {
      setLocalStorage("cubes", prev.cubes);
      return {};
    });
  },
  // reset시 현재 state를 초기화
  resetWorld: () => {
    set(() => ({
      cubes: [],
    }));
  },
}));
