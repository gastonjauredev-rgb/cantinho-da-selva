
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import CafeMenu from '../components/CafeMenu.jsx';
import ReservationForm from '../../reservas/components/ReservationForm.jsx';
import ReservationContactForm from '../../reservas/components/ReservationContactForm.jsx';
import ReservationMenu from '../../reservas/components/ReservationMenu.jsx';
import TableMap from '../../reservas/components/TableMap.jsx';

import '../styles/CafeteriaPage.css';

// =========================================
// DATOS DE DEMOSTRACIÓN
// =========================================

const DEMO_OCCUPIED_TABLE_IDS = [
  'M03',
  'M08',
  'M12',
  'M17',
];

// =========================================
// ALERTAS
// =========================================

const reservationAlert = Swal.mixin({
  confirmButtonColor: '#315c3a',
  cancelButtonColor: '#8b968b',
});

// =========================================
// UTILIDADES
// =========================================

function formatReservationDate(dateString) {
  if (!dateString) return '';

  const [year, month, day] = dateString
    .split('-')
    .map(Number);

  return new Intl.DateTimeFormat('es-UY', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(year, month - 1, day));
}

function formatPrice(value) {
  return new Intl.NumberFormat('es-UY', {
    style: 'currency',
    currency: 'UYU',
    maximumFractionDigits: 0,
  }).format(value);
}

