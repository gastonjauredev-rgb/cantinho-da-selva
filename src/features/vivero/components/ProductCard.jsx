
import { Link } from 'react-router-dom';

import { plantCategories } from '../data/categories.js';

import '../styles/ProductCard.css';

// =========================================
// TARJETA DE PRODUCTO
// =========================================

function ProductCard({ product }) {
  const {
    _id,
    id,
    name,
    description,
    category,
    price,
    stock,
    image,
  } = product;

  const productId = _id || id;

  // =========================================
  // CATEGORÍA
  // =========================================

  const categoryName =
    plantCategories.find((item) => item.id === category)?.name ||
    category;

  // =========================================
  // DISPONIBILIDAD
  // =========================================

  const isAvailable = Number(stock) > 0;

  // =========================================
  // FORMATO DE PRECIO
  // =========================================

  const formattedPrice = new Intl.NumberFormat('es-UY', {
    style: 'currency',
    currency: 'UYU',
    maximumFractionDigits: 0,
  }).format(price);

  // =========================================
  // IMÁGENES TEMPORALES
  // =========================================

  const useMockImages = import.meta.env.DEV;

  const imageUrl = useMockImages
    ? `https://picsum.photos/seed/${encodeURIComponent(
        productId
      )}/600/800`
    : image;

  // =========================================
  // RENDERIZADO
  // =========================================

  return (
    <article className="product-card">
      <div className="product-card__image-container">
        <img
          src={imageUrl}
          alt={name}
          className="product-card__image"
          loading="lazy"
        />

        {!isAvailable && (
          <span className="product-card__badge">
            Sin stock
          </span>
        )}
      </div>

      <div className="product-card__content">
        {categoryName && (
          <span className="product-card__category">
            {categoryName}
          </span>
        )}

        <h3 className="product-card__title">
          {name}
        </h3>

        {description && (
          <p className="product-card__description">
            {description}
          </p>
        )}

        <div className="product-card__footer">
          <p className="product-card__price">
            {formattedPrice}
          </p>

          {productId && (
            <Link
              to={`/plantas/${productId}`}
              className="product-card__button"
              aria-label={`Ver detalles de ${name}`}
            >
              Ver producto
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
