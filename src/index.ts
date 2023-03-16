import tokenizeMediaQuery from './tokenizeMediaQuery'
import compileMediaQuery from './compileMediaQuery'

/**
 * The main function.
 *
 * Generates the Media Query string from the shorthand string, without the \@media.
 *
 * @param query - The Shorthand Query
 * @returns The generated Media Query
 */
export const mediaQuery = (query: string): string => {
    return compileMediaQuery(tokenizeMediaQuery(query))
}

/**
 * Shorthand function of mediaQuery
 *
 * @param query - The Shorthand Query
 * @returns The generated Media Query
 */
export const mq = (query: string): string => {
    return mediaQuery(query)
}

/**
 * The full media query.
 *
 * Generates the Media Query String, with the \@media.
 *
 * @param query - The Shorthand Query
 * @returns The generated Media Query
 */
export const media = (query: string): string => {
    return `@media ${mediaQuery(query)}`
}

/**
 * Shorthand function of media
 *
 * @param query - The Shorthand Query
 * @returns The generated Media Query
 */
export const m = (query: string): string => {
    return media(query)
}
