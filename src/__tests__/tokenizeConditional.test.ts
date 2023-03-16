import { describe, expect, test } from '@jest/globals'

import { tokenizeMediaConditional } from '../tokenizeMediaQuery'

describe('tokenizeMediaConditional', () => {
    test('tokenizeMediaConditional: Empty String', () => {
        expect(tokenizeMediaConditional('')).toStrictEqual({ segments: [] })
        expect(tokenizeMediaConditional(' ')).toStrictEqual({ segments: [] })
    })

    test('tokenizeMediaConditional: Media Type', () => {
        expect(tokenizeMediaConditional('screen')).toStrictEqual({ segments: [{ type: 'screen' }] })
        expect(tokenizeMediaConditional('print')).toStrictEqual({ segments: [{ type: 'print' }] })
        expect(tokenizeMediaConditional('all')).toStrictEqual({ segments: [{ type: 'all' }] })
    })

    test('tokenizeMediaConditional: Media Type and Shorthand', () => {
        expect(tokenizeMediaConditional('=screen')).toStrictEqual({
            modifier: '=',
            segments: [{ type: 'screen' }],
        })
        expect(tokenizeMediaConditional('!print')).toStrictEqual({
            modifier: '!',
            segments: [{ type: 'print' }],
        })
    })

    test('tokenizeMediaConditional: Media Type and Shorthand', () => {
        expect(tokenizeMediaConditional('screen & hover')).toStrictEqual({
            segments: [{ type: 'screen' }, { property: 'hover', operator: ':', value: 'hover' }],
        })
        expect(tokenizeMediaConditional('print and dark')).toStrictEqual({
            segments: [
                { type: 'print' },
                { property: 'prefers-color-scheme', operator: ':', value: 'dark' },
            ],
        })
        expect(tokenizeMediaConditional('all & > 400px')).toStrictEqual({
            segments: [{ type: 'all' }, { property: 'width', operator: '>', value: '400px' }],
        })

        expect(tokenizeMediaConditional('all&>400px')).toStrictEqual({
            segments: [{ type: 'all' }, { property: 'width', operator: '>', value: '400px' }],
        })
    })
})
