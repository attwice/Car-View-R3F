import {
  Circle,
  useTexture,
} from '@react-three/drei'

import { useControls } from "leva"
import { Vector2 } from 'three'


export default function Ground() {

  const {
    normalScale,
    roughness,
    metalness,
  } = useControls('Ground', {
    "normalScale": 0.17,
    "roughness": 0.3,
    "metalness": 1,
  }, {
    collapsed: true
  })

  const groundColorBake = useTexture('/floor-bake.jpg')
  const groundNormal = useTexture('/floor-normal.jpg')
  const groundRoughness = useTexture('/floor-roughness.jpg')


  return (
    <Circle
      args={[4, 20]}
      receiveShadow
      rotation={[-Math.PI / 2, 0, 0]}
      // to avoid the contact shadow zfight
      position={[0, -0.001, 0]}

    >
      <meshStandardMaterial
        map={groundColorBake}
        normalMap={groundNormal}
        normalScale={new Vector2(normalScale, normalScale)}
        roughnessMap={groundRoughness}
        roughness={roughness}
        metalness={metalness}
        envMapIntensity={0.8}
        color="#999"
      />
    </Circle>
  )
}