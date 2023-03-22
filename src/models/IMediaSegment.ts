type IMediaSegment = IMediaFeatureSegment | IMediaTypeSegment

type IMediaFeatureSegment =
    | IMediaValuelessFeatureSegment
    | IMediaStandardFeatureSegment
    | IMediaCompoundFeatureSegment

interface IMediaTypeSegment {
    type: string
}

interface IMediaCompoundFeatureSegment {
    property: string
    operator: string[]
    value: string[]
}

interface IMediaStandardFeatureSegment {
    property: string
    operator: string
    value: string
}

interface IMediaValuelessFeatureSegment {
    property: string
}

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
        Array.isArray(segment.property) &&
        Array.isArray(segment.operator)
    )
}

const isIMediaValuelessFeatureSegment = (
    segment: any,
): segment is IMediaValuelessFeatureSegment => {
    return !('type' in segment) && !('value' in segment) && 'property' in segment
}

export type {
    IMediaSegment,
    IMediaTypeSegment,
    IMediaFeatureSegment,
    IMediaValuelessFeatureSegment,
    IMediaCompoundFeatureSegment,
    IMediaStandardFeatureSegment,
}

export {
    isIMediaTypeSegment,
    isIMediaValuelessFeatureSegment,
    isIMediaStandardFeatureSegment,
    isIMediaCompoundFeatureSegment,
}
