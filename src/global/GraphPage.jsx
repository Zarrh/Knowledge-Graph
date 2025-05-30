// import './Introduction.css'
import React, { useEffect } from 'react'
import { _nodes, _edges, subjectNames } from '../data'
import { cartesianProduct, graphDefinition, graphImage } from '../assets/images'

const GraphPage = ({ setPage }) => {
  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.key.toLowerCase() === 'arrowleft') {
        setPage('graph-page')
      }
    }

    window.addEventListener('keyup', handleKeyUp)
    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [])

  return (
    <div style={{
      height: '101vh',
      width: '101vw',
      alignContent: 'start',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
      marginLeft: '-1vw',
      marginTop: '-1vh',
      display: 'block',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'start',
        marginLeft: '15%',
        marginTop: '12%',
        textAlign: 'left',
        fontSize: 84,
      }}>
        Graph Theory
      </div>
      <div style={{
        position: 'absolute',
        display: 'flex',
        justifyContent: 'start',
        marginLeft: '15%',
        marginTop: '4%',
        textAlign: 'justify',
        width: '35%',
        fontWeight: 'normal',
        fontSize: 24,
      }}>
        A graph can be defined as a couple of a set of vertices and a family of edges.
      </div>
      <div style={{
        position: 'absolute',
        marginTop: '10.5%',
        marginLeft: '15%',
      }}>
        <img src={graphDefinition} style={{width: '380%'}} />
      </div>
      <div style={{
        position: 'absolute',
        marginTop: '18%',
        marginLeft: '15%',
      }}>
        <img src={cartesianProduct} style={{width: '380%'}} />
      </div>
      <div style={{
        position: 'absolute',
        marginTop: '12%',
        marginLeft: '75%',
      }}>
        <img src={graphImage} style={{width: '50vw', transform: 'translate(-50%, -50%)'}} />
      </div>
      <div style={{
        position: 'absolute',
        marginTop: '55vh',
        marginLeft: '50%',
        transform: 'translate(-50%, -50%)',
        width: '35%',
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: '2rem',
      }}>
        <button className='start-btn' onClick={() => setPage('application')}>
          <span></span>
          <span></span>
          <span></span>
          <span></span> Next
        </button>
        <button className='skip-btn' onClick={() => setPage('home')}> 
          Skip introduction
        </button>
      </div>
    </div>
  )
}

export default GraphPage