import { v1 as uuid } from 'uuid';
import patients from '../../data/patientEntries';

import { Patient, NewPatientEntry, PublicPatient, Entry, NewEntry } from '../types';

const getPublicEntries = (): Array<PublicPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {

  const newPatientEntry = {
    id: uuid(),
    ...entry,
    entries: [] as Entry[]
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): Patient | undefined =>  patients.find(p => p.id === id);

const addEntry = (entry: NewEntry, id: string): Entry => {
  const patient = findById(id);
  const newEntry = {
    id: uuid(),
    ...entry
  };
  patient?.entries.push(newEntry);
  return newEntry as Entry;
};

export default {
  getPublicEntries,
  addPatient,
  findById,
  addEntry
};