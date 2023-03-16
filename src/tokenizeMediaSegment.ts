import { DEFAULT_MEDIA_FEATURE, SHORTHAND_KEYS, SHORTHAND_MAP } from './constants'

import { IMediaSegment } from './models/IMediaSegment'

const tokenizeMediaSegment = (segment: string): false | IMediaSegment => {
    const inputs: string[] = segment.split(/:|>=?|<=?/g).map((input) => input.trim().toLowerCase())

    const operatorMatches: string[] | null = segment.match(/:|>=?|<=?/g)
    const operators: string[] = operatorMatches !== null ? operatorMatches : []

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

export default tokenizeMediaSegment
