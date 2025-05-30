import React, { useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { subjectsColors } from '../data'

const Connector = ({ from, to, width = 12, highlight = false, color = null }) => {
  const [hovered, setHovered] = useState(false)

  const springStyle = useSpring({
    opacity: hovered ? 1 : 0.3,
    config: { tension: 170, friction: 26 },
  })

  const gradientId = `gradient-${from.x}-${from.y}-${to.x}-${to.y}`

  const dx = to.x - from.x
  const dy = to.y - from.y
  const dr = Math.sqrt(dx * dx + dy * dy) * 1.5

  const arcPath = `M ${from.x},${from.y} A ${dr},${dr} 0 0,1 ${to.x},${to.y}`

  return (
    <>
      <defs>
        <linearGradient
          id={gradientId}
          x1={from.x > to.x ? '100%' : '0%'}
          y1="0%"
          x2={from.x > to.x ? '0%' : '100%'}
          y2="0%"
        >
          <stop offset="0%" stopColor={color ?? subjectsColors[from.subj] ?? 'white'} />
          <stop offset="100%" stopColor={color ?? subjectsColors[to.subj] ?? 'white'} />
        </linearGradient>
      </defs>

      <animated.path
        d={arcPath}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={highlight ? 5 * width : width}
        style={springStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        pointerEvents="visibleStroke"
      />
    </>
  )
}

export default Connector