function scrollToElement(element) {
  element?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

// =========================================
// COMPONENTE PRINCIPAL
// =========================================

function CafeteriaPage() {
  // =========================================
  // ESTADOS
  // =========================================

  const [selectedTable, setSelectedTable] =
    useState(null);

  const [reservationSearch, setReservationSearch] =
    useState(null);

  const [contactData, setContactData] =
    useState(null);

  const [showMenu, setShowMenu] =
    useState(false);

  const [menuSelection, setMenuSelection] =
    useState(null);

  const [reservationFinished, setReservationFinished] =
    useState(false);

  // =========================================
  // REFERENCIAS
  // =========================================

  const formRef = useRef(null);
  const contactRef = useRef(null);
  const invitationRef = useRef(null);
  const menuRef = useRef(null);
  const summaryRef = useRef(null);

  // =========================================
  // NAVEGACIÓN ENTRE PASOS
  // =========================================

  useEffect(() => {
    if (selectedTable) {
      scrollToElement(formRef.current);
    }
  }, [selectedTable]);

  useEffect(() => {
    if (reservationSearch) {
      scrollToElement(contactRef.current);
    }
  }, [reservationSearch]);

  useEffect(() => {
    if (contactData) {
      scrollToElement(invitationRef.current);
    }
  }, [contactData]);

  useEffect(() => {
    if (showMenu) {
      scrollToElement(menuRef.current);
    }
  }, [showMenu]);

  useEffect(() => {
    if (reservationFinished) {
      scrollToElement(summaryRef.current);
    }
  }, [reservationFinished]);

  // =========================================
  // REINICIAR PASOS
  // =========================================

  const resetAfterTable = () => {
    setReservationSearch(null);
    setContactData(null);
    setShowMenu(false);
    setMenuSelection(null);
    setReservationFinished(false);
  };

  const resetAfterReservation = () => {
    setContactData(null);
    setShowMenu(false);
    setMenuSelection(null);
    setReservationFinished(false);
  };

  // =========================================
  // SELECCIONAR MESA
  // =========================================

  const handleSelectTable = (table) => {
    if (DEMO_OCCUPIED_TABLE_IDS.includes(table.id)) {
      reservationAlert.fire({
        icon: 'info',
        title: 'Mesa no disponible',
        text: 'Esta mesa figura como ocupada en la demostración.',
        confirmButtonText: 'Entendido',
      });

      return;
    }

    setSelectedTable(table);
    resetAfterTable();
  };

  // =========================================
  // FECHA, HORA Y COMENSALES
  // =========================================

  const handleReservationSearch = async (searchData) => {
    if (!selectedTable) return;

    const guests = Number(searchData.guests);

    if (
      !Number.isInteger(guests) ||
      guests < 1 ||
      guests > selectedTable.capacity
    ) {
      await reservationAlert.fire({
        icon: 'warning',
        title: 'Revisá los comensales',
        text: `La mesa ${selectedTable.number} admite entre 1 y ${selectedTable.capacity} personas.`,
        confirmButtonText: 'Entendido',
      });

      return;
    }

    setReservationSearch({
      ...searchData,
      guests,
      tableId: selectedTable.id,
      tableNumber: selectedTable.number,
      tableArea: selectedTable.area,
      tableCapacity: selectedTable.capacity,
    });

    resetAfterReservation();
  };

  // =========================================
  // DATOS PERSONALES
  // =========================================

  const handleContactContinue = async (data) => {
    if (!selectedTable || !reservationSearch) return;

    setContactData(data);
    setShowMenu(false);
    setMenuSelection(null);
    setReservationFinished(false);

    await reservationAlert.fire({
      icon: 'success',
      title: '¡Tu mesa te espera! 🌿',
      text: 'Tu reserva de demostración está preparada. Ahora podés elegir tu menú anticipadamente o decidir cuando llegues.',
      confirmButtonText: 'Continuar',
    });
  };

  // =========================================
  // ABRIR MENÚ OPCIONAL
  // =========================================

  const handleAddOrder = () => {
    if (!contactData) return;

    setShowMenu(true);
    setReservationFinished(false);
  };

  // =========================================
  // FINALIZAR SIN PEDIDO
  // =========================================

  const handleFinishWithoutOrder = async () => {
    if (!contactData || !reservationSearch) return;

    setShowMenu(false);

    setMenuSelection({
      items: [],
      total: 0,
      service: null,
    });

    setReservationFinished(true);

    await reservationAlert.fire({
      icon: 'success',
      title: '¡Todo listo!',
      text: 'Tu reserva de demostración está preparada, sin pedido gastronómico anticipado.',
      confirmButtonText: 'Ver resumen',
    });
  };

  // =========================================
  // GUARDAR SELECCIÓN GASTRONÓMICA
  // =========================================

  const handleMenuContinue = async (selection) => {
    if (!contactData || !reservationSearch) return;

    setMenuSelection(selection);
    setShowMenu(false);
    setReservationFinished(true);

    await reservationAlert.fire({
      icon: 'success',
      title: '¡Selección agregada!',
      text: selection.items.length > 0
        ? 'Agregamos tus platos al resumen de la reserva de demostración.'
        : 'Continuaste sin pedido gastronómico anticipado.',
      confirmButtonText: 'Ver resumen',
    });
  };

  // =========================================
  // CAMBIAR MESA
  // =========================================

  const handleChangeTable = () => {
    setSelectedTable(null);
    resetAfterTable();

    window.requestAnimationFrame(() => {
      scrollToElement(
        document.getElementById('reservation-map')
      );
    });
  };

  // =========================================
  // RENDERIZADO
  // =========================================

  return (
    <main className="cafeteria-page">

      {/* =====================================
          HERO
      ===================================== */}

      <section className="cafeteria-page__hero">
        <div className="container">
          <div className="cafeteria-page__hero-content">

            <span className="cafeteria-page__eyebrow">
              CANTINHO DA SELVA · CAFETERÍA & RESTAURANTE
            </span>

            <h1>
              Sabores que invitan
              <br />
              a quedarse.
            </h1>

            <p>
              Un rincón entre plantas donde el café de
              especialidad, la cocina gourmet y los buenos
              momentos se encuentran.
            </p>

            <div className="cafeteria-page__actions">
              <a
                href="#carta"
                className="cafeteria-page__button cafeteria-page__button--primary"
              >
                Descubrir nuestra carta
              </a>

              <a
                href="#reservas"
                className="cafeteria-page__button cafeteria-page__button--secondary"
              >
                Reservar una mesa
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================
          INTRODUCCIÓN
      ===================================== */}

      <section className="cafeteria-page__intro">
        <div className="container">

          <span className="cafeteria-page__section-label">
            MÁS QUE UNA CAFETERÍA
          </span>

          <h2>
            Un lugar para disfrutar
            <br />
            cada momento.
          </h2>

          <p>
            Por la mañana, el aroma del café recién preparado.
            Por la noche, una propuesta gastronómica que celebra
            los sabores y los ingredientes de estación.
            Siempre rodeados de naturaleza.
          </p>

        </div>
      </section>

      {/* =====================================
          CARTA GASTRONÓMICA
      ===================================== */}

      <CafeMenu />

      {/* =====================================
          RESERVAS
      ===================================== */}

      <section
        className="cafeteria-page__reservations"
        id="reservas"
      >
        <div className="container">

          {/* PASO 1: MAPA */}

          <div
            id="reservation-map"
            className="cafeteria-page__reservation-map"
          >
            <TableMap
              selectedTable={selectedTable}
              onSelectTable={handleSelectTable}
              occupiedTableIds={DEMO_OCCUPIED_TABLE_IDS}
              guests={1}
            />
          </div>

          {/* PASO 2: FECHA Y HORA */}

          {selectedTable && (
            <div
              ref={formRef}
              className="cafeteria-page__reservation-details"
            >
              <div className="cafeteria-page__selected-info">

                <span className="cafeteria-page__section-label">
                  TU MESA ELEGIDA
                </span>

                <h3 className="cafeteria-page__selected-title">
                  Mesa {selectedTable.number}
                </h3>

                <p className="cafeteria-page__selected-description">
                  Capacidad para {selectedTable.capacity}{' '}
                  personas ·{' '}
                  {selectedTable.area === 'indoor'
                    ? 'Salón interior'
                    : 'Jardín exterior'}
                </p>

                <button
                  type="button"
                  className="cafeteria-page__change-table"
                  onClick={handleChangeTable}
                >
                  ← Elegir otra mesa
                </button>

              </div>

              <ReservationForm
                key={selectedTable.id}
                initialGuests={Math.min(
                  2,
                  selectedTable.capacity
                )}
                maxGuests={selectedTable.capacity}
                onSearch={handleReservationSearch}
              />
            </div>
          )}

          {/* PASO 3: DATOS PERSONALES */}

          {reservationSearch && (
            <div
              ref={contactRef}
              className="cafeteria-page__reservation-details"
            >
              <ReservationContactForm
                key={`${reservationSearch.tableId}-${reservationSearch.date}-${reservationSearch.time}`}
                onContinue={handleContactContinue}
              />
            </div>
          )}

          {/* PASO 4: RESERVA + INVITACIÓN */}

          {reservationSearch &&
            contactData &&
            !reservationFinished && (
              <div
                ref={invitationRef}
                className="cafeteria-page__experience"
              >
                {/* TARJETA DE RESERVA */}

                <div className="cafeteria-page__booking-card">

                  <div className="cafeteria-page__booking-header">
                    <span className="cafeteria-page__booking-eyebrow">
                      TU PRÓXIMA EXPERIENCIA
                    </span>

                    <h3 className="cafeteria-page__booking-title">
                      Tu mesa te espera. 🌿
                    </h3>

                    <p className="cafeteria-page__booking-subtitle">
                      Un momento especial está por comenzar.
                    </p>
                  </div>

                  <div className="cafeteria-page__booking-details">

                    <div className="cafeteria-page__booking-detail">
                      <span className="cafeteria-page__booking-icon">
                        📅
                      </span>

                      <div>
                        <span className="cafeteria-page__booking-label">
                          FECHA
                        </span>

                        <strong>
                          {formatReservationDate(
                            reservationSearch.date
                          )}
                        </strong>
                      </div>
                    </div>

                    <div className="cafeteria-page__booking-detail">
                      <span className="cafeteria-page__booking-icon">
                        🕒
                      </span>

                      <div>
                        <span className="cafeteria-page__booking-label">
                          HORARIO
                        </span>

                        <strong>
                          {reservationSearch.time} hs
                        </strong>
                      </div>
                    </div>

                    <div className="cafeteria-page__booking-detail">
                      <span className="cafeteria-page__booking-icon">
                        🪑
                      </span>

                      <div>
                        <span className="cafeteria-page__booking-label">
                          TU MESA
                        </span>

                        <strong>
                          Mesa {reservationSearch.tableNumber}
                        </strong>
                      </div>
                    </div>

                    <div className="cafeteria-page__booking-detail">
                      <span className="cafeteria-page__booking-icon">
                        👥
                      </span>

                      <div>
                        <span className="cafeteria-page__booking-label">
                          COMENSALES
                        </span>

                        <strong>
                          {reservationSearch.guests}
                          {' '}
                          {reservationSearch.guests === 1
                            ? 'persona'
                            : 'personas'}
                        </strong>
                      </div>
                    </div>

                  </div>

                  <p className="cafeteria-page__booking-disclaimer">
                    Vista de demostración · Reserva aún no registrada
                  </p>

                </div>

                {/* INVITACIÓN GASTRONÓMICA */}

                <div className="cafeteria-page__dining-invitation">

                  <div className="cafeteria-page__dining-intro">
                    <span className="cafeteria-page__dining-icon">
                      🍽️
                    </span>

                    <div>
                      <h3>
                        ¿Y si dejamos todo listo?
                      </h3>

                      <p>
                        Elegí tu menú antes de llegar.
                        Nosotros nos ocupamos del resto,
                        vos solo disfrutás.
                      </p>
                    </div>
                  </div>

                  <div className="cafeteria-page__dining-actions">

                    {!showMenu && (
                      <button
                        type="button"
                        className="cafeteria-page__dining-primary"
                        onClick={handleAddOrder}
                      >
                        Explorar el menú →
                      </button>
                    )}

                    <button
                      type="button"
                      className="cafeteria-page__dining-secondary"
                      onClick={handleFinishWithoutOrder}
                    >
                      Prefiero elegir cuando llegue
                    </button>

                  </div>

                </div>
              </div>
            )}

          {/* PASO 5: MENÚ OPCIONAL */}

          {reservationSearch &&
            contactData &&
            showMenu &&
            !reservationFinished && (
              <div
                ref={menuRef}
                className="cafeteria-page__reservation-details"
              >
                <ReservationMenu
                  key={`${reservationSearch.tableId}-${reservationSearch.date}-${reservationSearch.time}`}
                  reservationTime={reservationSearch.time}
                  onContinue={handleMenuContinue}
                />
              </div>
            )}

          {/* PASO 6: RESUMEN FINAL */}

          {reservationSearch &&
            contactData &&
            reservationFinished &&
            menuSelection && (
              <div
                ref={summaryRef}
                className="cafeteria-page__reservation-summary"
                role="status"
              >
                <span className="cafeteria-page__section-label">
                  RESUMEN DE TU VISITA
                </span>

                <h3 className="cafeteria-page__summary-title">
                  ¡Tu visita está preparada! 🌿
                </h3>

                <p className="cafeteria-page__summary-details">
                  Mesa {reservationSearch.tableNumber}
                  {' · '}
                  {formatReservationDate(
                    reservationSearch.date
                  )}
                  {' · '}
                  {reservationSearch.time}
                  {' · '}
                  {reservationSearch.guests}
                  {' '}
                  {reservationSearch.guests === 1
                    ? 'persona'
                    : 'personas'}
                </p>

                <p className="cafeteria-page__summary-details">
                  {contactData.firstName}{' '}
                  {contactData.lastName}
                </p>

                <p className="cafeteria-page__summary-details">
                  {contactData.email}
                </p>

                <p className="cafeteria-page__summary-details">
                  {contactData.phone}
                </p>

                {contactData.notes && (
                  <p className="cafeteria-page__summary-note">
                    Observaciones: {contactData.notes}
                  </p>
                )}

                {menuSelection.items.length > 0 ? (
                  <div className="cafeteria-page__summary-menu">
                    <h4>Tu selección gastronómica</h4>

                    <ul>
                      {menuSelection.items.map((item) => (
                        <li key={item.id}>
                          <span>
                            {item.quantity} × {item.name}
                          </span>

                          <strong>
                            {formatPrice(item.subtotal)}
                          </strong>
                        </li>
                      ))}
                    </ul>

                    <div className="cafeteria-page__summary-total">
                      <span>Total estimado</span>
                      <strong>
                        {formatPrice(menuSelection.total)}
                      </strong>
                    </div>
                  </div>
                ) : (
                  <p className="cafeteria-page__summary-note">
                    Elegirás tus platos cuando llegues.
                  </p>
                )}

                <p className="cafeteria-page__summary-note">
                  Demostración: todavía no se guardó
                  ninguna reserva, no se realizó ningún
                  cobro y no se envió ningún correo.
                </p>
              </div>
            )}

          <p className="cafeteria-page__reservation-notice">
            Plano interactivo de demostración.
            La disponibilidad es ilustrativa y
            todavía no se registran reservas reales.
          </p>

        </div>
      </section>

      {/* =====================================
          VOLVER AL INICIO
      ===================================== */}

      <div className="cafeteria-page__back">
        <Link to="/">
          ← Volver al inicio
        </Link>
      </div>

    </main>
  );
}

export default CafeteriaPage;
