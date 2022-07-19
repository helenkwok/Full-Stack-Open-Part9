import diagnoses from '../../data/diagnosisEntries';

import { Diagnosis } from '../types';

const getEntries = (): Array<Diagnosis> => {
  return diagnoses;
};

export default {
  getEntries
};