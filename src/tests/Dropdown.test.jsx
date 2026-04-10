import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Dropdown from '../components/Dropdown'

const options = [
  { label: 'Feet', value: 'FEET' },
  { label: 'Inches', value: 'INCHES' },
  { label: 'Yard', value: 'YARD' },
]

describe('Dropdown', () => {
  it('shows the selected option label', () => {
    render(
      <Dropdown options={options} selected="FEET" onSelect={() => {}} isOpen={false} onToggle={() => {}} />
    )
    expect(screen.getByText('Feet')).toBeInTheDocument()
  })

  it('shows raw value if no matching label found', () => {
    render(
      <Dropdown options={options} selected="UNKNOWN" onSelect={() => {}} isOpen={false} onToggle={() => {}} />
    )
    expect(screen.getByText('UNKNOWN')).toBeInTheDocument()
  })

  it('does not show options list when closed', () => {
    render(
      <Dropdown options={options} selected="FEET" onSelect={() => {}} isOpen={false} onToggle={() => {}} />
    )
    expect(screen.queryByText('Inches')).not.toBeInTheDocument()
  })

  it('shows options list when open', () => {
    render(
      <Dropdown options={options} selected="FEET" onSelect={() => {}} isOpen={true} onToggle={() => {}} />
    )
    expect(screen.getByText('Inches')).toBeInTheDocument()
    expect(screen.getByText('Yard')).toBeInTheDocument()
  })

  it('calls onToggle when header is clicked', () => {
    const onToggle = vi.fn()
    render(
      <Dropdown options={options} selected="FEET" onSelect={() => {}} isOpen={false} onToggle={onToggle} />
    )
    fireEvent.click(screen.getByText('Feet'))
    expect(onToggle).toHaveBeenCalledWith(true)
  })

  it('calls onSelect and closes when an option is clicked', () => {
    const onSelect = vi.fn()
    const onToggle = vi.fn()
    render(
      <Dropdown options={options} selected="FEET" onSelect={onSelect} isOpen={true} onToggle={onToggle} />
    )
    fireEvent.click(screen.getByText('Inches'))
    expect(onSelect).toHaveBeenCalledWith('INCHES')
    expect(onToggle).toHaveBeenCalledWith(false)
  })

  it('marks the selected option as active', () => {
    render(
      <Dropdown options={options} selected="FEET" onSelect={() => {}} isOpen={true} onToggle={() => {}} />
    )
    const feetItems = screen.getAllByText('Feet')
    const optionItem = feetItems.find((el) => el.classList.contains('dropdown-item'))
    expect(optionItem).toHaveClass('active')
  })
})
