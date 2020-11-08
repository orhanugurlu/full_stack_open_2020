import patientData from '../../data/patients.json';
import { Patient, PatientWithoutSsn, NewPatient } from '../types';
import { v4 as uuid } from 'uuid';
import toNewPatient from '../utils';

let patients: Array<Patient> = patientData.map(obj => {
  return { id: obj.id, ...toNewPatient(obj) };
});

const getAllPatientsWithoutSsn = (): PatientWithoutSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (newPatient: NewPatient): Patient => {
  const patient: Patient = { id: uuid(), ...newPatient };
  patients = patients.concat(patient);
  return patient;
};

export default {
  getAllPatientsWithoutSsn,
  addPatient
};