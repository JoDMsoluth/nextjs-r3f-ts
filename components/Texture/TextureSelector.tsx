import {useState, useEffect} from "react";
import images from "../../statics/images/images";
import {cubeStore} from "../../store/cubeStore";
import {useKeyboard} from "../../utils/hooks/useKeyboard";

// TextureSelector를 그릴때 내부 구성 Texture만큼 반복하기 위해 선언

export default function TextureSelector() {
  // TextrueSelector가 보이는지 여부를 관리하는 state
  const [visible, setVisible] = useState(false);

  // 현재 활성화 textrue를 구분하고 선택한 texture를 반영하기 위해 사용
  const [activeTexture, setTexture] = cubeStore((state) => [state.texture, state.setTexture]);

  // 특정 Texture에 해당되는 num(숫자)가 눌렀는지 여부를 담은 상태값
  const {dirt, grass, glass, wood, log} = useKeyboard();

  // 만약 Texture 상태값이 변경(num을 누른 경우)되면 발생하는 Effect
  useEffect(() => {
    const textures = {
      dirt,
      grass,
      glass,
      wood,
      log,
    };
    // textures 오브젝트를 검사해 각 textures 요소 중 값이 true인 경우를 반환
    // 즉, useKeyboard를 통해 input이 발생해 상태가 true가 된 texture가 반환
    const pressedTexture = Object.entries(textures).find(([k, v]) => v);
    if (pressedTexture) {
      // 해당되는(눌려서 true가 된) texture의 key(예: dirt)를 현재 Texture로 설정
      setTexture(pressedTexture[0]);
    }
  }, [setTexture, dirt, grass, glass, wood, log]);

  // num을 통해 Textrue를 선택한 순간 화면에 잠시동안 TextureSelector가 보이게 하기 위한 Effect
  useEffect(() => {
    // 비동기 처리를 이용해 2초후에 visible을 false로 설정한다.
    const visibbilityTimeout = setTimeout(() => {
      setVisible(false);
    }, 2000);
    // visible을 true로 변경시킨다. 2초뒤 setTimeout의 callback이 실행되면, 다시 false가 된다.
    setVisible(true);
    return () => {
      // 2초가 지나기 전에 useEffect가 다시 발생하면 setTimeout이 중첩되어 실행됨
      // 만약 useEffect가 다시 발생하면 clearTimeout을 이용해 setTimeout을 제거해 시간마다 1번의 실행을 보증
      clearTimeout(visibbilityTimeout);
    };
  }, [activeTexture]);

  return (
    // visible 상태에 따라서 TextureSelector를 보이게함
    <>
      {visible && (
        <div className='absolute texture-selector'>
          {/* // images 요소만큼 반복해 Texture 이미지를 가져옴 */}
          {Object.entries(images).map(([k, src]) => {
            return <img key={k} src={src} alt={k} className={`${k === activeTexture ? "active" : ""}`} />;
          })}
        </div>
      )}
    </>
  );
}
