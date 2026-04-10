import { useState, useEffect } from 'react'
import { getOperationHistory, getErrorHistory, getOperationCount } from '../api'
import './HistoryPanel.scss'

const FILTERS = ['compare', 'convert', 'add', 'subtract', 'divide', 'errored']

const FILTER_LABELS = {
  compare: 'Compare',
  convert: 'Convert',
  add: 'Add',
  subtract: 'Subtract',
  divide: 'Divide',
  errored: 'Errors',
}

const FILTER_ICONS = {
  compare: 'compare_arrows',
  convert: 'swap_horiz',
  add: 'add',
  subtract: 'remove',
  divide: 'percent',
  errored: 'error_outline',
}

function HistoryPanel() {
  const [filter, setFilter] = useState('compare')
  const [history, setHistory] = useState([])
  const [counts, setCounts] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchHistory()
  }, [filter])

  useEffect(() => {
    fetchCounts()
  }, [])

  async function fetchCounts() {
    const ops = ['compare', 'convert', 'add', 'subtract', 'divide']
    const results = {}
    for (const op of ops) {
      try {
        results[op] = await getOperationCount(op)
      } catch {
        results[op] = 0
      }
    }
    setCounts(results)
  }

  async function fetchHistory() {
    setLoading(true)
    try {
      let data
      if (filter === 'errored') {
        data = await getErrorHistory()
      } else {
        data = await getOperationHistory(filter)
      }
      setHistory(Array.isArray(data) ? data : [])
    } catch {
      setHistory([])
    }
    setLoading(false)
  }

  function formatEntry(entry) {
    const left = `${entry.thisValue} ${entry.thisUnit}`
    const right = `${entry.thatValue} ${entry.thatUnit}`
    const op = entry.operation || ''

    if (entry.error) {
      return { label: `${left} ${op} ${right}`, result: entry.errorMessage || 'Error', isError: true }
    }

    if (op === 'compare') {
      const equal = entry.resultString === 'true'
      return { label: `${left} vs ${right}`, result: equal ? 'Equal' : 'Not Equal', isError: false }
    }

    return {
      label: `${left} ${op} ${right}`,
      result: `${entry.resultValue} ${entry.resultUnit || ''}`.trim(),
      isError: false,
    }
  }

  return (
    <div className="history-panel">
      <div className="history-filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`history-filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            <span className="material-icons filter-icon">{FILTER_ICONS[f]}</span>
            <span>{FILTER_LABELS[f]}</span>
            {counts[f] !== undefined && (
              <span className="filter-count">{counts[f]}</span>
            )}
          </button>
        ))}
      </div>

      <div className="history-list">
        {loading && <p className="history-empty">Loading...</p>}

        {!loading && history.length === 0 && (
          <p className="history-empty">No history found for this filter.</p>
        )}

        {!loading && history.map((entry, i) => {
          const { label, result, isError } = formatEntry(entry)
          return (
            <div key={i} className={`history-entry ${isError ? 'error' : ''}`}>
              <div className="entry-top">
                <span className="material-icons entry-icon">
                  {isError ? 'error_outline' : FILTER_ICONS[entry.operation] || 'history'}
                </span>
                <span className="entry-label">{label}</span>
              </div>
              <div className={`entry-result ${isError ? 'error' : ''}`}>
                {result}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HistoryPanel
