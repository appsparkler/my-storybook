import React from 'react'
import PropTypes from 'prop-types'
import {Shimmer, ShimmerElementType, Image} from 'office-ui-fabric-react'

function srcDidChange({setIsLoading}) {
  setIsLoading(true)
}

const ProfilePhoto = ({height, width, src}) => {
  const [isLoading, setIsLoading] = React.useState(true)
  React.useEffect(srcDidChange.bind(null, {setIsLoading}), [src])
  return (
    <Shimmer
      width={width}
      shimmerElements={[{type: ShimmerElementType.line, height}]}
      isDataLoaded={!isLoading}
    >
      <Image
        src={src}
        width={width}
        height={height}
        onLoad={() => {
          setIsLoading(false)
        }}
      />
    </Shimmer>
  )
}

ProfilePhoto.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
}

ProfilePhoto.defaultProps = {
  height: 180,
  width: 180,
  src: 'http://placekitten.com/180/180',
}

export default ProfilePhoto

export const MemoProfilePhoto = React.memo(ProfilePhoto)
