
import { useMemo, useState } from 'react';

import {
  MENU_CATEGORIES,
  getCafeProductsByService,
} from '../data/cafeMenu.js';

import '../styles/CafeMenu.css';

const formatPrice = (price) =>
  new Intl.NumberFormat('es-UY', {
    style: 'currency',
    currency: 'UYU',
    maximumFractionDigits: 0,
  }).format(price);

const SERVICES = [
  {
    id: 'daytime',
    label: 'Cafetería',
    subtitle: 'Pequeños placeres para disfrutar sin apuro',
  },
  {
    id: 'evening',
    label: 'Restaurante',
    subtitle: 'Una experiencia gastronómica para compartir',
  },
];

function CafeMenu() {
  const [activeService, setActiveService] = useState('daytime');
  const [activeCategory, setActiveCategory] = useState('all');

  const products = useMemo(
    () =>
      getCafeProductsByService(activeService).filter(
        (product) => product.available
      ),
    [activeService]
  );

  const categories = useMemo(
    () =>
      MENU_CATEGORIES.filter((category) =>
        products.some((product) => product.category === category.id)
      ).sort((a, b) => a.order - b.order),
    [products]
  );

  const visibleProducts = useMemo(
    () =>
      activeCategory === 'all'
        ? products
        : products.filter(
            (product) => product.category === activeCategory
          ),
    [products, activeCategory]
  );

  const selectedService = SERVICES.find(
    (service) => service.id === activeService
  );

  const handleServiceChange = (service) => {
    setActiveService(service);
    setActiveCategory('all');
  };

  return (
    <section className="cafe-menu" id="carta">
      <div className="container">
        <header className="cafe-menu__header">
          <span className="cafe-menu__eyebrow">
            SABORES DE CANTINHO
          </span>

          <h2>Nuestra carta</h2>

          <p>
            Ingredientes seleccionados, preparaciones cuidadas
            y pequeños detalles que hacen especial cada visita.
          </p>
        </header>

        <div
          className="cafe-menu__services"
          role="group"
          aria-label="Seleccionar carta"
        >
          {SERVICES.map((service) => (
            <button
              key={service.id}
              type="button"
              className={`cafe-menu__service ${
                activeService === service.id
                  ? 'cafe-menu__service--active'
                  : ''
              }`}
              onClick={() => handleServiceChange(service.id)}
              aria-pressed={activeService === service.id}
            >
              {service.label}
            </button>
          ))}
        </div>

        <div className="cafe-menu__intro">
          <h3>{selectedService.label}</h3>
          <p>{selectedService.subtitle}</p>
        </div>

        <div
          className="cafe-menu__categories"
          role="group"
          aria-label="Filtrar productos por categoría"
        >
          <button
            type="button"
            className={`cafe-menu__category ${
              activeCategory === 'all'
                ? 'cafe-menu__category--active'
                : ''
            }`}
            onClick={() => setActiveCategory('all')}
            aria-pressed={activeCategory === 'all'}
          >
            Toda la carta
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`cafe-menu__category ${
                activeCategory === category.id
                  ? 'cafe-menu__category--active'
                  : ''
              }`}
              onClick={() => setActiveCategory(category.id)}
              aria-pressed={activeCategory === category.id}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="cafe-menu__grid">
          {visibleProducts.map((product) => (
            <article className="cafe-menu__card" key={product.id}>
              <div className="cafe-menu__card-content">
                <div className="cafe-menu__card-top">
                  <span className="cafe-menu__card-category">
                    {
                      MENU_CATEGORIES.find(
                        (category) =>
                          category.id === product.category
                      )?.name
                    }
                  </span>

                  {product.featured && (
                    <span className="cafe-menu__featured">
                      Especialidad
                    </span>
                  )}
                </div>

                <h4>{product.name}</h4>

                <p>{product.description}</p>

                <div className="cafe-menu__card-footer">
                  <span className="cafe-menu__price">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {visibleProducts.length === 0 && (
          <p className="cafe-menu__empty">
            No hay productos disponibles en esta categoría.
          </p>
        )}

        <p className="cafe-menu__disclaimer">
          Carta y precios de demostración. Sujetos a cambios.
        </p>
      </div>
    </section>
  );
}

export default CafeMenu;
