// import './Introduction.css'
import React, { useEffect } from 'react'
import { _nodes, _edges, subjectNames } from '../data'
import { getNlinksPerNode } from '../functions'
import { DistributionChart } from '../components'

const KDistribution = ({ setPage }) => {

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.key.toLowerCase() === 'arrowleft') {
        setPage('statistics')
      }
    }

    window.addEventListener('keyup', handleKeyUp)
    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [])

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
        Degree distribution:
      </div>
      <div style={{
        marginTop: '5vh',
        width: '60%',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 26,
      }}>
        <DistributionChart data={getNlinksPerNode(_nodes, _edges)} />
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

export default KDistribution