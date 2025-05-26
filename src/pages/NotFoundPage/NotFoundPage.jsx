import { useEffect } from "react";
import "./NotFoundPage.css"

const NotFoundPage = () => {
  useEffect(() => {
    console.log("Página no encontrada visitada");
  }, []);

  return (
    <div className="container-nf">
      <h1 className="title-nf">404</h1>
      <p>Esta página no existe.</p>
    </div>
  );
};

export default NotFoundPage;