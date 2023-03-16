interface IMediaTypeSegment {
    type: string
}

interface IMediaValueFeatureSegment {
    property: string
    operator: string | string[]
    value: string | string[]
}

interface IMediaValuelessFeatureSegment {
    property: string
}

type IMediaSegment = IMediaValueFeatureSegment | IMediaTypeSegment | IMediaValuelessFeatureSegment

const isIMediaTypeSegment = (segment: any): segment is IMediaTypeSegment => {
    return 'type' in segment
}

const isIMediaValueFeatureSegment = (segment: any): segment is IMediaValueFeatureSegment => {
    return 'value' in segment
}

const isIMediaValuelessFeatureSegment = (
    segment: any
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
