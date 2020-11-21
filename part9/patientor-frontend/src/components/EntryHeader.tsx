import React from 'react';
import { Container, Header, Icon } from 'semantic-ui-react';
import { BaseEntry } from '../types';

const EntryHeader: React.FC<{ entry: BaseEntry; iconName: "hospital" | "stethoscope" | "doctor" }> = ({ entry, iconName }) => {
  return (
    <div>
      <Header as="h3">{entry.date} <Icon name={iconName} /></Header>
      <Container><strong>{entry.specialist}</strong></Container>
      <Container><i>{entry.description}</i></Container>
    </div>
  );
};

export default EntryHeader;