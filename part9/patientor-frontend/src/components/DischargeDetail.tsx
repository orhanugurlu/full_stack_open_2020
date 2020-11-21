import React from 'react';
import { Container } from 'semantic-ui-react';
import { Discharge } from '../types';

const DischargeDetail: React.FC<{ discharge: Discharge }> = ({ discharge }) => {
  return (
    <Container>
      <strong>Discharge: </strong>
      {discharge.date} - {discharge.criteria}
    </Container>
  );
};

export default DischargeDetail;