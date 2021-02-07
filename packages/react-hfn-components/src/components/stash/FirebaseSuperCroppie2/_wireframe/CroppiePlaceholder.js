import React from 'react'
import {
  Stack,
  DefaultButton,
  mergeStyleSets,
  getTheme,
} from 'office-ui-fabric-react'

export const CroppiePlaceholder = ({}) => (
  <Stack horizontalAlign="center" tokens={tokens}>
    <div className={contentStyles.croppiePlaceholderStyles}>
      Croppie Placeholder
    </div>
    <DefaultButton primary text="Upload Photo" />
  </Stack>
)

const tokens = {
  childrenGap: 20,
}
const theme = getTheme()
const contentStyles = mergeStyleSets({
  croppiePlaceholderStyles: [
    theme.fonts.medium,
    {
      outline: '2px blue dashed',
      width: '350px',
      height: '200px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  ],
})
