import React, { useState, useEffect, useRef } from 'react'
import Node from './Node'
import Connector from './Connector'
import Title from './Title'

import { subjectsColors, subjectNames, fieldContents } from '../data'
import { radius, dispersionRadius, connectorWidth, zoomIntensity, nodesColor, border } from '../data/config'
import { σ, getRandomInt, getRandomSign } from '../functions'


const WIDTH = window.innerWidth*10
const HEIGHT = window.innerHeight*10

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


const Graph = ({ nodes, edges, path=[], isEditor=null, setIsEditor=()=>{} }) => {

  const [nodesPositions, setNodesPositions] = useState(
    nodes.map((node) => ({
      id: node.id,
      x: centers.find(center => center.subj === node.subject).x + getRandomInt(dispersionRadius/3, dispersionRadius)*getRandomSign(),
      y: centers.find(center => center.subj === node.subject).y + getRandomInt(dispersionRadius/3, dispersionRadius)*getRandomSign(),
      subj: node.subject,
      title: node.title,
      content: node.content,
      image: null,
      weight: parseFloat(node.weight),
      radius: radius*parseFloat(node.weight),
      field: node.field ?? null,
      isAI: node.isAI ?? false,
    }))
  );

  const [scale, setScale] = useState(0.1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const isPanning = useRef(false)
  const panStart = useRef({ x: 0, y: 0 })

  const handleWheel = (e) => {
    e.preventDefault()
    
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
      {/* Titles */}
      {centers.map((center) => (
        <Title
          key={center.subj}
          x={center.x}
          y={center.y}
        >
          {subjectNames[center.subj]}
        </Title>
      ))}
      {/* Connectors */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        {localEdges.map((edge, i) => {
          const from = nodesPositions.find(n => n.id === edge.from)
          const to = nodesPositions.find(n => n.id === edge.to)

          return (
            <Connector
              key={i}
              from={{ x: from.x + from.radius / 2, y: from.y + from.radius / 2, subj: from.subj }}
              to={{ x: to.x + to.radius / 2, y: to.y + to.radius / 2, subj: to.subj }}
              highlight={
                path.length > 1 &&
                path.some(node => node.id === edge.from) &&
                path.some(node => node.id === edge.to) &&
                edge.from !== edge.to
              }
              width={connectorWidth}
            />
          )
        })}
      </svg>

      {/* Nodes */}
      {nodesPositions.map((node) => (
        <Node
          key={node.id}
          x={node.x}
          y={node.y}
          radius={node.radius}
          color={nodesColor}
          borderColor={subjectsColors[node.subj]}
          borderWidth={border}
          title={node.title}
          content={node.content}
          field={node.field}
          image={node.image}
          isAI={node.isAI ?? false}
          scale={scale}
          offset={offset}
          onMove={(x, y) => updateNodePosition(node.id, x, y)}
          isEditing={false}
          onClick={() => {}}
        >
          <div style={{fontWeight: "bold", fontSize: 24*node.weight, fontFamily: 'sans'}}>{node.field ? fieldContents[node.field] : "ς"}</div>
        </Node>
      ))}
    </div>
  )
}

export default Graph
