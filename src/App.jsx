import { useState, useEffect } from 'react'
import Header from './components/Header'
import TypeSelector from './components/TypeSelector'
import ComparisonPanel from './components/ComparisonPanel'
import ConversionPanel from './components/ConversionPanel'
import ArithmeticPanel from './components/ArithmeticPanel'
import HistoryPanel from './components/HistoryPanel'
import { UNITS, MEASUREMENT_TYPES, OPERATOR_TO_ENDPOINT } from './constants'
import { compareQuantities, convertQuantity, addQuantities, subtractQuantities, divideQuantities } from './api'
import './App.scss'

function App() {
  const [theme, setTheme] = useState('light')
  const [type, setType] = useState('length')
  const [action, setAction] = useState(null)
  const [value1, setValue1] = useState(1)
  const [value2, setValue2] = useState(1)
  const [unit1, setUnit1] = useState('FEET')
  const [unit2, setUnit2] = useState('INCHES')
  const [operator, setOperator] = useState('+')
  const [result, setResult] = useState('')
  const [resultUnit, setResultUnit] = useState('FEET')
  const [openDropdown, setOpenDropdown] = useState(null)

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    const units = UNITS[type]
    setUnit1(units[0].value)
    setUnit2(units[1]?.value || units[0].value)
    setResultUnit(units[0].value)
    setResult('')
  }, [type])

  useEffect(() => {
    setResult('')
  }, [action])

  useEffect(() => {
    handleCalculate()
  }, [value1, value2, unit1, unit2, action, operator, type])

  async function handleCalculate() {
    if (!action || action === 'history') return

    const measurementType = MEASUREMENT_TYPES[type]
    const thisQty = { value: Number(value1), unit: unit1, measurementType }
    const thatQty = { value: Number(value2), unit: unit2, measurementType }

    try {
      let data
      if (action === 'comparison') {
        data = await compareQuantities(thisQty, thatQty)
      } else if (action === 'conversion') {
        data = await convertQuantity(thisQty, thatQty)
      } else if (action === 'arithmetic') {
        const op = OPERATOR_TO_ENDPOINT[operator]
        if (op === 'add') data = await addQuantities(thisQty, thatQty)
        else if (op === 'subtract') data = await subtractQuantities(thisQty, thatQty)
        else if (op === 'divide') data = await divideQuantities(thisQty, thatQty)
      }

      if (data?.error) {
        setResult(data.errorMessage || 'Error')
      } else if (action === 'comparison') {
        setResult(data?.resultString ?? '')
      } else {
        setResult(data?.resultValue ?? '')
      }
    } catch {
      setResult('—')
    }
  }

  const units = UNITS[type]

  return (
    <div className="app" data-theme={theme}>
      <Header
        action={action}
        onSelectAction={setAction}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main className="main">
        {!action && (
          <div className="home-section">
            <h1 className="home-title">Welcome to Quantity Measurement</h1>
            <p className="home-caption">Choose an action from the navigation bar to get started</p>
          </div>
        )}

        {action && action !== 'history' && (
          <TypeSelector selected={type} onSelect={setType} />
        )}

        <section className="input-section">
          {action === 'comparison' && (
            <ComparisonPanel
              value1={value1} setValue1={setValue1}
              value2={value2} setValue2={setValue2}
              unit1={unit1} setUnit1={setUnit1}
              unit2={unit2} setUnit2={setUnit2}
              result={result} units={units}
              openDropdown={openDropdown} setOpenDropdown={setOpenDropdown}
            />
          )}
          {action === 'conversion' && (
            <ConversionPanel
              value1={value1} setValue1={setValue1}
              unit1={unit1} setUnit1={setUnit1}
              unit2={unit2} setUnit2={setUnit2}
              result={result} units={units}
              openDropdown={openDropdown} setOpenDropdown={setOpenDropdown}
            />
          )}
          {action === 'arithmetic' && (
            <ArithmeticPanel
              value1={value1} setValue1={setValue1}
              value2={value2} setValue2={setValue2}
              unit1={unit1} setUnit1={setUnit1}
              unit2={unit2} setUnit2={setUnit2}
              operator={operator} setOperator={setOperator}
              result={result}
              resultUnit={resultUnit} setResultUnit={setResultUnit}
              units={units}
              openDropdown={openDropdown} setOpenDropdown={setOpenDropdown}
            />
          )}
          {action === 'history' && (
            <HistoryPanel />
          )}
        </section>
      </main>
    </div>
  )
}

export default App