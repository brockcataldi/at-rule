import { IMediaQuery } from './models/IMediaQuery'
import { IMediaConditional } from './models/IMediaConditional'
import {
    IMediaSegment,
    isIMediaTypeSegment,
    isIMediaValueFeatureSegment,
    isIMediaValuelessFeatureSegment,
} from './models/IMediaSegment'
import { GREATER_THAN_OPERATORS, LESS_THAN_OPERATORS, NUMERIC_FEATURES } from './constants'

/**
 * The entrypoint function to compile the Media Query.
 *
 * @remarks
 * This joins each section by the OR tokens, and compiles the conditionals.
 *
 * @param tokens - The media query tokens to compile
 * @returns The compiled media query
 */
const compileMediaQuery = (tokens: IMediaQuery): string => {
    return tokens.conditions.reduce(
        (accumulator: string, condition: IMediaConditional, index: number) => {
            return `${accumulator}${index !== 0 ? ', ' : ''}${compileMediaConditional(condition)}`
        },
        '',
    )
}

/**
 * Compiling each conditional.
 *
 * @remarks
 * This joins each section by the AND tokens, and compiles segments.
 *
 * @param conditional - The conditional tokens to compile
 * @returns The compiled conditional
 */
const compileMediaConditional = (conditional: IMediaConditional): string => {
    return conditional.segments.reduce(
        (accumulator: string, segment: IMediaSegment, index: number) => {
            return `${accumulator}${index !== 0 ? ' and ' : ''}${compileMediaSegment(segment)}`
        },
        '',
    )
}

/**
 * Compiles each actual segment of the Media Query.
 *
 * @param segment - The segement to compile
 * @returns The compiled segment
 */
const compileMediaSegment = (segment: IMediaSegment): string => {
    if (isIMediaValueFeatureSegment(segment)) {
        if (segment.operator.length === 1) {
            const operator = segment.operator[0]

            if (operator === ':') {
                return `${segment.property}: ${segment.value}`
            }

            if (NUMERIC_FEATURES.includes(segment.property)) {
                if (GREATER_THAN_OPERATORS.includes(operator)) {
                    return `min-${segment.property}: ${segment.value}`
                }

                if (LESS_THAN_OPERATORS.includes(operator)) {
                    return `max-${segment.property}: ${segment.value}`
                }
            }
        }
    }

    if (isIMediaTypeSegment(segment)) {
        return segment.type
    }

    if (isIMediaValuelessFeatureSegment(segment)) {
        return segment.property
    }

    return ''
}

export default compileMediaQuery
