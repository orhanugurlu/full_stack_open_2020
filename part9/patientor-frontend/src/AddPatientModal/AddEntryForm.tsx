import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Formik, Form, Field } from "formik";

import { Entry } from "../types";
import { DiagnosisSelection, NumberField, TextField } from "./FormField";
import { useStateValue } from "../state";

export type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
  initialValue: Entry;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel, initialValue }) => {
  const [{ diagnoses }] = useStateValue();
  const validate = (values: Entry) => {
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
    if (values.type === "OccupationalHealthcare" && !values.employerName) {
      errors.employerName = requiredError;
    }
    return errors;
  };
  return (
    <Formik
      initialValues={initialValue}
      onSubmit={onSubmit}
      validate={validate}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
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
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            {initialValue.type === "OccupationalHealthcare" ?
              <Field
                label="Employer"
                placeholder="employer name"
                name="employerName"
                component={TextField}
              />
              : null}
            {initialValue.type === "HealthCheck" ?
              <Field
                label="Rating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
              : null}
            {(initialValue.type === "OccupationalHealthcare" || initialValue.type === "Hospital") ?
              <Field
                label="Sick Leave Start"
                placeholder="YYYY-MM-DD"
                name="sickLeave.startDate"
                component={TextField}
              />
              : null}
            {(initialValue.type === "OccupationalHealthcare" || initialValue.type === "Hospital") ?
              <Field
                label="Sick Leave End"
                placeholder="YYYY-MM-DD"
                name="sickLeave.endDate"
                component={TextField}
              />
              : null}
            {initialValue.type === "Hospital" ?
              <Field
                label="Discharge Date"
                placeholder="YYYY-MM-DD"
                name="discharge.date"
                component={TextField}
              />
              : null}
            {initialValue.type === "Hospital" ?
              <Field
                label="Discharge Criteria"
                placeholder="discharge criteria"
                name="discharge.criteria"
                component={TextField}
              />
              : null}
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik >
  );
};

export default AddEntryForm;
