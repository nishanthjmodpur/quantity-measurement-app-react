import Dropdown from './Dropdown'
import './ComparisonPanel.scss'

function ComparisonPanel({
  value1, setValue1, value2, setValue2,
  unit1, setUnit1, unit2, setUnit2,
  result, units, openDropdown, setOpenDropdown,
}) {
  const isEqual = result === 'true'
  const hasResult = result === 'true' || result === 'false'

  return (
    <>
      <div className="comparison-row">
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

        <span className="vs-label">vs</span>

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

      <div className={`compare-result-card ${hasResult ? (isEqual ? 'equal' : 'not-equal') : ''}`}>
        <span className="result-label">RESULT</span>
        <div className="compare-result-text">
          {hasResult
            ? isEqual
              ? 'Value 1 is equal to Value 2'
              : 'Value 1 is not equal to Value 2'
            : result || '—'
          }
        </div>
      </div>
    </>
  )
}

export default ComparisonPanel