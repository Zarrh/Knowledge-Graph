import React from 'react'
import { subjectsColors, subjectIcons } from '../data'

const GeneratedRelevantNodes = ({ nodes, linksPerNode, activeSubjects }) => {
  return (
    <div 
      style={{
        textAlign: 'justify',
        width: '100%',
        maxHeight: '75vh',
        overflowY: 'auto',
        paddingRight: '12px',
      }}
    >
      {activeSubjects.map((subj, index) => {
        const Icon = subjectIcons[subj]

        const subjNodes = nodes.filter((node) => node.subject === subj)

        const highestLinkedNode = subjNodes
          .filter(node => linksPerNode[node.id] !== undefined)
          .reduce((maxNode, node) => {
            if (!maxNode) return node
            return linksPerNode[node.id] > linksPerNode[maxNode.id] ? node : maxNode
          }, null)

        const highestLinkedNodeId = highestLinkedNode ? highestLinkedNode.id : null

        return (
          <div key={index} style={{padding: '2px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', gap: '20px'}}>
              <div style={{
                color: subjectsColors[subj] ?? 'white', 
                fontSize: 26, 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'start',
                gap: '4px'
              }}>
                {Icon ? <Icon /> : subj}
                <span>: {linksPerNode[highestLinkedNodeId]}</span>
              </div>
              <h2 style={{width: '60%', opacity: 0.9, fontSize: 20, fontWeight: 'bold'}}>
                {nodes.find(node => node.id === highestLinkedNodeId)?.title ?? "Not found"}
              </h2>
            </div>
          </div>
        )})}
    </div>
  )
}

export default GeneratedRelevantNodes