import './App.css'
import { Graph } from './components'
import { nodes, edges } from './data'

import { useState } from 'react'

function App() {

  const [isEditor, setIsEditor] = useState(false)

  const toggleEditor = () => {
    const newValue = !isEditor
    setIsEditor(newValue)
    return
  }

  return (
    <div
      className="App"
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
          left: '1.5%',
          zIndex: 200,
        }}
      >
        <input type="checkbox" className="theme-checkbox" onChange={toggleEditor} checked={isEditor} />
      </div>
      <Graph nodes={nodes} edges={edges} isEditor={isEditor} setIsEditor={setIsEditor} />
    </div>
  )
}

export default App
