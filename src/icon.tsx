import * as React from 'react'
import { FC } from 'react'
import { Icon as OldIcon, ICON_NAME, getInitialStyles, getConfig, useTheme, useConfig, useBox } from 'themeor'


export type IconProps = {
  name: string
  fill?: string | false
  size?: string | false | number
  inverse?: boolean
  fancy?: boolean
}

export const Icon: FC<IconProps> = ({ fill = 'default', size, inverse, ...initialProps }) => {
  const { normalizedConfig } = useTheme()
  const { config } = useConfig()
  const { iconConfig } = getConfig(normalizedConfig)
  const { TRY_TO_INVERSE } = useBox()

  const forseInverse = (inverse !== false) && (inverse || TRY_TO_INVERSE)

  const fancy: any = config.fillFancy[fill as any]

  return (
    <OldIcon {...initialProps}>
      {(Component, props) => {
        const initialStyles = getInitialStyles(ICON_NAME)

        props.fill = (forseInverse ? iconConfig({ fillInverse: fill }) : iconConfig({ fill })) || fill

        props.size = iconConfig({ size }) || size

        for (const cn of props.className.split(' ')) {
          Object.assign(props.style, initialStyles[cn])
        }
        if (initialProps.fancy) {
          props.fill = `url(#fill)`
        }

        return (
          <Component
            {...props}
            fill={props.fill || '#000'}
            size={props.size || 24}
            more={initialProps.fancy && fancy && (`
<defs>
  <linearGradient id="fill" x1="1.5" y1="12.2415" x2="23.7857" y2="12.2415" gradientUnits="userSpaceOnUse">
  <stop stop-color=${fancy.colors[0]}/>
  <stop offset="1" stop-color=${fancy.colors[1]}/>
  </linearGradient>
</defs>
    `)}
          />)
      }}
    </OldIcon>
  )
}

