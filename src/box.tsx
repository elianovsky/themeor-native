import * as React from 'react'
import { FC } from 'react'
import { Box as OldBox, useConfig, withTagless, getConfig, useTheme, TaglessComponent, Fit, Line } from 'themeor'
import type { BoxProps as OldBoxProps } from 'themeor'
import type { ViewProps } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'


export type BoxProps = OldBoxProps & ViewProps

export const Box: TaglessComponent<BoxProps> = withTagless(({ shadow, borderFill, borderWeight, blur, children, stretch, style = {}, ...props }: any) => {
  const { config } = useConfig()
  let render = children

  shadow && Object.assign(style, config?.box?.shadow?.[shadow] || {})

  if (props.fancy) {
    Object.assign(style, { overflow: 'hidden' })
    render =<>
      <LinearGradient
        style={{ position: 'absolute', width: '100%', height: '100%' }}
        {...config?.fillFancy?.[props.fill || 'default'] as any}
      />
      {render}
      </>
  }

  render =
    <OldBox
      {...props as any}
      stretch={(blur || borderFill || borderWeight) ? true : stretch}
      style={style}
    >
      {render}
    </OldBox>

  if (borderFill || borderWeight) {
    render =
      <Line fill={borderFill} weight={borderWeight} stretch={stretch} style={{
        borderTopLeftRadius: extract('radius', props.radiusTopLeft, props.radiusTop, props.radius),
        borderTopRightRadius: extract('radius', props.radiusTopRight, props.radiusTop, props.radius),
        borderBottomLeftRadius: extract('radius', props.radiusBottomLeft, props.radiusBottom, props.radius),
        borderBottomRightRadius: extract('radius', props.radiusBottomRight, props.radiusBottom, props.radius),
      }}>
        {render}
      </Line>
  }

  if (blur) {
    render =
      <OldBox stretch={stretch} style={style}>
        <Fit clip stretch style={{
          width: props.width,
          height: props.height,
          borderTopLeftRadius: extract('radius', props.radiusTopLeft, props.radiusTop, props.radius),
          borderTopRightRadius: extract('radius', props.radiusTopRight, props.radiusTop, props.radius),
          borderBottomLeftRadius: extract('radius', props.radiusBottomLeft, props.radiusBottom, props.radius),
          borderBottomRightRadius: extract('radius', props.radiusBottomRight, props.radiusBottom, props.radius),
        }}>
          <BlurView intensity={props.blur as any}>{render}</BlurView>
        </Fit>
      </OldBox>
  }
  return render
})

function extract(prop: keyof OldBoxProps, ...values) {
  const { boxConfig, customBoxValue } = getConfig(useTheme().normalizedConfig)
  for (const val of values) {
    if (val == undefined) { continue }
    const conf = boxConfig({ [prop]: val })
    const cust = customBoxValue({ [prop]: val })
    if (conf || cust) { return conf || cust }
  }
}