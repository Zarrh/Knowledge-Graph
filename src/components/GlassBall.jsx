import React from 'react'

const GlassBall = ({ x, y, rev=false, radius, from, to }) => {
  return (
    <div 
      style={{
        position: 'absolute',
        left: !rev ? x : undefined,
        top: !rev ? y : undefined,
        right: rev ? x : undefined,
        bottom: rev ? y : undefined,
        width: radius,
        height: radius,
        borderRadius: '50%',
        // backgroundColor: 'white',
        background: `radial-gradient(circle at 30% 50%, ${from}, ${to})`,
        boxShadow: `10px 10px 30px ${to}`,
        overflow: 'hidden',
      }}
    >
    </div>
  )
}

export default GlassBall