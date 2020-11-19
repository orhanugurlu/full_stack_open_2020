import { State } from "./state";
import { Patient, PublicPatient } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: PublicPatient[];
  }
  | {
    type: "SET_PATIENT";
    payload: Patient;
  }
  | {
    type: "ADD_PATIENT";
    payload: PublicPatient;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: { ...action.payload }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patients: PublicPatient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patients
  };
};

export const setCurrentPatient = (patient: Patient): Action => {
  return {
    type: 'SET_PATIENT',
    payload: patient
  };
};

export const addPatient = (patient: PublicPatient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient
  };
};
