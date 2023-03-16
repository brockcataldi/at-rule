type IMediaSegment = IMediaValueFeatureSegment | IMediaTypeSegment | IMediaValuelessFeatureSegment

interface IMediaTypeSegment {
    type: string
}

const isIMediaTypeSegment = (segment: any): segment is IMediaTypeSegment => {
    return 'type' in segment
}

interface IMediaValueFeatureSegment {
    property: string
    operator: string | string[]
    value: string | string[]
}

const isIMediaValueFeatureSegment = (segment: any): segment is IMediaValueFeatureSegment => {
    return 'value' in segment
}

interface IMediaValuelessFeatureSegment {
    property: string
}

const isIMediaValuelessFeatureSegment = (
    segment: any,
): segment is IMediaValuelessFeatureSegment => {
    return !('type' in segment) && !('value' in segment) && 'property' in segment
}

export type {
    IMediaSegment,
    IMediaTypeSegment,
    IMediaValueFeatureSegment,
    IMediaValuelessFeatureSegment,
}

export { isIMediaTypeSegment, isIMediaValueFeatureSegment, isIMediaValuelessFeatureSegment }
