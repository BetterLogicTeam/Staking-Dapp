import React from 'react'
import Canvas_contant from '../Canvas_contant/Canvas_contant'

function Canvas() {
  return (
    <div>
            {[ 'end'].map((placement, idx) => (
        <Canvas_contant key={idx} placement={placement} name={placement} />
      ))}
    
    </div>
  )
}

export default Canvas
