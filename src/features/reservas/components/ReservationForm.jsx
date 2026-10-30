
import { useState } from 'react';

import '../styles/ReservationForm.css';

/* =========================================
   CANTINHO DA SELVA
   FORMULARIO DE RESERVAS
========================================= */

// =========================================
// HORARIOS DE DEMOSTRACIÓN
// =========================================

const TIME_OPTIONS = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
];

// =========================================
// FECHA LOCAL
// =========================================

function getLocalDate() {
  const date = new Date();

  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, '0');

  const day = String(
    date.getDate()
  ).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// =========================================
// COMPONENTE
// =========================================

function ReservationForm({
  onSearch = () => {},
  initialGuests = 2,
  maxGuests = 6,
}) {
  // =========================================
  // ESTADOS
  // =========================================

  const safeMaxGuests = Math.max(
    1,
    Math.floor(Number(maxGuests) || 1)
  );

  const safeInitialGuests = Math.min(
    safeMaxGuests,
    Math.max(1, Number(initialGuests) || 1)
  );

  const [date, setDate] = useState(getLocalDate);

  const [time, setTime] = useState('');

  const [guests, setGuests] = useState(
    safeInitialGuests
  );

  const [error, setError] = useState('');

  const today = getLocalDate();

  // =========================================
  // OPCIONES SEGÚN CAPACIDAD
  // =========================================

  const guestOptions = Array.from(
    { length: safeMaxGuests },
    (_, index) => index + 1
  );

  // =========================================
  // ENVIAR FORMULARIO
  // =========================================

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!date || !time || !guests) {
      setError(
        'Completá todos los datos para continuar.'
      );
      return;
    }

    if (date < getLocalDate()) {
      setError(
        'Seleccioná una fecha actual o futura.'
      );
      return;
    }

    if (
      date === getLocalDate() &&
      new Date(`${date}T${time}:00`) <= new Date()
    ) {
      setError(
        'Seleccioná un horario futuro.'
      );
      return;
    }

    if (guests < 1 || guests > safeMaxGuests) {
      setError(
        'La cantidad de personas no es válida para esta mesa.'
      );
      return;
    }

    setError('');

    onSearch({
      date,
      time,
      guests: Number(guests),
    });
  };

  return (
    <section className="reservation-form">

      {/* =====================================
          ENCABEZADO
      ===================================== */}

      <div className="reservation-form__header">

        <span className="reservation-form__eyebrow">
          UNA EXPERIENCIA PARA COMPARTIR
        </span>

        <h2>
          Reservá tu momento en Cantinho
        </h2>

        <p>
          Elegí cuándo querés visitarnos y cuántas
          personas van a acompañarte.
        </p>

      </div>

      {/* =====================================
          FORMULARIO
      ===================================== */}

      <form
        className="reservation-form__fields"
        onSubmit={handleSubmit}
      >

        {/* FECHA */}

        <div className="reservation-form__field">

          <label htmlFor="reservation-date">
            Fecha de visita
          </label>

          <input
            id="reservation-date"
            type="date"
            value={date}
            min={today}
            required
            onChange={(event) => {
              setDate(event.target.value);
              setError('');
            }}
          />

        </div>

        {/* HORARIO */}

        <div className="reservation-form__field">

          <label htmlFor="reservation-time">
            Horario de llegada
          </label>

          <select
            id="reservation-time"
            value={time}
            required
            onChange={(event) => {
              setTime(event.target.value);
              setError('');
            }}
          >

            <option value="">
              Seleccioná un horario
            </option>

            {TIME_OPTIONS.map((option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}

          </select>

        </div>

        {/* PERSONAS */}

        <div className="reservation-form__field">

          <label htmlFor="reservation-guests">
            Cantidad de personas
          </label>

          <select
            id="reservation-guests"
            value={guests}
            required
            onChange={(event) => {
              setGuests(
                Number(event.target.value)
              );
              setError('');
            }}
          >

            {guestOptions.map((quantity) => (
              <option
                key={quantity}
                value={quantity}
              >
                {quantity}{' '}
                {quantity === 1
                  ? 'persona'
                  : 'personas'}
              </option>
            ))}

          </select>

        </div>

        {/* ERROR */}

        {error && (
          <p
            className="reservation-form__error"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* BOTÓN */}

        <button
          type="submit"
          className="reservation-form__submit"
        >
          Continuar con mi reserva

          <span aria-hidden="true">
            →
          </span>
        </button>

      </form>

      {/* =====================================
          NOTA INFERIOR
      ===================================== */}

      <p className="reservation-form__note">
        Esta mesa admite hasta {safeMaxGuests}{' '}
        {safeMaxGuests === 1
          ? 'persona'
          : 'personas'}.
        Elegí la cantidad de comensales y el horario
        para continuar con tu reserva.
      </p>

    </section>
  );
}

export default ReservationForm;
