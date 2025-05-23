import { useState } from "react";
import Button from "../Buttons/Button";
import "./RegisterForm.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "Usuario",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Formulario de Registro</h2>
      <label htmlFor="name">Nombre</label>
      <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required/>
      <label htmlFor="username">Nombre de usuario</label>
      <input type="text" name="username" placeholder="Nombre de usuario" value={formData.username} onChange={handleChange} required/>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" placeholder="example@correo.com" value={formData.email} onChange={handleChange} required/>
      <label htmlFor="password">Contraseña</label>
      <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
      <label htmlFor="role">Rol</label>
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="Administrador">Administrador</option>
        <option value="Usuario">Usuario</option>
      </select>
      <div className="register-buttons">
        <Button type="submit" text="Registrar" />
      </div>
    </form>
  );
};

export default RegisterForm;
