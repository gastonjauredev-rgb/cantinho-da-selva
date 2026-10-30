
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../../../context/useCart.js';
import '../styles/CheckoutPage.css';

// =========================================
// UTILIDADES
// =========================================

const formatPrice = (value) =>
  new Intl.NumberFormat('es-UY', {
    style: 'currency',
    currency: 'UYU',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  deliveryMethod: 'pickup',
  address: '',
  city: '',
  notes: '',
};

// =========================================
// VALIDACIONES
// =========================================

function validateForm(data) {
  const errors = {};

  const name = data.name.trim();
  const email = data.email.trim();
  const phone = data.phone.replace(/\D/g, '');

  if (
    name.length < 5 ||
    name.split(/\s+/).length < 2 ||
    !/^[\p{L}\s'’-]+$/u.test(name)
  ) {
    errors.name =
      'Ingresá tu nombre y apellido completos.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email =
      'Ingresá un correo electrónico válido.';
  }

  if (phone.length < 8 || phone.length > 15) {
    errors.phone = 'Ingresá un teléfono válido.';
  }

  if (data.deliveryMethod === 'delivery') {
    if (data.address.trim().length < 5) {
      errors.address =
        'Ingresá una dirección completa.';
    }

    if (data.city.trim().length < 2) {
      errors.city =
        'Ingresá tu ciudad o localidad.';
    }
  }

  return errors;
}

// =========================================
// IDENTIFICAR ESTADO DEL CARRITO
// =========================================

function getCartSnapshot(items) {
  return JSON.stringify(
    items
      .map((item) => ({
        id: String(item.id),
        quantity: Number(item.quantity),
        price: Number(item.price),
      }))
      .sort((a, b) => a.id.localeCompare(b.id))
  );
}

// =========================================
// CHECKOUT
// =========================================

function CheckoutPage() {
  const { items, cartCount, cartTotal } = useCart();

  const [formData, setFormData] =
    useState(initialFormData);

  const [errors, setErrors] = useState({});
  const [step, setStep] = useState('form');
  const [reviewedCart, setReviewedCart] =
    useState(null);

  const headingRef = useRef(null);
  const previousStepRef = useRef('form');

  // =========================================
  // ESTADO ACTUAL DEL PEDIDO
  // =========================================

  const currentCart = getCartSnapshot(items);

  const cartChanged =
    reviewedCart !== null &&
    reviewedCart !== currentCart;

  // No modificamos estado dentro de un efecto.
  // La etapa visible se calcula directamente.

  const currentStep =
    cartChanged && step !== 'form'
      ? 'form'
      : step;

  const deliveryLabel =
    formData.deliveryMethod === 'pickup'
      ? 'Retiro en el local (a coordinar)'
      : `Envío a ${formData.address.trim()}, ${formData.city.trim()}`;

  // =========================================
  // FOCO AL CAMBIAR DE ETAPA
  // =========================================

  useEffect(() => {
    if (previousStepRef.current !== currentStep) {
      headingRef.current?.focus();
      previousStepRef.current = currentStep;
    }
  }, [currentStep]);

  // =========================================
  // ACTUALIZAR CAMPOS
  // =========================================

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
      ...(name === 'deliveryMethod'
        ? {
            address: undefined,
            city: undefined,
          }
        : {}),
    }));
  }

  // =========================================
  // REVISAR PEDIDO
  // =========================================

  function handleSubmit(event) {
    event.preventDefault();

    if (items.length === 0) return;

    const validationErrors = validateForm(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstInvalidField =
        Object.keys(validationErrors)[0];

      document
        .querySelector(
          `[name="${firstInvalidField}"]`
        )
        ?.focus();

      return;
    }

    // Guardamos el estado actual del carrito
    // para comprobar que no cambie después.

    setReviewedCart(currentCart);
    setStep('review');
  }

  // =========================================
  // CONFIRMAR PEDIDO DE PRUEBA
  // =========================================

  function handleConfirm() {
    if (
      currentStep !== 'review' ||
      cartChanged ||
      items.length === 0
    ) {
      return;
    }

    setStep('confirmed');
  }

  // =========================================
  // CARRITO VACÍO
  // =========================================

  if (items.length === 0) {
    return (
      <main className="checkout-page">
        <div className="container py-5">
          <div className="checkout-page__empty">
            <span aria-hidden="true">🌿</span>

            <h1>Tu carrito está vacío</h1>

            <p>
              Agregá productos antes de continuar
              con tu compra.
            </p>

            <Link
              to="/plantas"
              className="checkout-page__button"
            >
              Explorar productos
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // =========================================
  // RENDER PRINCIPAL
  // =========================================

  return (
    <main className="checkout-page">
      <div className="container py-5">

        {/* NAVEGACIÓN */}

        <nav
          className="checkout-page__breadcrumb"
          aria-label="Ruta de navegación"
        >
          <Link to="/">Inicio</Link>
          <span>/</span>
          <Link to="/carrito">Carrito</Link>
          <span>/</span>
          <span aria-current="page">
            Finalizar compra
          </span>
        </nav>

        {/* ENCABEZADO */}

        <header className="checkout-page__header">
          <span className="checkout-page__eyebrow">
            CANTINHO DA SELVA · TIENDA
          </span>

          <h1 ref={headingRef} tabIndex={-1}>
            {currentStep === 'form'
              ? 'Finalizar compra'
              : currentStep === 'review'
                ? 'Revisá tu pedido'
                : '¡Todo listo!'}
          </h1>

          <p>
            {currentStep === 'form'
              ? 'Completá tus datos para continuar.'
              : currentStep === 'review'
                ? 'Verificá la información antes de confirmar.'
                : 'Completaste el recorrido de compra de prueba.'}
          </p>
        </header>

        {/* =====================================
            AVISO DE CAMBIOS EN EL CARRITO
        ===================================== */}

        {currentStep === 'form' && cartChanged && (
          <div
            className="checkout-page__warning"
            role="status"
          >
            <strong>Tu carrito cambió</strong>

            <p>
              Detectamos modificaciones en los
              productos o cantidades. Revisá el
              resumen actualizado y volvé a
              confirmar tus datos.
            </p>
          </div>
        )}

        {/* =====================================
            ETAPA 1: FORMULARIO
        ===================================== */}

        {currentStep === 'form' && (
          <div className="checkout-page__layout">

            <form
              id="checkout-form"
              className="checkout-page__form"
              onSubmit={handleSubmit}
              noValidate
            >

              {/* CONTACTO */}

              <section className="checkout-page__section">
                <div className="checkout-page__section-heading">
                  <span className="checkout-page__step">
                    01
                  </span>

                  <div>
                    <h2>Datos de contacto</h2>

                    <p>
                      Necesitamos algunos datos
                      para identificar tu pedido.
                    </p>
                  </div>
                </div>

                <div className="checkout-page__fields">

                  {/* NOMBRE */}

                  <div className="checkout-page__field checkout-page__field--full">
                    <label htmlFor="checkout-name">
                      Nombre y apellido *
                    </label>

                    <input
                      id="checkout-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Nombre completo"
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={
                        errors.name
                          ? 'checkout-name-error'
                          : undefined
                      }
                    />

                    {errors.name && (
                      <small
                        id="checkout-name-error"
                        role="alert"
                      >
                        {errors.name}
                      </small>
                    )}
                  </div>

                  {/* CORREO */}

                  <div className="checkout-page__field">
                    <label htmlFor="checkout-email">
                      Correo electrónico *
                    </label>

                    <input
                      id="checkout-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nombre@correo.com"
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email
                          ? 'checkout-email-error'
                          : undefined
                      }
                    />

                    {errors.email && (
                      <small
                        id="checkout-email-error"
                        role="alert"
                      >
                        {errors.email}
                      </small>
                    )}
                  </div>

                  {/* TELÉFONO */}

                  <div className="checkout-page__field">
                    <label htmlFor="checkout-phone">
                      Teléfono *
                    </label>

                    <input
                      id="checkout-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="099 123 456"
                      autoComplete="tel"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={
                        errors.phone
                          ? 'checkout-phone-error'
                          : undefined
                      }
                    />

                    {errors.phone && (
                      <small
                        id="checkout-phone-error"
                        role="alert"
                      >
                        {errors.phone}
                      </small>
                    )}
                  </div>
                </div>
              </section>

              {/* =====================================
                  ENTREGA
              ===================================== */}

              <section className="checkout-page__section">
                <div className="checkout-page__section-heading">
                  <span className="checkout-page__step">
                    02
                  </span>

                  <div>
                    <h2>Forma de entrega</h2>

                    <p>
                      Elegí cómo querés recibir
                      tus productos.
                    </p>
                  </div>
                </div>

                <div className="checkout-page__delivery-options">

                  {/* RETIRO */}

                  <label
                    className={`checkout-page__delivery-option ${
                      formData.deliveryMethod === 'pickup'
                        ? 'is-selected'
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="pickup"
                      checked={
                        formData.deliveryMethod === 'pickup'
                      }
                      onChange={handleChange}
                    />

                    <span className="checkout-page__delivery-icon">
                      🏡
                    </span>

                    <span>
                      <strong>
                        Retiro en el local
                      </strong>

                      <small>
                        Coordinaremos el horario
                        de retiro.
                      </small>
                    </span>
                  </label>

                  {/* ENVÍO */}

                  <label
                    className={`checkout-page__delivery-option ${
                      formData.deliveryMethod === 'delivery'
                        ? 'is-selected'
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="delivery"
                      checked={
                        formData.deliveryMethod === 'delivery'
                      }
                      onChange={handleChange}
                    />

                    <span className="checkout-page__delivery-icon">
                      🚚
                    </span>

                    <span>
                      <strong>
                        Envío a domicilio
                      </strong>

                      <small>
                        Costo y disponibilidad
                        a confirmar.
                      </small>
                    </span>
                  </label>
                </div>

                {/* DIRECCIÓN CONDICIONAL */}

                {formData.deliveryMethod === 'delivery' && (
                  <div className="checkout-page__fields checkout-page__address">

                    <div className="checkout-page__field checkout-page__field--full">
                      <label htmlFor="checkout-address">
                        Dirección *
                      </label>

                      <input
                        id="checkout-address"
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Calle y número"
                        autoComplete="street-address"
                        aria-invalid={Boolean(errors.address)}
                        aria-describedby={
                          errors.address
                            ? 'checkout-address-error'
                            : undefined
                        }
                      />

                      {errors.address && (
                        <small
                          id="checkout-address-error"
                          role="alert"
                        >
                          {errors.address}
                        </small>
                      )}
                    </div>

                    <div className="checkout-page__field checkout-page__field--full">
                      <label htmlFor="checkout-city">
                        Ciudad / localidad *
                      </label>

                      <input
                        id="checkout-city"
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Ciudad"
                        autoComplete="address-level2"
                        aria-invalid={Boolean(errors.city)}
                        aria-describedby={
                          errors.city
                            ? 'checkout-city-error'
                            : undefined
                        }
                      />

                      {errors.city && (
                        <small
                          id="checkout-city-error"
                          role="alert"
                        >
                          {errors.city}
                        </small>
                      )}
                    </div>
                  </div>
                )}
              </section>

              {/* =====================================
                  OBSERVACIONES
              ===================================== */}

              <section className="checkout-page__section">
                <div className="checkout-page__section-heading">
                  <span className="checkout-page__step">
                    03
                  </span>

                  <div>
                    <h2>Observaciones</h2>

                    <p>
                      ¿Hay algo más que debamos saber?
                    </p>
                  </div>
                </div>

                <div className="checkout-page__field">
                  <label htmlFor="checkout-notes">
                    Comentarios adicionales
                  </label>

                  <textarea
                    id="checkout-notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Indicaciones o preferencias..."
                  />
                </div>
              </section>
            </form>

            {/* =====================================
                RESUMEN LATERAL
            ===================================== */}

            <aside className="checkout-page__summary">
              <h2>Resumen de tu compra</h2>

              <div className="checkout-page__products">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="checkout-page__product"
                  >
                    <div>
                      <strong>{item.name}</strong>

                      <span>
                        Cantidad: {item.quantity}
                      </span>
                    </div>

                    <strong>
                      {formatPrice(
                        item.price * item.quantity
                      )}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="checkout-page__summary-row">
                <span>
                  Productos ({cartCount})
                </span>

                <span>
                  {formatPrice(cartTotal)}
                </span>
              </div>

              <div className="checkout-page__summary-row">
                <span>Entrega</span>

                <span>
                  {formData.deliveryMethod === 'pickup'
                    ? 'Retiro a coordinar'
                    : 'Envío a cotizar'}
                </span>
              </div>

              <div className="checkout-page__total">
                <span>Subtotal de productos</span>

                <strong>
                  {formatPrice(cartTotal)}
                </strong>
              </div>

              <p className="checkout-page__disclaimer">
                El importe no incluye eventuales
                costos de envío. Todavía no se
                procesan pedidos reales.
              </p>

              <button
                type="submit"
                form="checkout-form"
                className="checkout-page__button"
              >
                Revisar mis datos
              </button>

              <Link
                to="/carrito"
                className="checkout-page__back"
              >
                ← Volver al carrito
              </Link>
            </aside>
          </div>
        )}

        {/* =====================================
            ETAPA 2: REVISIÓN
        ===================================== */}

        {currentStep === 'review' && (
          <section className="checkout-page__section checkout-page__review">

            <div className="checkout-page__section-heading">
              <span className="checkout-page__step">
                04
              </span>

              <div>
                <h2>Revisión del pedido</h2>

                <p>
                  Comprobá que todo esté correcto.
                </p>
              </div>
            </div>

            {/* DATOS DEL CLIENTE */}

            <div className="checkout-page__review-block">
              <h3>Datos del cliente</h3>

              <dl className="checkout-page__review-details">
                <div>
                  <dt>Nombre</dt>
                  <dd>{formData.name.trim()}</dd>
                </div>

                <div>
                  <dt>Correo</dt>
                  <dd>{formData.email.trim()}</dd>
                </div>

                <div>
                  <dt>Teléfono</dt>
                  <dd>{formData.phone.trim()}</dd>
                </div>

                <div>
                  <dt>Entrega</dt>
                  <dd>{deliveryLabel}</dd>
                </div>

                {formData.notes.trim() && (
                  <div>
                    <dt>Observaciones</dt>
                    <dd>{formData.notes.trim()}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* PRODUCTOS */}

            <div className="checkout-page__review-block">
              <h3>Productos seleccionados</h3>

              <div className="checkout-page__review-products">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="checkout-page__review-product"
                  >
                    <span>
                      {item.name}
                      <small> × {item.quantity}</small>
                    </span>

                    <strong>
                      {formatPrice(
                        item.price * item.quantity
                      )}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="checkout-page__review-total">
                <span>Subtotal de productos</span>

                <strong>
                  {formatPrice(cartTotal)}
                </strong>
              </div>

              {formData.deliveryMethod === 'delivery' && (
                <p className="checkout-page__disclaimer">
                  El envío se cotizará por separado.
                </p>
              )}
            </div>

            {/* ACCIONES */}

            <div className="checkout-page__review-actions">
              <p className="checkout-page__disclaimer">
                Esta es una demostración. No se
                registrará ningún pedido real
                ni se realizará ningún pago.
              </p>

              <button
                type="button"
                className="checkout-page__button"
                onClick={handleConfirm}
              >
                Confirmar pedido de prueba
              </button>

              <button
                type="button"
                className="checkout-page__back"
                onClick={() => setStep('form')}
              >
                ← Editar mis datos
              </button>
            </div>
          </section>
        )}

        {/* =====================================
            ETAPA 3: CONFIRMACIÓN
        ===================================== */}

        {currentStep === 'confirmed' && (
          <section
            className="checkout-page__confirmation"
            aria-label="Confirmación de prueba"
          >
            <div
              className="checkout-page__confirmation-icon"
              aria-hidden="true"
            >
              ✓
            </div>

            <span className="checkout-page__eyebrow">
              CANTINHO DA SELVA
            </span>

            <h2>
              ¡Tu recorrido está completo!
            </h2>

            <p className="checkout-page__confirmation-lead">
              Gracias por explorar nuestra tienda.
              Completaste correctamente la simulación
              del proceso de compra.
            </p>

            <div className="checkout-page__notice">
              <strong>
                Confirmación de prueba
              </strong>

              <p>
                No se realizó ningún pago ni se
                generó un pedido real.
              </p>

              <p>
                Los productos permanecen en tu carrito.
              </p>
            </div>

            <div className="checkout-page__confirmation-summary">
              <span>
                Productos seleccionados
              </span>

              <strong>{cartCount}</strong>

              <span>
                Subtotal de productos
              </span>

              <strong>
                {formatPrice(cartTotal)}
              </strong>
            </div>

            <div className="checkout-page__confirmation-actions">
              <Link
                to="/plantas"
                className="checkout-page__button"
              >
                Seguir explorando el vivero
              </Link>

              <Link
                to="/carrito"
                className="checkout-page__back"
              >
                Volver a mi carrito
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default CheckoutPage;
