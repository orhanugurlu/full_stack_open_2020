import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import { Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, assertNever } from '../types';
import DiagnoseList from './DiagnoseList';
import DischargeDetail from './DischargeDetail';
import EntryHeader from './EntryHeader';
import SickLeaveDetail from './SickLeaveDetail';
import HealthCheckRatingIcon from './HealthCheckRatingIcon';

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Segment>
      <EntryHeader entry={entry} iconName="hospital" />
      <DiagnoseList list={entry.diagnosisCodes} />
      {entry.sickLeave ? <SickLeaveDetail sickLeave={entry.sickLeave} /> : null}
      {entry.discharge ? <DischargeDetail discharge={entry.discharge} /> : null}
    </Segment>
  );
};

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <Segment>
      <EntryHeader entry={entry} iconName="stethoscope" />
      <DiagnoseList list={entry.diagnosisCodes} />
      <Container><strong>Employer: </strong>{entry.employerName}</Container>
      {entry.sickLeave ? <SickLeaveDetail sickLeave={entry.sickLeave} /> : null}
    </Segment>
  );
};

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <Segment>
      <EntryHeader entry={entry} iconName="doctor" />
      <DiagnoseList list={entry.diagnosisCodes} />
      <HealthCheckRatingIcon rating={entry.healthCheckRating} />
    </Segment>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
