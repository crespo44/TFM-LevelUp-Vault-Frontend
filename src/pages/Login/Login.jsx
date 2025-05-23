import LoginForm from '../../components/LoginForm/LoginForm';
import Logo from '../../assets/LUVLogo.webp';
import './Login.css';

const Login = () => {
  return (
    <div className="login-page">
        <div className="login__logo-container">
            <img src={Logo} alt="Logo LevelUpVault" className="login__logo" />
        </div>
      <LoginForm />
    </div>
  );
};

export default Login;