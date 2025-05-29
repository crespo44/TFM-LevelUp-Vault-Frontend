import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import LoginSchema from './loginValidation';
import Card from "../Card/Card";
import Button from '../Buttons/Button';
import RegisterForm from '../RegisterForm/RegisterForm';
import userService from "../../services/userService";
import { setCredentials } from "../../slices/authSlice";
import "./LoginForm.css";

const LoginForm = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(LoginSchema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await userService.login(data);
      const { token, username, rol } = response.data;

      dispatch(setCredentials({ token, username, rol }));

      sessionStorage.setItem("auth", JSON.stringify({ token, username, rol }));

      navigate("/home");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Credenciales inválidas");
    }

    reset();
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
            <Button type="submit" text="Iniciar sesión" />
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
