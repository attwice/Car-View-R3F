import * as THREE from 'three'
import { Suspense, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Stats, Loader, useCubeTexture } from '@react-three/drei'

import Fairlady from './Fairlady'
import Ground from './Ground'
import Effects from './Effects'
import Lights from './Lights'
import Background from './Background'
import ContactShadow from './ContactShadow'
import Titles from './Titles'

function EnvironmentComponent({ background = false }) {
  const { gl, scene } = useThree()
  const envMap = useCubeTexture(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'], { path: 'cube/' })
  useEffect(() => {
    const gen = new THREE.PMREMGenerator(gl)

    gen.compileEquirectangularShader()
    const hdrCubeRenderTarget = gen.fromCubemap(envMap)

    envMap.dispose()
    gen.dispose()

    if (background) scene.background = hdrCubeRenderTarget.texture
    scene.environment = hdrCubeRenderTarget.texture
    return () => (scene.environment = scene.background = null)
  }, [envMap])
  return null
}

export default function App() {
  return (
    <>
      <Titles />

      <Canvas
        dpr={[0.5, 1]}
        mode="concurrent"
        shadows
        camera={{
          fov: 50,
          near: 0.1,
          far: 10
        }}
        gl={{
          powerPreference: 'high-performance',
          alpha: false,
          antialias: false, // https://github.com/vanruesc/postprocessing/wiki/Antialiasing#multisample-antialiasing
          stencil: false,
          depth: false
        }}>
        <Stats />
        <Lights />
        <Background />
        <ContactShadow />

        <Suspense fallback={null}>
          <EnvironmentComponent />
          <Fairlady />
          <Ground />
          <Effects />
        </Suspense>
      </Canvas>

      <Loader />
    </>
  )
}
