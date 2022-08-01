import React from 'react';
import { BsHeartFill } from 'react-icons/bs';
import { HealthCheckRating } from '../types';

const HealthCheckRatingIcon: React.FC<{ healthCheckRating: HealthCheckRating }> = ({ healthCheckRating }) => {

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
   };

  switch (String(healthCheckRating)) {
    case '0':
      return <BsHeartFill color='green' />;
    case '1':
      return <BsHeartFill color='yellow' />;
    case '2':
      return <BsHeartFill color='orange'/>;
    case '3':
      return <BsHeartFill color='red' />;
    default:
      return assertNever(healthCheckRating as never);
  }
};

export default HealthCheckRatingIcon;