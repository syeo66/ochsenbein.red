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

let posX = 0
let posY = 0
let vX = 300
let vY = 300
let isRunning = false

const AnimationTest = () => {
  const canvas = useRef<HTMLCanvasElement>(null)

  const update = useCallback((passed: number) => {
    if (!passed) {
      return
    }
    const w = canvas.current?.width || 100
    const h = canvas.current?.height || 100
    posX += vX * passed
    posY += vY * passed
    if (posX >= w || posX <= 0) {
      vX = -vX
    }
    if (posY >= h || posY <= 0) {
      vY = -vY
    }
    if (posX > w) {
      posX = w
    }
    if (posY > h) {
      posY = h
    }
  }, [])

  const draw = useCallback(() => {
    const ctx = canvas?.current?.getContext('2d')
    if (!ctx) {
      return
    }

    ctx.clearRect(0, 0, canvas?.current?.width || 100, canvas?.current?.height || 100)

    ctx.fillStyle = 'rgba(0,0,0,0.2)'
    ctx.strokeStyle = 'rgba(0,0,0,0.2)'

    ctx.beginPath()
    ctx.ellipse(posX, posY, 10, 10, 0, 0, 2 * Math.PI)
    ctx.fill()
  }, [])

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
        update(secondsPassed)
        draw()

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

export default AnimationTest
