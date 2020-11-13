import React from 'react';
import PropTypes from 'prop-types';
import {
  DetailsList, PrimaryButton,
  ProgressIndicator, Text, Stack
} from '@fluentui/react'

const PunchCard = ({
  primaryButton, detailsList,
  progressIndicator1, progressIndicator2
}) => (
  <div>
    <PrimaryButton {...primaryButton} />
    <div className=""></div>
    <Text>
      <h3>
          Time Card
      </h3>
    </Text>
    <Stack>
      <Stack.Item>
        <DetailsList
          {...detailsList}
        />
      </Stack.Item>
    </Stack>
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
);

PunchCard.propTypes = {
  punchButton: PropTypes.object
};

export default PunchCard;
