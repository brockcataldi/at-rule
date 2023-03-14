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

export type {
    IMediaSegment,
    IMediaTypeSegment,
    IMediaValueFeatureSegment,
    IMediaValuelessFeatureSegment,
}
