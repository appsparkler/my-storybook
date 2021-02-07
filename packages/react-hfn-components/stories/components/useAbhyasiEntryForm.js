import React from 'react'
import FirebaseApp from '@react-hfn-stories/firebase/setup'
import uuid from 'uuid'

function handleChange({ setAbhyasiID }, evt, val) {
  setAbhyasiID(val.toUpperCase())
}

function handleNewCodeDetect({ setAbhyasiID, setIsModalOpen }, result) {
  setAbhyasiID(result.text)
  setIsModalOpen(false)
}

async function handleSubmit({ abhyasiID, setAbhyasiID }) {
  const db = FirebaseApp.firestore()
  const docName = uuid()
  await db.collection('abhyasis-in-ashram').doc(docName).set({
    id: abhyasiID,
    timestamp: new Date().valueOf(),
  })
  setAbhyasiID('')
}

export default () => {
  const [abhyasiID, setAbhyasiID] = React.useState(undefined)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  return {
    abhyasiID,
    handleChange: handleChange.bind(null, { setAbhyasiID }),
    handleNewCodeDetect: handleNewCodeDetect.bind(null, {
      setAbhyasiID,
      setIsModalOpen,
    }),
    //
    isModalOpen,
    openModal: () => setIsModalOpen(true),
    closeModal: () => setIsModalOpen(false),
    handleSubmit: handleSubmit.bind(null, {
      abhyasiID,
      setAbhyasiID,
    }),
  }
}
