import React from 'react';
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, TypeOption, DiagnosisSelection, HealthCheckRatingOption } from "../components/FormField";
import { Entry, HealthCheckRating, Type } from "../types";
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


const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: Type.HealthCheck,
        diagnosisCodes: undefined,
        employerName: "",
        healthCheckRating: HealthCheckRating.Healthy
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
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
            {values.type === "OccupationalHealthcare" &&
            <Field
              label="EmployerName"
              placeholder="EmployerName"
              name="employerName"
              component={TextField}
            />
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