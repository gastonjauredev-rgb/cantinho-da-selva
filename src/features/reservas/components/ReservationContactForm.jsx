
import { useState } from 'react';

import '../styles/ReservationContactForm.css';

/* =========================================
   CANTINHO DA SELVA
   FORMULARIO DE DATOS DEL CLIENTE
========================================= */

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  notes: '',
};

// =========================================
// VALIDACIONES
// =========================================

function validateContact(data) {
  const errors = {};

  if (!data.firstName.trim()) {
    errors.firstName = 'Ingresá tu nombre.';
  }

  if (!data.lastName.trim()) {
    errors.lastName = 'Ingresá tu apellido.';
  }

  const email = data.email.trim();

  if (!email) {
    errors.email = 'Ingresá tu correo electrónico.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Ingresá un correo electrónico válido.';
  }

  const phone = data.phone.trim();

  if (!phone) {
    errors.phone = 'Ingresá tu teléfono.';
  } else if (phone.replace(/\D/g, '').length < 8) {
    errors.phone = 'Ingresá un teléfono válido.';
  }

  return errors;
}

// =========================================
// COMPONENTE
// =========================================

function ReservationContactForm({
  onContinue,
  initialValues = INITIAL_FORM,
}) {
  const [formData, setFormData] = useState(() => ({
    ...INITIAL_FORM,
    ...initialValues,
  }));

  const [errors, setErrors] = useState({});

  // =========================================
  // ACTUALIZAR CAMPOS
  // =========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: '',
    }));
  };

  // =========================================
  // ENVIAR FORMULARIO
  // =========================================

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateContact(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const contactData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      notes: formData.notes.trim(),
    };

    onContinue?.(contactData);
  };

  // =========================================
  // RENDERIZADO
  // =========================================

  return (
    <section className="reservation-contact">
      <div className="reservation-contact__header">
        <span className="reservation-contact__eyebrow">
          UN PASO MÁS
        </span>

        <h2 className="reservation-contact__title">
          ¿A nombre de quién
          <br />
          hacemos la reserva?
        </h2>

        <p className="reservation-contact__description">
          Completá tus datos para continuar.
          Cuando confirmemos tu reserva,
          recibirás los detalles por correo electrónico.
        </p>
      </div>

      <form
        className="reservation-contact__form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="reservation-contact__grid">

          {/* NOMBRE */}

          <div className="reservation-contact__field">
            <label htmlFor="reservation-first-name">
              Nombre *
            </label>

            <input
              id="reservation-first-name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              autoComplete="given-name"
              maxLength={80}
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby={
                errors.firstName
                  ? 'reservation-first-name-error'
                  : undefined
              }
              placeholder="Tu nombre"
              required
            />

            {errors.firstName && (
              <span
                id="reservation-first-name-error"
                className="reservation-contact__error"
              >
                {errors.firstName}
              </span>
            )}
          </div>

          {/* APELLIDO */}

          <div className="reservation-contact__field">
            <label htmlFor="reservation-last-name">
              Apellido *
            </label>

            <input
              id="reservation-last-name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              autoComplete="family-name"
              maxLength={80}
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby={
                errors.lastName
                  ? 'reservation-last-name-error'
                  : undefined
              }
              placeholder="Tu apellido"
              required
            />

            {errors.lastName && (
              <span
                id="reservation-last-name-error"
                className="reservation-contact__error"
              >
                {errors.lastName}
              </span>
            )}
          </div>

          {/* CORREO ELECTRÓNICO */}

          <div className="reservation-contact__field">
            <label htmlFor="reservation-email">
              Correo electrónico *
            </label>

            <input
              id="reservation-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              maxLength={254}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email
                  ? 'reservation-email-error'
                  : 'reservation-email-help'
              }
              placeholder="nombre@correo.com"
              required
            />

            {errors.email && (
              <span
                id="reservation-email-error"
                className="reservation-contact__error"
              >
                {errors.email}
              </span>
            )}

            <small
              id="reservation-email-help"
              className="reservation-contact__help"
            >
              Usaremos este correo para enviarte
              la confirmación de tu reserva.
            </small>
          </div>

          {/* TELÉFONO */}

          <div className="reservation-contact__field">
            <label htmlFor="reservation-phone">
              Teléfono *
            </label>

            <input
              id="reservation-phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="tel"
              maxLength={30}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={
                errors.phone
                  ? 'reservation-phone-error'
                  : undefined
              }
              placeholder="+598 99 123 456"
              required
            />

            {errors.phone && (
              <span
                id="reservation-phone-error"
                className="reservation-contact__error"
              >
                {errors.phone}
              </span>
            )}
          </div>

          {/* OBSERVACIONES */}

          <div className="reservation-contact__field reservation-contact__field--full">
            <label htmlFor="reservation-notes">
              Observaciones (opcional)
            </label>

            <textarea
              id="reservation-notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              maxLength={500}
              placeholder="¿Hay algo que debamos saber sobre tu visita?"
            />

            <small className="reservation-contact__help">
              Podés indicarnos alguna preferencia
              o necesidad especial.
            </small>
          </div>

        </div>

        <div className="reservation-contact__footer">
          <p className="reservation-contact__privacy">
            Tus datos se utilizarán para gestionar
            tu reserva y comunicarnos contigo
            sobre esta visita.
          </p>

          <button
            type="submit"
            className="reservation-contact__submit"
          >
            Continuar con mi reserva
            <span aria-hidden="true">→</span>
          </button>
        </div>

      </form>
    </section>
  );
}

export default ReservationContactForm;
