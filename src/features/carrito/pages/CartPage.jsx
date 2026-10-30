
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../../../context/useCart.js';
import '../styles/CartPage.css';

// =========================================
// FORMATO DE PRECIOS
// =========================================

const formatPrice = (value) =>
  new Intl.NumberFormat('es-UY', {
    style: 'currency',
    currency: 'UYU',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

// =========================================
// IMÁGENES TEMPORALES
// =========================================

function getImageUrl(item) {
  const id = item.id || item._id;

  return `https://picsum.photos/seed/${encodeURIComponent(
    String(id)
  )}/400/400`;
}

// =========================================
// PÁGINA DEL CARRITO
// =========================================

function CartPage() {
  const {
    items,
    cartCount,
    cartTotal,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const [showClearModal, setShowClearModal] =
    useState(false);

  // =========================================
  // ACTUALIZAR CANTIDADES
  // =========================================

  function handleDecrease(item) {
    if (item.quantity <= 1) return;

    updateQuantity(item.id, item.quantity - 1);
  }

  function handleIncrease(item) {
    const stock = Math.max(0, Number(item.stock) || 0);

    if (item.quantity >= stock) return;

    updateQuantity(item.id, item.quantity + 1);
  }

  // =========================================
  // VACIAR CARRITO
  // =========================================

  function handleConfirmClear() {
    clearCart();
    setShowClearModal(false);
  }

  // =========================================
  // CARRITO VACÍO
  // =========================================

  if (items.length === 0) {
    return (
      <main className="cart-page">
        <div className="container py-5">
          <nav
            className="cart-page__breadcrumb"
            aria-label="Ruta de navegación"
          >
            <Link to="/">Inicio</Link>
            <span>/</span>
            <span aria-current="page">Carrito</span>
          </nav>

          <div className="cart-page__empty">
            <span
              className="cart-page__empty-icon"
              aria-hidden="true"
            >
              🛒
            </span>

            <h1>Tu carrito está vacío</h1>

            <p>
              Todavía no agregaste productos.
              Explorá nuestro vivero y encontrá
              algo especial para tu espacio.
            </p>

            <Link
              to="/plantas"
              className="cart-page__primary-button"
            >
              Explorar productos
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // =========================================
  // CARRITO CON PRODUCTOS
  // =========================================

  return (
    <main className="cart-page">
      <div className="container py-5">

        {/* NAVEGACIÓN */}

        <nav
          className="cart-page__breadcrumb"
          aria-label="Ruta de navegación"
        >
          <Link to="/">Inicio</Link>
          <span>/</span>
          <span aria-current="page">Carrito</span>
        </nav>

        {/* ENCABEZADO */}

        <header className="cart-page__header">
          <div>
            <span className="cart-page__eyebrow">
              CANTINHO DA SELVA · TIENDA
            </span>

            <h1>Tu carrito</h1>

            <p>
              {cartCount}{' '}
              {cartCount === 1
                ? 'producto seleccionado'
                : 'productos seleccionados'}
            </p>
          </div>

          <button
            type="button"
            className="cart-page__clear"
            onClick={() => setShowClearModal(true)}
          >
            Vaciar carrito
          </button>
        </header>

        {/* CONTENIDO PRINCIPAL */}

        <div className="cart-page__layout">

          {/* PRODUCTOS */}

          <section
            className="cart-page__items"
            aria-label="Productos del carrito"
          >
            {items.map((item) => {
              const stock = Math.max(
                0,
                Number(item.stock) || 0
              );

              const remainingStock = Math.max(
                0,
                stock - item.quantity
              );

              return (
                <article
                  key={item.id}
                  className="cart-page__item"
                >
                  {/* IMAGEN */}

                  <Link
                    to={`/plantas/${item.id}`}
                    className="cart-page__item-image"
                  >
                    <img
                      src={getImageUrl(item)}
                      alt={item.name}
                      loading="lazy"
                    />
                  </Link>

                  {/* INFORMACIÓN */}

                  <div className="cart-page__item-info">
                    <Link
                      to={`/plantas/${item.id}`}
                      className="cart-page__item-name"
                    >
                      {item.name}
                    </Link>

                    <p className="cart-page__item-price">
                      {formatPrice(item.price)}
                    </p>

                    <p className="cart-page__item-stock">
                      {remainingStock > 0
                        ? `${remainingStock} unidades adicionales disponibles`
                        : 'Alcanzaste el stock disponible'}
                    </p>

                    {/* CANTIDAD */}

                    <div className="cart-page__quantity">
                      <button
                        type="button"
                        onClick={() =>
                          handleDecrease(item)
                        }
                        disabled={item.quantity <= 1}
                        aria-label={`Disminuir cantidad de ${item.name}`}
                      >
                        −
                      </button>

                      <output
                        aria-label={`Cantidad de ${item.name}`}
                      >
                        {item.quantity}
                      </output>

                      <button
                        type="button"
                        onClick={() =>
                          handleIncrease(item)
                        }
                        disabled={
                          item.quantity >= stock
                        }
                        aria-label={`Aumentar cantidad de ${item.name}`}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="cart-page__remove"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      Eliminar producto
                    </button>
                  </div>

                  {/* SUBTOTAL */}

                  <div className="cart-page__item-total">
                    <span>Subtotal</span>

                    <strong>
                      {formatPrice(
                        item.price * item.quantity
                      )}
                    </strong>
                  </div>
                </article>
              );
            })}
          </section>

          {/* RESUMEN DEL PEDIDO */}

          <aside className="cart-page__summary">
            <h2>Resumen del pedido</h2>

            <div className="cart-page__summary-row">
              <span>Productos ({cartCount})</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>

            <div className="cart-page__summary-row">
              <span>Envío</span>
              <span>A coordinar</span>
            </div>

            <div className="cart-page__summary-total">
              <span>Total de productos</span>

              <strong>
                {formatPrice(cartTotal)}
              </strong>
            </div>

            <p className="cart-page__summary-note">
              El costo de envío, si corresponde,
              se calculará al confirmar la compra.
            </p>

            <Link
              to="/checkout"
              className="cart-page__checkout"
            >
              Finalizar compra
            </Link>

            <Link
              to="/plantas"
              className="cart-page__continue"
            >
              ← Seguir comprando
            </Link>
          </aside>
        </div>
      </div>

      {/* =====================================
          MODAL: CONFIRMAR VACIADO
      ===================================== */}

      {showClearModal && (
        <div
          className="cart-page__modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowClearModal(false);
            }
          }}
        >
          <div
            className="cart-page__modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="clear-cart-title"
            aria-describedby="clear-cart-description"
          >
            <div
              className="cart-page__modal-icon"
              aria-hidden="true"
            >
              🛒
            </div>

            <h2 id="clear-cart-title">
              ¿Vaciar tu carrito?
            </h2>

            <p id="clear-cart-description">
              Se eliminarán todos los productos
              que agregaste a tu carrito.
              Esta acción no se puede deshacer.
            </p>

            <div className="cart-page__modal-actions">
              <button
                type="button"
                className="cart-page__modal-cancel"
                onClick={() =>
                  setShowClearModal(false)
                }
                autoFocus
              >
                Seguir comprando
              </button>

              <button
                type="button"
                className="cart-page__modal-confirm"
                onClick={handleConfirmClear}
              >
                Sí, vaciar carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default CartPage;
