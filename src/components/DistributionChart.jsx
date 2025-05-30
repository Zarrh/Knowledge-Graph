import React from 'react'

const DistributionChart = ({ data }) => {

  const valueCounts = {}
  Object.values(data).forEach(value => {
    const stringValue = String(value)
    valueCounts[stringValue] = (valueCounts[stringValue] || 0) + 1
  })

  const sortedValues = Object.keys(valueCounts).sort((a, b) => {
    const numA = Number(a)
    const numB = Number(b)
    if (isNaN(numA) || isNaN(numB)) {
      return a.localeCompare(b)
    }
    return numA - numB
  })

  const maxFrequency = Math.max(...Object.values(valueCounts))

  return (
    <div style={{ width: '100%', height: '500px', padding: '20px', boxSizing: 'border-box', borderRadius: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', height: 'calc(100% - 30px)' }}>
        {sortedValues.map((value) => {
          const heightPercent = (valueCounts[value] / maxFrequency) * 100
          return (
            <div key={value} style={{ flex: 1, margin: '0 5px', textAlign: 'center', display: 'flex', flexDirection: 'column-reverse', justifyContent: 'flex-start' }}>
              <div style={{ marginTop: '5px', fontSize: '0.8em' }}>{value}</div>
              <div
                style={{
                  height: `${heightPercent*3}px`,
                  background: 'linear-gradient(#ff7ecb 20%, #6a00f4 80%)',
                  borderRadius: '4px',
                }}
                title={`Value: ${value}, Frequency: ${valueCounts[value]}`}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DistributionChart