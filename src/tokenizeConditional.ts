import { IMediaSegment } from './models/IMediaSegment'
import { IMediaConditional } from './models/IMediaConditional'

import tokenizeSegment from './tokenizeSegment'

export const tokenizeConditional = (conditional: string): IMediaConditional => {

    const modifiers: string[] | null = conditional.match(/^\!|not|\=|only/g)

    if(modifiers !== null){
        conditional = modifiers.reduce((accumulator: string, value: string): string => {
            return accumulator.replace(value, '').trim();
        }, conditional);
    }

    const segments: string[] = conditional.split(/&| and /g)

    const parsed: IMediaSegment[] = segments
        .map((condition: string): IMediaSegment | false => tokenizeSegment(condition))
        .filter((condition): condition is IMediaSegment => condition !== false)

    return {
        segments: parsed,
        ...(modifiers !== null)? { modifier: modifiers[0].trim() } : {}
    }
}

export default tokenizeConditional
