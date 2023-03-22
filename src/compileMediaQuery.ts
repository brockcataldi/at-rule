import { IMediaQuery } from './models/IMediaQuery'
import { IMediaConditional } from './models/IMediaConditional'
import {
    IMediaCompoundFeatureSegment,
    IMediaSegment,
    IMediaStandardFeatureSegment,
    isIMediaCompoundFeatureSegment,
    isIMediaStandardFeatureSegment,
    isIMediaTypeSegment,
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
    const { segments, modifier } = conditional

    return segments.reduce(
        (accumulator: string, segment: IMediaSegment, index: number) => {
            return `${accumulator}${index !== 0 ? ' and ' : ''}${compileMediaSegment(segment)}`
        },
        modifier !== '' ? `${modifier} ` : '',
    )
}

/**
 * Compiles each actual segment of the Media Query.
 *
 * @param segment - The segement to compile
 * @returns The compiled segment
 */
const compileMediaSegment = (segment: IMediaSegment): string => {


    if (isIMediaStandardFeatureSegment(segment)) {
        return compileProperty(segment)
    }

    if( isIMediaCompoundFeatureSegment(segment)){
        return compileCompoundProperty(segment);
    }

    if (isIMediaTypeSegment(segment)) {
        return segment.type
    }

    if (isIMediaValuelessFeatureSegment(segment)) {
        return `(${segment.property})`
    }

    return ''
}

/**
 * Compiles features with values to a usable segment
 *
 * @param segment - The feature segment to compile
 * @returns The compiled feature segment
 */
const compileCompoundProperty = (segment: IMediaCompoundFeatureSegment): string => {
    const { property, operator, value } = segment

    if (operator.length === 1 && value.length === 1) {
        return compileProperty({
            property,
            operator: operator[0],
            value: value[0],
        })
    }

    if (operator.length === 2 && value.length === 2) {
        return (
            compileProperty({
                property,
                operator: operator[0],
                value: value[0],
            }) +
            ' and ' +
            compileProperty({
                property,
                operator: operator[1],
                value: value[1],
            })
        )
    }

    return ''
}

/**
 *  Converts a standard segment to a usable property
 *
 * @param segment - The feature segment to compile
 * @returns The compiled feature segment
 */
const compileProperty = ({
    property,
    operator,
    value,
}: IMediaStandardFeatureSegment): string => {
    if (NUMERIC_FEATURES.includes(property)) {
        if (GREATER_THAN_OPERATORS.includes(operator)) {
            return `(min-${property}: ${value})`
        }

        if (LESS_THAN_OPERATORS.includes(operator)) {
            return `(max-${property}: ${value})`
        }
    }

    return `(${property}: ${value})`
}

export default compileMediaQuery
