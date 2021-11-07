import { toBoolean } from './transformations'

describe('utils > transformations', () => {
  describe('toBoolean', () => {
    it('should return true for true', () => {
      expect(toBoolean(true)).toBe(true)
    })

    it('should return true for 1 or "1"', () => {
      expect(toBoolean(1)).toBe(true)
      expect(toBoolean('1')).toBe(true)
    })

    it('should return true for "true"', () => {
      expect(toBoolean('true')).toBe(true)
    })

    it('should return false for false', () => {
      expect(toBoolean(false)).toBe(false)
    })

    it('should return false for anything else', () => {
      expect(toBoolean('false')).toBe(false)
      expect(toBoolean('no')).toBe(false)
      expect(toBoolean('maybe?')).toBe(false)
      expect(toBoolean([])).toBe(false)
      expect(toBoolean(140)).toBe(false)
      expect(toBoolean({ true: 'is-true' })).toBe(false)
    })
  })
})
