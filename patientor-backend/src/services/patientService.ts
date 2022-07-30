import { v1 as uuid } from 'uuid';
import patients from '../../data/patientEntries';

import { Patient, NewPatientEntry, NonSensitivePatient, PublicPatient, Entry } from '../types';

const getPublicEntries = (): Array<PublicPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const getNonSensitiveEntries = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id, name, dateOfBirth, gender, occupation, entries
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
  getNonSensitiveEntries,
  getPublicEntries,
  addPatient,
  findById
};