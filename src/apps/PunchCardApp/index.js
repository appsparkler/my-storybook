import React from 'react';
import {Stack} from '@fluentui/react'
import PunchCard from './PunchCard'

const PunchCardAppLayout = ({
  punchCard
}) => (
  <Stack>
    <PunchCard {...punchCard}/>
  </Stack>
);

const PunchCardApp = () => {
  const punchCardApp = {
    punchCard: {
      goalHours: '00',
      goalMinutes: '00',
      punchedSlotItems: []
    }
  }
  return <PunchCardAppLayout {...punchCardApp} />
}

export default React.memo(PunchCardApp);
