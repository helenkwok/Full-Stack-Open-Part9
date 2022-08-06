import { Entry, Patient } from "../src/types";
import toNewPatientEntry from "../src/utils";
import patientsData from  "../data/patients.json";
import toNewEntry from "../src/entryUtils";

const patients= patientsData;

//console.log(patients);

const patientEntries: Patient[] = patients.map((obj) => {
    const object = toNewPatientEntry(obj) as Patient;
    object.id = obj.id;
    const entryObjects: Entry[] = obj.entries.map((ety) => {
      const entry = toNewEntry(ety) as Entry;
      entry.id = ety.id;
      return entry;
    });
    object.entries = entryObjects;
    return object;
  });

//console.log(patientEntries);

export default patientEntries;
