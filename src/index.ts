import tokenizeMediaQuery from './tokenizeMediaQuery'
import compileMediaQuery from './compileMediaQuery'

export const mediaQuery = (query: string): string => {
    return compileMediaQuery(tokenizeMediaQuery(query))
}

export const mq = (query: string): string => {
    return mediaQuery(query)
}

export const media = (query: string): string => {
    return `@media ${mediaQuery(query)}`
}

export const m = (query: string): string => {
    return media(query)
}
