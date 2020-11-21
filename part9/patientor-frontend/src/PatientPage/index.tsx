import React from "react";
import EntryDetails from "../components/EntryDetails";
import GenderIcon from "../components/GenderIcon";
import { useStateValue } from "../state";
import { Entry } from "../types";

const PatientPage: React.FC = () => {
  const [{ patient }] = useStateValue();

  if (!patient) {
    return null;
  }

  return (
    <div>
      <h1>{patient.name}<GenderIcon gender={patient.gender} /></h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h2>entries</h2>
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