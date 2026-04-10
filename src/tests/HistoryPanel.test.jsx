import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import HistoryPanel from '../components/HistoryPanel'
import * as api from '../api'

vi.mock('../api')

beforeEach(() => {
  vi.resetAllMocks()
  api.getOperationCount.mockResolvedValue(0)
  api.getOperationHistory.mockResolvedValue([])
  api.getErrorHistory.mockResolvedValue([])
})

describe('HistoryPanel', () => {
  it('renders all filter buttons', async () => {
    render(<HistoryPanel />)
    await waitFor(() => {
      expect(screen.getByText('Compare')).toBeInTheDocument()
      expect(screen.getByText('Convert')).toBeInTheDocument()
      expect(screen.getByText('Add')).toBeInTheDocument()
      expect(screen.getByText('Subtract')).toBeInTheDocument()
      expect(screen.getByText('Divide')).toBeInTheDocument()
      expect(screen.getByText('Errors')).toBeInTheDocument()
    })
  })

  it('shows empty message when no history', async () => {
    render(<HistoryPanel />)
    await waitFor(() => {
      expect(screen.getByText('No history found for this filter.')).toBeInTheDocument()
    })
  })

  it('displays comparison history entries', async () => {
    api.getOperationHistory.mockResolvedValue([
      {
        thisValue: 1, thisUnit: 'FEET',
        thatValue: 12, thatUnit: 'INCHES',
        operation: 'compare',
        resultString: 'true',
      },
    ])

    render(<HistoryPanel />)
    await waitFor(() => {
      expect(screen.getByText('1 FEET vs 12 INCHES')).toBeInTheDocument()
      expect(screen.getByText('Equal')).toBeInTheDocument()
    })
  })

  it('displays non-equal comparison entry', async () => {
    api.getOperationHistory.mockResolvedValue([
      {
        thisValue: 1, thisUnit: 'FEET',
        thatValue: 5, thatUnit: 'INCHES',
        operation: 'compare',
        resultString: 'false',
      },
    ])

    render(<HistoryPanel />)
    await waitFor(() => {
      expect(screen.getByText('Not Equal')).toBeInTheDocument()
    })
  })

  it('displays arithmetic history entries', async () => {
    api.getOperationHistory.mockResolvedValue([
      {
        thisValue: 10, thisUnit: 'FEET',
        thatValue: 5, thatUnit: 'FEET',
        operation: 'add',
        resultValue: 15,
        resultUnit: 'FEET',
      },
    ])

    render(<HistoryPanel />)

    fireEvent.click(screen.getByText('Add'))
    await waitFor(() => {
      expect(screen.getByText('10 FEET add 5 FEET')).toBeInTheDocument()
      expect(screen.getByText('15 FEET')).toBeInTheDocument()
    })
  })

  it('displays error entries', async () => {
    api.getErrorHistory.mockResolvedValue([
      {
        thisValue: 1, thisUnit: 'FEET',
        thatValue: 0, thatUnit: 'FEET',
        operation: 'divide',
        error: true,
        errorMessage: 'Cannot divide by zero',
      },
    ])

    render(<HistoryPanel />)

    fireEvent.click(screen.getByText('Errors'))
    await waitFor(() => {
      expect(screen.getByText('Cannot divide by zero')).toBeInTheDocument()
    })
  })

  it('switches filter and fetches new data', async () => {
    render(<HistoryPanel />)

    fireEvent.click(screen.getByText('Convert'))
    await waitFor(() => {
      expect(api.getOperationHistory).toHaveBeenCalledWith('convert')
    })
  })

  it('shows counts from API', async () => {
    api.getOperationCount.mockImplementation((op) => {
      if (op === 'compare') return Promise.resolve(3)
      return Promise.resolve(0)
    })

    render(<HistoryPanel />)
    await waitFor(() => {
      expect(screen.getByText('3')).toBeInTheDocument()
    })
  })

  it('handles API errors gracefully for history', async () => {
    api.getOperationHistory.mockRejectedValue(new Error('Network error'))

    render(<HistoryPanel />)
    await waitFor(() => {
      expect(screen.getByText('No history found for this filter.')).toBeInTheDocument()
    })
  })

  it('handles API errors gracefully for counts', async () => {
    api.getOperationCount.mockRejectedValue(new Error('Network error'))

    render(<HistoryPanel />)
    await waitFor(() => {
      expect(screen.queryByText('Network error')).not.toBeInTheDocument()
    })
  })
})
