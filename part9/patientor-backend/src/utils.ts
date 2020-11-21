/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, Entry, HealthCheckRating } from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseStringField = (object: any, fieldName: string): string => {
  if (!object[fieldName]) {
    throw new Error(`Missing field '${fieldName}'`);
  }
  if (!isString(object[fieldName])) {
    throw new Error(`Incorrect field '${fieldName}' : ` + object[fieldName]);
  }
  return object[fieldName] as string;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (object: any, fieldName: string): string => {
  if (!isDate(parseStringField(object, fieldName))) {
    throw new Error(`Incorrect date '${fieldName}' : ` + object[fieldName]);
  }
  return object[fieldName] as string;
};

const isGender = (param: any): boolean => {
  return Object.values(Gender).includes(param);
};

const parseGender = (object: any, fieldName: string): Gender => {
  if (!isGender(parseStringField(object, fieldName))) {
    throw new Error(`Incorrect gender '${fieldName}' : ` + object[fieldName]);
  }
  return object[fieldName] as Gender;
};

const isHealthCheckRating = (param: any): boolean => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (object: any, fieldName: string): HealthCheckRating => {
  if (object[fieldName] === undefined) {
    throw new Error(`Missing field '${fieldName}'`);
  }
  if (!isHealthCheckRating(object[fieldName])) {
    throw new Error(`Incorrect health check rating '${fieldName}' : ` + object[fieldName]);
  }
  return object[fieldName] as HealthCheckRating;
};

export const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseStringField(object, 'name'),
    dateOfBirth: parseDate(object, 'dateOfBirth'),
    ssn: parseStringField(object, 'ssn'),
    gender: parseGender(object, 'gender'),
    occupation: parseStringField(object, 'occupation'),
    entries: []
  };

  return newPatient;
};

export const toNewEntry = (object: any): Entry => {
  const entryType: string = parseStringField(object, 'type');
  switch (entryType) {
    case 'Hospital':
      const hospitalEntry: Entry = {
        id: "",
        description: parseStringField(object, 'description'),
        date: parseStringField(object, 'date'),
        specialist: parseStringField(object, 'specialist'),
        type: entryType,
        diagnosisCodes: object['diagnosisCodes'] as string[]
      };
      if (object.sickLeave) {
        hospitalEntry.sickLeave = {
          startDate: parseStringField(object.sickLeave, 'startDate'),
          endDate: parseStringField(object.sickLeave, 'endDate'),
        };
      }
      if (object.discharge) {
        hospitalEntry.discharge = {
          date: parseStringField(object.discharge, 'date'),
          criteria: parseStringField(object.discharge, 'criteria'),
        };
      }
      return hospitalEntry;
    case 'OccupationalHealthcare':
      const occoupationalHealthCareEntry: Entry = {
        id: "",
        description: parseStringField(object, 'description'),
        date: parseStringField(object, 'date'),
        specialist: parseStringField(object, 'specialist'),
        employerName: parseStringField(object, 'employerName'),
        type: entryType,
        diagnosisCodes: object['diagnosisCodes'] as string[]
      };
      if (object.sickLeave) {
        occoupationalHealthCareEntry.sickLeave = {
          startDate: parseStringField(object.sickLeave, 'startDate'),
          endDate: parseStringField(object.sickLeave, 'endDate'),
        };
      }
      return occoupationalHealthCareEntry;
    case 'HealthCheck':
      const healthCheckEntry: Entry = {
        id: "",
        description: parseStringField(object, 'description'),
        date: parseStringField(object, 'date'),
        specialist: parseStringField(object, 'specialist'),
        type: entryType,
        healthCheckRating: parseHealthCheckRating(object, 'healthCheckRating'),
        diagnosisCodes: object['diagnosisCodes'] as string[]
      };
      return healthCheckEntry;
    default:
      throw new Error(
        `Unhandled entry type ${entryType}, object: ${JSON.stringify(object)}`
      );
  }
};
