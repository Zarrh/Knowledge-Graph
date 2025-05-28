import './Home.css'
import React, { useState, useEffect } from 'react'
import { Graph, GeneratedPath, Legend, ActiveSubjects } from '../components'
import { _nodes, _edges, defaultActiveSubjects } from '../data'

import { adjacency, getRandomInt, shuffle } from '../functions'

const Home = () => {

  const [nodes, setNodes] = useState(_nodes)
  const [edges, setEdges] = useState(_edges)

  const [isEditor, setIsEditor] = useState(false)

  const toggleEditor = () => {
    const newValue = !isEditor
    setIsEditor(newValue)
    return
  }

  const [hoveredSubject, setHoveredSubject] = useState(null)

  const [linksActive, setLinksActive] = useState(true)

  const toggleLinksActive = () => {
    setLinksActive(!linksActive)
  }

  const [activeSubjects, setActiveSubjects] = useState(defaultActiveSubjects)

  const [path, setPath] = useState(new Array())

  const αGeneratePath = () => {

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


      subjectsToVisit = {...}

      visited = {}
      _path = [0]

      current = 0
      neighbours = [1, 2]
      _path.push(1) // neighbours[0] that is not in _path & not in visited
      (1.subject in subjectsToVisit & subjectsToVisit.remove(1.subject))

      current = 1
      neighbours = [0, 3, 4]
      _path.push(3)

      current = 3
      neighbours = [1]
      len(neighbours == 1) & _path.pop()
      subjectsToVisit.add(current.subject)
      visited.add(current)

      current = 1
      (current.subject in subjectsToVisit & subjectsToVisit.remove(1.subject))

      neighbours = [0, 3, 4]
      _path.push(4)

      current = 4
      neighbours = [1, 5]
      _path.push(5)

      current = 5
      neighbours = [4]
      len(neighbours == 1) & _path.pop()
      visited.add(current)

      current = 4
      neighbours = [1, 5]
      all(neighbours in visited or _path) & _path.pop()
      visited.add(current)

      current = 1
      neighbours = [0, 3, 4]
      all(neighbours in visited or _path) & _path.pop()
      visited.add(current)

      current = 0
      neighbours = [1, 2]
    */

    let _path = []

    function crawl(startingNode) {
    
      const visited = new Set()
      const subjectsToVisit = new Set(activeSubjects)

      _path.push(startingNode)

      while (subjectsToVisit.size) {
        if (_path.length === 0) {
          return false
        }
        const current = _path.at(-1)

        if (subjectsToVisit.has(current.subject)) {
          subjectsToVisit.delete(current.subject)
        }

        if (subjectsToVisit.size === 0) {
          return true
        }

        let neighbours = shuffle(activeEdges
          .filter(edge => edge.from === current.id || edge.to === current.id)
          .map(edge => {
            const neighbourId = edge.from === current.id ? edge.to : edge.from;
            return activeNodes.find(node => node.id === neighbourId)
          })
          .filter(Boolean))

        if (neighbours.length === 1) {
          _path.pop()
          if (!subjectsToVisit.has(current.subject)) {
            subjectsToVisit.add(current.subject)
          }
          visited.add(current)
          continue
        }

        if (neighbours.every(node => visited.has(node)) || neighbours.every(node => _path.includes(node))) {
          _path = []
          return false
        }

        neighbours = neighbours.filter(node => !visited.has(node) && !_path.includes(node)) ?? []

        if (neighbours.length === 0) {
          _path.pop()
          if (!subjectsToVisit.has(current.subject)) {
            subjectsToVisit.add(current.subject)
          }
          visited.add(current)
          continue
        }

        _path.push(neighbours[0])
      }
    }

    let success = false
    const maxRetries = 5
    let counter = 0
    const startingIndex = getRandomInt(0, activeNodes.length-1)
    let newIndex = startingIndex
    
    while (!success) {
      newIndex = (newIndex + 1) % activeNodes.length
      if (newIndex === startingIndex) {
        counter++
        if (counter === maxRetries) {
          _path = []
          console.log("No path found")
          break
        }
      }
      const startingNode = activeNodes[newIndex]
      success = crawl(startingNode)
    }
    console.log(success)
    setPath(_path)

    // Tree:
    // function dfs(currentId) {
    //   if (visited.has(currentId)) return

    //   visited.add(currentId)
    //   const currentNode = nodes.find(node => node.id === currentId)
    //   if (currentNode) {
    //     _path.push(currentNode)
    //   }

    //   const neighbors = activeEdges
    //     .filter(edge => edge.from === currentId || edge.to === currentId)
    //     .map(edge => (edge.from === currentId ? edge.to : edge.from))

    //   for (const neighborId of neighbors) {
    //     dfs(neighborId)
    //   }
    // }

    // dfs(startingNode.id)

    // setPath(_path)

    // const mat = adjacency(activeNodes, activeEdges)

    // const n = activeNodes.length
    // const startingIndex = getRandomInt(0, n-1)
    // let subjToVisit = activeSubjects

    // let i = startingIndex
    // let j = getRandomInt(0, n-1)

    // while (subjToVisit.length) {
    //   for (let k = j; k < n-1; k++) {
    //     if (mat[i][k] > 0) {

    //     }
    //   }
    // }



    // console.log(mat)
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
        // alignContent: 'center',
        // display: 'table',
      }}
    >
      <div
        className='Editor-Switch'
        style={{
          position: 'fixed',
          top: '2.5%',
          left: '1.0%',
          zIndex: 200,
        }}
      >
        <input type="checkbox" className="theme-checkbox" onChange={toggleEditor} checked={isEditor} />
      </div>

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
        onClick={() => setPath(new Array())}
        style={{
          position: 'fixed',
          top: 'calc(2.5% + 60px)',
          right: '1.5%',
          zIndex: 200,
        }}
      >
        Delete Path
      </button>
      
      <button 
        className='btn'
        onClick={αGeneratePath}
        style={{
          position: 'fixed',
          top: '2.5%',
          right: '1.5%',
          zIndex: 200,
        }}
      >
        Generate a Path
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
      </div>
      <Graph nodes={nodes} edges={edges} path={path} hoveredSubject={hoveredSubject} linksActive={linksActive} isEditor={isEditor} setIsEditor={setIsEditor} />
    </div>
  )
}

export default Home