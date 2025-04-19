import React, { useState, useRef } from 'react'
import Node from './Node'
import Connector from './Connector'

const Graph = () => {
  const [nodes, setNodes] = useState([
    { id: 'A', x: 100, y: 100 },
    { id: 'B', x: 300, y: 200 },
    { id: 'C', x: 200, y: 350 },
  ])

  const edges = [
    { from: 'A', to: 'B' },
    { from: 'B', to: 'C' },
    { from: 'C', to: 'A' },
  ]

  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const isPanning = useRef(false)
  const panStart = useRef({ x: 0, y: 0 })

  const radius = 80

  const handleWheel = (e) => {
    e.preventDefault()

    const zoomFactor = 0.1
    const newScale = scale - e.deltaY * zoomFactor * 0.01

    // Clamp between min and max zoom levels
    setScale(Math.min(Math.max(newScale, 0.2), 4))
  }

  const handleMouseDown = (e) => {
    // Only pan when clicking the background, not a node
    if (e.target === e.currentTarget) {
      isPanning.current = true
      panStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y }
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }
  }

  const handleMouseMove = (e) => {
    if (!isPanning.current) return
    const newOffset = {
      x: e.clientX - panStart.current.x,
      y: e.clientY - panStart.current.y,
    }
    setOffset(newOffset)
  }

  const handleMouseUp = () => {
    isPanning.current = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const updateNodePosition = (id, newX, newY) => {
    setNodes(prev =>
      prev.map(n => (n.id === id ? { ...n, x: newX, y: newY } : n))
    )
  }

  return (
    <div
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        // backgroundColor: '#f8f8f8',
        cursor: isPanning.current ? 'grabbing' : 'grab',
      }}
    >
      <div
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          transformOrigin: '0 0',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {/* Connectors */}
        {edges.map((edge, i) => {
          const from = nodes.find(n => n.id === edge.from)
          const to = nodes.find(n => n.id === edge.to)

          return (
            <Connector
              key={i}
              from={{ x: from.x + radius / 2, y: from.y + radius / 2 }}
              to={{ x: to.x + radius / 2, y: to.y + radius / 2 }}
            />
          )
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <Node
            key={node.id}
            x={node.x}
            y={node.y}
            radius={radius}
            color="#3498db"
            borderColor="white"
            borderWidth={5}
            onMove={(x, y) => updateNodePosition(node.id, x, y)}
          >
            {node.id}
          </Node>
        ))}
      </div>
    </div>
  )
}

export default Graph
