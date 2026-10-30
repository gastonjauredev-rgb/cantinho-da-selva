
import { useState } from 'react';
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom';

import {
  EVENT_CATEGORIES,
  getEventById,
} from '../data/events.js';

import '../styles/EventDetailPage.css';

// =========================================
// UTILIDADES
// =========================================

const formatPrice = (amount, currency = 'UYU') => {
  return new Intl.NumberFormat('es-UY', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (date) => {
  const [year, month, day] = date.split('-').map(Number);

  return new Intl.DateTimeFormat('es-UY', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(year, month - 1, day));
};

// =========================================
// SELECTOR DE ENTRADAS
// =========================================

function TicketSelector({ event }) {
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [wantsDinner, setWantsDinner] = useState(false);

  // Hasta conectar el backend, la disponibilidad
  // se representa con los datos de demostración.
  const availableSpots = Math.max(
    0,
    event.availableSpots ?? event.capacity
  );

  const maxTickets = Math.min(6, availableSpots);
  const total = quantity * event.price;

  const canReserve =
    event.status === 'published' &&
    availableSpots > 0;

  // =========================================
  // CANTIDAD DE ENTRADAS
  // =========================================

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) =>
      Math.min(maxTickets, current + 1)
    );
  };

  // =========================================
  // NAVEGACIÓN AL CHECKOUT
  // =========================================

  const handleContinue = () => {
    if (!canReserve) {
      return;
    }

    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > maxTickets
    ) {
      return;
    }

    navigate('/eventos/checkout', {
      state: {
        eventId: event.id,
        quantity,
        wantsDinner: Boolean(
          event.dinnerOptional && wantsDinner
        ),
      },
    });
  };

  // =========================================
  // RENDER
  // =========================================

  return (
    <section
      className="event-detail__booking"
      aria-labelledby="event-booking-title"
    >
      <span className="event-detail__eyebrow">
        VIVÍ LA EXPERIENCIA
      </span>

      <h2 id="event-booking-title">
        Reservá tu lugar
      </h2>

      <p className="event-detail__booking-description">
        Seleccioná cuántas personas van a participar
        de esta experiencia.
      </p>

      <div className="event-detail__availability">
        <span>Capacidad del evento</span>
        <strong>{event.capacity} personas</strong>
      </div>

      <div className="event-detail__availability">
        <span>Cupos disponibles (demo)</span>
        <strong>{availableSpots}</strong>
      </div>

      {canReserve ? (
        <>
          <div className="event-detail__quantity-section">
            <div>
              <h3>Entradas</h3>

              <p>
                {formatPrice(event.price, event.currency)}
                {' '}por persona
              </p>
            </div>

            <div
              className="event-detail__quantity-controls"
              aria-label="Cantidad de entradas"
            >
              <button
                type="button"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                aria-label="Quitar una entrada"
              >
                −
              </button>

              <output aria-live="polite">
                {quantity}
              </output>

              <button
                type="button"
                onClick={increaseQuantity}
                disabled={quantity >= maxTickets}
                aria-label="Agregar una entrada"
              >
                +
              </button>
            </div>
          </div>

          {event.dinnerOptional && (
            <label className="event-detail__dinner-option">
              <input
                type="checkbox"
                checked={wantsDinner}
                onChange={(event) =>
                  setWantsDinner(event.target.checked)
                }
              />

              <span>
                <strong>
                  Quiero reservar una mesa para cenar
                </strong>

                <small>
                  La cena no está incluida en el precio
                  de la entrada. La disponibilidad de
                  mesas se confirmará por separado.
                </small>
              </span>
            </label>
          )}

          <div className="event-detail__total">
            <span>Total de entradas</span>

            <strong>
              {formatPrice(total, event.currency)}
            </strong>
          </div>

          <p className="event-detail__payment-note">
            En la siguiente etapa podrás completar tus datos
            y revisar tu reserva. El pago con Mercado Pago
            se integrará cuando desarrollemos el backend.
          </p>

          <button
            type="button"
            className="event-detail__reserve-button"
            onClick={handleContinue}
            disabled={!canReserve}
          >
            Continuar con la reserva
            <span aria-hidden="true">→</span>
          </button>

          <p className="event-detail__demo-note">
            Vista de demostración. Todavía no se generan
            reservas ni se procesan pagos.
          </p>
        </>
      ) : (
        <p
          className="event-detail__sold-out"
          role="status"
        >
          Este evento no está disponible para reservas.
        </p>
      )}
    </section>
  );
}

// =========================================
// DETALLE DEL EVENTO
// =========================================

function EventDetailPage() {
  const { id } = useParams();

  const event = getEventById(id);

  if (!event) {
    return (
      <main className="event-detail event-detail--not-found">
        <div className="event-detail__container">
          <h1>No encontramos este evento</h1>

          <p>
            Es posible que el evento ya no esté disponible
            o que la dirección sea incorrecta.
          </p>

          <Link
            to="/eventos"
            className="event-detail__back-link"
          >
            ← Volver a la cartelera
          </Link>
        </div>
      </main>
    );
  }

  const category = EVENT_CATEGORIES.find(
    (item) => item.id === event.category
  );

  return (
    <main className="event-detail">
      <section className="event-detail__hero">
        <img
          src={event.image}
          alt={event.title}
          className="event-detail__hero-image"
        />

        <div className="event-detail__hero-overlay" />

        <div className="event-detail__hero-content">
          <Link
            to="/eventos"
            className="event-detail__back-link"
          >
            ← Volver a eventos
          </Link>

          <span className="event-detail__category">
            {category?.name || 'Experiencia Cantinho'}
          </span>

          <h1>{event.title}</h1>

          <p>{event.description}</p>
        </div>
      </section>

      <section className="event-detail__main">
        <div className="event-detail__container">
          <div className="event-detail__layout">
            <div className="event-detail__information">
              <div className="event-detail__metadata">
                <div className="event-detail__metadata-item">
                  <span>FECHA</span>
                  <strong>{formatDate(event.date)}</strong>
                </div>

                <div className="event-detail__metadata-item">
                  <span>HORARIO</span>
                  <strong>{event.time} h</strong>
                </div>

                <div className="event-detail__metadata-item">
                  <span>CAPACIDAD</span>
                  <strong>{event.capacity} personas</strong>
                </div>
              </div>

              <div className="event-detail__section">
                <span className="event-detail__eyebrow">
                  DESCUBRÍ LA EXPERIENCIA
                </span>

                <h2>Sobre este evento</h2>

                <p>{event.longDescription}</p>
              </div>

              <div className="event-detail__section">
                <span className="event-detail__eyebrow">
                  TODO LO QUE PREPARAMOS
                </span>

                <h2>¿Qué incluye?</h2>

                <ul className="event-detail__includes">
                  {event.includes.map((item) => (
                    <li key={item}>
                      <span aria-hidden="true">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {event.isFictionalDemo && (
                <div className="event-detail__fictional-notice">
                  <strong>
                    Evento ficticio de demostración
                  </strong>

                  <p>
                    Esta experiencia forma parte de un proyecto
                    de portafolio. No existe una presentación
                    confirmada del artista en Cantinho da Selva.
                  </p>
                </div>
              )}
            </div>

            <aside className="event-detail__sidebar">
              <TicketSelector event={event} />
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

export default EventDetailPage;
