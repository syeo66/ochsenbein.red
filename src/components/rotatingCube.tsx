import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import * as THREE from 'three'

interface RotatingCubeProps {
  size: number
  className?: string
}
const RotatingCube: React.FC<RotatingCubeProps> = ({ size, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(65, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true })
    renderer.setSize(size, size)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const edges = new THREE.EdgesGeometry(geometry)
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x993333 }))

    scene.add(line)

    camera.position.z = 1.7

    const animate = () => {
      if (!canvasRef.current) {
        return
      }
      requestAnimationFrame(animate)
      line.rotation.x += 0.01
      line.rotation.y += 0.02
      renderer.render(scene, camera)
    }
    animate()
  }, [])

  return <canvas width={size} height={size} ref={canvasRef} className={className} />
}

export default RotatingCube
