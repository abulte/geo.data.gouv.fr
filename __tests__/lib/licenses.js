import licenses from '../../lib/licenses'

describe('licenses', () => {
  test('export a valid hash of licenses', () => {
    Object.values(licenses).forEach(license => {
      expect(license).toHaveProperty('name')
      expect(license).toHaveProperty('link')
    })
  })
})
