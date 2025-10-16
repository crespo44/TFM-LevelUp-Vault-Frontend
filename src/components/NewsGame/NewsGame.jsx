import { useQuery } from '@tanstack/react-query';
import newsDataService from '../../services/newsDataService';
import Card from '../Card/Card';
import './NewsGame.css';

const NewsGame = () => {
    const truncate = (text, maxLength = 200) => text && text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    const { data: news = [], isLoading, isError } = useQuery({
        queryKey: ['news'],
        queryFn: newsDataService.getNews,
        staleTime: Infinity,
        cacheTime: Infinity,
        retry: false
    });
  if (isLoading) return <p>Cargando noticias...</p>;
  if (isError || news.length === 0) return <p className='no-news-message'>No hay noticias disponibles en este momento.</p>;

    return (
        <div className="news-game-container">
            {news.map((item, index) => (
                <Card
                    key={index}
                    className="news-game-card"
                    onClick={() => window.open(item.link, '_blank')}
                >
                    {(item.image_url || item.image) && (
                        <img
                            src={item.image_url || item.image}
                            alt={item.title}
                            className="news-game-image"
                        />
                    )}
                    <div className="news-game-content">
                        <h3 className="news-game-title">{item.title}</h3>
                        <p className="news-game-description">{truncate(item.description, 200)}</p>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default NewsGame;