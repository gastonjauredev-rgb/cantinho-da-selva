
/* =========================================
   CANTINHO DA SELVA
   DISTRIBUCIÓN DE MESAS
========================================= */

/*
  Las coordenadas x/y representan porcentajes
  sobre la imagen completa plano-cantinho.png.

  IMPORTANTE:
  Son posiciones iniciales para ajustar
  visualmente sobre el plano.

  Capacidad:
  - 2 personas
  - 4 personas
  - 6 personas
*/

export const TABLE_AREAS = [
  {
    id: 'indoor',
    name: 'Salón interior',
    description: 'Un ambiente cálido y acogedor.',
  },
  {
    id: 'outdoor',
    name: 'Jardín exterior',
    description: 'Disfrutá rodeado de naturaleza.',
  },
];

export const tables = [
  // =======================================
  // SALÓN INTERIOR
  // =======================================

  {
    id: 'M01',
    number: 1,
    area: 'indoor',
    capacity: 2,
    x: 13,
    y: 23,
    active: true,
  },
  {
    id: 'M02',
    number: 2,
    area: 'indoor',
    capacity: 2,
    x: 13,
    y: 32,
    active: true,
  },
  {
    id: 'M03',
    number: 3,
    area: 'indoor',
    capacity: 2,
    x: 13,
    y: 40,
    active: true,
  },
  {
    id: 'M04',
    number: 4,
    area: 'indoor',
    capacity: 4,
    x: 29,
    y: 21,
    active: true,
  },
  {
    id: 'M05',
    number: 5,
    area: 'indoor',
    capacity: 4,
    x: 29,
    y: 32,
    active: true,
  },
  {
    id: 'M06',
    number: 6,
    area: 'indoor',
    capacity: 4,
    x: 37,
    y: 30,
    active: true,
  },
  {
    id: 'M07',
    number: 7,
    area: 'indoor',
    capacity: 6,
    x: 20,
    y: 32,
    active: true,
  },
  {
    id: 'M08',
    number: 8,
    area: 'indoor',
    capacity: 6,
    x: 29,
    y: 39,
    active: true,
  },
  {
    id: 'M09',
    number: 9,
    area: 'indoor',
    capacity: 2,
    x: 37,
    y: 40,
    active: true,
  },
  {
    id: 'M10',
    number: 10,
    area: 'indoor',
    capacity: 4,
    x: 20,
    y: 40,
    active: true,
  },

  // =======================================
  // JARDÍN EXTERIOR
  // =======================================

  {
    id: 'M11',
    number: 11,
    area: 'outdoor',
    capacity: 2,
    x: 50,
    y: 12,
    active: true,
  },
  {
    id: 'M12',
    number: 12,
    area: 'outdoor',
    capacity: 4,
    x: 65,
    y: 15,
    active: true,
  },
  {
    id: 'M13',
    number: 13,
    area: 'outdoor',
    capacity: 2,
    x: 70,
    y: 9,
    active: true,
  },
  {
    id: 'M14',
    number: 14,
    area: 'outdoor',
    capacity: 4,
    x: 77,
    y: 15,
    active: true,
  },
  {
    id: 'M15',
    number: 15,
    area: 'outdoor',
    capacity: 6,
    x: 85,
    y: 14,
    active: true,
  },
  {
    id: 'M16',
    number: 16,
    area: 'outdoor',
    capacity: 2,
    x: 49,
    y: 32,
    active: true,
  },
  {
    id: 'M17',
    number: 17,
    area: 'outdoor',
    capacity: 4,
    x: 57,
    y: 24,
    active: true,
  },
  {
    id: 'M18',
    number: 18,
    area: 'outdoor',
    capacity: 6,
    x: 75,
    y: 30,
    active: true,
  },
  {
    id: 'M19',
    number: 19,
    area: 'outdoor',
    capacity: 2,
    x: 88,
    y: 31,
    active: true,
  },
  {
    id: 'M20',
    number: 20,
    area: 'outdoor',
    capacity: 4,
    x: 73,
    y: 45,
    active: true,
  },
];

// =========================================
// FUNCIONES DE CONSULTA
// =========================================

export const getAllTables = () => tables;

export const getTableById = (id) =>
  tables.find((table) => table.id === id);

export const getTablesByArea = (area) =>
  tables.filter(
    (table) => table.area === area && table.active
  );

export const getTablesByCapacity = (guests) =>
  tables.filter(
    (table) => table.capacity >= guests && table.active
  );

export const getAvailableAreas = () => TABLE_AREAS;
