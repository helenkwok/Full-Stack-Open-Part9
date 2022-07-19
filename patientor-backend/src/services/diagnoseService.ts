import diagnoses from '../../data/diagnosesEntries';

import { Diagnosis } from '../types';

const getEntries = (): Array<Diagnosis> => {
  return diagnoses;
};

export default {
  getEntries
};