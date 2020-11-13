import React from 'react'
import {Text} from '@fluentui/react'
import {useId, useBoolean} from '@uifabric/react-hooks'
import CustomLabel from './'
import PropTypes from 'prop-types'

const useCustomLabelVariantA = (args) => {
  const  {
    label = '',
    content = ''
  } = args
  const iconButtonId = useId()
  const [showCallout, {toggle: toggleCallout}] = useBoolean(false);
  return {
    labelWrapperStack: {
      horizontal:  true,
      verticalAlign: 'center',
      tokens: {
        childrenGap: 4,
        maxWidth: 300,
      }
    },
    label,
    callout: {
      target: `#${iconButtonId}`,
      onDismiss: toggleCallout
    },
    iconButton: {
      id: iconButtonId,
      styles: {
        root: {
          marginBottom: -3,
        }
      },
      title: 'Info',
      iconProps: {
        iconName: 'Info'
      },
      onClick: React.useCallback(() => {
        toggleCallout()
      },[toggleCallout])
    },
    showCallout,
    contentWrapperStack: {
      styles: { root: {
        padding: 10,
        maxWidth: 200
      } },
    },
    calloutContent: (
      <Text variant="small">
        {content}
    </Text>)
  }
}

export const CustomLabelVariantA = ({
  label, content
}) => {
  const customLabelVariantA = useCustomLabelVariantA({
    label, content
  })
  return (
    <CustomLabel {...customLabelVariantA}/>
  )
};

CustomLabelVariantA.propTypes = {
  label: PropTypes.string,
  content: PropTypes.string
}

export default React.memo(CustomLabelVariantA)
