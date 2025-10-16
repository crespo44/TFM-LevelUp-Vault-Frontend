import { useState, useEffect } from "react";
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
import Modal from "../Modal/Modal";  
import userService from "../../services/userService";
import "./LoginForm.css";


const LoginForm = ({ setLoading }) => {
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
    setLoading(true);
    mutation.mutate(data);
  };
  useEffect(() => {
    if (!mutation.isPending && (mutation.isError || mutation.isSuccess)) {
      setLoading(false);
    }
  }, [mutation.isPending, mutation.isError, mutation.isSuccess, setLoading]);

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

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <RegisterForm onClose={() => setShowModal(false)} />
      </Modal>
    </>
  );
};

export default LoginForm;
