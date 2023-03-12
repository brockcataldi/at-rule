import { describe, expect, test } from '@jest/globals'
import { tokenizeSegment } from './tokenizeSegment'

describe('tokenizeSegment', () => {
    test('tokenizeSegment: Empty String', () => {
        expect(tokenizeSegment('')).toBe(false)
        expect(tokenizeSegment(' ')).toBe(false)
    })

    test('tokenizeSegment: Media Types', () => {
        expect(tokenizeSegment('screen')).toStrictEqual({ type: 'screen' })
        expect(tokenizeSegment('print')).toStrictEqual({ type: 'print' })
        expect(tokenizeSegment('all')).toStrictEqual({ type: 'all' })
    })

    test('tokenizeSegment: Shorthand', () => {
        expect(tokenizeSegment('dark')).toStrictEqual({ property: 'prefers-color-scheme', operator: ':', value: 'dark' })
        expect(tokenizeSegment('hover')).toStrictEqual({ property: 'hover', operator: ':', value: 'hover' })
    })

    test('tokenizeSegment: Width Defaulted Shorthand', () => {
        expect(tokenizeSegment('> 400px')).toStrictEqual({
            property: 'width',
            operator: '>',
            value: '400px',
        })

        expect(tokenizeSegment('<= 400px')).toStrictEqual({
            property: 'width',
            operator: '<=',
            value: '400px',
        })

        expect(tokenizeSegment('< 4rem')).toStrictEqual({
            property: 'width',
            operator: '<',
            value: '4rem',
        })

        expect(tokenizeSegment('>= 60em')).toStrictEqual({
            property: 'width',
            operator: '>=',
            value: '60em',
        })

        expect(tokenizeSegment('>400px')).toStrictEqual({
            property: 'width',
            operator: '>',
            value: '400px',
        })

        expect(tokenizeSegment('<=400px')).toStrictEqual({
            property: 'width',
            operator: '<=',
            value: '400px',
        })

        expect(tokenizeSegment('<4rem')).toStrictEqual({
            property: 'width',
            operator: '<',
            value: '4rem',
        })

        expect(tokenizeSegment('>=60em')).toStrictEqual({
            property: 'width',
            operator: '>=',
            value: '60em',
        })
    })

    test('tokenizeSegment: Balanced Statement', () => {
        expect(tokenizeSegment('width > 400px')).toStrictEqual({
            property: 'width',
            operator: '>',
            value: '400px',
        })

        expect(tokenizeSegment('height < 1000px')).toStrictEqual({
            property: 'height',
            operator: '<',
            value: '1000px',
        })

        expect(tokenizeSegment('any-hover: hover')).toStrictEqual({
            property: 'any-hover',
            operator: ':',
            value: 'hover',
        })
    })

    test('tokenizeSegment: Seesaw Statement', () => {
        expect(tokenizeSegment('200px < width > 1000px')).toStrictEqual({
            property: 'width',
            operator: ['<', '>'],
            value: ['200px', '1000px']
        })
    })
})
