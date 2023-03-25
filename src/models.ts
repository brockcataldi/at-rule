type IMediaSegment = IMediaFeatureSegment | IMediaTypeSegment

type IMediaFeatureSegment =
    | IMediaValuelessFeatureSegment
    | IMediaStandardFeatureSegment
    | IMediaCompoundFeatureSegment

interface IMediaQuery {
    conditions: IMediaConditional[]
}

interface IMediaConditional {
    modifier: string
    segments: IMediaSegment[]
}

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

export type {
    IMediaQuery,
    IMediaConditional,
    IMediaSegment,
    IMediaTypeSegment,
    IMediaFeatureSegment,
    IMediaValuelessFeatureSegment,
    IMediaCompoundFeatureSegment,
    IMediaStandardFeatureSegment,
}
