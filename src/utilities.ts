import { GREATER_THAN_OPERATORS, LESS_THAN_OPERATORS } from './constants'
import {
    IMediaTypeSegment,
    IMediaValuelessFeatureSegment,
    IMediaCompoundFeatureSegment,
    IMediaStandardFeatureSegment,
} from './models'

const isIMediaTypeSegment = (segment: any): segment is IMediaTypeSegment => {
    return 'type' in segment && !('property' in segment) && !('value' in segment)
}

const isIMediaStandardFeatureSegment = (segment: any): segment is IMediaStandardFeatureSegment => {
    return (
        'property' in segment &&
        'value' in segment &&
        typeof segment.property === 'string' &&
        typeof segment.operator === 'string'
    )
}

const isIMediaCompoundFeatureSegment = (segment: any): segment is IMediaCompoundFeatureSegment => {
    return (
        'property' in segment &&
        'value' in segment &&
        Array.isArray(segment.value) &&
        Array.isArray(segment.operator)
    )
}

const isIMediaValuelessFeatureSegment = (
    segment: any,
): segment is IMediaValuelessFeatureSegment => {
    return !('type' in segment) && !('value' in segment) && 'property' in segment
}

const invertOperator = (operator: string): string => {
    if (GREATER_THAN_OPERATORS.includes(operator)) {
        return '<'
    }

    if (LESS_THAN_OPERATORS.includes(operator)) {
        return '>'
    }

    return ':'
}

export {
    isIMediaTypeSegment,
    isIMediaValuelessFeatureSegment,
    isIMediaStandardFeatureSegment,
    isIMediaCompoundFeatureSegment,
    invertOperator,
}
