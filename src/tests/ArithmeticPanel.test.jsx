import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ArithmeticPanel from '../components/ArithmeticPanel'

const units = [
  { label: 'Feet', value: 'FEET' },
  { label: 'Inches', value: 'INCHES' },
]

const defaultProps = {
  value1: 10,
  setValue1: vi.fn(),
  value2: 5,
  setValue2: vi.fn(),
  unit1: 'FEET',
  setUnit1: vi.fn(),
  unit2: 'FEET',
  setUnit2: vi.fn(),
  operator: '+',
  setOperator: vi.fn(),
  result: '15',
  resultUnit: 'FEET',
  setResultUnit: vi.fn(),
  units,
  openDropdown: null,
  setOpenDropdown: vi.fn(),
}

describe('ArithmeticPanel', () => {
  it('renders two value inputs', () => {
    render(<ArithmeticPanel {...defaultProps} />)
    const inputs = screen.getAllByRole('spinbutton')
    expect(inputs).toHaveLength(2)
    expect(inputs[0]).toHaveValue(10)
    expect(inputs[1]).toHaveValue(5)
  })

  it('renders VALUE 1 and VALUE 2 labels', () => {
    render(<ArithmeticPanel {...defaultProps} />)
    expect(screen.getByText('VALUE 1')).toBeInTheDocument()
    expect(screen.getByText('VALUE 2')).toBeInTheDocument()
  })

  it('displays the current operator', () => {
    render(<ArithmeticPanel {...defaultProps} operator="÷" />)
    expect(screen.getByText('÷')).toBeInTheDocument()
  })

  it('shows result', () => {
    render(<ArithmeticPanel {...defaultProps} />)
    expect(screen.getByText('15')).toBeInTheDocument()
  })

  it('shows operator dropdown on click', () => {
    render(<ArithmeticPanel {...defaultProps} />)
    fireEvent.click(screen.getByText('+'))
    expect(screen.getByText('-')).toBeInTheDocument()
    expect(screen.getByText('÷')).toBeInTheDocument()
  })

  it('calls setOperator when an operator is picked', () => {
    const setOperator = vi.fn()
    render(<ArithmeticPanel {...defaultProps} setOperator={setOperator} />)
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('-'))
    expect(setOperator).toHaveBeenCalledWith('-')
  })

  it('calls setValue1 on first input change', () => {
    const setValue1 = vi.fn()
    render(<ArithmeticPanel {...defaultProps} setValue1={setValue1} />)
    fireEvent.change(screen.getAllByRole('spinbutton')[0], { target: { value: '20' } })
    expect(setValue1).toHaveBeenCalled()
  })
})
