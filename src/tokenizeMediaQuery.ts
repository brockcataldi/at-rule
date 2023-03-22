import {
    DEFAULT_MEDIA_FEATURE,
    SHORTCUT_KEYS,
    SHORTCUT_MAP,
    MODIFIER_KEYS,
    MODIFIER_MAP,
} from './constants'

import { IMediaQuery } from './models/IMediaQuery'
import { IMediaConditional } from './models/IMediaConditional'
import { IMediaSegment } from './models/IMediaSegment'

/**
 * The entrypoint function to tokenize the Media Query.
 *
 * @remarks
 * This splits each section by the OR tokens, and converts it to conditionals.
 *
 * @param query - The media query to tokenize
 * @returns The tokenized media query
 */
const tokenizeMediaQuery = (query: string): IMediaQuery => {
    const conditionals: string[] = query
        .split(/,| or |\|/g)
        .map((conditional) => conditional.replace(/\(|\)/g, '').trim().toLowerCase())

    return {
        conditions: conditionals.map((condition) => tokenizeMediaConditional(condition)),
    }
}

/**
 * Parsing each conditional.
 *
 * @remarks
 * This splits each section by the AND tokens, and converts it to segments.
 *
 * @param conditional - The conditional to segment
 * @returns The tokenized conditional
 */
const tokenizeMediaConditional = (conditional: string): IMediaConditional => {
    const modifiers: string[] | null = conditional.match(/^!|not|=|only/g)
    let modifier = ''

    if (modifiers !== null) {
        conditional = modifiers.reduce((accumulator: string, value: string): string => {
            return accumulator.replace(value, '').trim()
        }, conditional)

        if (MODIFIER_KEYS.includes(modifiers[0])) {
            modifier = MODIFIER_MAP[modifiers[0]]
        }
    }

    const raw: string[] = conditional.split(/&| and /g)

    const segments: IMediaSegment[] = raw
        .map((condition: string): IMediaSegment | false => tokenizeMediaSegment(condition))
        .filter((condition): condition is IMediaSegment => condition !== false)

    return {
        segments,
        modifier,
    }
}

/**
 * Parses each actual segment of the Media Query
 *
 * @remarks
 * Each segment SHOULD be the actual conditions of the Media Query.
 *
 * @param segment - The segement to parse
 * @returns The tokenized segment
 */
const tokenizeMediaSegment = (segment: string): false | IMediaSegment => {
    const inputs: string[] = segment.split(/:|>=?|<=?/g).map((input) => input.trim().toLowerCase())

    const operatorMatches: string[] | null = segment.match(/:|>=?|<=?/g)
    const operators: string[] = operatorMatches !== null ? operatorMatches : []

    if (inputs.length === 1 && operators.length === 0) {
        const input = inputs[0]

        if (SHORTCUT_KEYS.includes(input)) {
            return SHORTCUT_MAP[input]
        }
    }

    if (inputs.length === 2 && operators.length === 1) {
        return {
            property: inputs[0] === '' ? DEFAULT_MEDIA_FEATURE : inputs[0],
            value: inputs[1],
            operator: operators[0],
        }
    }

    if (inputs.length === 3 && operators.length === 2) {
        const values = [...inputs]
        return {
            property: values.splice(1, 1)[0],
            operator: operators,
            value: values,
        }
    }

    return false
}

export default tokenizeMediaQuery
export { tokenizeMediaConditional, tokenizeMediaSegment }
