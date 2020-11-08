/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender } from './types';

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

const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseStringField(object, 'name'),
    dateOfBirth: parseDate(object, 'dateOfBirth'),
    ssn: parseStringField(object, 'ssn'),
    gender: parseGender(object, 'gender'),
    occupation: parseStringField(object, 'occupation')
  };

  return newPatient;
};

export default toNewPatient;