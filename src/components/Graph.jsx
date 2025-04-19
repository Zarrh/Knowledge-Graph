import React, { useState, useEffect, useRef } from 'react'
import Node from './Node'
import Connector from './Connector'

import { subjectsColors } from '../data'


const WIDTH = window.innerWidth*10
const HEIGHT = window.innerHeight*10

const radius = 50

const CENTER = [Math.floor(WIDTH / 2), Math.floor(HEIGHT / 2)]
const N = Object.keys(subjectsColors).length
const r = Math.floor(HEIGHT * (2 / 5))
const π = Math.PI

const subjectKeys = Object.keys(subjectsColors)

const centers = subjectKeys.map((subj, index) => ({
  subj: subj,
  x: r * Math.cos((2 * π * index) / N) + CENTER[0],
  y: -r * Math.sin((2 * π * index) / N) + CENTER[1],
}));


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}


const Graph = ({ nodes, edges }) => {

  const [nodesPositions, setNodesPositions] = useState(
    nodes.map((node) => ({
      id: node.id,
      x: centers.find(center => center.subj === node.subject).x + getRandomInt(-400, 400),
      y: centers.find(center => center.subj === node.subject).y + getRandomInt(-400, 400),
      subj: node.subject,
      title: node.title,
      content: node.description,
      image: null,
    }))
  );

  const [scale, setScale] = useState(0.1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const isPanning = useRef(false)
  const panStart = useRef({ x: 0, y: 0 })

  const handleWheel = (e) => {
    e.preventDefault()
    
    // Zoom sensitivity
    const zoomIntensity = 0.05
    const delta = e.deltaY < 0 ? 1 + zoomIntensity : 1 - zoomIntensity

    const mouseX = e.clientX
    const mouseY = e.clientY

    // Calculate new scale
    const newScale = Math.max(scale * delta, 0.1)

    // Calculate new offset so the zoom is centered around the mouse position
    const dx = mouseX - offset.x
    const dy = mouseY - offset.y
    const newOffsetX = mouseX - dx * (newScale / scale)
    const newOffsetY = mouseY - dy * (newScale / scale)

    // Update scale and offset
    setScale(newScale)
    setOffset({ x: newOffsetX, y: newOffsetY })
  }

  const handleMouseDown = (e) => {
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
    isPanning.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const updateNodePosition = (id, newX, newY) => {
    setNodesPositions(prev =>
      prev.map(n => (n.id === id ? { ...n, x: newX, y: newY } : n))
    )
  }

  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    el.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      el.removeEventListener('wheel', handleWheel)
    }
  }, [scale, offset])
  

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
        transformOrigin: '0 0',
        width: '1000vw',
        height: '1000vh',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#18171c',
        cursor: isPanning.current ? 'grabbing' : 'grab',
      }}
    >
      {/* Connectors */}
      {edges.map((edge, i) => {
        const from = nodesPositions.find(n => n.id === edge.from)
        const to = nodesPositions.find(n => n.id === edge.to)

        return (
          <Connector
            key={i}
            from={{ x: from.x + radius / 2, y: from.y + radius / 2 }}
            to={{ x: to.x + radius / 2, y: to.y + radius / 2 }}
          />
        )
      })}

      {/* Nodes */}
      {nodesPositions.map((node) => (
        <Node
          key={node.id}
          x={node.x}
          y={node.y}
          radius={radius}
          color="#787487"
          borderColor={subjectsColors[node.subj]}
          borderWidth={5}
          title={node.title}
          content={node.content}
          image={node.image}
          scale={scale}
          offset={offset}
          onMove={(x, y) => updateNodePosition(node.id, x, y)}
        >
          {node.id}
        </Node>
      ))}
    </div>
  )
}

export default Graph
