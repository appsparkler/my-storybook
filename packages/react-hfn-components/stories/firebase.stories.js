import React from 'react'
import AbhyasiIdField from './components/AbhyasiIdField'
import FirebaseApp from './firebase/setup'

export default {
  title: 'Firebase',
}

export const scanEvent = () => {
  return (
    <div>
      <h1>Scan ID</h1>
      <AbhyasiIdField />
    </div>
  )
}

function handleSnapShot({ setCount }, snapshot) {
  setCount(snapshot.size)
}

function componentDidMount({ setCount }) {
  const db = FirebaseApp.firestore()
  const unsubscribe = db.collection('abhyasis-in-ashram').onSnapshot(
    handleSnapShot.bind(null, {
      setCount,
    })
  )
  return () => {
    unsubscribe()
  }
}

export const kitchenService = () => {
  const [count, setCount] = React.useState(0)
  React.useEffect(
    componentDidMount.bind(null, {
      setCount,
    })
  )
  return (
    <div>
      <h1>Kitchen Service</h1>
      <h2>Abhyasis In Ashram : {count}</h2>
    </div>
  )
}
