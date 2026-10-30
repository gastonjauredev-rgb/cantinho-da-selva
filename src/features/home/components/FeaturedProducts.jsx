
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getProducts } from '../../vivero/services/productService.js';
import ProductCard from '../../vivero/components/ProductCard.jsx';

import '../styles/FeaturedProducts.css';

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadFeaturedProducts() {
      try {
        setLoading(true);

        const response = await getProducts();

        const productList = Array.isArray(response)
          ? response
          : response?.payload;

        if (!Array.isArray(productList)) {
          throw new Error('Formato de productos inválido');
        }

        const featured = productList
          .filter((product) => Number(product.stock) > 0)
          .slice(0, 4);

        if (active) {
          setProducts(featured);
          setError(false);
        }
      } catch (err) {
        console.error('Error cargando destacados:', err);

        if (active) {
          setError(true);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadFeaturedProducts();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      className="featured-products"
      aria-labelledby="featured-products-title"
    >
      <div className="featured-products__container">

        <div className="featured-products__heading">
          <div>
            <span className="featured-products__eyebrow">
              SELECCIÓN CANTINHO
            </span>

            <h2 id="featured-products-title">
              Nuestros favoritos
            </h2>

            <p>
              Un poquito de naturaleza para transformar
              cada rincón de tu hogar.
            </p>
          </div>

          <Link
            to="/plantas"
            className="featured-products__view-all"
          >
            Ver todos los productos
            <span aria-hidden="true"> →</span>
          </Link>
        </div>

        {loading && (
          <div className="featured-products__status" role="status">
            Cargando productos destacados...
          </div>
        )}

        {!loading && error && (
          <div className="featured-products__status" role="alert">
            No pudimos cargar los productos destacados.
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="featured-products__status">
            Pronto tendremos novedades para vos.
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="featured-products__grid">
            {products.map((product) => (
              <ProductCard
                key={product._id || product.id}
                product={product}
              />
            ))}
          </div>
        )}

        <div className="featured-products__mobile-link">
          <Link to="/plantas">
            Explorar el vivero →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
