import { CSSProperties } from 'react'

/**
 * Our color tokens are raw HSL values:
 * '0, 0, 100%' instead of 'hsl(0, 0, 100%)'
 *
 * This gives us the flexibility of adding alpha to any color if necessary:
 * color: hsla($red500, 50%)
 *
 * To make it easier for the developers to use the tokens normally without thinking about it,
 * we create utils for every CSS property that uses the color scale that automatically
 * inserts the `hsl()` string:
 * color: '$red500' -> color: 'hsl($red500)'
 */

// https://stitches.dev/docs/tokens#property-mapping
const colorProperties = [
  'background',
  'backgroundColor',
  'backgroundImage',
  'border',
  'borderBlock',
  'borderBlockEnd',
  'borderBlockStart',
  'borderBottom',
  'borderBottomColor',
  'borderColor',
  'borderInline',
  'borderInlineEnd',
  'borderInlineStart',
  'borderLeft',
  'borderLeftColor',
  'borderRight',
  'borderRightColor',
  'borderTop',
  'borderTopColor',
  'caretColor',
  'color',
  'columnRuleColor',
  'fill',
  'outlineColor',
  'stroke',
  'textDecorationColor',
] as const

type CSSProp = typeof colorProperties[number]

export const createColorOverride =
  <T extends CSSProp>(key: T) =>
  (value: CSSProperties[T]): { [key: string]: CSSProperties[T] | string } => {
    if (!value) return { [key]: value }

    const parsedValue = value
      .toString()
      .replace(/((?:hsl(?:a)?\()?\$)[$\w]+(?:\))?/g, (match) => {
        // color already contains `hsl` or `hsla`
        if (match.includes('hsl')) return match

        // token is local token ($$localToken) or from other scale ($sizes$1)
        if ((match.match(/\$/g) || []).length > 1) return match

        // otherwise we need to wrap our color tokens with `hsl`
        return `hsl(${match})`
      })

    return { [key]: parsedValue }
  }

type ColorUtils = Record<CSSProp, ReturnType<typeof createColorOverride>>

const entries = colorProperties.map((prop) => [prop, createColorOverride(prop)])

export const colorUtils: ColorUtils = Object.fromEntries(entries)
