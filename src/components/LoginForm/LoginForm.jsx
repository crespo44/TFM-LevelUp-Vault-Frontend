import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { setCredentials } from "../../slices/authSlice";
import LoginSchema from './loginValidation';
import Card from "../Card/Card";
import Button from '../Buttons/Button';
import RegisterForm from '../RegisterForm/RegisterForm';
import userService from "../../services/userService";
import "./LoginForm.css";


const LoginForm = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(LoginSchema)
  });

    const mutation = useMutation({
    mutationFn: (credentials) => userService.login(credentials),
    onSuccess: (response) =>{
      const { token, username, name, email, rol } = response.data;
      dispatch(setCredentials({ token, username, name, email, rol }));
      sessionStorage.setItem("auth", JSON.stringify({ token, username, name, email, rol }));
      navigate("/home");
      reset();
    },
    onError:(error) =>{
      console.error('Error al ingresar usuario', error)
      toast.error('Credenciales inválidas');
      reset();
    },
  })

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">

          <h2>Inicio de sesión</h2>
          <div className="login_form-group">
            <label htmlFor="username">Usuario</label>
            <input type="text" name="username" id="username" placeholder="Introduce tu nombre de usuario"{...register('username')}/>
            {errors.username && <p className="error">{errors.username.message}</p>}
          </div>
          <div className="login_form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" id="password" placeholder="Introduce tu contraseña" {...register('password')}/>
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>
          <div className="login-buttons">
            <Button type="submit" text={mutation.isPending ? "Iniciando..." : "Iniciar sesión"} disabled={mutation.isPending} />
            <Button type="button" text="Registrarse" onClick={() => setShowModal(true)} />
          </div>
        </form>
      </Card>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="modal-close">
              <Button type="button" className="btn-close" text="❌​" onClick={() => setShowModal(false)} />
            </div>
            <RegisterForm onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default LoginForm;
