import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css"
import Button from "../../components/Buttons/Button";

const NotFoundPage = () => {

  const navigate = useNavigate();

  const homeNavigate = () =>{
    navigate('/home')
  }

  useEffect(() => {
    console.log("Página no encontrada");
  }, []);

  return (
    <div className="container-nf">
      <h1 className="title-nf">404</h1>
      <p>Esta página no existe.</p>
      <Button text='Home' onClick={()=>homeNavigate()} className="btn-nf"/>
    </div>
  );
};

export default NotFoundPage;