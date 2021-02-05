import React from 'react'
import PropTypes from 'prop-types'
import { Modal, IconButton, Stack, TextField } from 'office-ui-fabric-react'

const ResultModal = ({ isOpen, content, closeModal }) => (
  <Modal isOpen={isOpen}>
    <Stack horizontal horizontalAlign="end">
      <Stack.Item>
        <IconButton
          iconProps={{ iconName: 'Cancel' }}
          ariaLabel="Close popup modal"
          onClick={closeModal}
        />
      </Stack.Item>
    </Stack>

    <Stack>
      <Stack.Item>
        <div style={{ padding: '10px' }}>
          <TextField label="Result" multiline rows={3} value={content} />
        </div>
      </Stack.Item>
    </Stack>
  </Modal>
)

ResultModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
}

ResultModal.defaultProps = {
  isOpen: false,
  content: 'Hello World!!!',
  closeModal: () => {},
}

export default ResultModal
