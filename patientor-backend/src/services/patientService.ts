import { v1 as uuid } from 'uuid';
import patients from '../../data/patientEntries';

import { Patient, NewPatientEntry, PublicPatient, Entry } from '../types';

const getPublicEntries = (): Array<PublicPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = (entry: NewPatientEntry):Patient => {

  const newPatientEntry = {
    id: uuid(),
    ...entry,
    entries: [] as Entry[]
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): Patient | undefined =>  patients.find(p => p.id === id);

export default {
  getPublicEntries,
  addPatient,
  findById
};