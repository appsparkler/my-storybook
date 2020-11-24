import React from 'react';
import PropTypes from 'prop-types';
import {
  DetailsList, PrimaryButton,
  ProgressIndicator, Text,
  TextField, Stack, MessageBar,
  TooltipHost
} from '@fluentui/react'
import ShowHide from '../ShowHide'

const PunchCard = ({
  primaryButton, primaryButton1, detailsList,
  progressIndicator1, progressIndicator2,
  goalHours, goalMinutes,
  title, showPunchedSection,
  tooltipHost1, primaryButton2,
  punchCardDialog, messageBar
}) => (
  <div className="ms-Grid">

    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-sm12 ms-md8 ms-lg8 ms-xl6">
        <PrimaryButton {...primaryButton2} />
      </div>
    </div>

    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-sm12 ms-md8 ms-lg8 ms-xl6">
        <Text>
          <h2>
            {title}
          </h2>
        </Text>
      </div>
    </div>

    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-sm12 ms-md6">
        <Text>
          <h3>Goal For The Day</h3>
        </Text>
        <Stack tokens={{childrenGap: 5}}>
          <Stack.Item>
            <Stack
              horizontal
              verticalAlign="end"
              tokens={{childrenGap: 10}}
            >
              <TextField
                {...goalHours}
              />
              <TextField
                {...goalMinutes}
              />
            </Stack>
          </Stack.Item>
          <Stack.Item>
            <MessageBar {...messageBar} />
          </Stack.Item>
        </Stack>
      </div>
    </div>

    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-sm-12 ms-md6">
        <Stack tokens={{childrenGap: 10}}>
          <Stack.Item>
            <ShowHide show={showPunchedSection}>
              <Text>
                <h3>Punched</h3>
              </Text>
              <DetailsList
                {...detailsList}
              />
              <br />
            </ShowHide>
          </Stack.Item>
          <Stack.Item>
            <PrimaryButton {...primaryButton1} />
          </Stack.Item>
        </Stack>
        <Text>
          <h3>Scheduled</h3>
        </Text>

        {/*
        <DetailsList
          {...detailsList}
        />
        */}

        <div dir="ltr">
          <TooltipHost {...tooltipHost1}>
            <ProgressIndicator
              {...progressIndicator1}
            />
          </TooltipHost>
        </div>
        {/*

        <div dir="rtl">
          <ProgressIndicator
            {...progressIndicator2}
          />
        </div>
        */}
      </div>
    </div>

  </div>
);

PunchCard.propTypes = {
  punchButton: PropTypes.object,
  title: PropTypes.string,
  primaryButton:PropTypes.object,
  primaryButton1: PropTypes.object,
  primaryButton2: PropTypes.object,
  detailsList: PropTypes.object,
  progressIndicator1: PropTypes.object,
  progressIndicator2: PropTypes.object,
  goalHours: PropTypes.object,
  goalMinutes: PropTypes.object,
  tooltipHost1: PropTypes.object,
  messageBar: PropTypes.object,
  showPunchedSection: PropTypes.bool,
};

PunchCard.defaultProps = {
  primaryButton: {},
  primaryButton1: {},
  primaryButton2: {},
  detailsList: {},
  progressIndicator1: {},
  goalHours: {},
  goalMinutes: {},
  progressIndicator2: {},
  messageBar: {},
  showPunchedSection: false,
  title: '',
  tooltipHost1: {}
}

export default React.memo(PunchCard);
