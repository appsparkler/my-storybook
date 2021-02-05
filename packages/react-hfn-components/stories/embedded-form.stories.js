import React from 'react'

export default {
  title: 'Embedded Forms.Example',
}

const iframeStyles = {
  width: '320px',
  height: '300px',
  border: '4px midnightBlue double',
}

export const Sample = () => {
  return (
    <div className="embedded-form-wrapper">
      <h1>Kindly register for the event in the form:</h1>

      <iframe
        style={iframeStyles}
        src="https://reg.heartfulness.org/#/form/security1"
      ></iframe>
    </div>
  )
}
