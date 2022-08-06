import React from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Box, Button, Paper, Table, TableBody, TableContainer, Typography } from '@material-ui/core';
import { MdMale, MdFemale, MdTransgender } from 'react-icons/md';

import { apiBaseUrl } from "../constants";
import { Entry, Gender, Patient } from '../types';
import EntryDetails from './EntryDetails';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

const PatientPage = () => {
  const [patient, setPatient] = React.useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const { id } = useParams<{ id: string }>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id as string}/entries`,
        values
      );
      patient?.entries.push(newEntry);
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Box sx={{ pt: 2 }}>
        <Button variant="contained" onClick={() => openModal()}>
          ADD NEW ENTRY
        </Button>
      </Box>
    </>
  );
};

export default PatientPage;

