
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { plantCategories } from '../data/categories.js';
import { getProducts } from '../services/productService.js';
import ProductCard from '../components/ProductCard.jsx';

import '../styles/PlantCatalog.css';

// =========================================
// FORMULARIO DE BÚSQUEDA
// =========================================

function CatalogSearchForm({
  query,
  minPrice,
  maxPrice,
  onSearch,
}) {
  const [searchValue, setSearchValue] = useState(query);
  const [minValue, setMinValue] = useState(minPrice);
  const [maxValue, setMaxValue] = useState(maxPrice);

  function handleSubmit(event) {
    event.preventDefault();

    onSearch({
      q: searchValue.trim(),
      precioMin: minValue,
      precioMax: maxValue,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="plant-catalog__search-form"
      role="search"
    >
      <div className="plant-catalog__field plant-catalog__field--search">
        <label htmlFor="catalog-search">
          Buscar productos
        </label>

        <input
          id="catalog-search"
          type="search"
          placeholder="¿Qué estás buscando?"
          value={searchValue}
          onChange={(event) =>
            setSearchValue(event.target.value)
          }
        />
      </div>

      <div className="plant-catalog__field">
        <label htmlFor="catalog-min">
          Precio mínimo
        </label>

        <input
          id="catalog-min"
          type="number"
          min="0"
          step="0.01"
          placeholder="Desde"
          value={minValue}
          onChange={(event) =>
            setMinValue(event.target.value)
          }
        />
      </div>

      <div className="plant-catalog__field">
        <label htmlFor="catalog-max">
          Precio máximo
        </label>

        <input
          id="catalog-max"
          type="number"
          min="0"
          step="0.01"
          placeholder="Hasta"
          value={maxValue}
          onChange={(event) =>
            setMaxValue(event.target.value)
          }
        />
      </div>

      <button
        type="submit"
        className="plant-catalog__search-button"
      >
        Buscar
      </button>
    </form>
  );
}

// =========================================
// CATÁLOGO DE PRODUCTOS
// =========================================

function PlantCatalog() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filtros activos en la URL
  const query = searchParams.get('q') || '';
  const category = searchParams.get('categoria') || '';
  const minPrice = searchParams.get('precioMin') || '';
  const maxPrice = searchParams.get('precioMax') || '';
  const sortBy = searchParams.get('orden') || 'default';

  // Estados del catálogo
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // =========================================
  // OBTENER PRODUCTOS
  // =========================================

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const response = await getProducts({
          q: query,
          categoria: category,
          precioMin: minPrice,
          precioMax: maxPrice,
        });

        if (!active) return;

        const list = Array.isArray(response)
          ? response
          : response?.payload;

        if (!Array.isArray(list)) {
          throw new Error('Formato de productos inválido');
        }

        setProducts(list);
        setError(null);
      } catch (err) {
        if (!active) return;

        setProducts([]);
        setError(err.message);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, [query, category, minPrice, maxPrice]);

  // =========================================
  // ORDENAMIENTO
  // =========================================

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'precio-asc':
        return Number(a.price) - Number(b.price);

      case 'precio-desc':
        return Number(b.price) - Number(a.price);

      case 'nombre':
        return a.name.localeCompare(b.name, 'es');

      default:
        return 0;
    }
  });

  const selectedCategory = plantCategories.find(
    (item) => item.id === category
  );

  const hasFilters = Boolean(
    query || category || minPrice || maxPrice
  );

  // =========================================
  // MANEJAR FILTROS
  // =========================================

  function handleSearch(filters) {
    const params = new URLSearchParams(searchParams);

    ['q', 'precioMin', 'precioMax'].forEach((field) => {
      const value = filters[field];

      if (value !== '') {
        params.set(field, value);
      } else {
        params.delete(field);
      }
    });

    setSearchParams(params);
  }

  function handleCategoryChange(categoryId) {
    const params = new URLSearchParams(searchParams);

    if (categoryId) {
      params.set('categoria', categoryId);
    } else {
      params.delete('categoria');
    }

    setSearchParams(params);
  }

  function handleSortChange(event) {
    const params = new URLSearchParams(searchParams);
    const value = event.target.value;

    if (value === 'default') {
      params.delete('orden');
    } else {
      params.set('orden', value);
    }

    setSearchParams(params);
  }

  // =========================================
  // RENDERIZADO
  // =========================================

  return (
    <main className="plant-catalog">
      {/* ENCABEZADO */}
      <section className="plant-catalog__hero">
        <div className="container">
          <span className="plant-catalog__eyebrow">
            CANTINHO DA SELVA · TIENDA
          </span>

          <h1>Un mundo verde para descubrir</h1>

          <p>
            Plantas, macetas y todo lo que necesitás
            para darle vida a tus espacios.
          </p>
        </div>
      </section>

      <div className="container plant-catalog__main">
        {/* CATEGORÍAS */}
        <section
          className="plant-catalog__categories"
          aria-label="Categorías de productos"
        >
          <div className="plant-catalog__section-heading">
            <h2>Explorá por categoría</h2>
            <p>Encontrá lo que estás buscando.</p>
          </div>

          <div className="plant-catalog__category-list">
            <button
              type="button"
              className={`plant-catalog__category ${
                !category ? 'is-active' : ''
              }`}
              aria-pressed={!category}
              onClick={() => handleCategoryChange('')}
            >
              Todas
            </button>

            {plantCategories.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`plant-catalog__category ${
                  category === item.id ? 'is-active' : ''
                }`}
                aria-pressed={category === item.id}
                onClick={() => handleCategoryChange(item.id)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </section>

        {/* BUSCADOR Y FILTROS */}
        <section
          className="plant-catalog__filters"
          aria-label="Buscar y filtrar productos"
        >
          <CatalogSearchForm
            key={`${query}|${minPrice}|${maxPrice}`}
            query={query}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onSearch={handleSearch}
          />

          {hasFilters && (
            <div className="plant-catalog__active-filters">
              <span>
                {selectedCategory
                  ? `Categoría: ${selectedCategory.name}`
                  : 'Filtros aplicados'}
              </span>

              <Link to="/plantas">
                Limpiar filtros
              </Link>
            </div>
          )}
        </section>

        {/* LISTADO DE PRODUCTOS */}
        <section
          className="plant-catalog__products"
          aria-label="Catálogo de productos"
        >
          <div className="plant-catalog__products-header">
            <div>
              <h2>
                {selectedCategory
                  ? selectedCategory.name
                  : 'Nuestros productos'}
              </h2>

              {!loading && !error && (
                <p>
                  {sortedProducts.length}{' '}
                  {sortedProducts.length === 1
                    ? 'producto encontrado'
                    : 'productos encontrados'}
                </p>
              )}
            </div>

            <div className="plant-catalog__sort">
              <label htmlFor="catalog-sort">
                Ordenar por
              </label>

              <select
                id="catalog-sort"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="default">
                  Destacados
                </option>
                <option value="precio-asc">
                  Menor precio
                </option>
                <option value="precio-desc">
                  Mayor precio
                </option>
                <option value="nombre">
                  Nombre A-Z
                </option>
              </select>
            </div>
          </div>

          {/* CARGANDO */}
          {loading && (
            <div
              className="plant-catalog__status"
              role="status"
            >
              <div
                className="spinner-border text-success"
                aria-hidden="true"
              />

              <p>Cargando productos...</p>
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div
              className="plant-catalog__status"
              role="alert"
            >
              <h3>No pudimos cargar los productos</h3>
              <p>Intentá nuevamente más tarde.</p>
            </div>
          )}

          {/* SIN RESULTADOS */}
          {!loading &&
            !error &&
            sortedProducts.length === 0 && (
              <div className="plant-catalog__status">
                <h3>No encontramos productos</h3>

                <p>
                  Probá con otra búsqueda o modificá
                  los filtros.
                </p>

                <Link to="/plantas">
                  Ver todos los productos
                </Link>
              </div>
            )}

          {/* PRODUCTOS */}
          {!loading &&
            !error &&
            sortedProducts.length > 0 && (
              <div className="row g-4">
                {sortedProducts.map((product) => (
                  <div
                    key={product._id || product.id}
                    className="col-12 col-sm-6 col-lg-4"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
        </section>
      </div>
    </main>
  );
}

export default PlantCatalog;
