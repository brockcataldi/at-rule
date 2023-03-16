import { IMediaQuery } from './models/IMediaQuery'

import tokenizeMediaConditional from './tokenizeMediaConditional'

const tokenizeMediaQuery = (query: string): IMediaQuery => {
    const conditionals: string[] = query
        .split(/,| or |\|/g)
        .map((conditional) => conditional.trim().toLowerCase())

    return {
        conditions: conditionals.map((condition) => tokenizeMediaConditional(condition)),
    }
}

export default tokenizeMediaQuery
