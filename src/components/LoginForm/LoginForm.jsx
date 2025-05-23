import { useState } from "react";
import Card from "../Card/Card";
import Button from '../Buttons/Button';
import RegisterForm from '../RegisterForm/RegisterForm';
import "./LoginForm.css";

const LoginForm = () => {
  const initialValues = { username: "", password: "" };
  const [formData, setFormData] = useState(initialValues);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Card>
        <form onSubmit={handleLogin} className="login-form">

          <h2>Inicio de sesión</h2>
          <label htmlFor="username">Usuario</label>
          <input type="text" name="username" placeholder="Usuario" value={formData.username} onChange={handleChange}required/>
          <label htmlFor="password">Contraseña</label>
          <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} nrequired/>
          <div className="login-buttons">
            <Button type="submit" text="Enviar" />
            <Button type="button" text="Registro" onClick={() => setShowModal(true)} />
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
