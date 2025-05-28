import * as yup from 'yup';

const createGameSchema = yup.object().shape({
  title: yup.string().required('El título es obligatorio'),
  description: yup.string(),
  genre: yup.array().of(yup.string()).min(1, 'Selecciona al menos un género'),
  platform: yup.array().of(yup.string()).min(1, 'Selecciona al menos una plataforma'),
  status: yup.string().oneOf(['No jugado', 'Jugando', 'Finalizado'], 'Estado inválido').required('El estado es obligatorio'),
  rating: yup.number().min(1, 'Mínimo 1 estrella').max(5, 'Máximo 5 estrellas').nullable(),
  notes: yup.string()
});

export default createGameSchema;