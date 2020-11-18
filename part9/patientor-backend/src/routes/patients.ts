import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getAllPatientsWithoutSsn());
});

router.get('/:id', (req, res) => {
  if (req.params.id) {
    const patient = patientService.getPatientById(req.params.id);
    if (patient) {
      res.send(patient);
    } else {
      res.status(404).end();
    }
  } else {
    res.status(404).end();
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

export default router;