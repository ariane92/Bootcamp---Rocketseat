import { Router, response } from 'express';
import { startOfHour, parseISO} from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepositoty';
import CreateAppointmentService from '../services/CreateAppointmentService';
import Appointment from '../models/Appointment';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();


appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
})

appointmentsRouter.post('/', (request, response) => {
  try{
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(appointmentsRepository);

    const appointment = createAppointment.execute({ provider, date: parsedDate })
    return response.json(appointment);
  }catch (err){
    return response.status(400).json({ error: err.message })
  }

});

export default appointmentsRouter;
