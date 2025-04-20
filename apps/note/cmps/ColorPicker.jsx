import { useEffect, useRef, useState } from 'react'

export function ColorPicker({ note, onChangeColor, setIsOpen }) {
  // const [isOpen, setIsOpen] = React.useState(false)


  return (
    <div className="color-picker-wrapper" onClick={(ev) => ev.stopPropagation()}>
      <button
        className="btn-color-picker"
        onClick={() => setIsOpen(prev => !prev)}
        title="Change note color"
      >
        <i className="fa-solid fa-palette"></i>
      </button>

      {/* {isOpen && (
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
      )} */}
    </div>
  )
}
