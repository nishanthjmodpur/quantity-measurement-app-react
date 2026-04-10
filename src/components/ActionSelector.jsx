import GooeyNav from '../reactbits/GooeyNav'
import './ActionSelector.scss'

const ACTIONS = ['comparison', 'conversion', 'arithmetic']

const NAV_ITEMS = ACTIONS.map((a) => ({
  label: a.charAt(0).toUpperCase() + a.slice(1),
  href: '#',
}))

function ActionSelector({ selected, onSelect }) {
  const activeIndex = ACTIONS.indexOf(selected)

  return (
    <section className="action-section">
      <h2 className="section-title">CHOOSE ACTION</h2>
      <div className="action-nav-wrapper">
        <GooeyNav
          items={NAV_ITEMS}
          initialActiveIndex={activeIndex >= 0 ? activeIndex : 0}
          onItemClick={(index) => onSelect(ACTIONS[index])}
          particleCount={10}
          animationTime={500}
          colors={[1, 2, 3, 1, 2]}
        />
      </div>
    </section>
  )
}

export default ActionSelector
