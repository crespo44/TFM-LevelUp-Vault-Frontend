import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import RegisterSchema from './registerValidation';
import Button from "../Buttons/Button";
import userService from '../../services/userService'; 

import "./RegisterForm.css";

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(RegisterSchema)
  });

  const onSubmit = async (data) => {
      try {
        await userService.createUser(data);
        console.log("Usuario creado exitosamente");
      reset();
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
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
      <div className="register_form-group">
        <label htmlFor="role">Rol</label>
        <select name="role" {...register('rol')}>
          <option value="">Seleccionar</option>
          <option value="administrador">Administrador</option>
          <option value="usuario">Usuario</option>
        </select>
        {errors.role && <span className="error">{errors.role.message}</span>}
      </div>

      <div className="register-buttons">
        <Button type="submit" text="Enviar" />
      </div>
    </form>
  );
};

export default RegisterForm;
