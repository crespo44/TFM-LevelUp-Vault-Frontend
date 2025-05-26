import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import contactSchema from './contactValidation';
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
      <div>
        <h2 className="form-title">Contáctanos</h2>
        <label>Nombre</label>
        <input id="name" {...register('name')} />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>

      <div>
        <label>Email</label>
        <input id="email" type="email" {...register('email')} />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>
      <div>
        <label>Comentarios</label>
        <textarea id="comment" rows="5" {...register('comment')} />
        {errors.comment && <span className="error">{errors.comment.message}</span>}
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
}

export default ContactForm;