
import products from '../data/products.json';

// =========================================
// CONFIGURACIÓN DEL SERVICIO
// =========================================

// URL de la futura API de Node.js
const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Por ahora utilizamos datos locales.
// La integración con el backend se hará más adelante.
const USE_MOCK_DATA = true;

// =========================================
// OBTENER PRODUCTOS
// =========================================

/**
 * Obtiene el catálogo de productos.
 *
 * Permite filtrar por:
 * - Nombre o palabras clave
 * - Categoría
 * - Precio mínimo
 * - Precio máximo
 */
export async function getProducts(filters = {}) {
  if (USE_MOCK_DATA) {
    let results = [...products];

    // =========================================
    // BÚSQUEDA POR TEXTO
    // =========================================

    if (filters.q) {
      const query = filters.q.toLowerCase().trim();

      results = results.filter((product) => {
        const searchableText = [
          product.name,
          product.description,
        ]
          .join(' ')
          .toLowerCase();

        return searchableText.includes(query);
      });
    }

    // =========================================
    // FILTRO POR CATEGORÍA
    // =========================================

    if (filters.categoria) {
      results = results.filter(
        (product) =>
          product.category === filters.categoria
      );
    }

    // =========================================
    // PRECIO MÍNIMO
    // =========================================

    if (
      filters.precioMin !== '' &&
      filters.precioMin != null
    ) {
      const minPrice = Number(filters.precioMin);

      if (Number.isFinite(minPrice) && minPrice >= 0) {
        results = results.filter(
          (product) => product.price >= minPrice
        );
      }
    }

    // =========================================
    // PRECIO MÁXIMO
    // =========================================

    if (
      filters.precioMax !== '' &&
      filters.precioMax != null
    ) {
      const maxPrice = Number(filters.precioMax);

      if (Number.isFinite(maxPrice) && maxPrice >= 0) {
        results = results.filter(
          (product) => product.price <= maxPrice
        );
      }
    }

    return { payload: results };
  }

  // =========================================
  // FUTURA CONEXIÓN CON API
  // =========================================

  const params = new URLSearchParams();

  if (filters.q) {
    params.set('q', filters.q);
  }

  if (filters.categoria) {
    params.set('categoria', filters.categoria);
  }

  if (
    filters.precioMin !== '' &&
    filters.precioMin != null
  ) {
    params.set('precioMin', filters.precioMin);
  }

  if (
    filters.precioMax !== '' &&
    filters.precioMax != null
  ) {
    params.set('precioMax', filters.precioMax);
  }

  const queryString = params.toString();

  const url = `${API_URL}/products${
    queryString ? `?${queryString}` : ''
  }`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Error al obtener productos: ${response.status}`
    );
  }

  return response.json();
}

// =========================================
// OBTENER PRODUCTO POR ID
// =========================================

/**
 * Obtiene un producto por su identificador.
 */
export async function getProductById(id) {
  if (USE_MOCK_DATA) {
    const product = products.find(
      (item) => item.id === id
    );

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    return { payload: product };
  }

  // =========================================
  // FUTURA CONEXIÓN CON API
  // =========================================

  const response = await fetch(
    `${API_URL}/products/${encodeURIComponent(id)}`
  );

  if (!response.ok) {
    throw new Error(
      `Error al obtener el producto: ${response.status}`
    );
  }

  return response.json();
}
