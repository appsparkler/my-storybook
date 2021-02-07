import Croppie from 'croppie'

async function handleCroppieUpdates({croppie, setCroppedDataURL}) {
  const croppedDataURL = await croppie.result()
  setCroppedDataURL(croppedDataURL)
}

function setupCroppie({
  croppieRef,
  croppieConfig,
  setCroppie,
  setCroppedDataURL,
}) {
  if (!croppieRef.current) return
  const croppie = new Croppie(croppieRef.current, croppieConfig)
  setCroppie(croppie)
  croppie.element.addEventListener(
      'update',
      handleCroppieUpdates.bind(null, {
        croppie,
        setCroppedDataURL,
      }),
  )
}

export default ({
  croppieRef,
  croppieConfig,
  setCroppie,
  setCroppedDataURL,
}) => {
  return {
    setupCroppie: setupCroppie.bind(null, {
      croppieRef,
      setCroppie,
      croppieConfig,
      setCroppedDataURL,
    }),
  }
}
