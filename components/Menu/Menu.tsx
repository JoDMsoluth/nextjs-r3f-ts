import {cubeStore} from "../../store/cubeStore";

export const Menu = () => {
  const [saveWorld, resetWorld] = cubeStore((state) => [state.saveWorld, state.resetWorld]);

  return (
    <div className='menu absolute'>
      <button onClick={() => saveWorld()}>Save</button>
      <button onClick={() => resetWorld()}>Reset</button>
    </div>
  );
};
