import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import registerSchema from './registerValidation';
import Button from "../Buttons/Button";
import userService from '../../services/userService'; 
import emailService from '../../services/emailService';
import "./RegisterForm.css";

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(registerSchema)
  });

  const mutation = useMutation({
    mutationFn: async (newUser) => {
      await userService.createUser(newUser);
      await emailService.sendEmail(newUser);
    },
    onSuccess: () => {
      toast.success("Usuario creado exitosamente");
      reset();
    },
    onError: (error) => {
      console.error('Error al crear el usuario o enviar correo', error)
      toast.error("Error al crear el usuario");
    }
  });

  const onSubmit = (data) => {
    //mutation.mutate(data);
    mutation.mutate({...data, rol: "usuario"});
  };
  
  return (
    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Formulario de Registro</h2>
      <div className="register_form-group">
        <label htmlFor="name">Nombre</label>
        <input type="text" name="name" placeholder="Nombre" {...register('name')}/>
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>
      <div className="register_form-group">
        <label htmlFor="username">Nombre de usuario</label>
        <input type="text" name="username" placeholder="Nombre de usuario" {...register('username')}/>
        {errors.username && <p className="error">{errors.username.message}</p>}
      </div>
      <div className="register_form-group">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" placeholder="example@correo.com" {...register('email')} />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>
      <div className="register_form-group">
        <label htmlFor="password">Contraseña</label>
        <input type="password" name="password" placeholder="Contraseña"  {...register('password')}/>
            {errors.password && <p className="error">{errors.password.message}</p>}
      </div>
      <div className="register_form-group">
        <label htmlFor="confirm-password">Repita contraseña</label>
        <input type="password" name="confirm-password"  {...register('confirmPassword')}/>
            {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
      </div>
{/*       <div className="register_form-group">
        <label htmlFor="rol">Rol</label>
        <select name="rol" {...register('rol')}>
          <option value="">Seleccionar</option>
          <option value="administrador">Administrador</option>
          <option value="usuario">Usuario</option>
        </select>
        {errors.rol && <span className="error">{errors.rol.message}</span>}
      </div> */}

      <div className="register-buttons">
        <Button type="submit" text={mutation.isPending ? 'Creando...' : 'Crear cuenta'} disabled={mutation.isPending} />
      </div>
    </form>
  );
};

export default RegisterForm;
