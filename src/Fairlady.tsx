// Model from
// https://sketchfab.com/3d-models/nissan-fairlady-z-s30240z-1978-0d9286ebb8cc426e993e1d398b874a34

import { useControls } from 'leva'

import * as THREE from 'three'
import { useLayoutEffect, useRef, useEffect, useState } from 'react'
import { useGLTF, PerspectiveCamera, useAnimations, OrbitControls } from '@react-three/drei'

// @ts-ignore
// import {FlakesTexture} from 'three-stdlib'

export default function Fairlady() {
  const group = useRef()
  // @ts-ignore
  const { scene, nodes, materials, animations } = useGLTF('/Fairlady.glb')
  const { actions, mixer } = useAnimations(animations, group)

  const { useOrbitControls } = useControls(
    'Camera',
    {
      useOrbitControls: false
    },
    {
      collapsed: true
    }
  )

  const { color } = useControls(
    'Car',
    {
      color: '#fff'
    },
    {
      collapsed: true
    }
  )

  // const [texture] = useState(() => {
  //   const t = new THREE.CanvasTexture(new FlakesTexture(), THREE.UVMapping, THREE.RepeatWrapping, THREE.RepeatWrapping)
  //   t.repeat.set(56, 56)
  //   return t
  // })

  const paintMaterial = {
    color: new THREE.Color(color),
    emissive: new THREE.Color('#555'),
    emissiveIntensity: 0.1,
    envMapIntensity: 1,
    clearcoat: 1, // 0 - 1
    clearcoatRoughness: 0.1,
    metalness: 0.8,
    roughness: 0.3

    // normalMap: texture,
    // normalScale: new THREE.Vector2(0.02, 0.02),
    // 'normalMap-wrapS': THREE.RepeatWrapping,
    // 'normalMap-wrapT': THREE.RepeatWrapping,
    // 'normalMap-repeat': [30, 30],
    // 'normalMap-anisotropy': 16,
  }

  const sequence = ['CameraFar', 'swoop', 'CameraClose', 'wangus']

  useEffect(() => {
    const cameraSpeed = 1

    actions['CameraFar'].setDuration(9 * cameraSpeed)
    actions['CameraClose'].setDuration(9 * cameraSpeed)
    actions['swoop'].setDuration(11 * cameraSpeed)
    actions['wangus'].setDuration(9 * cameraSpeed)

    sequence.forEach((s) => {
      actions[s].setLoop(THREE.LoopOnce, 0)
    })

    actions[sequence[0]].play()

    function playNext(finishedClipName) {
      const finishedClipNameIndex = sequence.indexOf(finishedClipName)
      const nextClip = sequence[finishedClipNameIndex + 1] || sequence[0]
      actions[nextClip].play()
      actions[finishedClipName].stop().reset()
    }

    mixer.addEventListener('finished', (e) => {
      const { name } = e.action.getClip()
      playNext(name)
    })
  }, [])

  useEffect(() => {
    if (useOrbitControls) {
      sequence.forEach((s) => {
        actions[s].stop().reset()
      })
    } else {
      actions[sequence[0]].play()
    }
  }, [useOrbitControls])

  useLayoutEffect(() => {
    Object.assign(nodes['ext-chromes'].material, {
      metalness: 1,
      roughness: 0.15,
      envMapIntensity: 0.3
    })

    // headlamps
    Object.assign(materials['Material.009'], {
      envMapIntensity: 4,
      metalness: 0.36,
      roughness: 0.14
    })

    Object.assign(nodes['paint-body'].material, paintMaterial)

    // ext lights
    Object.assign(materials['Material.006'], {
      clearCoat: 1,
      clearcoatRoughness: 0,
      envMapIntensity: 0.6,
      metalness: 0.0,
      roughness: 0.1
    })

    // rims
    const rimMaterial = {
      metalness: 0.8,
      roughness: 0.15,
      color: new THREE.Color('#555')
    }
    Object.assign(materials['Material.023'], rimMaterial)
    Object.assign(nodes['mags-rear'].material, rimMaterial)

    // brake discs
    Object.assign(materials['Material.043'], {
      metalness: 0.5,
      roughness: 0.2,
      color: new THREE.Color('#2c2c2c')
    })

    Object.assign(nodes['tyres-rear'].material, {
      metalness: 0.1,
      roughness: 0.7,
      envMapIntensity: 0.5
    })

    // glass
    Object.assign(materials['Material.003'], {
      color: new THREE.Color('#333'),
      clearCoat: 1,
      clearcoatRoughness: 0,
      envMapIntensity: 0.7,
      metalness: 0.7,
      roughness: 0,
      opacity: 0.4,
      transparent: true
    })
  }, [scene, nodes, materials])

  const myCamera = useRef()

  return (
    <group ref={group} dispose={null} position={[0, -0.005, 0]}>
      {useOrbitControls && (
        <OrbitControls
          camera={myCamera.current}
          enableZoom
          enabled={useOrbitControls}
          minDistance={0.5}
          maxDistance={4}
          maxPolarAngle={Math.PI * 0.45}
          minPolarAngle={Math.PI * 0.1}
        />
      )}

      <PerspectiveCamera
        ref={myCamera}
        name="Camera_Orientation"
        makeDefault={useOrbitControls}
        far={10}
        near={0.1}
        fov={40}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-0.56, 0.27, 2.53]}
      />

      <group name="Scene">
        <group name="Camera" position={[-0.56, 0.27, 2.53]} rotation={[1.59, 0.07, 0.4]}>
          <PerspectiveCamera name="Camera_Orientation" makeDefault={!useOrbitControls} far={10} near={0.1} fov={40} rotation={[-Math.PI / 2, 0, 0]} />
        </group>

        <mesh
          name="brake-caliper-front"
          castShadow
          receiveShadow
          geometry={nodes['brake-caliper-front'].geometry}
          material={nodes['brake-caliper-front'].material}
          position={[-1.47, -0.5, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <mesh
          name="brake-disc-front"
          castShadow
          receiveShadow
          geometry={nodes['brake-disc-front'].geometry}
          material={nodes['brake-disc-front'].material}
          position={[-1.47, -0.5, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <mesh
          name="brake-inner-front"
          castShadow
          receiveShadow
          geometry={nodes['brake-inner-front'].geometry}
          material={nodes['brake-inner-front'].material}
          position={[-1.47, -0.5, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <group name="mag-lugs-front" position={[-1.47, -0.5, -0.74]} rotation={[-1.57, 0, 0]}>
          <mesh name="Object_27001" castShadow receiveShadow geometry={nodes.Object_27001.geometry} material={nodes.Object_27001.material} />
          <mesh name="Object_27001_1" castShadow receiveShadow geometry={nodes.Object_27001_1.geometry} material={nodes.Object_27001_1.material} />
        </group>
        <mesh
          name="mag-rim-front"
          castShadow
          receiveShadow
          geometry={nodes['mag-rim-front'].geometry}
          material={nodes['mag-rim-front'].material}
          position={[-1.47, -0.5, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <mesh
          name="mags-front"
          castShadow
          receiveShadow
          geometry={nodes['mags-front'].geometry}
          material={nodes['mags-front'].material}
          position={[-1.47, -0.5, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <mesh
          name="tyres-front"
          castShadow
          receiveShadow
          geometry={nodes['tyres-front'].geometry}
          material={nodes['tyres-rear'].material}
          position={[-1.47, -0.5, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <mesh
          name="brake-disc-rear"
          castShadow
          receiveShadow
          geometry={nodes['brake-disc-rear'].geometry}
          material={nodes['brake-disc-rear'].material}
          position={[-1.47, -0.5, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <mesh
          name="brake-caliper-rear"
          castShadow
          receiveShadow
          geometry={nodes['brake-caliper-rear'].geometry}
          material={nodes['brake-caliper-rear'].material}
          position={[-1.47, -0.5, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <mesh
          name="brake-inner-rear"
          castShadow
          receiveShadow
          geometry={nodes['brake-inner-rear'].geometry}
          material={nodes['brake-inner-rear'].material}
          position={[-1.47, -0.5, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <group name="mag-lugs-rear" position={[-1.47, -0.5, -0.74]} rotation={[-1.57, 0, 0]}>
          <mesh name="Object_27" castShadow receiveShadow geometry={nodes.Object_27.geometry} material={nodes.Object_27.material} />
          <mesh name="Object_27_1" castShadow receiveShadow geometry={nodes.Object_27_1.geometry} material={nodes.Object_27_1.material} />
        </group>
        <mesh
          name="mag-rim-rear"
          castShadow
          receiveShadow
          geometry={nodes['mag-rim-rear'].geometry}
          material={nodes['mag-rim-rear'].material}
          position={[-1.47, -0.5, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <mesh
          name="mags-rear"
          castShadow
          receiveShadow
          geometry={nodes['mags-rear'].geometry}
          material={nodes['mags-rear'].material}
          position={[-1.47, -0.5, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <mesh
          name="tyres-rear"
          castShadow
          receiveShadow
          geometry={nodes['tyres-rear'].geometry}
          material={nodes['tyres-rear'].material}
          position={[-1.47, -0.5, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <mesh
          name="int-airfresh"
          castShadow
          receiveShadow
          geometry={nodes['int-airfresh'].geometry}
          material={materials['Material.026']}
          position={[-1.47, -0.47, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <mesh
          name="badges"
          castShadow
          receiveShadow
          geometry={nodes.badges.geometry}
          material={materials['Material.024']}
          position={[-1.47, -0.47, -0.74]}
          rotation={[-1.57, 0, 0]}
        />

        <mesh
          name="enginecover"
          castShadow
          receiveShadow
          geometry={nodes.enginecover.geometry}
          material={materials['Material.012']}
          position={[-1.47, -0.47, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <mesh
          name="ext-lights"
          castShadow
          receiveShadow
          geometry={nodes['ext-lights'].geometry}
          material={materials['Material.006']}
          position={[-1.47, -0.47, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <mesh
          name="int-fireext"
          castShadow
          receiveShadow
          geometry={nodes['int-fireext'].geometry}
          material={materials['Material.028']}
          position={[-1.47, -0.47, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <mesh
          name="underneath"
          castShadow
          receiveShadow
          geometry={nodes.underneath.geometry}
          material={materials['Material.030']}
          position={[-1.47, -0.47, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <mesh
          name="side-badges"
          castShadow
          receiveShadow
          geometry={nodes['side-badges'].geometry}
          material={materials['Material.029']}
          position={[-1.47, -0.47, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <mesh
          name="glass"
          castShadow
          receiveShadow
          geometry={nodes.glass.geometry}
          material={materials['Material.003']}
          position={[-1.47, -0.47, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <mesh
          name="headlamps"
          castShadow
          receiveShadow
          geometry={nodes.headlamps.geometry}
          material={materials['Material.009']}
          position={[-1.47, -0.47, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <mesh
          name="int-instrument-dials"
          castShadow
          receiveShadow
          geometry={nodes['int-instrument-dials'].geometry}
          material={materials['Material.048']}
          position={[-1.47, -0.47, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <group name="int-chromes" position={[-1.47, -0.47, -0.74]} rotation={[-1.57, 0, 0]}>
          <mesh name="Object_20" castShadow receiveShadow geometry={nodes.Object_20.geometry} material={materials['Material.007']} />
          <mesh name="Object_20_1" castShadow receiveShadow geometry={nodes.Object_20_1.geometry} material={nodes.Object_20_1.material} />
        </group>
        <mesh
          name="int-floors"
          castShadow
          receiveShadow
          geometry={nodes['int-floors'].geometry}
          material={materials['Material.034']}
          position={[-1.47, -0.47, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <mesh
          name="int-metals"
          castShadow
          receiveShadow
          geometry={nodes['int-metals'].geometry}
          material={materials['Material.025']}
          position={[-1.47, -0.47, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <mesh
          name="ext-plastics"
          castShadow
          receiveShadow
          geometry={nodes['ext-plastics'].geometry}
          material={nodes['ext-plastics'].material}
          position={[-1.47, -0.47, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <mesh
          name="int-plastics"
          castShadow
          receiveShadow
          geometry={nodes['int-plastics'].geometry}
          material={materials['Material.016']}
          position={[-1.47, -0.47, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <mesh
          name="plates"
          castShadow
          receiveShadow
          geometry={nodes.plates.geometry}
          material={materials['plate_d-dds']}
          position={[-1.47, -0.47, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <mesh
          name="rollcage"
          castShadow
          receiveShadow
          geometry={nodes.rollcage.geometry}
          material={materials['Material.039']}
          position={[-1.47, -0.47, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <mesh
          name="seatbelts"
          castShadow
          receiveShadow
          geometry={nodes.seatbelts.geometry}
          material={materials['Material.013']}
          position={[-1.47, -0.47, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <mesh
          name="speedo-dials"
          castShadow
          receiveShadow
          geometry={nodes['speedo-dials'].geometry}
          material={materials['Material.046']}
          position={[-1.47, -0.47, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <mesh
          name="stereo-lower"
          castShadow
          receiveShadow
          geometry={nodes['stereo-lower'].geometry}
          material={materials['Material.019']}
          position={[-1.47, -0.47, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <mesh
          name="stereo-upper"
          castShadow
          receiveShadow
          geometry={nodes['stereo-upper'].geometry}
          material={materials['Material.017']}
          position={[-1.47, -0.47, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <mesh
          name="ext-chromes"
          castShadow
          receiveShadow
          geometry={nodes['ext-chromes'].geometry}
          material={nodes['ext-chromes'].material}
          position={[-1.47, -0.47, -0.74]}
          rotation={[-1.57, 0, 0]}
        />
        <mesh
          name="int-instrument-backs"
          castShadow
          receiveShadow
          geometry={nodes['int-instrument-backs'].geometry}
          material={nodes['int-instrument-backs'].material}
          position={[-1.47, -0.47, -0.74]}
          rotation={[-1.57, 0, 0]}
        />

        <mesh
          name="paint-body"
          castShadow
          receiveShadow
          geometry={nodes['paint-body'].geometry}
          // material={nodes['paint-body'].material}
          position={[-1.47, -0.47, -0.74]}
          rotation={[-1.57, 0, 0]}>
          <meshPhysicalMaterial {...paintMaterial} />
        </mesh>
        <mesh
          name="paint-spoiler"
          castShadow
          receiveShadow
          geometry={nodes['paint-spoiler'].geometry}
          // material={nodes['paint-spoiler'].material}
          position={[-1.47, -0.47, -0.74]}
          rotation={[-1.57, 0, 0]}>
          <meshPhysicalMaterial {...paintMaterial} />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/Fairlady.glb')
