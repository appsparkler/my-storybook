import React from 'react'
import { Stack, Image } from 'office-ui-fabric-react'

const ProfilePhoto = ({}) => (
  <Stack.Item>
    <Image
      width={180}
      src="https://avatars.dicebear.com/v2/identicon/heartf.svg?options[radius]=4&options[margin]=5&options[background]=%2367676c&options[width]=180&options[height]=180&options[colors][]=amber"
    />
  </Stack.Item>
)

export default ProfilePhoto
