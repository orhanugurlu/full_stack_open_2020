import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { Entry, entryTypeToName } from '../types';
import AddEntryForm, { EntryFormValues } from './AddEntryForm';
import AddPatientForm, { PatientFormValues } from './AddPatientForm';

interface AddPatientModalProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientFormValues) => void;
  error?: string;
}

export const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }: AddPatientModalProps) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new patient</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddPatientForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

interface AddEntryModalProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  initialValue: Entry;
}

export const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, initialValue }: AddEntryModalProps) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new {entryTypeToName(initialValue.type)} entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} initialValue={initialValue} />
    </Modal.Content>
  </Modal>
);
