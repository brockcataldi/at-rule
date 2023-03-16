import { describe, expect, test } from '@jest/globals'

import { mediaQuery } from '..'

describe('index', () => {
    test('mediaQuery: basic test', () => {
        expect(mediaQuery('any-hover')).toBe('any-hover: hover')
        expect(mediaQuery('width: 400px')).toBe('width: 400px')
        expect(mediaQuery('width > 400px')).toBe('min-width: 400px')
        expect(mediaQuery('> 400px')).toBe('min-width: 400px')
        expect(mediaQuery('< 400px')).toBe('max-width: 400px')
        expect(mediaQuery('width < 400px')).toBe('max-width: 400px')
    })
})
