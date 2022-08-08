import React, { useEffect, useRef } from 'react'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  EdgesGeometry,
  LineSegments,
  LineBasicMaterial,
} from 'three'

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

    const scene = new Scene()
    const camera = new PerspectiveCamera(65, 1, 0.1, 1000)
    const renderer = new WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true })
    renderer.setSize(size, size)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    const geometry = new BoxGeometry(1, 1, 1)
    const edges = new EdgesGeometry(geometry)
    const line = new LineSegments(edges, new LineBasicMaterial({ color: 0x993333 }))

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
