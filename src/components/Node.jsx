import React, { useState, useRef } from 'react'
import { useSpring, animated } from 'react-spring'

const Node = ({ 
  x, y, radius, color, borderColor, borderWidth, title, content, image, onMove, scale, offset 
}) => {
  const [pos, setPos] = useState({ x: x, y: y })
  const [isExpanded, setIsExpanded] = useState(false)
  const nodeRef = useRef(null)
  const dragging = useRef(false)
  const mouseOffset = useRef({ x: 0, y: 0 })

  const handleMouseDown = (e) => {
    dragging.current = true

    const graphX = (e.clientX - offset.x) / scale
    const graphY = (e.clientY - offset.y) / scale

    mouseOffset.current = {
      x: graphX - pos.x,
      y: graphY - pos.y,
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e) => {
    if (!dragging.current) return

    const graphX = (e.clientX - offset.x) / scale
    const graphY = (e.clientY - offset.y) / scale

    const newX = graphX - mouseOffset.current.x
    const newY = graphY - mouseOffset.current.y

    setPos({ x: newX, y: newY })
    if (onMove) onMove(newX, newY)
  }

  const handleMouseUp = () => {
    dragging.current = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const props = useSpring({
    to: {
      width: isExpanded ? 300 : radius,
      height: isExpanded ? 150 : radius,
      opacity: isExpanded ? 1 : 0.8,
      borderRadius: isExpanded ? '12px': '50%',
      transform: isExpanded ? 'scale(1.2)' : 'scale(1)',
    },
    config: { tension: 200, friction: 20 },
  })

  const handleClick = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      {/* Blurring background effect when the node is expanded */}
      {isExpanded && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '1000vw',
            height: '1000vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
            backdropFilter: 'blur(10px)', // Blurring the background
            zIndex: 20,
          }}
        />
      )}

      {/* Animated Node */}
      <animated.div
        ref={nodeRef}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        style={{
          position: 'absolute',
          left: pos.x,
          top: pos.y,
          width: props.width,
          height: props.height,
          borderRadius: props.borderRadius,
          backgroundColor: color,
          cursor: 'grab',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          userSelect: 'none',
          border: 'solid',
          borderColor: borderColor ?? color,
          borderWidth: borderWidth ?? 0,
          opacity: props.opacity,
          transform: props.transform,
          zIndex: 100,
        }}
      >
        {/* Node Content */}
        {isExpanded && (
          <div
            style={{
              padding: '10px',
              textAlign: 'center',
              color: 'white',
            }}
          >
            <h3>{title}</h3>
            <p>{content}</p>
          </div>
        )}
      </animated.div>
    </>
  )
}

export default Node
