import GooeyNav from '../reactbits/GooeyNav'
import './Header.scss'

const ACTIONS = ['comparison', 'conversion', 'arithmetic', 'history']

const NAV_ITEMS = ACTIONS.map((a) => ({
  label: a.charAt(0).toUpperCase() + a.slice(1),
  href: '#',
}))

function Header({ action, onSelectAction, theme, onToggleTheme }) {
  const activeIndex = ACTIONS.indexOf(action)

  return (
    <header className="header">
      <span className="app-name" onClick={() => onSelectAction(null)}>Quantity Measurement</span>
      <div className="header-right">
        <div className="nav-pill">
          <GooeyNav
            items={NAV_ITEMS}
            initialActiveIndex={activeIndex}
            onItemClick={(index) => onSelectAction(ACTIONS[index])}
            particleCount={10}
            animationTime={500}
            colors={[1, 2, 3, 1, 2]}
          />
        </div>
        <button className="theme-toggle" onClick={onToggleTheme}>
          <span className="material-icons">
            {theme === 'light' ? 'dark_mode' : 'light_mode'}
          </span>
        </button>
      </div>
    </header>
  )
}

export default Header
