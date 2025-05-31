import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import contactSchema from './contactValidation';
import Button from '../Buttons/Button';
import emailService from '../../services/emailService';
import './ContactForm.css';

const ContactForm = () => {
  const user = useSelector((state) => state.auth);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(contactSchema), 
    defaultValues: { name: user?.name || '', email: user?.email || '', comment: '',
  }
  });

  const mutation = useMutation({
    mutationFn: (newUser) => emailService.sendContactEmail(newUser),

    onSuccess: () => {
      toast.success("Se ha enviado su mensaje");
      reset();
    },
    onError: (error) => {
      console.error('Error al enviar correo', error)
      toast.error("Error al enviar el mensaje");
      reset();
    }
  });

  const onSubmit = (data) => {
    console.log('Formulario enviado:', data);
    mutation.mutate(data);
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
        <Button type="submit" className='btn-contact' text={mutation.isPending ? "Enviando..." : "Enviar"} disabled={mutation.isPending} />
      </div>
      
    </form>
  );
}

export default ContactForm;