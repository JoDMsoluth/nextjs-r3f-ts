import { NearestFilter, RepeatWrapping, Texture, TextureLoader } from 'three' // 이미지 파일을 Texture로 변환하기 위한 기능
import { isClient } from '../utils/lib/browser'
import images from './images/images'

console.log('images', images)
// load(images.)를 호출해 이미지를 할당하고 만들어진 texture 결과를 변수에 할당
const dirtTexture = isClient ? new TextureLoader().load(images.dirtImg) : null
const logTexture = isClient ? new TextureLoader().load(images.logImg) : null
const grassTexture = isClient ? new TextureLoader().load(images.grassImg) : null
const glassTexture = isClient ? new TextureLoader().load(images.glassImg) : null
const woodTexture = isClient ? new TextureLoader().load(images.woodImg) : null
const groundTexture = isClient
  ? new TextureLoader().load(images.grassImg)
  : null

if (isClient) {
  // wrap은 텍스쳐가 래핑되는 방식을 지정하며, S는 수평이자 U, T는 수직이자 V를 뜻한다
  // UV는 2차원 그림을 3차원 모델로 만드는 UV 매핑을 의미한다.
  dirtTexture!.magFilter = NearestFilter
  logTexture!.magFilter = NearestFilter
  grassTexture!.magFilter = NearestFilter
  glassTexture!.magFilter = NearestFilter
  woodTexture!.magFilter = NearestFilter
  groundTexture!.magFilter = NearestFilter
  groundTexture!.wrapS = RepeatWrapping
  groundTexture!.wrapT = RepeatWrapping
}

const textures: { [k: string]: Texture | null } = {
  dirtTexture,
  logTexture,
  grassTexture,
  glassTexture,
  woodTexture,
  groundTexture,
}

export default textures
