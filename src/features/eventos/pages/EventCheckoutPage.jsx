
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import EventBuyerForm from '../components/EventBuyerForm.jsx';
import { getEventById } from '../data/events.js';

import '../styles/EventCheckoutPage.css';

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
// VALIDACIÓN DE LA SELECCIÓN
// =========================================

const getCheckoutSelection = (state) => {
  if (!state || typeof state !== 'object') {
    return null;
  }

  const { eventId, quantity, wantsDinner } = state;

  if (typeof eventId !== 'string') {
    return null;
  }

  const event = getEventById(eventId);

  if (!event || event.status !== 'published') {
    return null;
  }

  const availableSpots = Math.max(
    0,
    event.availableSpots ?? event.capacity
  );

  const maxTickets = Math.min(6, availableSpots);

  if (
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    quantity > maxTickets
  ) {
    return null;
  }

  if (
    wantsDinner !== undefined &&
    typeof wantsDinner !== 'boolean'
  ) {
    return null;
  }

  return {
    event,
    quantity,
    wantsDinner: Boolean(
      event.dinnerOptional && wantsDinner
    ),
    total: quantity * event.price,
  };
};

// =========================================
// RESUMEN DE LA RESERVA
// =========================================

function EventReservationSummary({
  event,
  quantity,
  wantsDinner,
  total,
}) {
  return (
    <aside
      className="event-checkout__summary"
      aria-labelledby="event-checkout-summary-title"
    >
      <img
        src={event.image}
        alt=""
        className="event-checkout__image"
      />

      <div className="event-checkout__summary-content">
        <h2 id="event-checkout-summary-title">
          Resumen de tu reserva
        </h2>

        <h3>{event.title}</h3>

        <dl className="event-checkout__details">
          <div>
            <dt>Fecha</dt>
            <dd>{formatDate(event.date)}</dd>
          </div>

          <div>
            <dt>Horario</dt>
            <dd>{event.time} h</dd>
          </div>

          <div>
            <dt>Entradas</dt>
            <dd>{quantity}</dd>
          </div>

          <div>
            <dt>Precio por entrada</dt>
            <dd>
              {formatPrice(event.price, event.currency)}
            </dd>
          </div>

          {event.dinnerOptional && (
            <div>
              <dt>Solicitud de mesa para cenar</dt>
              <dd>{wantsDinner ? 'Sí' : 'No'}</dd>
            </div>
          )}
        </dl>

        {wantsDinner && (
          <p className="event-checkout__dinner-notice">
            La cena no está incluida en el precio.
            La disponibilidad de mesas deberá
            confirmarse por separado.
          </p>
        )}

        <div className="event-checkout__total">
          <span>Total de entradas</span>
          <strong>
            {formatPrice(total, event.currency)}
          </strong>
        </div>

        <p className="event-checkout__demo-notice">
          Los cupos y precios corresponden a datos
          de demostración. No se realiza ninguna
          reserva ni cobro real.
        </p>
      </div>
    </aside>
  );
}

// =========================================
// REVISIÓN DEL COMPRADOR
// =========================================

function EventBuyerReview({ buyer }) {
  return (
    <section
      className="event-checkout__review"
      aria-labelledby="event-checkout-review-title"
    >
      <span className="event-checkout__eyebrow">
        REVISÁ TUS DATOS
      </span>

      <h2 id="event-checkout-review-title">
        Confirmá que todo esté correcto
      </h2>

      <dl className="event-checkout__buyer-details">
        <div>
          <dt>Nombre y apellido</dt>
          <dd>
            {buyer.firstName} {buyer.lastName}
          </dd>
        </div>

        <div>
          <dt>Correo electrónico</dt>
          <dd>{buyer.email}</dd>
        </div>

        <div>
          <dt>Teléfono</dt>
          <dd>{buyer.phone}</dd>
        </div>
      </dl>
    </section>
  );
}

// =========================================
// PAGO SIMULADO
// =========================================

