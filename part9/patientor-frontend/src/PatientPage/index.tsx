import React from "react";
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
          <div key={entry.id}>
            {entry.date} <i>{entry.description}</i>
            {entry.diagnosisCodes ?
              <ul>
                {entry.diagnosisCodes.map((code: string) => (
                  <li key={code}>{code}</li>
                ))}
              </ul>
              :
              null
            }
          </div>
        ))
        :
        <div>No entries</div>
      }
    </div>
  );
};

export default PatientPage;