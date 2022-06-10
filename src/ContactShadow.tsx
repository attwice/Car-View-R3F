import { ContactShadows} from '@react-three/drei'
import { useControls } from "leva"

export default function ContactShadow() {

  const {
    contactShadowOpacity,
    contactShadowBlur,
    radius,
  } = useControls('ContactShadow', {
    "contactShadowOpacity": 0.9,
    "contactShadowBlur": 0.5,
    "radius": 6,
  }, {
    collapsed: true
  })

  return (
    <ContactShadows
      rotation-x={Math.PI / 2}
      opacity={contactShadowOpacity}
      width={(radius * 2) + 0}
      height={(radius * 2) + 0}
      blur={contactShadowBlur}
      far={25}
      resolution={512}

    />
  )
}
