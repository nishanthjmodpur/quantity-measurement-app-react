import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TypeSelector from '../components/TypeSelector'

describe('TypeSelector', () => {
  it('renders all four type cards', () => {
    render(<TypeSelector selected="length" onSelect={() => {}} />)
    expect(screen.getByText('Length')).toBeInTheDocument()
    expect(screen.getByText('Weight')).toBeInTheDocument()
    expect(screen.getByText('Temperature')).toBeInTheDocument()
    expect(screen.getByText('Volume')).toBeInTheDocument()
  })

  it('renders CHOOSE TYPE heading', () => {
    render(<TypeSelector selected="length" onSelect={() => {}} />)
    expect(screen.getByText('CHOOSE TYPE')).toBeInTheDocument()
  })

  it('highlights the selected type', () => {
    const { container } = render(<TypeSelector selected="weight" onSelect={() => {}} />)
    const selectedCard = container.querySelector('.type-card.selected')
    expect(selectedCard).toBeInTheDocument()
    expect(selectedCard.textContent).toContain('Weight')
  })

  it('calls onSelect when a card is clicked', () => {
    const onSelect = vi.fn()
    render(<TypeSelector selected="length" onSelect={onSelect} />)
    fireEvent.click(screen.getByText('Temperature'))
    expect(onSelect).toHaveBeenCalledWith('temperature')
  })

  it('only one card is selected at a time', () => {
    const { container } = render(<TypeSelector selected="volume" onSelect={() => {}} />)
    const selectedCards = container.querySelectorAll('.type-card.selected')
    expect(selectedCards).toHaveLength(1)
  })
})
