import React from 'react'

const ColoredLine = ({ color, margin }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: '2px',
      marginLeft: margin,
      marginRight: margin,
      marginTop: '25px'
    }}
  />
)

export default ColoredLine
