import React from 'react';
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import * as Yup from 'yup';

import { TextField, SelectField, TypeOption, DiagnosisSelection, HealthCheckRatingOption } from "../components/FormField";
import { Discharge, Entry, HealthCheckRating, SickLeave, Type } from "../types";
import { useStateValue } from '../state';

export type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: Type.Hospital, label: "Hospital" },
  { value: Type.OccupationalHealthcare, label: "OccupationalHealthcare" },
  { value: Type.HealthCheck, label: "HealthCheck" },
];

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: 0 },
  { value: HealthCheckRating.LowRisk, label: 1 },
  { value: HealthCheckRating.HighRisk, label: 2 },
  { value: HealthCheckRating.CriticalRisk, label: 3 },
];

const validationSchema = Yup.object().shape({
  description: Yup.string()
    .required('Field is required'),
  date: Yup.string()
    .required('Field is required'),
  specialist: Yup.string().required('Field is required'),
  employerName: Yup.string().when('type', {
    is: "OccupationalHealthcare",
    then: (schema: Yup.StringSchema<string | undefined>) => schema.required('Field is required')
  }),
  discharge: Yup.object().when('type', {
    is: "Hospital",
    then: (schema: Yup.AnyObjectSchema) => schema.shape({
      date:Yup.string()
      .required('Field is required'),
      criteria: Yup.string()
      .required('Field is required')
    })
  })
});

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: Type.HealthCheck,
        diagnosisCodes: undefined as Array<string> | undefined,
        employerName: "",
        healthCheckRating: HealthCheckRating.Healthy,
        sickLeave: {
          startDate: "",
          endDate: ""
        } as SickLeave,
        discharge: {
          date: "",
          criteria: ""
        } as Discharge
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <SelectField label="Type" name="type" options={typeOptions} />
            {values.type === "Hospital" &&
              <>
                <Field
                  label="Discharge Date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Discharge Criteria"
                  placeholder="Criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </>
            }
            {values.type === "OccupationalHealthcare" &&
              <>
                <Field
                  label="EmployerName"
                  placeholder="EmployerName"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick Leave Start Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="Sick Leave End Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </>
            }
            {values.type === "HealthCheck" &&
              <SelectField
                label="Health Check Rating"
                name="healthCheckRating"
                options={healthCheckRatingOptions}
              />
            }
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;