interface IMediaTypeSegment {
    type: string
}

interface IMediaFeatureSegment {
    property: string
    operator: string | string[]
    value: string | string[]
}

type IMediaSegment = IMediaFeatureSegment | IMediaTypeSegment
type IMediaSegmentMap = { [key: string]: IMediaSegment }

interface IMediaConditional {
    modifier?: string
    segments: IMediaSegment[]
}

interface IMediaQuery {
    query: IMediaConditional[]
}

const MEDIA_TYPES: string[] = ['print', 'screen', 'all']
const DEFAULT_MEDIA_FEATURE = 'width'

const SHORTHAND_MAP: IMediaSegmentMap = {
    'any-hover': { property: 'any-hover', operator: ':', value: 'hover' },
    'any-coarse': { property: 'any-pointer', operator: ':', value: 'coarse' },
    'any-fine': { property: 'any-pointer', operator: ':', value: 'fine' },
    'hover': { property: 'hover', operator: ':', value: 'hover' },
    'coarse': { property: 'pointer', operator: ':', value: 'coarse' },
    'fine': { property: 'pointer', operator: ':', value: 'fine' },
    'portrait': { property: 'orientation', operator: ':', value: 'portrait' },
    'landscape': { property: 'orientation', operator: ':', value: 'landscape' },
    'dark': { property: 'prefers-color-scheme', operator: ':', value: 'dark' },
    'light': { property: 'prefers-color-scheme', operator: ':', value: 'light' },
}

const SHORTHAND_KEYS = Object.keys(SHORTHAND_MAP)

export const tokenizeSegment = (segment: string): false | IMediaSegment => {
    const inputs: string[] = segment.split(/:|>=?|<=?/g).map((input) => input.trim().toLowerCase())
    const operators: string[] = []

    for (const operator of segment.matchAll(/:|>=?|<=?/g)) {
        operators.push(operator[0])
    }

    if (inputs.length === 1 && operators.length === 0) {
        const input = inputs[0]

        if (MEDIA_TYPES.includes(input)) {
            return { type: input }
        }

        if(SHORTHAND_KEYS.includes(input)){
            return SHORTHAND_MAP[input];
        }
    }

    if (inputs.length === 2 && operators.length === 1) {
        return {
            property: inputs[0] === '' ? DEFAULT_MEDIA_FEATURE : inputs[0],
            value: inputs[1],
            operator: operators[0],
        }
    }

    if( inputs.length === 3 && operators.length === 2){
        const values = [...inputs]
        return {
            property: values.splice(1, 1)[0],
            operator: operators,
            value: values
        }
    }

    return false
}
