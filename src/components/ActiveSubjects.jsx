import React from 'react'
import { activeSubjects, subjectsColors } from '../data'

const ActiveSubjects = () => {
  return (
    <div
      style={{
        textAlign: 'left',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      {/* <h2>Subjects:</h2> */}
      {activeSubjects.map((subj, index) => (
        <div key={index}>
          <span style={{fontWeight: 'bold', fontSize: 26, color: subjectsColors[subj] ?? 'white', opacity: 0.7}}>
            {subj}
          </span>
        </div>
      ))}
    </div>
  )
}

export default ActiveSubjects