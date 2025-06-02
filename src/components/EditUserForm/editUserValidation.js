import * as yup from 'yup';

const editSchema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre es obligatorio')
    .min(3, 'El nombre debe tener mínimo 3 caracteres')
    .max(50, 'El nombre no debe tener más de 50 caracteres')
    .matches(/^[a-zA-Z\s]+$/, 'El nombre solo puede contener letras y espacios'),
  username: yup
    .string()
    .required('El username es obligatorio')
    .min(3, 'El username debe tener mínimo 3 caracteres')
    .max(30, 'El username no debe tener más de 30 caracteres'),
  email: yup
    .string()
    .required('El email es obligatorio')
    .email('Formato de email inválido'),
  rol: yup
    .string()
    .required('El rol es obligatorio')
    .oneOf(['usuario', 'administrador'], 'Rol inválido'),
});

export default editSchema;