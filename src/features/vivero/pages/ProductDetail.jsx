
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getProductById } from '../services/productService.js';
import { plantCategories } from '../data/categories.js';
import { useCart } from '../../../context/useCart.js';

import '../styles/ProductDetail.css';

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
// COMPONENTE
// =========================================

function ProductDetail() {
  const { id } = useParams();
  const { items, addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // =========================================
  // CARGAR PRODUCTO
  // =========================================

  useEffect(() => {
    let active = true;

    async function loadProduct() {
      try {
        const response = await getProductById(id);
        const data = response?.payload ?? response;

        if (!data) {
          throw new Error('Producto no encontrado');
        }

        if (active) {
          setProduct(data);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setProduct(null);
          setError(err.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      active = false;
    };
  }, [id]);

  // =========================================
  // DATOS DEL PRODUCTO
  // =========================================

  const productId = product?._id || product?.id;

  const stock = Math.max(
    0,
    Number(product?.stock) || 0
  );

  const cartItem = items.find(
    (item) => String(item.id) === String(productId)
  );

  const quantityInCart = Number(cartItem?.quantity) || 0;

  const remainingStock = Math.max(
    0,
    stock - quantityInCart
  );

  const available = remainingStock > 0;

  const selectedQuantity = Math.min(
    quantity,
    Math.max(1, remainingStock)
  );

  const categoryName = product
    ? plantCategories.find(
        (category) => category.id === product.category
      )?.name || product.category
    : '';

  // Imagen temporal.
  // No se guardan fotos de productos en public.
  const imageUrl = productId
    ? `https://picsum.photos/seed/${encodeURIComponent(
        productId
      )}/800/800`
    : '';

  // =========================================
  // CANTIDAD
  // =========================================

  function decreaseQuantity() {
    setQuantity((current) => Math.max(1, current - 1));
    setAdded(false);
  }

  function increaseQuantity() {
    setQuantity((current) =>
      Math.min(remainingStock, current + 1)
    );
    setAdded(false);
  }

  // =========================================
  // AGREGAR AL CARRITO
  // =========================================

  function handleAddToCart() {
    if (!product || !available) return;

    addToCart(product, selectedQuantity);

    setQuantity(1);
    setAdded(true);
  }

  // =========================================
  // CARGANDO
  // =========================================

  if (loading) {
    return (
      <main className="product-detail">
        <div className="container py-5">
          <p>Cargando producto...</p>
        </div>
      </main>
    );
  }

  // =========================================
  // ERROR
  // =========================================

  if (error || !product) {
    return (
      <main className="product-detail">
        <div className="container py-5">
          <div className="product-detail__empty">
            <h1>Producto no encontrado</h1>
            <p>No pudimos cargar el producto solicitado.</p>
            <Link to="/plantas">Volver al catálogo</Link>
          </div>
        </div>
      </main>
    );
  }

  // =========================================
  // VISTA DEL PRODUCTO
  // =========================================

  return (
    <main className="product-detail">
      <div className="container">

        <nav
          className="product-detail__breadcrumb"
          aria-label="Ruta de navegación"
        >
          <Link to="/">Inicio</Link>
          <span>/</span>
          <Link to="/plantas">Vivero</Link>
          <span>/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <div className="product-detail__layout">

          {/* IMAGEN */}
          <div className="product-detail__gallery">
            <div className="product-detail__image-wrapper">
              <img
                src={imageUrl}
                alt={product.name}
                className="product-detail__image"
              />

              <span className="product-detail__image-label">
                CANTINHO DA SELVA
              </span>
            </div>
          </div>

          {/* INFORMACIÓN */}
          <section className="product-detail__info">

            <span className="product-detail__category">
              {categoryName}
            </span>

            <h1>{product.name}</h1>

            <p className="product-detail__price">
              {formatPrice(product.price)}
            </p>

            <div className="product-detail__divider" />

            <p className="product-detail__description">
              {product.description}
            </p>

            <div
              className={`product-detail__availability ${
                available
                  ? 'product-detail__availability--available'
                  : 'product-detail__availability--unavailable'
              }`}
            >
              <span
                className="product-detail__status-dot"
                aria-hidden="true"
              />

              {stock === 0
                ? 'Producto sin stock'
                : remainingStock === 0
                  ? 'Ya agregaste todas las unidades disponibles'
                  : `Disponible · ${remainingStock} unidades`}
            </div>

            {available && (
              <div className="product-detail__purchase">

                <div className="product-detail__quantity">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={selectedQuantity <= 1}
                    aria-label="Disminuir cantidad"
                  >
                    −
                  </button>

                  <output aria-label="Cantidad seleccionada">
                    {selectedQuantity}
                  </output>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={selectedQuantity >= remainingStock}
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="product-detail__add-button"
                  onClick={handleAddToCart}
                >
                  Agregar al carrito
                </button>
              </div>
            )}

            {added && (
              <div
                className="product-detail__success"
                role="status"
              >
                <strong>¡Producto agregado al carrito!</strong>

                <Link to="/carrito">
                  Ver carrito →
                </Link>
              </div>
            )}

            <p className="product-detail__note">
              {available
                ? 'Elegí la cantidad que querés llevar.'
                : 'Podés seguir explorando otros productos disponibles.'}
            </p>

            <div className="product-detail__divider" />

            <Link
              to="/plantas"
              className="product-detail__back"
            >
              ← Seguir explorando el vivero
            </Link>

          </section>
        </div>
      </div>
    </main>
  );
}

export default ProductDetail;
