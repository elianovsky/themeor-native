import { config } from 'themeor'
import { Tag } from './tag.js'

config.isNative = true
config.CommonTag = Tag

export * from 'themeor'
export { Box } from './box.js'
export type { BoxProps } from './box.js'
export { Icon } from './icon.js'
export { Font } from './font.js'