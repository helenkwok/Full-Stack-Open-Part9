import React from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Box, Button, Paper, Table, TableBody, TableContainer, Typography } from '@material-ui/core';
import { MdMale, MdFemale, MdTransgender } from 'react-icons/md';

import { apiBaseUrl } from "../constants";
import { Gender, Patient } from '../types';
import EntryDetails from './EntryDetails';

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
          //console.log(patient.entries);
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
    <>
      {patient &&
        <Box>
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
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {patient.entries.map(entry =>
                  <EntryDetails key={entry.id} entry={entry} />
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      }
      <Box sx={{ pt: 2 }}>
        <Button variant="contained" onClick={() => console.log('add entry')}>
          ADD NEW ENTRY
        </Button>
      </Box>
    </>
  );
};

export default PatientPage;

