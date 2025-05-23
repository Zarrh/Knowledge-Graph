import './Introduction.css'
import React from 'react'

import { GlassBall } from '../components'

const Introduction = ({ setPage }) => {
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
        fontSize: 128,
      }}>
        Knowledge Graph
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
        <button className='start-btn' onClick={() => setPage('statistics')}>
          <span></span>
          <span></span>
          <span></span>
          <span></span> Get started
        </button>
        <button className='skip-btn' onClick={() => setPage('home')}> 
          Skip introduction
        </button>
      </div>
      <div style={{
        width: '10%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        textAlign: 'center',
        fontSize: 24,
        bottom: '5%',
        opacity: 0.5,
      }}>
        Luca Fagaraz
      </div>
    </div>
  )
}

export default Introduction