import { Patient } from "../src/types";
import toNewPatientEntry from "../src/utils";
import patientsData from  "../data/patients.json";

const patients= patientsData;

console.log(patients);

const patientEntries: Patient[] = patients.map((obj) => {
    const object = toNewPatientEntry(obj) as Patient;
    object.id = obj.id;
    object.entries = obj.entries;
    return object;
  });

console.log(patientEntries);

export default patientEntries;
