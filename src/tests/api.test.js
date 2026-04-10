import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  compareQuantities,
  convertQuantity,
  addQuantities,
  subtractQuantities,
  divideQuantities,
  getOperationHistory,
  getMeasurementsByType,
  getOperationCount,
  getErrorHistory,
} from '../api'

const BASE_URL = 'http://localhost:8080/api/v1/quantities'

const thisQty = { value: 1, unit: 'FEET', measurementType: 'LengthUnit' }
const thatQty = { value: 12, unit: 'INCHES', measurementType: 'LengthUnit' }

function mockFetch(data) {
  return vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(data),
  })
}

function mockFetchError() {
  return vi.fn().mockResolvedValue({
    ok: false,
    json: () => Promise.resolve({}),
  })
}

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('POST requests', () => {
  it('compareQuantities calls correct endpoint with body', async () => {
    global.fetch = mockFetch({ resultString: 'true' })

    const result = await compareQuantities(thisQty, thatQty)

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/compare`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ thisQuantityDTO: thisQty, thatQuantityDTO: thatQty }),
    })
    expect(result).toEqual({ resultString: 'true' })
  })

  it('convertQuantity calls correct endpoint', async () => {
    global.fetch = mockFetch({ resultValue: 12 })

    const result = await convertQuantity(thisQty, thatQty)

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/convert`, expect.objectContaining({ method: 'POST' }))
    expect(result).toEqual({ resultValue: 12 })
  })

  it('addQuantities calls correct endpoint', async () => {
    global.fetch = mockFetch({ resultValue: 24 })

    await addQuantities(thisQty, thatQty)

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/add`, expect.objectContaining({ method: 'POST' }))
  })

  it('subtractQuantities calls correct endpoint', async () => {
    global.fetch = mockFetch({ resultValue: 0 })

    await subtractQuantities(thisQty, thatQty)

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/subtract`, expect.objectContaining({ method: 'POST' }))
  })

  it('divideQuantities calls correct endpoint', async () => {
    global.fetch = mockFetch({ resultValue: 1 })

    await divideQuantities(thisQty, thatQty)

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/divide`, expect.objectContaining({ method: 'POST' }))
  })

  it('throws error when response is not ok', async () => {
    global.fetch = mockFetchError()

    await expect(compareQuantities(thisQty, thatQty)).rejects.toThrow('Failed: compare')
  })
})

describe('GET requests', () => {
  it('getOperationHistory calls correct endpoint', async () => {
    global.fetch = mockFetch([])

    await getOperationHistory('compare')

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/history/operation/compare`)
  })

  it('getOperationHistory lowercases operation', async () => {
    global.fetch = mockFetch([])

    await getOperationHistory('COMPARE')

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/history/operation/compare`)
  })

  it('getMeasurementsByType calls correct endpoint', async () => {
    global.fetch = mockFetch([])

    await getMeasurementsByType('LengthUnit')

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/history/type/LengthUnit`)
  })

  it('getOperationCount calls correct endpoint', async () => {
    global.fetch = mockFetch(5)

    const result = await getOperationCount('add')

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/count/add`)
    expect(result).toBe(5)
  })

  it('getErrorHistory calls correct endpoint', async () => {
    global.fetch = mockFetch([])

    await getErrorHistory()

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/history/errored`)
  })

  it('throws error when GET response is not ok', async () => {
    global.fetch = mockFetchError()

    await expect(getErrorHistory()).rejects.toThrow('Failed: history/errored')
  })
})
