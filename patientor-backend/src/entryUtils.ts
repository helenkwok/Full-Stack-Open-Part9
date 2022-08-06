import { NewEntry, Type, HealthCheckRating } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isArray = (diagnosisCodes: unknown): diagnosisCodes is Array<string> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Array.isArray(diagnosisCodes) || Array.isArray(diagnosisCodes) && diagnosisCodes.every(d => (typeof d === "string"));
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

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<string> | undefined => {
  if(!diagnosisCodes) return undefined;
  if (!isArray(diagnosisCodes) ) {
    throw new Error('Incorrect or missing date: ' + diagnosisCodes);
}
  return diagnosisCodes;
};

const parseType = (type: unknown): Type => {
  if (!type || !isType(type)) {
    throw new Error('Incorrect or missing type: ' + type);
  }
  return type;
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!healthCheckRating && healthCheckRating !== 0 || !isHealthCheckRating(Number(healthCheckRating))) {
    throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
  }
  return Number(healthCheckRating);
};

const assertNever = (object: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(object)}`
  );
 };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewEntry = (object: any): NewEntry => {
  const description = parseParam(object.description, 'description');
  const date = parseDate(object.date);
  const specialist = parseParam(object.specialist, 'specialist');
  const diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
  const type = parseType(object.type);

  let newEntry: NewEntry;

  switch (type) {
    case 'Hospital':
      newEntry = {
        description,
        date,
        specialist,
        diagnosisCodes,
        type,
        discharge: {
          date: parseDate(object.discharge.date),
          criteria: parseParam(object.discharge.criteria, 'criteria')
        }
      };
      return newEntry;
    case 'OccupationalHealthcare':
      newEntry = {
        description,
        date,
        specialist,
        diagnosisCodes,
        type,
        employerName: parseParam(object.employerName, 'employerName')
      };
      return newEntry;
    case 'HealthCheck':
      newEntry = {
        description,
        date,
        specialist,
        diagnosisCodes,
        type,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
      return newEntry;
    default:
      return assertNever(object as never);
  }
};

export default toNewEntry;