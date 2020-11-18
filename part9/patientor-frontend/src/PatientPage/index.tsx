import React from "react";
import GenderIcon from "../components/GenderIcon";
import { useStateValue } from "../state";

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
    </div>
  );
};

export default PatientPage;