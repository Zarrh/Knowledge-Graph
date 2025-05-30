import './Home.css'
import React, { useState, useEffect } from 'react'
import { Graph, GeneratedPath, Legend, ActiveSubjects, GeneratedRelevantNodes } from '../components'
import { _nodes, _edges, defaultActiveSubjects, subjectsColors, fieldContents } from '../data'

import { adjacency, getRandomInt, shuffle, getNlinksPerNode } from '../functions'

const Home = () => {

  const [nodes, setNodes] = useState(_nodes)
  const [edges, setEdges] = useState(_edges)

  const [hoveredSubject, setHoveredSubject] = useState(null)

  const [linksActive, setLinksActive] = useState(true)

  const toggleLinksActive = () => {
    setLinksActive(!linksActive)
  }

  const [centralityColoring, setCentralityColoring] = useState(false)

  const toggleCentralityColoring = () => {
    setCentralityColoring(!centralityColoring)
  }

  const [activeSubjects, setActiveSubjects] = useState(defaultActiveSubjects)

  const [path, setPath] = useState(new Array())

  const [linksPerNode, setLinksPerNode] = useState(new Object())

  const [selectedNodeId, setSelectedNodeId] = useState(null)

  const βGeneratePath = () => {

    const activeNodes = nodes.filter(node => activeSubjects.includes(node.subject) || !node.subject || node.subject === "")
    const activeNodeIds = new Set(activeNodes.map(node => node.id))

    const activeEdges = edges.filter(edge =>
      activeNodeIds.has(edge.from) && activeNodeIds.has(edge.to)
    )

    /*
            4 -- 5
            |    
       0 -- 1 -- 3
       |
       |
       2 -- 6 -- 7 -- 8 -- 9
    */

    function crawl(startingNode) {
      const subjectsToVisit = new Set(activeSubjects)

      const nodeById = new Map(activeNodes.map(n => [n.id, n]))
      const edgesByNodeId = new Map()

      activeEdges.forEach(edge => {
        if (!edgesByNodeId.has(edge.from)) edgesByNodeId.set(edge.from, [])
        if (!edgesByNodeId.has(edge.to)) edgesByNodeId.set(edge.to, [])
        edgesByNodeId.get(edge.from).push(edge.to)
        edgesByNodeId.get(edge.to).push(edge.from)
      })

      const startTime = Date.now()
      const maxDuration = 1000

      const stack = [
        {
          id: startingNode.id,
          path: [],
          remainingSubjects: new Set(subjectsToVisit),
          visited: new Set(),
        },
      ]

      while (stack.length > 0) {
        if (Date.now() - startTime > maxDuration) {
          console.log("DFS timed out — stopping")
          return []
        }

        const { id, path, remainingSubjects, visited: localVisited } = stack.pop()
        const currentNode = nodeById.get(id)
        if (!currentNode) continue

        const newPath = [...path, currentNode]
        const newVisited = new Set(localVisited)
        newVisited.add(id)

        const newRemainingSubjects = new Set(remainingSubjects)
        if (currentNode.subject && newRemainingSubjects.has(currentNode.subject)) {
          newRemainingSubjects.delete(currentNode.subject)
        }

        if (newRemainingSubjects.size === 0) {
          return newPath
        }

        const neighbors = shuffle(edgesByNodeId.get(id) || []).filter(
          neighborId => !newVisited.has(neighborId)
        )

        for (const neighborId of neighbors) {
          stack.push({
            id: neighborId,
            path: newPath,
            remainingSubjects: newRemainingSubjects,
            visited: newVisited,
          })
        }
      }

      return []
    }


    let success = []

    if (!activeNodes || activeNodes.length === 0) {
      console.log("No active nodes available.")
      setPath([])
    } else {
      const initialStartingIndex = selectedNodeId !== null
        ? activeNodes.map(node => node.id).indexOf(selectedNodeId)
        : getRandomInt(0, activeNodes.length - 1)

      const startingIndex = initialStartingIndex === -1 ? getRandomInt(0, activeNodes.length - 1) : (initialStartingIndex+activeNodes.length-1) % activeNodes.length

      let newIndex = startingIndex
      let attempts = 0
      const maxAttempts = 2

      while (!success.length && attempts < maxAttempts) {
        newIndex = (newIndex + 1) % activeNodes.length

        if (attempts > 0 && newIndex === startingIndex) {
          console.log("No path found.")
          setPath([])
          break
        }

        const startingNode = activeNodes[newIndex]
        success = crawl(startingNode)
        attempts++
      }

      if (!success.length && attempts >= maxAttempts) {
        console.log("Maximum crawl attempts reached without finding a path.")
        setPath([])
      } else if (success.length) {
        setPath(success)
      }
    }
  }


  const computeLinksPerNode = () => {
    const newLinksPerNode = getNlinksPerNode(nodes, edges)

    setLinksPerNode(newLinksPerNode)

    console.log(linksPerNode)
  }


  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result)

        const addedNodes = parsed["nodes"] ?? []
        console.log("Added the following nodes: ", addedNodes)

        const addedEdges = parsed["links"] ?? []
        console.log("Added the following edges: ", addedEdges)


        setNodes(prevNodes => [...prevNodes, ...addedNodes])
        setEdges(prevEdges => [...prevEdges, ...addedEdges])

        console.log(nodes)
      } catch (err) {
        alert("Invalid JSON file.")
      }
    }
    reader.readAsText(file)
  }

  const triggerFileInput = () => {
    document.getElementById('json-upload-input').click()
  }

  return (
    <div
      className='Home'
      style={{
        overflow: 'hidden',
        width: '98vw',
        height: '98vh',
        position: 'relative',
      }}
    >

      <div
        className='Active-subjects'
        style={{
          position: 'fixed',
          width: '5%',
          height: '70%',
          top: '13.5%',
          left: '1.5%',
          zIndex: 200,
        }}
      >
        <ActiveSubjects hoveredSubject={hoveredSubject} setHoveredSubject={setHoveredSubject} activeSubjects={activeSubjects} setActiveSubjects={setActiveSubjects} />
      </div>

      <div
        style={{
          position: 'fixed',
          width: '5%',
          height: '10%',
          top: '86.5%',
          left: '0.5%',
          zIndex: 200,
        }}
      >
        <label className="link-switch">
          <input type="checkbox" onChange={toggleLinksActive} defaultChecked={true} />
          <span className="link-switch-slider"></span>
        </label>
      </div>

      <div
        style={{
          position: 'fixed',
          width: '5%',
          height: '10%',
          top: '86.5%',
          left: 'calc(0.5% + 5em)',
          zIndex: 200,
        }}
      >
        <label className="link-switch link-switch-purple">
          <input type="checkbox" onChange={toggleCentralityColoring} defaultChecked={true} />
          <span className="link-switch-slider link-switch-slider-purple"></span>
        </label>
      </div>
      
      <div
        className='Legend'
        style={{
          position: 'fixed',
          bottom: '2.5%',
          left: '1.5%',
          zIndex: 200,
        }}
      >
        <Legend />
      </div>

      <button 
        className='btn'
        onClick={() => {setPath(new Array()); setLinksPerNode(new Object())}}
        style={{
          position: 'fixed',
          top: 'calc(2.5% + 60px)',
          right: '1.5%',
          zIndex: 200,
        }}
      >
        Clear
      </button>
      
      <button 
        className='btn'
        onClick={() => {setLinksPerNode(new Object()); βGeneratePath()}}
        style={{
          position: 'fixed',
          top: '2.5%',
          right: '1.5%',
          zIndex: 200,
        }}
      >
        Generate a Path
      </button>

      <button 
        className='btn'
        onClick={() => {setPath(new Array()); computeLinksPerNode()}}
        style={{
          position: 'fixed',
          top: '2.5%',
          right: 'calc(1.5% + 220px)',
          zIndex: 200,
        }}
      >
        Get most central nodes
      </button>

      <input
        type="file"
        id="json-upload-input"
        accept=".json"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />

      <button
        className='btn'
        onClick={triggerFileInput}
        style={{
          position: 'fixed',
          bottom: '2.5%',
          right: '1.5%',
          zIndex: 200,
        }}
      >
        Add plugin
      </button>

      <div
        id='drop-zone'
        onClick={() => setSelectedNodeId(null)}
        style={{
          position: 'fixed',
          bottom: '-1.5%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '3rem',
          height: '3rem',
          borderRadius: '50%',
          backgroundColor: '#000000',
          border: `2px solid ${subjectsColors[nodes.find(node => node.id === selectedNodeId)?.subject] ?? "#ffffff"}`,
          boxShadow: `0 0 20px ${subjectsColors[nodes.find(node => node.id === selectedNodeId)?.subject] ?? "#ffffff"}`,
          zIndex: 20,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          fontWeight: 'bold',
          fontFamily: 'sans',
          fontSize: 32,
          cursor: 'pointer'
        }}
      >
        {selectedNodeId !== null ? fieldContents[nodes.find(node => node.id === selectedNodeId)?.field] ?? "ς" : ""}
      </div>


      {/* Fix the rendering*/}
      {path.length ?
        <div
          className='path-list'
          style={{
            position: 'fixed',
            top: 'calc(2.5% + 120px)',
            width: 'calc(25%)',
            right: '1.5%',
            zIndex: 200,
          }}
        >
          <GeneratedPath nodes={path}/>
        </div> : <div></div>}
      {Object.keys(linksPerNode).length ? 
        <div
          className='path-list'
          style={{
            position: 'fixed',
            top: 'calc(2.5% + 120px)',
            width: 'calc(15%)',
            right: '1.5%',
            zIndex: 200,
          }}
        >
          <GeneratedRelevantNodes nodes={nodes} linksPerNode={linksPerNode} activeSubjects={activeSubjects}/>
        </div> : <div></div>}
      <Graph nodes={nodes} edges={edges} path={path} hoveredSubject={hoveredSubject} linksActive={linksActive} centralityColoring={centralityColoring} setSelectedNodeId={setSelectedNodeId} />
    </div>
  )
}

export default Home