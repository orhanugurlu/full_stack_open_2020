import React from 'react';
import { Container } from 'semantic-ui-react';
import { SickLeave } from '../types';

const SickLeaveDetail: React.FC<{ sickLeave: SickLeave }> = ({ sickLeave }) => {
  return (
    <Container>
      <strong>Sick leave: </strong>
      {sickLeave.startDate} - {sickLeave.endDate}
    </Container>
  );
};

export default SickLeaveDetail;