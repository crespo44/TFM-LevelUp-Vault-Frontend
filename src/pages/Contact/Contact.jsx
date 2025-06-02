import { useSelector } from 'react-redux';
import Card from '../../components/Card/Card';
import UsersPanel from '../../components/UserPanel/UserPanel';
import ContactForm from '../../components/ContactForm/ContactForm';
import Faq from '../../components/Faq/Faq'
import './Contact.css';


const Contact = () =>{
    const user = useSelector((state) => state.auth);

    if (user.rol === "administrador") {
    return <UsersPanel />;
  }
    return(
        <div className="contact-page">
            <div className="contact-header">
                <h2>📬 ¿Tienes alguna sugerencia, duda o problema?</h2>
                <p>Rellena el siguiente formulario y nos pondremos en contacto contigo lo antes posible.</p>
            </div>
            <Card>
                <ContactForm />
            </Card>
            <Faq />
        </div>
    );
};

export default Contact;