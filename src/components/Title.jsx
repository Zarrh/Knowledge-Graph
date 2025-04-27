import React from 'react'

const Title = ({ x, y, children }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        opacity: 0.25,
        zIndex: 0,
        fontSize: 120,
        fontFamily: "azonix",
        letterSpacing: '50px',
        padding: '0 20px',
        whiteSpace: 'nowrap',
      }}
    >
      {children.toUpperCase()}
    </div>
  )
}

export default Title