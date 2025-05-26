import * as yup from 'yup';

const contactSchema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio'),
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
  comment: yup.string().required('El comentario es obligatorio')
});

export default contactSchema;