import * as yup from 'yup';

const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre es obligatorio')
    .min(3, 'El nombre debe tener mínimo 3 caracteres')
    .max(50,'El nombre no debe tener mas de 50 caracteres')
    .matches(/^[a-zA-Z\s]+$/, 'El nombre solo tiene letras y espacios'),
  username: yup
    .string()
    .required('El nombre de usuario es obligatorio')
    .min(3, 'El nombre de usuario debe tener mínimo 3 caracteres')
    .max(30,'El nombre de usuario no debe tener mas de 30 caracteres'),
  email: yup
    .string()
    .required('El email es obligatorio')
    .email('Formato de email inválido'),

  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .min(8, 'La constraseña debe tener una longitud minima de 8 carácteres')
    .matches(/[A-Z]/, 'La contraseña debe contener al menos una mayuscula')
    .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
    .matches(/[^A-Za-z0-9]/, 'La contraseña debe tener al menos un caracter especial'),

  confirmPassword: yup
    .string()
    .required('Confirma tu contraseña')
    .oneOf([yup.ref('password')], 'Las contraseñas deben ser identicas'),
 /*  rol: yup
    .string()
    .required('El rol es obligatorio')
    .oneOf(['usuario', 'administrador'], 'Rol invalido'), */
});

export default registerSchema;