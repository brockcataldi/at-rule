import { IMediaSegment } from './models/IMediaSegment'

type IMediaSegmentMap = { [key: string]: IMediaSegment }

export const DEFAULT_MEDIA_FEATURE = 'width'

export const NUMERIC_FEATURES: string[] = ['width', 'height', 'aspect-ratio', 'resolution']

export const GREATER_THAN_OPERATORS: string[] = ['>', '>=']

export const LESS_THAN_OPERATORS: string[] = ['<', '<=']

export const SHORTHAND_MAP: IMediaSegmentMap = {
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

export const SHORTHAND_KEYS = Object.keys(SHORTHAND_MAP)
