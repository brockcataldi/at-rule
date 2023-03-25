import { describe, expect, test } from '@jest/globals'

import { tokenizeMediaConditional } from '../tokenizeMediaQuery'

describe('tokenizeMediaConditional', () => {
    test('tokenizeMediaConditional: Empty String', () => {
        expect(tokenizeMediaConditional('')).toStrictEqual({ modifier: '', segments: [] })
        expect(tokenizeMediaConditional(' ')).toStrictEqual({ modifier: '', segments: [] })
    })

    test('tokenizeMediaConditional: Media Type', () => {
        expect(tokenizeMediaConditional('screen')).toStrictEqual({
            modifier: '',
            segments: [{ type: 'screen' }],
        })
        expect(tokenizeMediaConditional('print')).toStrictEqual({
            modifier: '',
            segments: [{ type: 'print' }],
        })
        expect(tokenizeMediaConditional('all')).toStrictEqual({
            modifier: '',
            segments: [{ type: 'all' }],
        })
    })

    test('tokenizeMediaConditional: Media Type and Shorthand', () => {
        expect(tokenizeMediaConditional('%screen')).toStrictEqual({
            modifier: 'only',
            segments: [{ type: 'screen' }],
        })
        expect(tokenizeMediaConditional('!print')).toStrictEqual({
            modifier: 'not',
            segments: [{ type: 'print' }],
        })
    })

    test('tokenizeMediaConditional: Media Type and Shorthand', () => {
        expect(tokenizeMediaConditional('screen & hover')).toStrictEqual({
            modifier: '',
            segments: [{ type: 'screen' }, { property: 'hover', operator: ':', value: 'hover' }],
        })
        expect(tokenizeMediaConditional('print and dark')).toStrictEqual({
            modifier: '',
            segments: [
                { type: 'print' },
                { property: 'prefers-color-scheme', operator: ':', value: 'dark' },
            ],
        })
        expect(tokenizeMediaConditional('all & > 400px')).toStrictEqual({
            modifier: '',
            segments: [{ type: 'all' }, { property: 'width', operator: '>', value: '400px' }],
        })

        expect(tokenizeMediaConditional('all&>400px')).toStrictEqual({
            modifier: '',
            segments: [{ type: 'all' }, { property: 'width', operator: '>', value: '400px' }],
        })
    })
})
