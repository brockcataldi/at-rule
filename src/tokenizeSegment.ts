import { IMediaSegment } from './models/IMediaSegment'

type IMediaSegmentMap = { [key: string]: IMediaSegment }

const DEFAULT_MEDIA_FEATURE = 'width'

const SHORTHAND_MAP: IMediaSegmentMap = {
    print: { type: 'print' },
    screen: { type: 'screen' },
    all: { type: 'all' },

    'any-hover': { property: 'any-hover', operator: ':', value: 'hover' },
    'any-coarse': { property: 'any-pointer', operator: ':', value: 'coarse' },
    'any-fine': { property: 'any-pointer', operator: ':', value: 'fine' },

    hover: { property: 'hover', operator: ':', value: 'hover' },
    coarse: { property: 'pointer', operator: ':', value: 'coarse' },
    fine: { property: 'pointer', operator: ':', value: 'fine' },

    portrait: { property: 'orientation', operator: ':', value: 'portrait' },
    landscape: { property: 'orientation', operator: ':', value: 'landscape' },

    dark: { property: 'prefers-color-scheme', operator: ':', value: 'dark' },
    light: { property: 'prefers-color-scheme', operator: ':', value: 'light' },
}

const SHORTHAND_KEYS = Object.keys(SHORTHAND_MAP)

const tokenizeSegment = (segment: string): false | IMediaSegment => {
    const inputs: string[] = segment.split(/:|>=?|<=?/g).map((input) => input.trim().toLowerCase())
   
    const operatorMatches: string[] | null  = segment.match(/:|>=?|<=?/g);
    const operators: string[] = (operatorMatches !== null) ? operatorMatches : [];

    if (inputs.length === 1 && operators.length === 0) {
        const input = inputs[0]

        if (SHORTHAND_KEYS.includes(input)) {
            return SHORTHAND_MAP[input]
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

export default tokenizeSegment
