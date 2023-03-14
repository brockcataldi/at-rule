import { describe, expect, test } from '@jest/globals'

import tokenizeConditional from './tokenizeConditional'

describe('tokenizeConditional', () => {
    test('tokenizeConditional: Empty String', () => {
        expect(tokenizeConditional('')).toStrictEqual({ segments: [] })
        expect(tokenizeConditional(' ')).toStrictEqual({ segments: [] })
    })

    test('tokenizeConditional: Media Type', () => {
        expect(tokenizeConditional('screen')).toStrictEqual({ segments: [{ type: 'screen' }] })
        expect(tokenizeConditional('print')).toStrictEqual({ segments: [{ type: 'print' }] })
        expect(tokenizeConditional('all')).toStrictEqual({ segments: [{ type: 'all' }] })
    })

    test('tokenizeConditional: Media Type and Shorthand', () => {
        expect(tokenizeConditional('=screen')).toStrictEqual({ modifier: '=', segments: [{ type: 'screen' }] })
        expect(tokenizeConditional('!print')).toStrictEqual({ modifier: '!', segments: [{ type: 'print' }] })
    })

    test('tokenizeConditional: Media Type and Shorthand', () => {
        expect(tokenizeConditional('screen & hover')).toStrictEqual({
            segments: [{ type: 'screen' }, { property: 'hover', operator: ':', value: 'hover' }],
        })
        expect(tokenizeConditional('print and dark')).toStrictEqual({
            segments: [
                { type: 'print' },
                { property: 'prefers-color-scheme', operator: ':', value: 'dark' },
            ],
        })
        expect(tokenizeConditional('all & > 400px')).toStrictEqual({
            segments: [{ type: 'all' }, { property: 'width', operator: '>', value: '400px' }],
        })

        expect(tokenizeConditional('all&>400px')).toStrictEqual({
            segments: [{ type: 'all' }, { property: 'width', operator: '>', value: '400px' }],
        })
    })
})
