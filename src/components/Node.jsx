import React, { useState, useRef } from 'react'

const Node = ({ x, y, radius, color, borderColor, borderWidth, onMove }) => {
  const [pos, setPos] = useState({ x: x, y: y })
  const nodeRef = useRef(null)
  const dragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })

  const handleMouseDown = (e) => {
    dragging.current = true
    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e) => {
    if (!dragging.current) return
    const newX = e.clientX - offset.current.x
    const newY = e.clientY - offset.current.y
    setPos({ x: newX, y: newY })
    if (onMove) onMove(newX, newY)
  }

  const handleMouseUp = () => {
    dragging.current = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  return (
    <div
      ref={nodeRef}
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: pos.x,
        top: pos.y,
        width: radius,
        height: radius,
        borderRadius: '50%',
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
      }}
    >
    </div>
  )
}

export default Node