export const UNITS = {
  length: [
    { label: 'Feet', value: 'FEET' },
    { label: 'Inches', value: 'INCHES' },
    { label: 'Yard', value: 'YARD' },
    { label: 'Centimeter', value: 'CENTIMETER' },
  ],
  weight: [
    { label: 'Kilogram', value: 'KILOGRAM' },
    { label: 'Gram', value: 'GRAM' },
    { label: 'Tonne', value: 'TONNE' },
  ],
  temperature: [
    { label: 'Fahrenheit', value: 'FAHRENHEIT' },
    { label: 'Celsius', value: 'CELSIUS' },
  ],
  volume: [
    { label: 'Gallon', value: 'GALLON' },
    { label: 'Litre', value: 'LITRE' },
    { label: 'Millilitre', value: 'MILLILITRE' },
  ],
}

export const MEASUREMENT_TYPES = {
  length: 'LengthUnit',
  weight: 'WeightUnit',
  temperature: 'TemperatureUnit',
  volume: 'VolumeUnit',
}

export const TYPE_ICONS = {
  length: '📏',
  weight: '⚖️',
  temperature: '🌡️',
  volume: '🧪',
}

export const OPERATORS = ['+', '-', '×', '÷']

export const OPERATOR_TO_ENDPOINT = {
  '+': 'add',
  '-': 'subtract',
  '÷': 'divide',
}