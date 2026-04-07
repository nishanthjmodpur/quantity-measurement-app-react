import { UNITS, TYPE_ICONS } from '../constants'
import './TypeSelector.scss'

function TypeSelector({ selected, onSelect }) {
  return (
    <section className="type-section">
      <h2 className="section-title">CHOOSE TYPE</h2>
      <div className="type-cards">
        {Object.keys(UNITS).map((t) => (
          <div
            key={t}
            className={`type-card ${selected === t ? 'selected' : ''}`}
            onClick={() => onSelect(t)}
          >
            <span className="type-icon">{TYPE_ICONS[t]}</span>
            <span className="type-label">{t.charAt(0).toUpperCase() + t.slice(1)}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TypeSelector