import { useState } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import Logo from '../../assets/LUVLogo.webp';
import Preloader from '../../components/Preloader/Preloader';
import './Login.css';

const Login = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="login-page">
      {loading ? (<Preloader />) : 
      (
        <>
          <div className="login__logo-container">
            <img src={Logo} alt="Logo LevelUpVault" className="login__logo" />
          </div>
          <LoginForm setLoading={setLoading} />
        </>
      )}
    </div>
  );
};

export default Login;