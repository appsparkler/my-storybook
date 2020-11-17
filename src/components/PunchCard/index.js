import React from 'react';
import PropTypes from 'prop-types';
import {
  DetailsList, PrimaryButton,
  ProgressIndicator, Text,
  TextField, Stack
} from '@fluentui/react'

const PunchCard = ({
  primaryButton, primaryButton1, detailsList,
  progressIndicator1, progressIndicator2,
  goalHours, goalMinutes,
  title
}) => (
  <div className="ms-Grid">

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
      <div className="ms-Grid-col">
        <Text>
          <h3>Goal For The Day</h3>
        </Text>
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
          <PrimaryButton text="Update" />
        </Stack>
      </div>
    </div>

    <br />

    <div className="ms-Grid-row">
      <div className="ms-Grid-col">
        <Text>
          <h3>Actions</h3>
        </Text>
        <Stack horizontal tokens={{childrenGap: 10}}>
          <PrimaryButton {...primaryButton1} />
        </Stack>
      </div>
    </div>

    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-sm-12 ms-md6">
        <Text>
          <h3>Punched</h3>
        </Text>
        <DetailsList
          {...detailsList}
        />
        <Text>
          <h3>Scheduled</h3>
        </Text>
        <DetailsList
          {...detailsList}
        />
        <div dir="ltr">
          <ProgressIndicator
            {...progressIndicator1}
          />
        </div>
        <div dir="rtl">
          <ProgressIndicator
            {...progressIndicator2}
          />
        </div>
      </div>
    </div>

  </div>
);

PunchCard.propTypes = {
  punchButton: PropTypes.object,
  title: PropTypes.string,
  primaryButton:PropTypes.object,
  primaryButton1: PropTypes.object,
  detailsList: PropTypes.object,
  progressIndicator1: PropTypes.object,
  progressIndicator2: PropTypes.object,
  goalHours: PropTypes.object,
  goalMinutes: PropTypes.object,
};

PunchCard.defaultProps = {
  primaryButton: {},
  primaryButton1: {},
  detailsList: {},
  progressIndicator1: {},
  goalHours: {},
  goalMinutes: {},
  progressIndicator2: {},
  title: ''
}

export default React.memo(PunchCard);
