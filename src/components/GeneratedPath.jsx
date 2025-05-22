import React from 'react'
import { subjectsColors, subjectIcons } from '../data'

const GeneratedPath = ({ nodes }) => {
  return (
    <div 
      style={{
        textAlign: 'justify',
        width: '100%',
        maxHeight: '80vh',
        overflowY: 'auto',
        paddingRight: '12px',
      }}
    >
      {nodes.map((node, index) => {
        const Icon = subjectIcons[node.subject]
        return (
          <div key={index} style={{padding: '2px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', gap: '20px'}}>
              <h2 style={{width: '50%', opacity: 0.9, fontSize: 28, fontWeight: 'bold'}}>{node.title}</h2>
              <div style={{
                color: subjectsColors[node.subject] ?? 'white', 
                fontSize: 28, display: 'flex', 
                alignItems: 'center'
              }}>
                {Icon ? <Icon /> : node.subject}
              </div>
            </div>
            <div style={{
              width: '100%',
              height: '2px',
              backgroundImage: `linear-gradient(to right, ${subjectsColors[node.subject] ?? 'white'}, white)`,
            }}>
            </div>
            <div style={{
              width: '100%',
              paddingTop: '20px',
              fontSize: 18,
            }}>
              {node.isAI && "✤ "}
              {node.content}
            </div>
          </div>
        )})}
    </div>
  )
}

export default GeneratedPath