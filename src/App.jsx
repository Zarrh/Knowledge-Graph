import './App.css'
import { Node, Graph } from './components'

const nodes = [
  { id: 'A', x: 100, y: 100 },
  { id: 'B', x: 300, y: 200 },
  { id: 'C', x: 200, y: 350 },
]

const edges = [
  { from: 'A', to: 'B' },
  { from: 'B', to: 'C' },
  { from: 'C', to: 'A' },
]

function App() {

  const list = [...Array(2000).keys()]

  return (
    <div className="App">
      {/* {
        list.map((i, index) => (
          <Node 
            key={index}
            x={index*2 % 1920} 
            y={100} 
            radius={80} 
            color={'#ababab'} 
            borderColor={'#ffffff'}
            borderWidth={5}
          />
        ))
      }  */}
      <Graph nodes={nodes} edges={edges} />
    </div>
  )
}

export default App
