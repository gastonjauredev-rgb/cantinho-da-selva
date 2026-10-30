
import { useMemo, useState } from 'react';

import {
  MENU_CATEGORIES,
  getCafeProductsByService,
} from '../../cafeteria/data/cafeMenu.js';

import '../styles/ReservationMenu.css';

// =========================================
// CONFIGURACIÓN
// =========================================

const MAX_QUANTITY_PER_PRODUCT = 20;

// Horario de demostración.
// Más adelante será configurable desde backend.
const EVENING_START_HOUR = 17;

// =========================================
// UTILIDADES
// =========================================

function getServiceFromTime(time) {
  const hour = Number(time?.split(':')[0]);

  if (!Number.isFinite(hour)) {
    return null;
  }

  return hour >= EVENING_START_HOUR
    ? 'evening'
    : 'daytime';
}

function formatPrice(value) {
  return new Intl.NumberFormat('es-UY', {
    style: 'currency',
    currency: 'UYU',
    maximumFractionDigits: 0,
  }).format(value);
}

// =========================================
// COMPONENTE
// =========================================

function ReservationMenu({
  reservationTime,
  onContinue,
  initialItems = [],
}) {
  const [quantities, setQuantities] = useState(() => {
    const initial = {};

    initialItems.forEach((item) => {
      if (
        item?.id &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
      ) {
        initial[item.id] = Math.min(
          item.quantity,
          MAX_QUANTITY_PER_PRODUCT
        );
      }
    });

    return initial;
  });

  // =========================================
  // SERVICIO SEGÚN HORARIO
  // =========================================

  const service = useMemo(
    () => getServiceFromTime(reservationTime),
    [reservationTime]
  );

  // =========================================
  // PRODUCTOS DISPONIBLES
  // =========================================

  const products = useMemo(() => {
    if (!service) return [];

    return getCafeProductsByService(service).filter(
      (product) => product.available
    );
  }, [service]);

  // =========================================
  // CATEGORÍAS CON PRODUCTOS
  // =========================================

  const categories = useMemo(() => {
    return [...MENU_CATEGORIES]
      .sort((a, b) => a.order - b.order)
      .map((category) => ({
        ...category,
        products: products.filter(
          (product) => product.category === category.id
        ),
      }))
      .filter((category) => category.products.length > 0);
  }, [products]);

  // =========================================
  // SELECCIÓN Y TOTAL
  // =========================================

  const selectedItems = useMemo(() => {
    return products
      .filter((product) => (quantities[product.id] || 0) > 0)
      .map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantities[product.id],
        subtotal:
          product.price * quantities[product.id],
      }));
  }, [products, quantities]);

  const total = selectedItems.reduce(
    (sum, item) => sum + item.subtotal,
    0
  );

  const totalUnits = selectedItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // =========================================
  // MODIFICAR CANTIDAD
  // =========================================

  const updateQuantity = (productId, change) => {
    setQuantities((previous) => {
      const current = previous[productId] || 0;

      const next = Math.max(
        0,
        Math.min(
          MAX_QUANTITY_PER_PRODUCT,
          current + change
        )
      );

      return {
        ...previous,
        [productId]: next,
      };
    });
  };

  // =========================================
  // CONTINUAR
  // =========================================

  const handleContinue = () => {
    onContinue?.({
      items: selectedItems,
      total,
      service,
    });
  };

  const handleSkip = () => {
    onContinue?.({
      items: [],
      total: 0,
      service,
    });
  };

  // =========================================
  // RENDERIZADO
  // =========================================

  return (
    <section className="reservation-menu">

      <header className="reservation-menu__header">
        <span className="reservation-menu__eyebrow">
          PERSONALIZÁ TU EXPERIENCIA
        </span>

        <h2 className="reservation-menu__title">
          Planificá tu menú
        </h2>

        <p className="reservation-menu__description">
          ¿Ya sabés qué te gustaría disfrutar?
          Podés elegir tus platos anticipadamente
          o decidir cuando llegues.
        </p>

        <span className="reservation-menu__service">
          {service === 'evening'
            ? 'Carta de restaurante'
            : 'Carta de cafetería'}
          {' · '}
          {reservationTime}
        </span>
      </header>

      {/* =====================================
          CATEGORÍAS Y PRODUCTOS
      ===================================== */}

      {categories.length > 0 ? (
        <div className="reservation-menu__categories">

          {categories.map((category) => (
            <div
              key={category.id}
              className="reservation-menu__category"
            >
              <div className="reservation-menu__category-header">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>

              <div className="reservation-menu__products">
                {category.products.map((product) => {
                  const quantity =
                    quantities[product.id] || 0;

                  return (
                    <article
                      key={product.id}
                      className="reservation-menu__product"
                    >
                      <div className="reservation-menu__product-info">
                        <h4>{product.name}</h4>
                        <p>{product.description}</p>

                        <span className="reservation-menu__price">
                          {formatPrice(product.price)}
                        </span>
                      </div>

                      <div className="reservation-menu__quantity">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product.id, -1)
                          }
                          disabled={quantity === 0}
                          aria-label={`Quitar una unidad de ${product.name}`}
                        >
                          −
                        </button>

                        <output aria-live="polite">
                          {quantity}
                        </output>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product.id, 1)
                          }
                          disabled={
                            quantity >=
                            MAX_QUANTITY_PER_PRODUCT
                          }
                          aria-label={`Agregar una unidad de ${product.name}`}
                        >
                          +
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}

        </div>
      ) : (
        <p className="reservation-menu__empty">
          No hay productos disponibles para
          este servicio en este momento.
        </p>
      )}

      {/* =====================================
          RESUMEN DEL MENÚ
      ===================================== */}

      <footer className="reservation-menu__footer">
        <div className="reservation-menu__total">
          <div>
            <span>Total estimado</span>
            <small>
              {totalUnits}{' '}
              {totalUnits === 1
                ? 'producto seleccionado'
                : 'productos seleccionados'}
            </small>
          </div>

          <strong>{formatPrice(total)}</strong>
        </div>

        <p className="reservation-menu__notice">
          Los precios son ilustrativos.
          Esta selección no genera un pedido
          ni un cobro.
        </p>

        <div className="reservation-menu__actions">
          <button
            type="button"
            className="reservation-menu__skip"
            onClick={handleSkip}
          >
            Decidir cuando llegue
          </button>

          <button
            type="button"
            className="reservation-menu__continue"
            onClick={handleContinue}
            disabled={selectedItems.length === 0}
          >
            Continuar con mi selección →
          </button>
        </div>
      </footer>
    </section>
  );
}

export default ReservationMenu;
