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
          <h3>Settings</h3>
        </Text>
        <Stack
          horizontal
          verticalAlign="end"
          tokens={{childrenGap: 10}}
        >
          <TextField
            label="Hours"
          />
          <TextField
            label="Minutes"
          />
          <PrimaryButton text="Update" />
        </Stack>
      </div>
    </div>

    <br />

    <div className="ms-Grid-row">
      <div className="ms-Grid-col">
        <Stack horizontal tokens={{childrenGap: 10}}>
          <PrimaryButton {...primaryButton} />
          <PrimaryButton {...primaryButton1} />
        </Stack>
      </div>
    </div>

    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-sm-12 ms-md8">
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
  title: PropTypes.string
};

export default PunchCard;
