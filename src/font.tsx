import * as React from 'react'
import { FC } from 'react'
import { FontProps, Font as OldFont, useConfig, withTagless, getConfig, useTheme, TaglessComponent, Fit, Line } from 'themeor'
import type { ViewProps } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'


export const Font: TaglessComponent<FontProps> = withTagless(({ wrap, style = {}, ...props }: any) => {
  wrap && Object.assign(style, { flexShrink: 1 })
  return <OldFont {...props} style={style} />
})