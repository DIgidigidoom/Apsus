import { useEffect, useRef, useState } from 'react'

export function ColorPicker({ note, onChangeColor, setIsOpen }) {

  return (
    <div className="color-picker-wrapper" onClick={(ev) => ev.stopPropagation()}>
      <button
        className="btn-color-picker"
        onClick={(ev) => {
          ev.stopPropagation() 
          setIsOpen(prev => !prev)
        }}
        title="Change note color"
      >
        <i className="fa-solid fa-palette"></i>
      </button>
    </div>
  )
}
