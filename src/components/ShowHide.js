import  React from 'react'

const ShowHide = ({show, children})  => show && children;

export default React.memo(ShowHide)
