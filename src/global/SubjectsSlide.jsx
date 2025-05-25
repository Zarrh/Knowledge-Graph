// import './Introduction.css'
import React, { useState } from 'react'
import { nodes, edges, subjectNames, subjectIcons, subjectsColors } from '../data'
import { AnimatePresence, motion } from 'framer-motion'

const countNodes = (nodes) => {
  const nodesPerSubject = new Object()

  for (const node of nodes) {
    if (!node.subject) {
      continue
    }
    if (Object.keys(nodesPerSubject).includes(node.subject)) {
      nodesPerSubject[node.subject]++
      continue
    }
    nodesPerSubject[node.subject] = 1
  }

  return nodesPerSubject
}

const SubjectsSlide = ({ setPage }) => {

  const [advance, setAdvance] = useState(0)
  const nodesPerSubject = countNodes(nodes)

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
        The subjects: {advance ? "nodes" : ""}
      </div>
      <div style={{
        marginTop: '5vh',
        width: '48%',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        display: 'grid',
        gridTemplateColumns: '15% 15% 15% 15%',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: '12rem',
        rowGap: '2rem',
        fontSize: 26,
        maxHeight: '60%',
      }}>
        {Object.keys(subjectNames).map((subj, index) => {
          const Icon = subjectIcons[subj]
           return (
              <div key={index} style={{
                display: 'grid',
                rowGap: '8px',
                gridTemplateRows: '30% 20% 20%',
                alignItems: 'center',
              }}>
                <AnimatePresence mode="wait">
                  {advance ? (
                    <motion.div
                      key="number"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1.0 }}
                      style={{ fontSize: 68, color: subjectsColors[subj] || '#ae00ff', opacity: 0.7 }}
                    >
                      {nodesPerSubject[subj] || ""}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="icon"
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 1.0 }}
                      style={{ fontSize: 68, color: subjectsColors[subj] || '#ae00ff', opacity: 0.7 }}
                    >
                      {Icon && <Icon />}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div style={{
                  height: '4px',
                  width: '100%',
                  backgroundColor: subjectsColors[subj] || '#ae00ff',
                  marginBottom: '1rem',
                  borderRadius: '20px',
                  opacity: 0.7
                }} />

                <div style={{ fontSize: 28 }}>
                  {subjectNames[subj]}
                </div>
              </div>
            )
        })}
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
        <button className='start-btn' onClick={advance ? () => setPage('home') : () => setAdvance(1)}>
          <span></span>
          <span></span>
          <span></span>
          <span></span> {advance ? "Get started" : "Next"}
        </button>
        <button className='skip-btn' onClick={() => setPage('home')}> 
          Skip introduction
        </button>
      </div>
    </div>
  )
}

export default SubjectsSlide