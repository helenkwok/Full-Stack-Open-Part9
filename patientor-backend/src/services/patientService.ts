import { v1 as uuid } from 'uuid';
import patients from '../../data/patientEntries';

import { Patient, NewPatientEntry, NonSensitivePatient } from '../types';

const getNonSensitiveEntries = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = (entry: NewPatientEntry):Patient => {

  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getNonSensitiveEntries,
  addPatient
};