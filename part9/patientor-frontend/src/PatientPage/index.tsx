import React from "react";
import axios from "axios";
import { Button } from "semantic-ui-react";

import { EntryFormValues } from "../AddPatientModal/AddEntryForm";
import { AddEntryModal } from "../AddPatientModal";
import EntryDetails from "../components/EntryDetails";
import GenderIcon from "../components/GenderIcon";
import { updatePatient, useStateValue } from "../state";
import { Entry, EntryTypes, entryTypeToName, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useHistory } from "react-router-dom";

const getInitialValue = (entryType: EntryTypes): Entry => {
  switch (entryType) {
    case "HealthCheck":
      return {
        id: "",
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        healthCheckRating: 0
      };
    case "Hospital":
      return {
        id: "",
        type: "Hospital",
        description: "",
        date: "",
        specialist: ""
      };
    case "OccupationalHealthcare":
      return {
        id: "",
        type: "OccupationalHealthcare",
        description: "",
        date: "",
        specialist: "",
        employerName: ""
      };
  }
};

const PatientPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [entryType, setEntryType] = React.useState<EntryTypes>("HealthCheck");
  const history = useHistory();

  if (!patient) {
    history.push("/");
    return null;
  }

  const openModal = (entryType: EntryTypes): void => {
    setEntryType(entryType);
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    console.log(values);
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );
      dispatch(updatePatient(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data);
    }
  };

  return (
    <div>
      <h1>{patient.name}<GenderIcon gender={patient.gender} /></h1>
      <p><strong>SSN: </strong>{patient.ssn}</p>
      <p><strong>Occupation: </strong>{patient.occupation}</p>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        initialValue={getInitialValue(entryType)}
      />
      <Button onClick={() => openModal("HealthCheck")}>Add {entryTypeToName("HealthCheck")} entry</Button>
      <Button onClick={() => openModal("Hospital")}>Add {entryTypeToName("Hospital")} entry</Button>
      <Button onClick={() => openModal("OccupationalHealthcare")}>Add {entryTypeToName("OccupationalHealthcare")} entry</Button>
      <h2>Entries</h2>
      {patient.entries.length > 0 ?
        patient.entries.map((entry: Entry) => (
          <EntryDetails key={entry.id} entry={entry} />
        ))
        :
        <div>No entries</div>
      }
    </div>
  );
};

export default PatientPage;