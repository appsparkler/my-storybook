import React from 'react'
import PropTypes from 'prop-types'
import { Stack, Text, DetailsList } from '@fluentui/react'

const DetailsListWithText = ({ show, detailsList, text }) =>
  show && (
    <Stack>
      <Text {...text} />
      <DetailsList {...detailsList} />
    </Stack>
  )

DetailsListWithText.propTypes = {
  /** hide/show the element */
  show: PropTypes.bool,

  /** [Click here](https://docs.microsoft.com/en-us/javascript/api/office-ui-fabric-react/idetailslistprops?view=office-ui-fabric-react-latest) a full  list of props. */
  detailsList: PropTypes.object.isRequired,

  /** [Click Here](https://docs.microsoft.com/en-us/javascript/api/office-ui-fabric-react/itextprops?view=office-ui-fabric-react-latest) for a full list of props */
  text: PropTypes.object.isRequired,
}

DetailsList.defaultProps = {
  show: false,
  detailsList: {
    items: [{ Name: 'foo' }, { Name: 'bar' }],
  },
  text: {},
}

export default React.memo(DetailsListWithText)
