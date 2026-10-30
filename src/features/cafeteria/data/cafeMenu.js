
/* =========================================
   CANTINHO DA SELVA
   CARTA GASTRONÓMICA
========================================= */

export const MENU_CATEGORIES = [
  {
    id: 'cafes',
    name: 'Cafés de especialidad',
    description: 'Café seleccionado y preparado con dedicación.',
    order: 1,
  },
  {
    id: 'infusiones',
    name: 'Tés e infusiones',
    description: 'Sabores delicados y aromas naturales.',
    order: 2,
  },
  {
    id: 'dulces',
    name: 'Dulces y pastelería',
    description: 'Pequeños placeres para acompañar el momento.',
    order: 3,
  },
  {
    id: 'entradas',
    name: 'Entradas',
    description: 'El comienzo de una experiencia especial.',
    order: 4,
  },
  {
    id: 'principales',
    name: 'Platos principales',
    description: 'Cocina contemporánea con ingredientes seleccionados.',
    order: 5,
  },
  {
    id: 'postres',
    name: 'Postres',
    description: 'El final perfecto para una buena comida.',
    order: 6,
  },
  {
    id: 'bebidas',
    name: 'Bebidas',
    description: 'Opciones frescas para acompañar nuestra carta.',
    order: 7,
  },
];

/*
  service:
  - daytime: cafetería
  - evening: restaurante
  - all: disponible en ambos servicios

  course:
  - beverage
  - starter
  - main
  - dessert

  Estos datos son de demostración.
  Precios expresados en pesos uruguayos.
*/

export const cafeMenu = [
  // =======================================
  // CAFÉS DE ESPECIALIDAD
  // =======================================

  {
    id: 'cafe-001',
    name: 'Espresso de origen',
    description: 'Café de especialidad con notas de chocolate y frutos secos.',
    price: 150,
    category: 'cafes',
    service: 'daytime',
    course: 'beverage',
    available: true,
    featured: false,
    image: null,
  },
  {
    id: 'cafe-002',
    name: 'Flat White',
    description: 'Doble espresso con leche cuidadosamente texturizada.',
    price: 210,
    category: 'cafes',
    service: 'daytime',
    course: 'beverage',
    available: true,
    featured: true,
    image: null,
  },
  {
    id: 'cafe-003',
    name: 'Latte de vainilla natural',
    description: 'Espresso, leche cremosa y un delicado toque de vainilla.',
    price: 240,
    category: 'cafes',
    service: 'daytime',
    course: 'beverage',
    available: true,
    featured: false,
    image: null,
  },

  // =======================================
  // INFUSIONES
  // =======================================

  {
    id: 'infusion-001',
    name: 'Té de autor',
    description: 'Selección de hebras con notas florales y cítricas.',
    price: 190,
    category: 'infusiones',
    service: 'daytime',
    course: 'beverage',
    available: true,
    featured: false,
    image: null,
  },

  // =======================================
  // DULCES Y PASTELERÍA
  // =======================================

  {
    id: 'dulce-001',
    name: 'Croissant de almendras',
    description: 'Masa hojaldrada de manteca con crema de almendras.',
    price: 250,
    category: 'dulces',
    service: 'daytime',
    course: 'dessert',
    available: true,
    featured: true,
    image: null,
  },
  {
    id: 'dulce-002',
    name: 'Tostón de palta',
    description: 'Pan de masa madre, palta fresca y huevo poché.',
    price: 390,
    category: 'dulces',
    service: 'daytime',
    course: 'starter',
    available: true,
    featured: false,
    image: null,
  },

  // =======================================
  // ENTRADAS
  // =======================================

  {
    id: 'entrada-001',
    name: 'Burrata & tomates confitados',
    description: 'Burrata cremosa, tomates confitados, albahaca y pan artesanal.',
    price: 490,
    category: 'entradas',
    service: 'evening',
    course: 'starter',
    available: true,
    featured: true,
    image: null,
  },
  {
    id: 'entrada-002',
    name: 'Hongos sobre brioche',
    description: 'Hongos salteados, brioche tostado, crema suave y hierbas.',
    price: 450,
    category: 'entradas',
    service: 'evening',
    course: 'starter',
    available: true,
    featured: false,
    image: null,
  },
  {
    id: 'entrada-003',
    name: 'Carpaccio de remolacha',
    description: 'Remolacha laminada, queso de cabra, nueces y vinagreta cítrica.',
    price: 420,
    category: 'entradas',
    service: 'evening',
    course: 'starter',
    available: true,
    featured: false,
    image: null,
  },

  // =======================================
  // PLATOS PRINCIPALES
  // =======================================

  {
    id: 'principal-001',
    name: 'Risotto del bosque',
    description: 'Arroz arborio, selección de hongos, parmesano y hierbas.',
    price: 790,
    category: 'principales',
    service: 'evening',
    course: 'main',
    available: true,
    featured: true,
    image: null,
  },
  {
    id: 'principal-002',
    name: 'Salmón en costra de hierbas',
    description: 'Salmón con puré de coliflor y vegetales de estación.',
    price: 990,
    category: 'principales',
    service: 'evening',
    course: 'main',
    available: true,
    featured: false,
    image: null,
  },
  {
    id: 'principal-003',
    name: 'Bondiola braseada',
    description: 'Bondiola de cocción lenta, boniato y reducción de sus jugos.',
    price: 850,
    category: 'principales',
    service: 'evening',
    course: 'main',
    available: true,
    featured: false,
    image: null,
  },

  // =======================================
  // POSTRES
  // =======================================

  {
    id: 'postre-001',
    name: 'Volcán de chocolate',
    description: 'Bizcocho tibio de chocolate con helado de vainilla.',
    price: 390,
    category: 'postres',
    service: 'evening',
    course: 'dessert',
    available: true,
    featured: true,
    image: null,
  },
  {
    id: 'postre-002',
    name: 'Panna cotta de vainilla',
    description: 'Crema de vainilla, frutas de estación y crocante de almendras.',
    price: 340,
    category: 'postres',
    service: 'evening',
    course: 'dessert',
    available: true,
    featured: false,
    image: null,
  },
  {
    id: 'postre-003',
    name: 'Peras al vino tinto',
    description: 'Peras especiadas con crema de mascarpone.',
    price: 360,
    category: 'postres',
    service: 'evening',
    course: 'dessert',
    available: true,
    featured: false,
    image: null,
  },

  // =======================================
  // BEBIDAS
  // =======================================

  {
    id: 'bebida-001',
    name: 'Limonada botánica',
    description: 'Limón fresco, menta, romero y un toque de jengibre.',
    price: 230,
    category: 'bebidas',
    service: 'all',
    course: 'beverage',
    available: true,
    featured: true,
    image: null,
  },
  {
    id: 'bebida-002',
    name: 'Agua mineral',
    description: 'Agua mineral sin gas o con gas.',
    price: 130,
    category: 'bebidas',
    service: 'all',
    course: 'beverage',
    available: true,
    featured: false,
    image: null,
  },
];

// =========================================
// FUNCIONES DE CONSULTA
// =========================================

export const getCafeMenu = () => cafeMenu;

export const getCafeProductById = (id) =>
  cafeMenu.find((product) => product.id === id);

export const getCafeProductsByCategory = (category) =>
  cafeMenu.filter((product) => product.category === category);

export const getCafeProductsByService = (service) =>
  cafeMenu.filter(
    (product) =>
      product.service === service || product.service === 'all'
  );

export const getFeaturedCafeProducts = () =>
  cafeMenu.filter((product) => product.featured && product.available);
