// import './Introduction.css'
import React from 'react'
import { _nodes, _edges, subjectNames } from '../data'

const Statistics = ({ setPage }) => {
  return (
    <div style={{
      height: '101vh',
      width: '101vw',
      alignContent: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
      marginLeft: '-1vw',
      marginTop: '-1vh',
      display: 'block',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 84,
      }}>
        Some stats:
      </div>
      <div style={{
        marginTop: '5vh',
        width: '60%',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        display: 'grid',
        gridTemplateColumns: 'auto auto auto',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8rem',
        fontSize: 26,
      }}>
        <div>
          <div>Number of nodes:</div>
          <div style={{fontSize: 62, color: '#ae00ff', fontWeight: 'bold'}}>{_nodes.length}</div>
        </div>
        <div>
          <div>Number of links:</div>
          <div style={{fontSize: 62, color: '#ae00ff', fontWeight: 'bold'}}>{_edges.length}</div>
        </div>
        <div>
          <div>Number of subjects:</div>
          <div style={{fontSize: 62, color: '#ae00ff', fontWeight: 'bold'}}>{Object.keys(subjectNames).length}</div>
        </div>
      </div>
      <div style={{
        marginTop: '5vh',
        width: '35%',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: '2rem',
      }}>
        <button className='start-btn' onClick={() => setPage('explanation')}>
          <span></span>
          <span></span>
          <span></span>
          <span></span> Next
        </button>
        <button className='skip-btn' onClick={() => setPage('home')}> 
          Skip introduction
        </button>
      </div>
      {/* <GlassBall x={-100} y={-100} radius={300} from={'#ff7ecb'} to={'#6a00f4'} />
      <GlassBall x={-100} y={-100} rev={true} radius={300} from={'#ff7ecb'} to={'#6a00f4'} /> */}
    </div>
  )
}

export default Statistics