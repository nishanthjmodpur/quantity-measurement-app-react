const BASE_URL = 'http://localhost:8080/api/v1/quantities'

async function postRequest(endpoint, thisQty, thatQty) {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      thisQuantityDTO: thisQty,
      thatQuantityDTO: thatQty,
    }),
  })
  if (!res.ok) throw new Error(`Failed: ${endpoint}`)
  return await res.json()
}

async function getRequest(endpoint) {
  const res = await fetch(`${BASE_URL}/${endpoint}`)
  if (!res.ok) throw new Error(`Failed: ${endpoint}`)
  return await res.json()
}

export async function compareQuantities(thisQty, thatQty) {
  return postRequest('compare', thisQty, thatQty)
}

export async function convertQuantity(thisQty, thatQty) {
  return postRequest('convert', thisQty, thatQty)
}

export async function addQuantities(thisQty, thatQty) {
  return postRequest('add', thisQty, thatQty)
}

export async function subtractQuantities(thisQty, thatQty) {
  return postRequest('subtract', thisQty, thatQty)
}

export async function divideQuantities(thisQty, thatQty) {
  return postRequest('divide', thisQty, thatQty)
}

export async function getOperationHistory(operation) {
  return getRequest(`history/operation/${operation.toLowerCase()}`)
}

export async function getMeasurementsByType(type) {
  return getRequest(`history/type/${type}`)
}

export async function getOperationCount(operation) {
  return getRequest(`count/${operation.toLowerCase()}`)
}

export async function getErrorHistory() {
  return getRequest('history/errored')
}
