import Dropdown from './Dropdown'
import './ConversionPanel.scss'

function ConversionPanel({ value1, setValue1, unit1, setUnit1, unit2, setUnit2, result, units, openDropdown, setOpenDropdown }) {
  return (
    <div className="conversion-row">
      <div className="input-card">
        <label className="input-label">FROM</label>
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
      <div className="input-card">
        <label className="input-label">TO</label>
        <input
          type="text"
          className="value-input result-text"
          value={result}
          readOnly
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
  )
}

export default ConversionPanel