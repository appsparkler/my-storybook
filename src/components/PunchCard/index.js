import React from 'react';
import PropTypes from 'prop-types';
import {
  DetailsList, PrimaryButton,
  ProgressIndicator, Text, Stack
} from '@fluentui/react'

const PunchCard = ({
  primaryButton, detailsList,
  progressIndicator1, progressIndicator2,
  title
}) => (
  <div>
    <div className="ms-Grid">

      <div className="ms-Grid-row">
        <div className="ms-Grid-col">
          <Text>
            <h3>
              {title}
            </h3>
          </Text>
        </div>
      </div>

      <div className="ms-Grid-row">
        <div className="ms-Grid-col">
          <PrimaryButton {...primaryButton} />
        </div>
      </div>

      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-lg8 ms-xl6">
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
  </div>
);

PunchCard.propTypes = {
  punchButton: PropTypes.object,
  title: PropTypes.string
};

export default PunchCard;
