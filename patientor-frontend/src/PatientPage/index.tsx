import React from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Box, Container, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { MdMale, MdFemale, MdTransgender } from 'react-icons/md';
import { BsDot } from "react-icons/bs";

import { apiBaseUrl } from "../constants";
import { Gender, Patient } from '../types';

const PatientPage = () => {
  const [patient, setPatient] = React.useState<Patient | null>(null);
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatientList = async () => {
      try {
        if (id) {
          const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`);
          setPatient(patient);
          console.log(patient.entries);
        }
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [id]);

  const getGenderIcon = (gender: Gender) => {
    switch (gender) {
      case 'male':
        return <MdMale />;
      case 'female':
        return <MdFemale />;
      default:
        return <MdTransgender />;
    }
  };

  return (
    <div>
      {patient &&
        <Container>
          <Typography style={{ marginTop: "0.5em", marginBottom: "0.5em", fontWeight: 600 }} variant="h5">
            {patient.name} {getGenderIcon(patient.gender)}
          </Typography>
          <Typography variant="body1">
            ssn: {patient.ssn}
          </Typography>
          <Typography variant="body1">
            occupation: {patient.occupation}
          </Typography>
          <Typography style={{ marginTop: "0.5em", marginBottom: "0.5em", fontWeight: 600 }} variant="h6">
            entries
          </Typography>
            {patient.entries.map(entry =>
              <Box key={entry.id}>
                <Typography variant="body1">
                  {entry.date} {entry.description}
                </Typography>
                <List>
                  {entry.diagnosisCodes && entry.diagnosisCodes.map(diagnosisCode =>
                    <ListItem key={diagnosisCode}>
                      <ListItemIcon>
                        <BsDot />
                      </ListItemIcon>
                      <ListItemText primary={diagnosisCode} />
                    </ListItem>
                  )}
                </List>
                </Box>
            )}
        </Container>
      }
      </div>
  );
};

export default PatientPage;