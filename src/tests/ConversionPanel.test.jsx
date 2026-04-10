import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ConversionPanel from '../components/ConversionPanel'

const units = [
  { label: 'Feet', value: 'FEET' },
  { label: 'Inches', value: 'INCHES' },
]

const defaultProps = {
  value1: 1,
  setValue1: vi.fn(),
  unit1: 'FEET',
  setUnit1: vi.fn(),
  unit2: 'INCHES',
  setUnit2: vi.fn(),
  result: '12',
  units,
  openDropdown: null,
  setOpenDropdown: vi.fn(),
}

describe('ConversionPanel', () => {
  it('renders FROM and TO labels', () => {
    render(<ConversionPanel {...defaultProps} />)
    expect(screen.getByText('FROM')).toBeInTheDocument()
    expect(screen.getByText('TO')).toBeInTheDocument()
  })

  it('shows the input value', () => {
    render(<ConversionPanel {...defaultProps} />)
    expect(screen.getByDisplayValue('1')).toBeInTheDocument()
  })

  it('shows the result value', () => {
    render(<ConversionPanel {...defaultProps} result="12" />)
    expect(screen.getByDisplayValue('12')).toBeInTheDocument()
  })

  it('result input is read-only', () => {
    render(<ConversionPanel {...defaultProps} />)
    const resultInput = screen.getByDisplayValue('12')
    expect(resultInput).toHaveAttribute('readOnly')
  })

  it('renders dropdowns for both units', () => {
    render(<ConversionPanel {...defaultProps} />)
    const feetElements = screen.getAllByText('Feet')
    expect(feetElements.length).toBeGreaterThan(0)
    expect(screen.getByText('Inches')).toBeInTheDocument()
  })

  it('shows empty result when no conversion done', () => {
    render(<ConversionPanel {...defaultProps} result="" />)
    const inputs = screen.getAllByRole('textbox')
    const resultInput = inputs.find((i) => i.hasAttribute('readOnly'))
    expect(resultInput.value).toBe('')
  })
})
