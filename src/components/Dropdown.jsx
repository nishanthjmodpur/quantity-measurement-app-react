import { useEffect, useRef } from 'react'
import './Dropdown.scss'

function Dropdown({ options, selected, onSelect, isOpen, onToggle }) {
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onToggle(false)
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onToggle])

  const selectedLabel = options.find((o) => o.value === selected)?.label || selected

  return (
    <div className="dropdown" ref={ref}>
      <div className="dropdown-header" onClick={() => onToggle(!isOpen)}>
        <span>{selectedLabel}</span>
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </div>
      {isOpen && (
        <div className="dropdown-list">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`dropdown-item ${opt.value === selected ? 'active' : ''}`}
              onClick={() => { onSelect(opt.value); onToggle(false) }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dropdown