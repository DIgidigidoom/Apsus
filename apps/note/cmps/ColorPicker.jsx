import { useEffect, useRef, useState } from 'react'

export function ColorPicker({ note, onChangeColor }) {
    const colors = [
      '#fff475', '#f28b82', '#fbbc04', '#ccff90', '#a7ffeb',
      '#cbf0f8', '#aecbfa', '#d7aefb', '#e6c9a8', '#e8eaed', '#ffffff' 
    ]
  
    const [isOpen, setIsOpen] = React.useState(false)
    
  
    return (
      <div className="color-picker-wrapper" onClick={(ev) => ev.stopPropagation()}>
        <button
          className="btn-color-picker"
          onClick={() => setIsOpen(prev => !prev)}
          title="Change note color"
        >
          <i className="fa-solid fa-palette"></i>
        </button>
  
        {isOpen && (
          <div className="color-picker">
            {colors.map(color => (
              <div
                key={color}
                className="color-circle"
                style={{
                  backgroundColor: color,
                  border: color === '#ffffff' ? '1px solid #ccc' : 'none'
                }}
                onClick={() => {
                  onChangeColor(note, color)
                  setIsOpen(false)
                }}
              >
                {color === '#ffffff' && <span className="no-color-x">✕</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
  