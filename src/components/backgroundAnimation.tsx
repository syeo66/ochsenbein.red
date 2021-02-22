import { bool } from 'prop-types'
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
}

let balls: Ball[] = [...Array(100)].map(() => ({
  posX: Math.random() * window.innerWidth,
  posY: Math.random() * window.innerHeight,
  posZ: Math.random() * window.innerWidth,
  vX: Math.random() * 50 - 25,
  vY: Math.random() * 50 - 25,
  vZ: 0,
  aX: 0,
  aY: 0,
  aZ: 0,
  mass: Math.random() * 1200,
}))

let isRunning = false

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
  return balls.map((ball) => {
    const { posX, posY, posZ, vX, vY, vZ, aX, aY, aZ, mass } = ball
    return { posX, posY, posZ, vX, vY, vZ, aX, aY, aZ, mass }
  })
}

const updateVelocityVectors: UpdateFunction = ({ balls, passed, width, height }) => {
  return balls.map(({ posX, posY, posZ, vX, vY, vZ, aX, aY, aZ, mass }) => {
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

    return { posX, posY, posZ, vX, vY, vZ, aX, aY, aZ, mass }
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

  return balls.map(({ posX, posY, posZ, vX, vY, vZ, aX, aY, aZ, mass }) => {
    posX += vX * passed
    posY += vY * passed
    posZ += vZ * passed

    posX += -cx + window.innerWidth / 2
    posY += -cy + window.innerHeight / 2
    posZ += -cz

    return { posX, posY, posZ, vX, vY, vZ, aX, aY, aZ, mass }
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

  ctx.fillStyle = 'rgba(0,0,0,0.02)'
  ctx.strokeStyle = 'rgba(0,0,0,0.02)'

  balls.forEach(({ posX, posY, posZ, mass }, i) => {
    ctx.beginPath()
    const radius = Math.max(3, Math.sqrt(mass) * 0.5)
    ctx.ellipse(posX, posY, radius * 2, radius * 2, 0, 0, 2 * Math.PI)
    ctx.fill()
  })
}

const BackgroundAnimation = () => {
  const canvas = useRef<HTMLCanvasElement>(null)

  const loop = useCallback(
    (() => {
      if (isRunning) {
        return () => {}
      }
      isRunning = true
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

        window.requestAnimationFrame(loop)
      }
    })(),
    []
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
    loop(0)
  }, [])

  return <Canvas ref={canvas}></Canvas>
}

export default BackgroundAnimation
