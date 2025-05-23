import React, { useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { subjectsColors } from '../data'

const Connector = ({ from, to, width=12, highlight=false }) => {
  const [hovered, setHovered] = useState(false)

  const springStyle = useSpring({
    opacity: hovered ? 1 : 0.3,
    config: { tension: 170, friction: 26 },
  })

  const gradientId = `gradient-${from.x}-${from.y}-${to.x}-${to.y}`

  return (
    <>
      <defs>
        <linearGradient id={gradientId} x1={from.x > to.x ? "100%" : "0%"} y1="0%" x2={from.x > to.x ? "0%" : "100%"} y2="0%">
          <stop offset="0%" stopColor={subjectsColors[from.subj]} />
          <stop offset="100%" stopColor={subjectsColors[to.subj]} />
        </linearGradient>
      </defs>

      <animated.line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={`url(#${gradientId})`}
        strokeWidth={highlight ? 5*width : width}
        style={springStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        pointerEvents="visibleStroke"
      />
    </>
  )
}

export default Connector
