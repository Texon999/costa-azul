import { strict as assert } from 'node:assert'
import { describe, it } from 'node:test'
import { calculateNights } from '../utils/calculateNights.js'

describe('calculateNights', () => {
  it('devuelve 3 noches del 12 al 15 de diciembre', () => {
    assert.strictEqual(calculateNights('2026-12-12', '2026-12-15'), 3)
  })

  it('devuelve 1 noche para misma fecha inicio/fin + 1 dia', () => {
    assert.strictEqual(calculateNights('2026-12-12', '2026-12-13'), 1)
  })

  it('fecha fin anterior a inicio devuelve negativo', () => {
    const r = calculateNights('2026-12-15', '2026-12-12')
    assert.ok(r < 0)
  })
})
