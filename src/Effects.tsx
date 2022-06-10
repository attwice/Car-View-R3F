import * as THREE from 'three'
import { useControls } from 'leva'
import { KernelSize, BlendFunction, SMAAPreset, EdgeDetectionMode } from 'postprocessing'

import { EffectComposer, Bloom, SSAO, SMAA } from '@react-three/postprocessing'

export default function Effects() {
  const {
    ssaoLuminanceInfluence,
    ssaoRadius,
    ssaoBias,
    ssaoIntensity,
    ssaoOnly,
    ssaoColor
    // focusDistance,
    // focalLength,
    // bokehScale,
    // height,
    // blur,
  } = useControls(
    'Effects',
    {
      ssaoLuminanceInfluence: 0.2,
      ssaoRadius: 10,
      ssaoBias: 0,
      ssaoIntensity: 20,
      ssaoOnly: false,
      ssaoColor: '#797979'
      // focusDistance: 0,
      // focalLength: 0.01,
      // bokehScale: 2,
      // height: 480,
      // blur: 2
    },
    {
      collapsed: true
    }
  )

  return (
    <EffectComposer multisampling={4} disableNormalPass={false}>
      {/* <DepthOfField
        focusDistance={focusDistance}
        focalLength={focalLength}
        bokehScale={bokehScale}
        height={height}
        blendFunction={BlendFunction.Screen}
        blur={blur}
      /> */}

      <Bloom kernelSize={KernelSize.LARGE} luminanceThreshold={0.75} luminanceSmoothing={0.5} width={300} opacity={1} />

      {/* <SMAA edgeDetectionMode={EdgeDetectionMode.COLOR} preset={SMAAPreset.LOW} /> */}

      <SSAO
        blendFunction={ssaoOnly ? BlendFunction.NORMAL : BlendFunction.MULTIPLY} // Use NORMAL to see the effect
        luminanceInfluence={ssaoLuminanceInfluence} // how much the luminance of the scene influences the ambient occlusion
        radius={ssaoRadius} // occlusion sampling radius
        scale={0.5} // scale of the ambient occlusion
        bias={ssaoBias} // occlusion bias
        // @ts-ignore
        color={new THREE.Color(ssaoColor)}
        samples={30}
        rings={4}
        // @ts-ignore
        intensity={ssaoIntensity}
        distanceThreshold={1.0} // global distance threshold at which the occlusion effect starts to fade out. min: 0, max: 1
        distanceFalloff={0.0} // distance falloff. min: 0, max: 1
        rangeThreshold={0.5} // local occlusion range threshold at which the occlusion starts to fade out. min: 0, max: 1
        rangeFalloff={0.1} // occlusion range falloff. min: 0, max: 1
      />
    </EffectComposer>
  )
}
