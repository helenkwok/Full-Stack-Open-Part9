import patients from '../../data/patientEntries';

import { NonSensitivePatient } from '../types';

const getNonSensitiveEntries = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

export default {
  getNonSensitiveEntries
};