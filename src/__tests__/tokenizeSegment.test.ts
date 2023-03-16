import { describe, expect, test } from '@jest/globals'

import { tokenizeMediaSegment } from '../tokenizeMediaQuery'

describe('tokenizeMediaSegment', () => {
    test('tokenizeMediaSegment: Empty String', () => {
        expect(tokenizeMediaSegment('')).toBe(false)
        expect(tokenizeMediaSegment(' ')).toBe(false)
    })

    test('tokenizeMediaSegment: Media Types', () => {
        expect(tokenizeMediaSegment('screen')).toStrictEqual({ type: 'screen' })
        expect(tokenizeMediaSegment('print')).toStrictEqual({ type: 'print' })
        expect(tokenizeMediaSegment('all')).toStrictEqual({ type: 'all' })
    })

    test('tokenizeMediaSegment: Shorthand', () => {
        expect(tokenizeMediaSegment('dark')).toStrictEqual({
            property: 'prefers-color-scheme',
            operator: ':',
            value: 'dark',
        })
        expect(tokenizeMediaSegment('hover')).toStrictEqual({
            property: 'hover',
            operator: ':',
            value: 'hover',
        })
    })

    test('tokenizeMediaSegment: Width Defaulted Shorthand', () => {
        expect(tokenizeMediaSegment('> 400px')).toStrictEqual({
            property: 'width',
            operator: '>',
            value: '400px',
        })

        expect(tokenizeMediaSegment('<= 400px')).toStrictEqual({
            property: 'width',
            operator: '<=',
            value: '400px',
        })

        expect(tokenizeMediaSegment('< 4rem')).toStrictEqual({
            property: 'width',
            operator: '<',
            value: '4rem',
        })

        expect(tokenizeMediaSegment('>= 60em')).toStrictEqual({
            property: 'width',
            operator: '>=',
            value: '60em',
        })

        expect(tokenizeMediaSegment('>400px')).toStrictEqual({
            property: 'width',
            operator: '>',
            value: '400px',
        })

        expect(tokenizeMediaSegment('<=400px')).toStrictEqual({
            property: 'width',
            operator: '<=',
            value: '400px',
        })

        expect(tokenizeMediaSegment('<4rem')).toStrictEqual({
            property: 'width',
            operator: '<',
            value: '4rem',
        })

        expect(tokenizeMediaSegment('>=60em')).toStrictEqual({
            property: 'width',
            operator: '>=',
            value: '60em',
        })
    })

    test('tokenizeMediaSegment: Balanced Statement', () => {
        expect(tokenizeMediaSegment('width > 400px')).toStrictEqual({
            property: 'width',
            operator: '>',
            value: '400px',
        })

        expect(tokenizeMediaSegment('height < 1000px')).toStrictEqual({
            property: 'height',
            operator: '<',
            value: '1000px',
        })

        expect(tokenizeMediaSegment('any-hover: hover')).toStrictEqual({
            property: 'any-hover',
            operator: ':',
            value: 'hover',
        })
    })

    test('tokenizeMediaSegment: Seesaw Statement', () => {
        expect(tokenizeMediaSegment('200px < width > 1000px')).toStrictEqual({
            property: 'width',
            operator: ['<', '>'],
            value: ['200px', '1000px'],
        })
    })
})
