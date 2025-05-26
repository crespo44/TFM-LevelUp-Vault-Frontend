import { useState } from 'react';
import './Faq.css';

const faqs = [
  {
    question: '❓ ¿Cuánto tardan en responder?',
    answer: '⏱️ Normalmente respondemos en menos de 24 horas (excepto fines de semana).'
  },
  {
    question: '🛠️ ¿Dónde reporto errores o bugs?',
    answer: 'Puedes usar este mismo formulario describiendo el problema lo más detalladamente posible.'
  },
  {
    question: '🎮 ¿Puedo agregar cualquier juego?',
    answer: 'Puedes registrar cualquier juego que tengas, incluso aquellos no listados en la base RAWG.'
  },
  {
    question: '✏️ ¿Puedo editar mis juegos después de agregarlos?',
    answer: 'Sí. Puedes modificar descripción, plataforma, estado, rating y notas desde tu biblioteca personal.'
  },
  {
    question: '🧾 ¿Puedo subir imágenes de mis juegos?',
    answer: 'Sí, puedes subir imágenes adicionales en cualquier momento desde la sección de detalles del juego.'
  },
  {
    question: '🔐 ¿Mis datos están protegidos?',
    answer: 'Usamos autenticación JWT y encriptación bycrypt. Tus datos personales están protegidos.'
  }
];

const Faq = () =>{
    const [activo, setActivo] = useState(null);

    const toggleQuestion = (index) => {
        setActivo(activo === index ? null : index);
    }

    return(
        <div className="faq-container">
            <h3 className="faq-title">Preguntas frecuentes</h3>
            {faqs.map((item,index)=> ( 
                <div key={index} className="faq-item">
                    <button className='faq-question' onClick={() => toggleQuestion(index)}> {item.question}</button>
                    {activo === index && <div className='faq-answer'>{item.answer}</div>}
                </div>
            ))}
        </div>
    );
};

export default Faq;