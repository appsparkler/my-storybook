export default function checkForMobileDevice({ valueSetter }) {
  try {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      // eslint-disable-line max-len
      valueSetter(true)
    }
  } catch (e) {
    valueSetter(false)
  }
}
