import React from 'react'
import { activeSubjects, subjectsColors, subjectIcons } from '../data'

const ActiveSubjects = ({ hoveredSubject=null, setHoveredSubject=() => {} }) => {
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
      {activeSubjects.map((subj, index) => {
        const Icon = subjectIcons[subj]
        return (
          <div key={index} onMouseEnter={() => setHoveredSubject(subj)} onMouseLeave={() => setHoveredSubject(null)} style={{zIndex: 200, cursor: 'grab'}}>
            {Icon && <Icon style={{color: subjectsColors[subj] ?? 'white', fontSize: 32, opacity: hoveredSubject === subj ? 1.0 : 0.7}} />}
            {/* <span style={{fontWeight: 'bold', fontSize: 26, color: subjectsColors[subj] ?? 'white', opacity: 0.7}}>
              {subj}
            </span> */}
          </div>
        )
      })}
    </div>
  )
}

export default ActiveSubjects