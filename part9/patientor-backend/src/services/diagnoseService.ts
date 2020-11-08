import diagnoseData from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnoseData as Array<Diagnose>;

const getAllDiagnoses = (): Array<Diagnose> => {
  return diagnoses;
};

export default {
  getAllDiagnoses
};