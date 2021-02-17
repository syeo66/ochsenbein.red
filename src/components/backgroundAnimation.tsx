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
  vX: number
  vY: number
  mass: number
}

let balls: Ball[] = [...Array(50)].map(() => ({
  posX: Math.random() * window.innerWidth,
  posY: Math.random() * window.innerHeight,
  vX: Math.random() * 200 - 100,
  vY: Math.random() * 200 - 100,
  mass: Math.random() * 20,
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
  if (!passed) {
    return balls
  }
  const w = width || 100
  const h = height || 100

  return balls.map(({ posX, posY, vX, vY, mass }) => {
    posX += vX * passed
    posY += vY * passed
    if (posX + mass >= w || posX - mass <= 0) {
      vX = -vX
    }
    if (posY + mass >= h || posY - mass <= 0) {
      vY = -vY
    }
    if (posX + mass > w) {
      posX = w - mass
    }
    if (posY + mass > h) {
      posY = h - mass
    }
    if (posX - mass < 0) {
      posX = mass
    }
    if (posY - mass < 0) {
      posY = mass
    }
    return { posX, posY, vX, vY, mass }
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

  ctx.fillStyle = 'rgba(0,0,0,0.05)'
  ctx.strokeStyle = 'rgba(0,0,0,0.05)'

  balls.forEach(({ posX, posY, mass }) => {
    ctx.beginPath()
    ctx.ellipse(posX, posY, mass, mass, 0, 0, 2 * Math.PI)
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
