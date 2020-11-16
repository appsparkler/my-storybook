import React from 'react';
import PropTypes from 'prop-types';
import {
  DetailsList, PrimaryButton,
  ProgressIndicator, Text, Label
} from '@fluentui/react'

const PunchCard = ({
  primaryButton, detailsList,
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
        <PrimaryButton {...primaryButton} />
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
