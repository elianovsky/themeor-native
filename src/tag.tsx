import * as React from 'react'
import { View, Text } from 'react-native'
import { FONT_NAME, getInitialStyles } from 'themeor'


export const Tag = React.forwardRef((props: any, ref: any) => {
  const { ['data-themeor']: component, className, style, ...rest } = props
  const initialStyles = getInitialStyles(component)
  const newStyle = { ...style }

  for (const cn of className.split(' ')) {
    Object.assign(newStyle, initialStyles[cn])
  }

  if (component === FONT_NAME) {
    return <Text {...rest} ref={ref} style={newStyle} />
  }

  return <View {...rest} ref={ref} style={newStyle} />
})