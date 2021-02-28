import React, { MouseEventHandler } from 'react'
import styled from 'styled-components'

const Line = styled.div`
  width: 100%;
  height: 0.3rem;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 0.3rem;
  transition: transform 500ms, opacity 500ms;
  transform-origin: calc(100% - 0.15rem) 0.15rem;

  &.hidden {
    transform: scaleX(0);
  }

  &.left {
    transform: rotate(-45deg);
  }

  &.right {
    transform: rotate(45deg);
  }
`
const BurgerContainer = styled.div`
  width: 2rem;
  height: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`

interface BurgerProps {
  className?: string
  active?: boolean
  onClick?: MouseEventHandler<HTMLDivElement>
}

const Burger: React.FC<BurgerProps> = ({ className, active, onClick }) => {
  return (
    <BurgerContainer className={className} onClick={onClick}>
      <Line className={active ? 'left' : ''} />
      <Line className={active ? 'hidden' : ''} />
      <Line className={active ? 'right' : ''} />
    </BurgerContainer>
  )
}

export default Burger
