import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html, useProgress } from '@react-three/drei'

import randomColors from 'randomcolor'

import Model from './Model'
import { useThemeContext } from '../../hooks/useThemeContext'

function Loader () {
  const { progress } = useProgress()
  return <Html center style={{ height: '3px', width: progress, backgroundColor: 'black', borderRadius: '6px' }} />
}

const Scene = () => {
  const [coordX, setCoordX] = useState(0)
  const [coordY, setCoordY] = useState(0)
  const [color, setColor] = useState()

  const { isDark } = useThemeContext()

  const canvasRef = useRef()

  const onPointerMove = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()

    let x = (e.clientX / window.innerWidth) * 2 - 1
    let y = (e.clientY / window.innerHeight) * 1 - 0.5

    x -= ((rect.right - canvas.width / 2) / window.innerWidth) * 2 - 1
    y -= ((rect.top + canvas.height / 2) / window.innerHeight) - 0.5

    setCoordX(x)
    setCoordY(y)
  }

  useEffect(() => {
    window.addEventListener('pointermove', onPointerMove)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  useEffect(() => {
    setColor(randomColors({ luminosity: 'light', format: 'rgb' }))
  }, [])

  return (
    <Canvas
      frameloop='demand'
      camera={{ position: [0, 0, 10], fov: 3, near: 0.2 }}
      style={{
        backgroundColor: `${color}`,
        borderRadius: '20%',
        width: '350px',
        height: '350px',
        padding: '0',
        boxShadow: `0px 10px 15px -3px ${isDark ? 'rgba(255,255,255, 0.1)' : 'rgba(0,0,0,0.1)'}`
      }}
      ref={canvasRef}
    >

      <ambientLight intensity={1.25} />
      <ambientLight intensity={0.1} />
      <directionalLight intensity={0.4} />
      <Suspense fallback={<Loader />}>
        <mesh rotation={[coordY, coordX, 0]} rotateSpeed={1}>
          <Model position={[0, -1.7, 0]} />
        </mesh>
      </Suspense>
      <OrbitControls enableDamping={false} enableZoom={false} enableRotate={false} enablePan={false} autoRotate={false} rotateSpeed={0.5} />
    </Canvas>

  )
}

export default Scene
