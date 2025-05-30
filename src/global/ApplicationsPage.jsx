// import './Introduction.css'
import React, { useEffect } from 'react'
import { _nodes, _edges, subjectNames } from '../data'
import { cartesianProduct, graphDefinition, graphImage } from '../assets/images'

import { IoPerson } from "react-icons/io5"
import { FaVirusCovid } from "react-icons/fa6"
import { FaCity } from "react-icons/fa"
import { IoGlobeOutline } from "react-icons/io5"
import { FaNetworkWired } from "react-icons/fa6"
import { IoIosJet } from "react-icons/io"

const π = Math.PI

const ApplicationPage = ({ setPage }) => {

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.key.toLowerCase() === 'arrowleft') {
        setPage('graph-page')
      }
    }

    window.addEventListener('keyup', handleKeyUp)
    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [])

  const icons = [
    IoPerson,
    FaVirusCovid,
    FaCity,
    IoGlobeOutline,
    FaNetworkWired,
    IoIosJet,
  ]

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
        marginTop: '8%',
        textAlign: 'left',
        fontSize: 84,
      }}>
        Applications of graphs
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
        Graphs have applications ranging from social sciences to the military field. They can indeed be used 
        to model social groups, epidemics, computer networks and infrastructures.
      </div>
      <div style={{
        position: 'absolute',
        marginTop: '6%',
        marginLeft: '65%',
      }}>
        {icons.map((Icon, i) => (
          <div
            style={{
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
              left: `${220 * Math.cos((2 * π * i) / 6) + 220}px`,
              top: `${-220 * Math.sin((2 * π * i) / 6) + 220}px`,
              fontSize: 64,
              padding: '8px',
              borderRadius: '50%',
              background: 'linear-gradient(210deg, #ff7ecb, #6a00f4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                backgroundColor: '#18171c',
                borderRadius: '50%',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon />
            </div>
          </div>
        ))}
      </div>
      <div style={{
        position: 'absolute',
        marginTop: '65vh',
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
        <button className='start-btn' onClick={() => setPage('statistics')}>
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

export default ApplicationPage