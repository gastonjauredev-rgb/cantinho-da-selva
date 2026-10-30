
export const EVENT_CATEGORIES = [
  { id: 'taller', name: 'Talleres y experiencias' },
  { id: 'musica', name: 'Música en vivo' },
  { id: 'huerta', name: 'Huerta y naturaleza' },
];

export const events = [
  {
    id: 'ceramica-vermouth',
    title: 'Cerámica & Vermouth',
    category: 'taller',
    date: '2026-11-07',
    time: '17:00',
    capacity: 30,
    price: 1800,
    currency: 'UYU',
    image: '/ceramica-vermouth.jpg',
    description:
      'Una tarde para disfrutar del vermouth, la gastronomía y la creatividad.',
    longDescription:
      'Disfrutá una degustación de vermouth acompañada de diferentes platillos mientras participás de un taller de cerámica. Podés elegir entre decorar una pieza o crear la tuya propia desde cero.',
    includes: [
      'Degustación de vermouth',
      'Selección de platillos',
      'Materiales para el taller',
      'Pieza de cerámica realizada o decorada',
    ],
    requiresTable: false,
    status: 'published',
  },
  {
    id: 'drexler-intimo',
    title: 'Jorge Drexler — Íntimo Acústico',
    category: 'musica',
    date: '2026-11-14',
    time: '21:00',
    capacity: 50,
    price: 2500,
    currency: 'UYU',
    image: '/drexler-acustico.jpg',
    description:
      'Una noche de música acústica en un ambiente íntimo, con una propuesta gastronómica especial.',
    longDescription:
      'Una experiencia musical de demostración inspirada en un concierto íntimo de Jorge Drexler, acompañada de una propuesta de cena sugerida para disfrutar en Cantinho da Selva.',
    includes: [
      'Entrada al espectáculo',
      'Experiencia musical en formato íntimo',
    ],
    requiresTable: true,
    dinnerOptional: true,
    dinnerIncluded: false,
    isFictionalDemo: true,
    status: 'published',
  },
  {
    id: 'cultivos-primavera',
    title: 'Cultivos de Primavera',
    category: 'huerta',
    date: '2026-11-21',
    time: '10:00',
    capacity: 50,
    price: 1200,
    currency: 'UYU',
    image: '/cultivos-primavera.jpg',
    description:
      'Descubrí los sabores de estación y aprendé a crear tu propia huerta.',
    longDescription:
      'Una jornada dedicada a los cultivos de primavera. Degustaremos preparaciones elaboradas con vegetales y verdes de estación y aprenderemos cómo planificar, preparar y mantener una huerta en casa.',
    includes: [
      'Degustación de productos de estación',
      'Taller de huerta en casa',
      'Consejos prácticos de cultivo',
    ],
    requiresTable: false,
    status: 'published',
  },
];

export const getAllEvents = () => events;

export const getEventById = (id) =>
  events.find((event) => event.id === id);

export const getEventsByCategory = (category) =>
  events.filter((event) => event.category === category);

export const getEventsByMonth = (year, month) =>
  events.filter((event) =>
    event.date.startsWith(
      `${year}-${String(month).padStart(2, '0')}`
    )
  );
