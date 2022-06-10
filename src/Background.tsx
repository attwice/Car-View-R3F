import * as THREE from 'three'

// import glsl from "babel-plugin-glsl/macro"
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { useControls } from 'leva'

const ColorMaterial = shaderMaterial(
  {
    depthTest: false, // exclude this material from the effect composer, else its grainy af
    side: THREE.BackSide,
    topColor: new THREE.Color('#2c2c2c'),
    bottomColor: new THREE.Color('#000')
  },
  // the tag is optional, it allows the VSC to syntax highlibht and lint glsl,
  // also allows imports and other things
  `varying vec3 vWorldPosition;
      void main() {
          vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }`,
  `uniform vec3 topColor;
      uniform vec3 bottomColor;
      varying vec3 vWorldPosition;
      void main() {
          float h = normalize( vWorldPosition).y - 0.05; // midpoint of gradient is slighty above the horizon
          gl_FragColor = vec4( mix( bottomColor, topColor, max( h, 0.0 ) ), 1.0 );
      }`
)

extend({ ColorMaterial })

export default function Background() {
  const { fogNear, fogFar, topColor, bottomColor } = useControls(
    'Background',
    {
      fogNear: 4.5,
      fogFar: 7.6,
      topColor: '#bebebe',
      bottomColor: '#000'
    },
    {
      collapsed: true
    }
  )

  return (
    <>
      <color attach="background" args={['#010101']} />
      <fog attach="fog" args={['#010101', fogNear, fogFar]} />

      <mesh>
        <sphereGeometry args={[5, 32, 10]} />
        <colorMaterial topColor={new THREE.Color(topColor)} bottomColor={new THREE.Color(bottomColor)} />
      </mesh>
    </>
  )
}
