import './App.css'
import { Graph } from './components'
import { nodes, edges } from './data'

function App() {

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
      <Graph nodes={nodes} edges={edges} />
    </div>
  )
}

export default App
