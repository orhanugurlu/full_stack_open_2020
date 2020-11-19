import diagnoseData from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagnoseData as Array<Diagnosis>;

const getAllDiagnoses = (): Array<Diagnosis> => {
  return diagnoses;
};

export default {
  getAllDiagnoses
};