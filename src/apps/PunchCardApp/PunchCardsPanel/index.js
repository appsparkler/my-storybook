import React from 'react';
import {Panel} from '@fluentui/react'

const PunchCards = () => null

const PunchCardsPanel = ({
  show, panel,
}) => show && (
  <Panel>
    <PunchCards />
  </Panel>
);

export default PunchCardsPanel;
