function handleMediaSourceChange({ valueSetter }, evt, option) {
  evt.stopPropagation()
  const mediaSource = option.key
  valueSetter(mediaSource)
}

export default ({ valueSetter }) => {
  return {
    revalueSetter: () => valueSetter(null),
    handleMediaSourceChange: handleMediaSourceChange.bind(null, {
      valueSetter,
    }),
  }
}
