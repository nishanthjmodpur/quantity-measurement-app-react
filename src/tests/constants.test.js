import { describe, it, expect } from 'vitest'
import { UNITS, MEASUREMENT_TYPES, TYPE_ICONS, OPERATORS, OPERATOR_TO_ENDPOINT } from '../constants'

describe('UNITS', () => {
  it('has all four measurement types', () => {
    expect(Object.keys(UNITS)).toEqual(['length', 'weight', 'temperature', 'volume'])
  })

  it('each type has at least one unit with label and value', () => {
    for (const type of Object.keys(UNITS)) {
      expect(UNITS[type].length).toBeGreaterThan(0)
      for (const unit of UNITS[type]) {
        expect(unit).toHaveProperty('label')
        expect(unit).toHaveProperty('value')
      }
    }
  })

  it('length has correct units', () => {
    const values = UNITS.length.map((u) => u.value)
    expect(values).toEqual(['FEET', 'INCHES', 'YARD', 'CENTIMETER'])
  })

  it('weight has correct units', () => {
    const values = UNITS.weight.map((u) => u.value)
    expect(values).toEqual(['KILOGRAM', 'GRAM', 'TONNE'])
  })

  it('temperature has correct units', () => {
    const values = UNITS.temperature.map((u) => u.value)
    expect(values).toEqual(['FAHRENHEIT', 'CELSIUS'])
  })

  it('volume has correct units', () => {
    const values = UNITS.volume.map((u) => u.value)
    expect(values).toEqual(['GALLON', 'LITRE', 'MILLILITRE'])
  })
})

describe('MEASUREMENT_TYPES', () => {
  it('maps each type to the correct API enum', () => {
    expect(MEASUREMENT_TYPES.length).toBe('LengthUnit')
    expect(MEASUREMENT_TYPES.weight).toBe('WeightUnit')
    expect(MEASUREMENT_TYPES.temperature).toBe('TemperatureUnit')
    expect(MEASUREMENT_TYPES.volume).toBe('VolumeUnit')
  })
})

describe('TYPE_ICONS', () => {
  it('has an icon for every measurement type', () => {
    for (const type of Object.keys(UNITS)) {
      expect(TYPE_ICONS[type]).toBeDefined()
    }
  })
})

describe('OPERATORS', () => {
  it('has three operators', () => {
    expect(OPERATORS).toEqual(['+', '-', '÷'])
  })
})

describe('OPERATOR_TO_ENDPOINT', () => {
  it('maps + to add', () => {
    expect(OPERATOR_TO_ENDPOINT['+']).toBe('add')
  })

  it('maps - to subtract', () => {
    expect(OPERATOR_TO_ENDPOINT['-']).toBe('subtract')
  })

  it('maps ÷ to divide', () => {
    expect(OPERATOR_TO_ENDPOINT['÷']).toBe('divide')
  })
})
