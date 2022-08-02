import { NewEntry, Type, HealthCheckRating } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isType = (param: any): param is Type => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Type).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
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

const parseType = (type: unknown): Type => {
  if (!type || !isType(type)) {
    throw new Error('Incorrect or missing type: ' + type);
  }
  return type;
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
  }
  return healthCheckRating;
};

const assertNever = (object: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(object)}`
  );
 };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewEntry = (object: any): NewEntry => {
  const type = parseType(object.type);

  let newEntry: NewEntry;

  switch (type) {
    case 'Hospital':
      newEntry = {
        description: parseParam(object.description, 'description'),
        date: parseDate(object.date),
        specialist: parseParam(object.specialist, 'specialist'),
        type: type,
        discharge: {
          date: parseDate(object.discharge.date),
          criteria: parseParam(object.discharge.criteria, 'criteria')
        }
      };
      return newEntry;
    case 'OccupationalHealthcare':
      newEntry = {
        description: parseParam(object.description, 'description'),
        date: parseDate(object.date),
        specialist: parseParam(object.specialist, 'specialist'),
        type: type,
        employerName: parseParam(object.employerName, 'employerName')
      };
      return newEntry;
    case 'HealthCheck':
      newEntry = {
        description: parseParam(object.description, 'description'),
        date: parseDate(object.date),
        specialist: parseParam(object.specialist, 'specialist'),
        type: type,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
      return newEntry;
    default:
      return assertNever(object as never);
  }
};

export default toNewEntry;