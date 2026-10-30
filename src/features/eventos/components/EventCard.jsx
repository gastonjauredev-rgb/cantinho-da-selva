
import { Link } from 'react-router-dom';
import { EVENT_CATEGORIES } from '../data/events.js';
import '../styles/EventCard.css';

const formatPrice = (price, currency = 'UYU') => {
  return new Intl.NumberFormat('es-UY', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price);
};

const formatDate = (date) => {
  const [year, month, day] = date.split('-').map(Number);

  return new Intl.DateTimeFormat('es-UY', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(year, month - 1, day));
};

function EventCard({ event }) {
  const category = EVENT_CATEGORIES.find(
    (item) => item.id === event.category
  );

  const isSoldOut = event.availableSpots === 0;
  const isCancelled = event.status === 'cancelled';
  const isUnavailable = isSoldOut || isCancelled;

  return (
    <article className="event-card">
      <div className="event-card__image-container">
        <img
          src={event.image}
          alt={event.title}
          className="event-card__image"
          loading="lazy"
        />

        <span className="event-card__category">
          {category?.name || 'Experiencia'}
        </span>

        {isUnavailable && (
          <span className="event-card__status">
            {isCancelled ? 'Cancelado' : 'Agotado'}
          </span>
        )}
      </div>

      <div className="event-card__content">
        <div className="event-card__date">
          <span>{formatDate(event.date)}</span>
          <span className="event-card__separator">·</span>
          <span>{event.time} h</span>
        </div>

        <h3 className="event-card__title">
          {event.title}
        </h3>

        <p className="event-card__description">
          {event.description}
        </p>

        <div className="event-card__details">
          <div className="event-card__detail">
            <span className="event-card__detail-label">
              Entrada desde
            </span>

            <strong className="event-card__price">
              {formatPrice(event.price, event.currency)}
            </strong>
          </div>

          <div className="event-card__detail">
            <span className="event-card__detail-label">
              Capacidad
            </span>

            <strong className="event-card__capacity">
              {event.capacity} personas
            </strong>
          </div>
        </div>

        <Link
          to={`/eventos/${event.id}`}
          className="event-card__button"
        >
          Ver evento
          <span aria-hidden="true">→</span>
        </Link>

        {event.isFictionalDemo && (
          <p className="event-card__demo-note">
            Evento ficticio de demostración.
          </p>
        )}
      </div>
    </article>
  );
}

export default EventCard;
