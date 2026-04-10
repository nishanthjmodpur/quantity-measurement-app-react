import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ComparisonPanel from '../components/ComparisonPanel'

const units = [
  { label: 'Feet', value: 'FEET' },
  { label: 'Inches', value: 'INCHES' },
]

const defaultProps = {
  value1: 1,
  setValue1: vi.fn(),
  value2: 12,
  setValue2: vi.fn(),
  unit1: 'FEET',
  setUnit1: vi.fn(),
  unit2: 'INCHES',
  setUnit2: vi.fn(),
  result: '',
  units,
  openDropdown: null,
  setOpenDropdown: vi.fn(),
}

describe('ComparisonPanel', () => {
  it('renders two value inputs', () => {
    render(<ComparisonPanel {...defaultProps} />)
    const inputs = screen.getAllByRole('spinbutton')
    expect(inputs).toHaveLength(2)
    expect(inputs[0]).toHaveValue(1)
    expect(inputs[1]).toHaveValue(12)
  })

  it('renders VALUE 1 and VALUE 2 labels', () => {
    render(<ComparisonPanel {...defaultProps} />)
    expect(screen.getByText('VALUE 1')).toBeInTheDocument()
    expect(screen.getByText('VALUE 2')).toBeInTheDocument()
  })

  it('renders the vs label', () => {
    render(<ComparisonPanel {...defaultProps} />)
    expect(screen.getByText('vs')).toBeInTheDocument()
  })

  it('shows dash when result is empty', () => {
    render(<ComparisonPanel {...defaultProps} result="" />)
    expect(screen.getByText('—')).toBeInTheDocument()
  })

  it('shows "equal" message when result is true', () => {
    render(<ComparisonPanel {...defaultProps} result="true" />)
    expect(screen.getByText('Value 1 is equal to Value 2')).toBeInTheDocument()
  })

  it('shows "not equal" message when result is false', () => {
    render(<ComparisonPanel {...defaultProps} result="false" />)
    expect(screen.getByText('Value 1 is not equal to Value 2')).toBeInTheDocument()
  })

  it('shows error message as result text', () => {
    render(<ComparisonPanel {...defaultProps} result="Something went wrong" />)
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('calls setValue1 on input change', () => {
    const setValue1 = vi.fn()
    render(<ComparisonPanel {...defaultProps} setValue1={setValue1} />)
    fireEvent.change(screen.getAllByRole('spinbutton')[0], { target: { value: '5' } })
    expect(setValue1).toHaveBeenCalled()
  })

  it('applies equal class when result is true', () => {
    const { container } = render(<ComparisonPanel {...defaultProps} result="true" />)
    const resultCard = container.querySelector('.compare-result-card')
    expect(resultCard).toHaveClass('equal')
  })

  it('applies not-equal class when result is false', () => {
    const { container } = render(<ComparisonPanel {...defaultProps} result="false" />)
    const resultCard = container.querySelector('.compare-result-card')
    expect(resultCard).toHaveClass('not-equal')
  })
})
