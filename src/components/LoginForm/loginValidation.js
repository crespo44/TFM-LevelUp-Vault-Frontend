import * as yup from 'yup';

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required('El nombre de usuario es obligatorio')
    .min(3, 'El nombre de usuario debe tener mínimo 3 caracteres')
    .max(30,'El nombre de usuario no debe tener mas de 30 caracteres'),
  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .min(8, 'La constraseña debe tener una longitud minima de 8 carácteres')
    .matches(/[A-Z]/, 'La contraseña debe contener al menos una mayuscula')
    .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
    .matches(/[^A-Za-z0-9]/, 'La contraseña debe tener al menos un caracter especial')

});

export default loginSchema;