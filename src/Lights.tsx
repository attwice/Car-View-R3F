import * as THREE from 'three'
import { useRef } from 'react'
import { useControls } from "leva"
import {
  useHelper,
} from '@react-three/drei'


export default function Lights() {


  const { 
    rectLightIntensity,

    decayF,
    angleF,
    distanceF,
    positionF,
    
    decayT,
    angleT,
    distanceT,
    positionT,
    
    decayRear,
    angleRear,
    distanceRear,
    positionRear,
  } = useControls('Lights', {
    rectLightIntensity: 0.5,

    decayF: 1,
    angleF: 0.71,
    distanceF: 1.8,
    positionF: [0.1, 0.2, 2.5],
    
    decayT: 5,
    angleT: 0.8,
    distanceT: 10,
    positionT: [0.1, 2.1, -0.2],
    
    decayRear: 1.2,
    angleRear: 0.59,
    distanceRear: 2.8,
    positionRear: [-0.2, 0.55, -3.03],
  }, {
    collapsed: true
  })



  // const directionalLightRef = useRef()
  // useHelper(directionalLightRef, THREE.DirectionalLightHelper)
  
  const spotLightRightRef = useRef()
  // useHelper(spotLightRightRef, THREE.SpotLightHelper)
  
  const spotLightFrontRef = useRef()
  // useHelper(spotLightFrontRef, THREE.SpotLightHelper)

  const spotLightTopRef = useRef()
  // useHelper(spotLightTopRef, THREE.SpotLightHelper)
  
  const spotLightRearRef = useRef()
  // useHelper(spotLightRearRef, THREE.SpotLightHelper)

  
  // const pointLightRef = useRef()
  // useHelper(pointLightRef, THREE.PointLightHelper, 'cyan')
  
  // const rectAreaLightRef = useRef()
  // useHelper(rectAreaLightRef, RectAreaLightHelper, 1.0, 5, 5, 'cyan')

  return (
    <>

      <spotLight
        name="front"
        ref={spotLightFrontRef}
        position={positionF}
        intensity={rectLightIntensity * 2}
        distance={distanceF}
        angle={angleF}
        decay={decayF}
        penumbra={1}
        color="white"
      />
      <spotLight
        name="top"
        ref={spotLightTopRef}
        position={positionT}
        intensity={rectLightIntensity * 2}
        distance={distanceT}
        angle={angleT}
        decay={decayT}
        penumbra={1}
        color="white"
        // castShadow
      />
      <spotLight
        name="rear"
        ref={spotLightRearRef}
        position={positionRear}
        intensity={rectLightIntensity }
        distance={distanceRear}
        angle={angleRear}
        decay={decayRear}
        penumbra={1}
        color="white"
        // castShadow
      />


      <hemisphereLight
        groundColor={new THREE.Color('#2c2c2c')}
        color={new THREE.Color('#fff')}
        intensity={0.333}
        position={[0, 50, 0]}
      />

      {/* <directionalLight
        position={[-8, 20, 8]}
        // shadow-camera-left={d * -1}
        // shadow-camera-bottom={d * -1}
        // shadow-camera-right={d}
        // shadow-camera-top={d}
        // shadow-camera-near={0.1}
        // shadow-camera-far={1500}
        // castShadow
      /> */}

      {/* <ambientLight intensity={0.08} /> */}
      {/* <pointLight 
        // ref={pointLightRef}
        intensity={1}
        position={[0, 3, 0]}
        color="red"
        distance={10}
      /> */}

      {/* <directionalLight position={[10, 10, 5]} intensity={1} /> */}
      {/* <directionalLight position={[-10, -10, -5]} intensity={1} /> */}
      {/* <spotLight ref={lightHelper} position={lightPosition} intensity={lightIntensity} color="white" /> */}
    </>
  )
}
