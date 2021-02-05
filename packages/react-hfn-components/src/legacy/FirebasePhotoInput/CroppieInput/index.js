import React from 'react'
import PropTypes from 'prop-types'
import PreviewImage from './PreviewImage'
import UploadButton from './UploadButton'
import Croppie from './Croppie'
import ProgressBar from './ProgressBar'
import BSAlert from '@react-hfn-components/BSAlert'
import useCroppieInput from './useCroppieInput'
import 'croppie/croppie.css'

const CroppieInput = (props) => {
  const superProps = useCroppieInput({ props })
  return (
    <div className="RFHN-Croppie col-xs-12">
      <Croppie {...superProps} />
      <div className="PreviewAndUpload">
        <PreviewImage {...superProps} />
        {!props.exceedMaxBytes && <UploadButton {...superProps} />}
        <br />
        {props.isUploading && <ProgressBar {...superProps} />}
        {props.exceedsMaxBytes && (
          <BSAlert type="danger" msg="Exceeds Max Bytes" />
        )}
        {props.uploaded && <BSAlert type="success" msg="Done..." />}
      </div>
    </div>
  )
}

CroppieInput.propTypes = {
  exceedsMaxBytes: PropTypes.bool,
  isUploading: PropTypes.bool,
  exceedMaxBytes: PropTypes.bool,
  uploaded: PropTypes.bool,
}

export default CroppieInput
