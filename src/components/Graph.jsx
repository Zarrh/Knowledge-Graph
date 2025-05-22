import React, { useState, useEffect, useRef } from 'react'
import Node from './Node'
import Connector from './Connector'
import Title from './Title'

import { subjectsColors, subjectNames, fieldContents, subjectIcons } from '../data'
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
}))



const getNodesPositions = (nodes) => {

  const nodesPositions = [];

  [...Object.keys(subjectNames), "NIL"].forEach((subj) => {

    let subjNodes = new Array()

    if (subj === "NIL") {
      subjNodes = nodes.filter(node => !node.subject || node.subject === "")
    }
    else {
      subjNodes = nodes.filter(node => node.subject === subj)
    }

    let rings = new Object()
    
    for (const node of subjNodes) {
      if (Object.keys(rings).includes(node.weight.toString())) {
        rings[node.weight.toString()].push(node)
        continue
      }
      rings[node.weight.toString()] = [node]
    }

    const sortedRings = Object.keys(rings)
      .sort((a, b) => parseFloat(a) - parseFloat(b))
      .reduce((obj, key) => {
        obj[key] = rings[key]
        return obj
      }, {})

    Object.values(sortedRings).forEach((ring, i) => {
      nodesPositions.push(
        ...ring.map((node, j) => ({
          id: node.id,
          x: subj === "NIL" ? CENTER[0] + (i+1)*dispersionRadius/3*Math.cos((2 * π * j) / ring.length) : centers.find(center => center.subj === subj).x + (i+1)*dispersionRadius/3*Math.cos((2 * π * j) / ring.length),
          y: subj === "NIL" ? CENTER[1] + (i+1)*dispersionRadius/3*Math.cos((2 * π * j) / ring.length) : centers.find(center => center.subj === subj).y + (i+1)*dispersionRadius/3*Math.sin((2 * π * j) / ring.length),
          subj: node.subject ?? null,
          title: node.title,
          content: node.content,
          image: null,
          weight: parseFloat(node.weight),
          radius: radius*parseFloat(node.weight),
          field: node.field ?? null,
          isAI: node.isAI ?? false,
        }))
      )
    })
  })
  return nodesPositions
}


const Graph = ({ nodes, edges, path=[], hoveredSubject=null, linksActive=true }) => {

  const [nodesPositions, setNodesPositions] = useState(
    getNodesPositions(nodes)
  )

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
    isPanning.current = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const handleTouchStart = (e) => {
    if (e.target === e.currentTarget && e.touches.length === 1) {
      isPanning.current = true
      const touch = e.touches[0]
      panStart.current = { x: touch.clientX - offset.x, y: touch.clientY - offset.y }
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)
    }
  }
  
  const handleTouchMove = (e) => {
    if (!isPanning.current || e.touches.length !== 1) return
    e.preventDefault()
    const touch = e.touches[0]
    const newOffset = {
      x: touch.clientX - panStart.current.x,
      y: touch.clientY - panStart.current.y,
    }
    setOffset(newOffset)
  }
  
  const handleTouchEnd = () => {
    isPanning.current = false
    document.removeEventListener('touchmove', handleTouchMove)
    document.removeEventListener('touchend', handleTouchEnd)
  }

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
      onTouchStart={handleTouchStart}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
        transformOrigin: '0 0',
        width: '1000vw',
        height: '1000vh',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#18171c',
        cursor: isPanning.current ? 'move' : 'grab',
        touchAction: 'none',
      }}
    >
      {/* Titles */}
      {centers.map((center) => {
        const Icon = subjectIcons[center.subj]
        return (
          <div key={center.subj}>
            <Title
              x={center.x}
              y={center.y}
              color={hoveredSubject === center.subj ? subjectsColors[center.subj] : 'white'}
              opacity={hoveredSubject === center.subj ? 0.75 : 0.25}
            >
              {subjectNames[center.subj]}
            </Title>
            <div 
              style={{
                position: 'absolute',
                left: center.x,
                top: center.y,
                color: `${hoveredSubject === center.subj ? subjectsColors[center.subj] : '#9c9c9c'}`,
                opacity: `${hoveredSubject === center.subj ? 0.35 : 0.05}`,
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 0,
                fontSize: 792,
              }}
            >
              {Icon && <Icon />}
            </div>
          </div>
      )})}
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
        {linksActive && edges.map((edge, i) => {
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
          borderColor={subjectsColors[node.subj] ?? "white"}
          borderWidth={border}
          title={node.title}
          content={node.content}
          field={node.field}
          image={node.image}
          isAI={node.isAI ?? false}
          scale={scale}
          offset={offset}
          onMove={(x, y) => updateNodePosition(node.id, x, y)}
          onClick={() => {}}
        >
          <div style={{fontWeight: "bold", fontSize: 24*node.weight, fontFamily: 'sans'}}>{node.field ? fieldContents[node.field] : "ς"}</div>
        </Node>
      ))}
    </div>
  )
}

export default Graph
