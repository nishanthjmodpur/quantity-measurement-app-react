import { useState } from 'react'
import Dropdown from './Dropdown'
import { OPERATORS } from '../constants'
import './ArithmeticPanel.scss'

function ArithmeticPanel({
  value1, setValue1, value2, setValue2,
  unit1, setUnit1, unit2, setUnit2,
  operator, setOperator,
  result, resultUnit, setResultUnit,
  units, openDropdown, setOpenDropdown,
}) {
  const [showOpDropdown, setShowOpDropdown] = useState(false)

  return (
    <>
      <div className="arithmetic-row">
        <div className="input-card">
          <label className="input-label">VALUE 1</label>
          <input
            type="number"
            className="value-input"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
          />
          <Dropdown
            options={units}
            selected={unit1}
            onSelect={setUnit1}
            isOpen={openDropdown === 'unit1'}
            onToggle={(open) => setOpenDropdown(open ? 'unit1' : null)}
          />
        </div>

        <div className="operator-group">
          <div
            className="operator-display"
            onClick={() => setShowOpDropdown(!showOpDropdown)}
          >
            {operator}
          </div>
          {showOpDropdown && (
            <div className="operator-dropdown">
              {OPERATORS.map((op) => (
                <div
                  key={op}
                  className={`operator-item ${op === operator ? 'active' : ''}`}
                  onClick={() => { setOperator(op); setShowOpDropdown(false) }}
                >
                  {op}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="input-card">
          <label className="input-label">VALUE 2</label>
          <input
            type="number"
            className="value-input"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
          />
          <Dropdown
            options={units}
            selected={unit2}
            onSelect={setUnit2}
            isOpen={openDropdown === 'unit2'}
            onToggle={(open) => setOpenDropdown(open ? 'unit2' : null)}
          />
        </div>
      </div>

      <div className="result-card">
        <span className="result-label">RESULT</span>
        <div className="result-row">
          <span className="result-value">{result}</span>
          <Dropdown
            options={units}
            selected={resultUnit}
            onSelect={setResultUnit}
            isOpen={openDropdown === 'resultUnit'}
            onToggle={(open) => setOpenDropdown(open ? 'resultUnit' : null)}
          />
        </div>
      </div>
    </>
  )
}

export default ArithmeticPanel
