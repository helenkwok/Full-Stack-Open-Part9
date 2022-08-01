import React from 'react';import axios from 'axios';
import { List, ListItem, ListItemIcon, ListItemText, TableCell, TableRow, Typography } from '@material-ui/core';
import { BsDot } from "react-icons/bs";
import { MdWork } from "react-icons/md";
import { apiBaseUrl } from "../constants";
import { Diagnosis, Entry } from '../types';

const OccupationalHealthcareEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [diagnoses, setDiagnoses] = React.useState<Array<Diagnosis> | null>(null);
  React.useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
          const { data: diagnoses } = await axios.get<Array<Diagnosis>>(
          `${apiBaseUrl}/diagnoses`);
          setDiagnoses(diagnoses);
          //console.log(diagnoses);
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnoses();
  }, []);
  return (
    <TableRow key={entry.id}>
      <TableCell>
        <Typography variant="body1">
          {entry.date} <MdWork /> <i>{entry.type === 'OccupationalHealthcare' && entry.employerName}</i>
        </Typography>
        <Typography variant="body1">
          <i>{entry.description}</i>
        </Typography>
        {entry.diagnosisCodes &&
          <List>
            {entry.diagnosisCodes.map(diagnosisCode =>
              <ListItem key={diagnosisCode}>
                <ListItemIcon>
                  <BsDot />
                </ListItemIcon>
                <ListItemText>
                  {diagnosisCode} {diagnoses?.find(diagnosis => diagnosis.code === diagnosisCode)?.name}
                </ListItemText>
              </ListItem>
            )}
          </List>
        }
        <Typography variant="body1">
          diagnoses by {entry.specialist}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default OccupationalHealthcareEntry;