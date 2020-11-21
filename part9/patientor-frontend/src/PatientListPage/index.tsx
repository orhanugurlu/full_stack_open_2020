import React from "react";
import axios from "axios";
import { Container, Table, Button } from "semantic-ui-react";

import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import { AddPatientModal } from "../AddPatientModal";
import { Patient, PublicPatient } from "../types";
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import { addPatient, setCurrentPatient, useStateValue } from "../state";
import { useHistory } from "react-router-dom";

const PatientListPage: React.FC = () => {
  const [{ patients, patient }, dispatch] = useStateValue();
  const history = useHistory();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const { data: newPatient } = await axios.post<PublicPatient>(
        `${apiBaseUrl}/patients`,
        values
      );
      dispatch(addPatient(newPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data);
    }
  };

  const showPatient = async (id: string) => {
    if (!patient || patient.id !== id) {
      try {
        const { data: patientWithEntriesFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setCurrentPatient(patientWithEntriesFromApi));
      } catch (e) {
        console.error(e.response.data);
        setError(e.response.data);
      }
    }
    history.push(`/patients/${id}`);
  };

  return (
    <div className="App">
      <Container textAlign="center">
        <h3>Patient list</h3>
      </Container>
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Gender</Table.HeaderCell>
            <Table.HeaderCell>Occupation</Table.HeaderCell>
            <Table.HeaderCell>Health Rating</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(patients).map((patient: PublicPatient) => (
            <Table.Row key={patient.id} onClick={() => showPatient(patient.id)}>
              <Table.Cell>{patient.name}</Table.Cell>
              <Table.Cell>{patient.gender}</Table.Cell>
              <Table.Cell>{patient.occupation}</Table.Cell>
              <Table.Cell>
                <HealthRatingBar showText={false} rating={1} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Patient</Button>
    </div>
  );
};

export default PatientListPage;
