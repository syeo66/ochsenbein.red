import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  filter: blur(15px);
`

interface Ball {
  posX: number
  posY: number
  posZ: number
  vX: number
  vY: number
  vZ: number
  aX: number
  aY: number
  aZ: number
  mass: number
  color: string
}

let balls: Ball[] = [...Array(50)].map(() => ({
  posX: Math.random() * window.innerWidth,
  posY: Math.random() * window.innerHeight,
  posZ: Math.random() * window.innerWidth,
  vX: Math.random() * 50 - 25,
  vY: Math.random() * 50 - 25,
  vZ: 0,
  aX: 0,
  aY: 0,
  aZ: 0,
  mass: Math.random() * 6800,
  color: `rgba(${Math.random() * 255},${Math.random() * 20},${Math.random() * 128},0.1)`,
}))

interface UpdateInput {
  passed: number
  width?: number
  height?: number
  balls: Ball[]
}
type UpdateFunction = (input: UpdateInput) => Ball[]

const update: UpdateFunction = ({ balls, passed, width, height }) => {
  return updatePositionVectors({
    balls: updateVelocityVectors({
      balls: updateAccelerationVectors({ balls, passed, width, height }),
      width,
      height,
      passed,
    }),
    passed,
    width,
    height,
  })
}

const updateAccelerationVectors: UpdateFunction = ({ balls, passed }) => {
  return balls.map((ball) => ball)
}

const updateVelocityVectors: UpdateFunction = ({ balls, passed }) => {
  return balls.map(({ posX, posY, posZ, vX, vY, vZ, aX, aY, aZ, mass, color }) => {
    vX += aX * passed
    vY += aY * passed
    vZ += aZ * passed

    if (posX >= window.innerWidth || posX <= 0) {
      vX = -vX
    }
    if (posY >= window.innerHeight || posY <= 0) {
      vY = -vY
    }
    if (posX < 0) {
      posX = 1
    }
    if (posY < 0) {
      posY = 1
    }

    if (posX > window.innerWidth) {
      posX = window.innerWidth - 1
    }
    if (posY > window.innerHeight) {
      posY = window.innerHeight - 1
    }

    return { posX, posY, posZ, vX, vY, vZ, aX, aY, aZ, mass, color }
  })
}

const updatePositionVectors: UpdateFunction = ({ balls, passed, width, height }) => {
  if (!passed) {
    return balls
  }

  const [x, y, z] = balls.reduce(
    (acc, ball) => {
      const [x, y, z] = acc
      return [x + ball.posX, y + ball.posY, z + ball.posZ]
    },
    [0, 0, 0]
  )
  const [cx, cy, cz] = [x / balls.length, y / balls.length, z / balls.length]

  return balls.map(({ posX, posY, posZ, vX, vY, vZ, aX, aY, aZ, mass, color }) => {
    posX += vX * passed
    posY += vY * passed
    posZ += vZ * passed

    posX += -cx + window.innerWidth / 2
    posY += -cy + window.innerHeight / 2
    posZ += -cz

    return { posX, posY, posZ, vX, vY, vZ, aX, aY, aZ, mass, color }
  })
}

interface DrawInput {
  canvas: HTMLCanvasElement | null
  balls: Ball[]
}
type DrawFunction = (input: DrawInput) => void

const draw: DrawFunction = ({ canvas, balls }) => {
  if (canvas === null) {
    return
  }
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }

  ctx.clearRect(0, 0, canvas.width || 100, canvas.height || 100)

  balls
    .slice(0, Math.ceil(balls.length * Math.min(1, canvas.width / 1024)))
    .forEach(({ posX, posY, mass, color }, i) => {
      ctx.fillStyle = color
      ctx.strokeStyle = color
      ctx.beginPath()
      const radius = Math.max(3, Math.sqrt(mass) * 0.5)
      ctx.ellipse(posX, posY, radius * 2, radius * 2, 0, 0, 2 * Math.PI)
      ctx.fill()
      ctx.closePath()
    })
}

const BackgroundAnimation = () => {
  const animationId = useRef<number | null>(null)
  const canvas = useRef<HTMLCanvasElement | null>(null)
  const [, setCanvasSize] = useState({ width: 0, height: 0 })
  const [isRunning, setIsRunning] = useState(false)

  const setCanvas = useCallback((c) => {
    canvas.current = c
    if (c === null) {
      setCanvasSize({ width: 0, height: 0 })
      return
    }
    setCanvasSize({ width: c.width, height: c.height })
  }, [])

  const loop = useCallback(
    (() => {
      if (isRunning) {
        return () => {}
      }

      let lastTick = 0

      return (timeStamp: number) => {
        const secondsPassed = (timeStamp - lastTick) / 1000
        lastTick = timeStamp
        balls = update({
          passed: secondsPassed,
          width: canvas.current?.width,
          height: canvas.current?.height,
          balls: balls,
        })
        draw({ canvas: canvas.current, balls })

        if (canvas) {
          animationId.current = window.requestAnimationFrame(loop)
        }
      }
    })(),
    [canvas]
  )

  const resize = useCallback(() => {
    const w = window.innerWidth
    const h = window.innerHeight
    if (canvas.current) {
      canvas.current.width = w
      canvas.current.height = h
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  useEffect(() => {
    resize()
    setIsRunning(true)
    loop(0)
    return () => window.cancelAnimationFrame(animationId.current || 0)
  }, [])

  return <Canvas ref={setCanvas}></Canvas>
}

export default BackgroundAnimation
