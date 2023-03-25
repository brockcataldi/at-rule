import { describe, expect, test } from '@jest/globals'

import { mediaQuery } from '..'

describe('index', () => {
    test('mediaQuery: Media Query Level 3', () => {
        expect(mediaQuery('@media screen and (min-width: 900px)')).toBe(
            'screen and (min-width: 900px)',
        )
        expect(mediaQuery('@media only print')).toBe('only print')
        expect(mediaQuery('@media not screen')).toBe('not screen')
        expect(mediaQuery('@media all')).toBe('all')
        expect(mediaQuery('@media (min-width: 30em) and (orientation: landscape)')).toBe(
            '(min-width: 30em) and (orientation: landscape)',
        )
        expect(mediaQuery('@media screen and (min-width: 30em) and (orientation: landscape)')).toBe(
            'screen and (min-width: 30em) and (orientation: landscape)',
        )
        expect(mediaQuery('@media (min-height: 680px), screen and (orientation: portrait)')).toBe(
            '(min-height: 680px), screen and (orientation: portrait)',
        )
        expect(mediaQuery('@media not all and (monochrome)')).toBe('not all and (monochrome)')
        expect(mediaQuery('@media not screen and (color), print and (color)')).toBe(
            'not screen and (color), print and (color)',
        )
        expect(mediaQuery('@media only screen and (color)')).toBe('only screen and (color)')
    })

    test('mediaQuery: Media Query Level 4', () => {
        expect(mediaQuery('@media (width <= 30em)')).toBe('(max-width: 30em)')
        expect(mediaQuery('@media (30em <= width <= 50em)')).toBe(
            '(min-width: 30em) and (max-width: 50em)',
        )
    })

    test('mediaQuery: Shortcuts', () => {
        expect(mediaQuery('any-hover')).toBe('(any-hover: hover)')

        expect(mediaQuery('width: 400px')).toBe('(width: 400px)')
        expect(mediaQuery('width > 400px')).toBe('(min-width: 400px)')
        expect(mediaQuery('> 400px')).toBe('(min-width: 400px)')
        expect(mediaQuery('< 400px')).toBe('(max-width: 400px)')
        expect(mediaQuery('width < 400px')).toBe('(max-width: 400px)')

        expect(mediaQuery('300px < width < 500px')).toBe(
            '(min-width: 300px) and (max-width: 500px)',
        )
        expect(mediaQuery('300px <= width <= 500px')).toBe(
            '(min-width: 300px) and (max-width: 500px)',
        )
        expect(mediaQuery('500px > width > 300px')).toBe(
            '(max-width: 500px) and (min-width: 300px)',
        )
        expect(mediaQuery('500px >= width >= 300px')).toBe(
            '(max-width: 500px) and (min-width: 300px)',
        )
    })
})
