import React from 'react'
import { subjectsColors, subjectIcons } from '../data'

const ActiveSubjects = ({ hoveredSubject=null, setHoveredSubject=() => {}, activeSubjects, setActiveSubjects }) => {

  const subjectKeys = Object.keys(subjectsColors)

  const handleClick = (subject) => {
    if (activeSubjects.includes(subject)) {
      setActiveSubjects(activeSubjects.filter(subj => subj !== subject))
      return
    }
    setActiveSubjects(content => [...content, subject])
  }

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
      {subjectKeys.map((subj, index) => {
        const Icon = subjectIcons[subj]
        return (
          <div key={index} onClick={() => handleClick(subj)} onMouseEnter={() => setHoveredSubject(subj)} onMouseLeave={() => setHoveredSubject(null)} style={{zIndex: 200, cursor: 'grab'}}>
            {Icon && <Icon style={{color: subjectsColors[subj] && activeSubjects.includes(subj) ? subjectsColors[subj] : 'white', fontSize: 32, opacity: hoveredSubject === subj ? 1.0 : 0.7}} />}
          </div>
        )
      })}
    </div>
  )
}

export default ActiveSubjects