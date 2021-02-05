import React from 'react'
import { Stack, MaskedTextField, Button } from 'office-ui-fabric-react'
import BarCodeScanner from './BarCodeScanner'
import useAbhyasiEntryForm from './useAbhyasiEntryForm'

const AbhyasiIdField = ({}) => {
  const {
    abhyasiID,
    openModal,
    closeModal,
    isModalOpen,
    handleChange,
    handleNewCodeDetect,
    handleSubmit,
  } = useAbhyasiEntryForm()
  return (
    <form>
      <Stack tokens={{ childrenGap: 10 }}>
        <Stack.Item>
          <Stack horizontal tokens={{ childrenGap: 20 }} verticalAlign="end">
            <MaskedTextField
              label="Abhyasi ID"
              onChange={handleChange}
              mask={'aa aa aa 999'}
              value={abhyasiID}
              iconProps={{ iconName: 'QRCode' }}
            />
            <BarCodeScanner
              onNewCodeDetected={handleNewCodeDetect}
              openModal={openModal}
              closeModal={closeModal}
              isModalOpen={isModalOpen}
            />
          </Stack>
        </Stack.Item>
        <Stack.Item>
          <Button
            secondary
            disabled={!abhyasiID}
            text="Submit"
            onClick={handleSubmit}
          />
        </Stack.Item>
      </Stack>
    </form>
  )
}

export default AbhyasiIdField
