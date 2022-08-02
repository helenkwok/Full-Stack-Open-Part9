import { Gender, NewPatientEntry} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseParam = (param: unknown, type: string): string => {
  if (!param|| !isString(param)) {
    throw new Error(`Incorrect or missing ${type}`);
  }

  return param;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatientEntry = (object: any): NewPatientEntry => {

  const newEntry: NewPatientEntry = {
    name: parseParam(object.name, 'name'),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseParam(object.ssn, 'ssn'),
    gender: parseGender(object.gender),
    occupation: parseParam(object.occupation, 'occupation'),
  };

  return newEntry;

};

export default toNewPatientEntry;