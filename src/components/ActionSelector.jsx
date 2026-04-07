import './ActionSelector.scss'

const ACTIONS = ['comparison', 'conversion', 'arithmetic']

function ActionSelector({ selected, onSelect }) {
  return (
    <section className="action-section">
      <h2 className="section-title">CHOOSE ACTION</h2>
      <div className="action-cards">
        {ACTIONS.map((a) => (
          <button
            key={a}
            className={`action-btn ${selected === a ? 'active' : ''}`}
            onClick={() => onSelect(a)}
          >
            {a.charAt(0).toUpperCase() + a.slice(1)}
          </button>
        ))}
      </div>
    </section>
  )
}

export default ActionSelector