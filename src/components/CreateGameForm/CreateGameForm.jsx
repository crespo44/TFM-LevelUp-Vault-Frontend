import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import createGameSchema from './createGameValidation';
import StarsInput from '../StarsInput/StarsInput';
import './CreateGameForm.css';
import Button from '../Buttons/Button';


const CreateGameForm  = () => {
  const [rating, setRating] = useState(0);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(createGameSchema),  
    defaultValues: { genre: [], platform: []}
  });

  const onSubmit = (data) => {
    data.rating = rating;
    console.log('Juego creado:', data);
    reset();
  };

  return (
    <form className="create-game-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="create_form-field">
        <label htmlFor="title">Título</label>
        <input className='create_form-input' type="text" id="title" {...register('title')} />
      </div>
      {errors.title && <span className="error">{errors.title.message}</span>}
      <div className="create_form-field">
        <label htmlFor="description">Descripción</label>
        <textarea id="description" className='create_form-textarea' rows="4" {...register('description')} />
      </div>
        {errors.description && <span className="error">{errors.description.message}</span>}
      <div className="create_form-group">
        <p className="create_form-label">Género</p>
        <div className="checkbox-group">
          {['Acción💥', 'Aventura🧭', 'RPG🧙‍♂️📜', 'Shooter🎯', 'Puzzle🧩','Platformas🏃', 'Estrategia♟️', 'Deportes⚽', 'Carreras🏎️', 'Simulación🏠👨‍🌾',
          'Lucha🥊', 'Terror👻', 'Survival🪓', 'MMO🌍', 'Sandbox🗺️', 'Otros'].map((genre, i) => (
            <div className="checkbox-item" key={genre}>
              <input type="checkbox" id={`genre-${genre}`} value={genre} {...register('genre')} />
              <label htmlFor={`genre-${i}`}>{genre}</label>
            </div>
          ))}
        </div>
        {errors.genre && <span className="error">{errors.genre.message}</span>}
      </div>
      <div className="create_form-group">
        <p className="create_form-label">Plataformas</p>
        <div className="checkbox-group">
          {['PC', 'PlayStation', 'PS2', 'PS3', 'PS4', 'PS5',
          'Xbox', 'Xbox 360', 'Xbox One', 'Xbox Ser. X',
          'Nintendo 3DS', 'Nintendo DS', 'Switch', 'Wii', 'Wii U',
          'Android', 'iOS', 'Mac', 'Linux', 'Otros'].map((platform, i) => (
            <div className="checkbox-item" key={platform}>
              <input type="checkbox" id={`platform-${platform}`} value={platform} {...register('platform')} />
              <label htmlFor={`platform-${i}`}>{platform}</label>
            </div>
          ))}
        </div>
        {errors.platform && <span className="error">{errors.platform.message}</span>}
      </div>
      <div className="create_form-field">
        <label htmlFor="status">Estado</label>
        <select className='create_form-select' id="status" {...register('status')}>
          <option value="">Seleccionar</option>
          <option value="No jugado">No jugado</option>
          <option value="Jugando">Jugando</option>
          <option value="Finalizado">Finalizado</option>
        </select> 
      </div>
      {errors.status && <span className="error">{errors.status.message}</span>}
      <div className="create_form-field">
        <label htmlFor="rating">Valoración</label>
        <StarsInput value={rating} onChange={setRating} />
      </div>
      {errors.rating && <span className="error">{errors.rating.message}</span>}
      <div className="create_form-field">
        <label htmlFor="notes">Comentarios</label>
        <textarea className='create_form-textarea' id="notes" {...register('notes')} rows="3" />
      </div>
      {errors.notes && <span className="error">{errors.notes.message}</span>}
      <Button type="submit" text="Enviar" className='create-button'/>
    </form>
  );
}

export default CreateGameForm;