function EventPaymentSimulation({
  event,
  total,
  onConfirm,
  onBack,
}) {
  return (
    <section
      className="event-checkout__payment"
      aria-labelledby="event-checkout-payment-title"
    >
      <span className="event-checkout__eyebrow">
        PAGO DE DEMOSTRACIÓN
      </span>

      <h2 id="event-checkout-payment-title">
        Ya casi terminamos
      </h2>

      <p>
        Estás por simular el pago de tus entradas
        para <strong>{event.title}</strong>.
      </p>

      <div className="event-checkout__payment-amount">
        <span>Importe de la simulación</span>

        <strong>
          {formatPrice(total, event.currency)}
        </strong>
      </div>

      <div className="event-checkout__payment-info">
        <strong>Esta es una operación ficticia</strong>

        <p>
          No necesitás ingresar datos bancarios.
          No se realizará ningún cobro, no se
          descontarán cupos y no se generará
          una reserva real.
        </p>
      </div>

      <div className="event-checkout__actions">
        <button
          type="button"
          className="event-checkout__edit-button"
          onClick={onBack}
        >
          Volver a revisar
        </button>

        <button
          type="button"
          className="event-checkout__continue-button"
          onClick={onConfirm}
        >
          Simular pago exitoso
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}

// =========================================
// CONFIRMACIÓN DE DEMOSTRACIÓN
// =========================================

function EventPaymentSuccess({
  event,
  quantity,
  buyer,
  total,
  wantsDinner,
}) {
  return (
    <section
      className="event-checkout__success"
      aria-labelledby="event-checkout-success-title"
      role="status"
    >
      <span
        className="event-checkout__success-icon"
        aria-hidden="true"
      >
        ✓
      </span>

      <span className="event-checkout__eyebrow">
        SIMULACIÓN FINALIZADA
      </span>

      <h2 id="event-checkout-success-title">
        ¡Pago simulado exitosamente!
      </h2>

      <p>
        Completaste el recorrido de demostración
        de Cantinho da Selva.
      </p>

      <div className="event-checkout__success-details">
        <p>
          <strong>Evento:</strong> {event.title}
        </p>

        <p>
          <strong>Titular:</strong>{' '}
          {buyer.firstName} {buyer.lastName}
        </p>

        <p>
          <strong>Correo:</strong> {buyer.email}
        </p>

        <p>
          <strong>Entradas:</strong> {quantity}
        </p>

        <p>
          <strong>Importe simulado:</strong>{' '}
          {formatPrice(total, event.currency)}
        </p>

        {event.dinnerOptional && (
          <p>
            <strong>Solicitud de mesa:</strong>{' '}
            {wantsDinner ? 'Sí' : 'No'}
          </p>
        )}
      </div>

      <p className="event-checkout__success-notice">
        Esta confirmación es exclusivamente
        demostrativa. No constituye una entrada,
        una reserva confirmada ni un comprobante
        de pago.
      </p>

      <Link
        to="/eventos"
        className="event-checkout__success-link"
      >
        Volver a los eventos
        <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}

// =========================================
// PÁGINA DE CHECKOUT
// =========================================

function EventCheckoutPage() {
  const location = useLocation();

  const [selection] = useState(() =>
    getCheckoutSelection(location.state)
  );

  const [buyer, setBuyer] = useState(null);
  const [step, setStep] = useState('buyer');

  // =========================================
  // SELECCIÓN INVÁLIDA
  // =========================================

  if (!selection) {
    return (
      <main className="event-checkout">
        <div className="event-checkout__container">
          <section
            className="event-checkout__empty"
            role="status"
          >
            <h1>No encontramos una selección válida</h1>

            <p>
              Para continuar con la reserva,
              primero seleccioná un evento
              y la cantidad de entradas.
            </p>

            <Link
              to="/eventos"
              className="event-checkout__back-link"
            >
              Volver a la cartelera
            </Link>
          </section>
        </div>
      </main>
    );
  }

  const {
    event,
    quantity,
    wantsDinner,
    total,
  } = selection;

  // =========================================
  // ACCIONES
  // =========================================

  const handleBuyerContinue = (buyerData) => {
    setBuyer(buyerData);
    setStep('review');
  };

  const handleEditBuyer = () => {
    setStep('buyer');
  };

  const handleGoToPayment = () => {
    if (!buyer) {
      return;
    }

    setStep('payment');
  };

  const handlePaymentSuccess = () => {
    if (!buyer || step !== 'payment') {
      return;
    }

    setStep('success');
  };

  // =========================================
  // RENDER
  // =========================================

  return (
    <main className="event-checkout">
      <div className="event-checkout__container">
        <header className="event-checkout__header">
          {step !== 'success' && (
            <Link
              to={`/eventos/${event.id}`}
              className="event-checkout__back-link"
            >
              ← Volver al evento
            </Link>
          )}

          <span className="event-checkout__eyebrow">
            EXPERIENCIAS CANTINHO DA SELVA
          </span>

          <h1>
            {step === 'success'
              ? 'Experiencia completada'
              : 'Finalizá tu reserva'}
          </h1>

          <p>
            {step === 'success'
              ? 'Finalizaste la simulación de reserva y pago.'
              : 'Completá tus datos y revisá la información de las entradas antes de continuar.'}
          </p>
        </header>

        <div className="event-checkout__layout">
          <div className="event-checkout__main">
            {step === 'buyer' && (
              <EventBuyerForm
                initialData={buyer ?? undefined}
                onContinue={handleBuyerContinue}
              />
            )}

            {step === 'review' && buyer && (
              <>
                <EventBuyerReview buyer={buyer} />

                {event.isFictionalDemo && (
                  <p className="event-checkout__fictional-notice">
                    Este evento es ficticio y se
                    utiliza exclusivamente como
                    demostración del proyecto.
                  </p>
                )}

                <div className="event-checkout__actions">
                  <button
                    type="button"
                    className="event-checkout__edit-button"
                    onClick={handleEditBuyer}
                  >
                    Editar mis datos
                  </button>

                  <button
                    type="button"
                    className="event-checkout__continue-button"
                    onClick={handleGoToPayment}
                  >
                    Continuar al pago simulado
                    <span aria-hidden="true">→</span>
                  </button>
                </div>

                <p className="event-checkout__payment-notice">
                  La siguiente etapa será una
                  simulación. No se procesarán
                  pagos reales ni se confirmarán
                  reservas.
                </p>
              </>
            )}

            {step === 'payment' && buyer && (
              <EventPaymentSimulation
                event={event}
                total={total}
                onConfirm={handlePaymentSuccess}
                onBack={() => setStep('review')}
              />
            )}

            {step === 'success' && buyer && (
              <EventPaymentSuccess
                event={event}
                quantity={quantity}
                buyer={buyer}
                total={total}
                wantsDinner={wantsDinner}
              />
            )}
          </div>

          <EventReservationSummary
            event={event}
            quantity={quantity}
            wantsDinner={wantsDinner}
            total={total}
          />
        </div>
      </div>
    </main>
  );
}

export default EventCheckoutPage;
