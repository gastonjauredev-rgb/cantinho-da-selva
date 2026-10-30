
import { useState } from 'react';

import '../styles/EventBuyerForm.css';

// =========================================
// ESTADO INICIAL
// =========================================

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

// =========================================
// VALIDACIONES
// =========================================

const validateBuyer = (data) => {
  const errors = {};

  const firstName = data.firstName.trim();
  const lastName = data.lastName.trim();
  const email = data.email.trim();
  const phone = data.phone.trim();

  if (firstName.length < 2) {
    errors.firstName = 'Ingresá un nombre válido.';
  }

  if (lastName.length < 2) {
    errors.lastName = 'Ingresá un apellido válido.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    errors.email = 'Ingresá un correo electrónico válido.';
  }

  const phoneDigits = phone.replace(/\D/g, '');

  if (phoneDigits.length < 8 || phoneDigits.length > 15) {
    errors.phone = 'Ingresá un teléfono válido.';
  }

  return errors;
};

// =========================================
// COMPONENTE
// =========================================

function EventBuyerForm({
  onContinue = () => {},
  initialData = initialFormData,
}) {
  const [formData, setFormData] = useState(() => ({
    ...initialFormData,
    ...initialData,
  }));

  const [errors, setErrors] = useState({});

  // =========================================
  // CAMBIOS EN LOS CAMPOS
  // =========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: '',
    }));
  };

  // =========================================
  // ENVÍO DEL FORMULARIO
  // =========================================

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateBuyer(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const buyerData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
    };

    onContinue(buyerData);
  };

  // =========================================
  // RENDER
  // =========================================

  return (
    <section className="event-buyer">
      <header className="event-buyer__header">
        <span className="event-buyer__eyebrow">
          DATOS DE LA RESERVA
        </span>

        <h2>¿A nombre de quién hacemos la reserva?</h2>

        <p>
          Completá los datos del titular. La reserva
          incluirá la cantidad de personas seleccionada
          para el evento.
        </p>
      </header>

      <form
        className="event-buyer__form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="event-buyer__row">
          <div className="event-buyer__field">
            <label htmlFor="event-buyer-first-name">
              Nombre
            </label>

            <input
              id="event-buyer-first-name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Tu nombre"
              autoComplete="given-name"
              maxLength={80}
              required
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby={
                errors.firstName
                  ? 'event-buyer-first-name-error'
                  : undefined
              }
            />

            {errors.firstName && (
              <span
                id="event-buyer-first-name-error"
                className="event-buyer__error"
                role="alert"
              >
                {errors.firstName}
              </span>
            )}
          </div>

          <div className="event-buyer__field">
            <label htmlFor="event-buyer-last-name">
              Apellido
            </label>

            <input
              id="event-buyer-last-name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Tu apellido"
              autoComplete="family-name"
              maxLength={80}
              required
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby={
                errors.lastName
                  ? 'event-buyer-last-name-error'
                  : undefined
              }
            />

            {errors.lastName && (
              <span
                id="event-buyer-last-name-error"
                className="event-buyer__error"
                role="alert"
              >
                {errors.lastName}
              </span>
            )}
          </div>
        </div>

        <div className="event-buyer__field">
          <label htmlFor="event-buyer-email">
            Correo electrónico
          </label>

          <input
            id="event-buyer-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="nombre@correo.com"
            autoComplete="email"
            maxLength={254}
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={
              errors.email
                ? 'event-buyer-email-error'
                : undefined
            }
          />

          {errors.email && (
            <span
              id="event-buyer-email-error"
              className="event-buyer__error"
              role="alert"
            >
              {errors.email}
            </span>
          )}
        </div>

        <div className="event-buyer__field">
          <label htmlFor="event-buyer-phone">
            Teléfono de contacto
          </label>

          <input
            id="event-buyer-phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Ej.: 099 123 456"
            autoComplete="tel"
            maxLength={25}
            required
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={
              errors.phone
                ? 'event-buyer-phone-error'
                : undefined
            }
          />

          {errors.phone && (
            <span
              id="event-buyer-phone-error"
              className="event-buyer__error"
              role="alert"
            >
              {errors.phone}
            </span>
          )}
        </div>

        <div className="event-buyer__notice">
          <span aria-hidden="true">✉</span>

          <p>
            Cuando integremos el sistema de pagos,
            enviaremos el comprobante de la reserva
            a este correo electrónico una vez
            confirmado el pago.
          </p>
        </div>

        <button
          type="submit"
          className="event-buyer__submit"
        >
          Revisar mi reserva
          <span aria-hidden="true">→</span>
        </button>
      </form>
    </section>
  );
}

export default EventBuyerForm;
