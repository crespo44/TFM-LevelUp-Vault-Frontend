import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import contactSchema from './contactValidation';
import Button from '../Buttons/Button';
import './ContactForm.css';

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(contactSchema)
  });

  const onSubmit = (data) => {
    console.log('Formulario enviado:', data);
    reset();
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="contact-field">
        <h2 className="contact-title">Contáctanos</h2>
        <label htmlFor="name">Nombre</label>
        <input type='text' id="name" {...register('name')} />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>

      <div className="contact-field">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register('email')} />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>
      <div className="contact-field">
        <label htmlFor="comment">Comentarios</label>
        <textarea id="comment" rows="5" {...register('comment')} />
        {errors.comment && <span className="error">{errors.comment.message}</span>}
      </div>
      <div className="contact-button">
        <Button type="submit" text="Enviar"  className='btn-contact'/>
      </div>
      
    </form>
  );
}

export default ContactForm;