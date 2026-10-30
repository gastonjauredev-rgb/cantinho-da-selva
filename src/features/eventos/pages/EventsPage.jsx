
import { useMemo, useState } from 'react';
import {
  EVENT_CATEGORIES,
  getAllEvents,
} from '../data/events.js';
import EventCard from '../components/EventCard.jsx';
import '../styles/EventsPage.css';

const INITIAL_YEAR = 2026;
const INITIAL_MONTH = 11;

const MONTH_FORMATTER = new Intl.DateTimeFormat('es-UY', {
  month: 'long',
  year: 'numeric',
});

const formatMonth = (year, month) => {
  const date = new Date(year, month - 1, 1);
  const formatted = MONTH_FORMATTER.format(date);

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

const getMonthValue = (year, month) => year * 12 + month - 1;

function EventsPage() {
  const [selectedYear, setSelectedYear] = useState(INITIAL_YEAR);
  const [selectedMonth, setSelectedMonth] = useState(INITIAL_MONTH);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const allEvents = getAllEvents();

  const filteredEvents = useMemo(() => {
    const monthPrefix = `${selectedYear}-${String(
      selectedMonth
    ).padStart(2, '0')}`;

    return allEvents
      .filter((event) => event.status === 'published')
      .filter((event) => event.date.startsWith(monthPrefix))
      .filter(
        (event) =>
          selectedCategory === 'all' ||
          event.category === selectedCategory
      )
      .sort((a, b) => {
        const dateA = `${a.date}T${a.time}`;
        const dateB = `${b.date}T${b.time}`;

        return dateA.localeCompare(dateB);
      });
  }, [allEvents, selectedYear, selectedMonth, selectedCategory]);

  const changeMonth = (direction) => {
    const nextDate = new Date(
      selectedYear,
      selectedMonth - 1 + direction,
      1
    );

    setSelectedYear(nextDate.getFullYear());
    setSelectedMonth(nextDate.getMonth() + 1);
    setSelectedCategory('all');
  };

  const goToNovember = () => {
    setSelectedYear(INITIAL_YEAR);
    setSelectedMonth(INITIAL_MONTH);
    setSelectedCategory('all');
  };

  const currentMonthValue = getMonthValue(
    selectedYear,
    selectedMonth
  );

  const initialMonthValue = getMonthValue(
    INITIAL_YEAR,
    INITIAL_MONTH
  );

  const isInitialMonth = currentMonthValue === initialMonthValue;

  return (
    <main className="events-page">
      <section className="events-page__hero">
        <div className="events-page__hero-content">
          <span className="events-page__eyebrow">
            EXPERIENCIAS QUE NOS CONECTAN
          </span>

          <h1>
            Momentos para
            <span> compartir y recordar.</span>
          </h1>

          <p>
            En Cantinho da Selva, la naturaleza, la gastronomía
            y la cultura se encuentran. Descubrí nuestros
            talleres, encuentros y experiencias especiales.
          </p>

          <a
            href="#cartelera-eventos"
            className="events-page__hero-button"
          >
            Explorar eventos
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <section
        className="events-page__program"
        id="cartelera-eventos"
        aria-labelledby="events-program-title"
      >
        <div className="events-page__container">
          <header className="events-page__program-header">
            <div>
              <span className="events-page__section-eyebrow">
                AGENDA CANTINHO
              </span>

              <h2 id="events-program-title">
                Nuestra cartelera
              </h2>

              <p>
                Elegí tu próxima experiencia y descubrí todo
                lo que preparamos para vos.
              </p>
            </div>

            <div
              className="events-page__month-navigation"
              aria-label="Navegar por meses"
            >
              <button
                type="button"
                className="events-page__month-button"
                onClick={() => changeMonth(-1)}
                disabled={currentMonthValue <= initialMonthValue}
                aria-label="Mes anterior"
              >
                ←
              </button>

              <span
                className="events-page__current-month"
                aria-live="polite"
              >
                {formatMonth(selectedYear, selectedMonth)}
              </span>

              <button
                type="button"
                className="events-page__month-button"
                onClick={() => changeMonth(1)}
                aria-label="Mes siguiente"
              >
                →
              </button>
            </div>
          </header>

          <div
            className="events-page__filters"
            role="group"
            aria-label="Filtrar eventos por categoría"
          >
            <button
              type="button"
              className={`events-page__filter ${
                selectedCategory === 'all'
                  ? 'events-page__filter--active'
                  : ''
              }`}
              onClick={() => setSelectedCategory('all')}
              aria-pressed={selectedCategory === 'all'}
            >
              Todos
            </button>

            {EVENT_CATEGORIES.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`events-page__filter ${
                  selectedCategory === category.id
                    ? 'events-page__filter--active'
                    : ''
                }`}
                onClick={() => setSelectedCategory(category.id)}
                aria-pressed={selectedCategory === category.id}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="events-page__results">
            <p aria-live="polite">
              {filteredEvents.length === 1
                ? '1 experiencia disponible'
                : `${filteredEvents.length} experiencias disponibles`}
            </p>
          </div>

          {filteredEvents.length > 0 ? (
            <div className="events-page__grid">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="events-page__empty">
              <span
                className="events-page__empty-icon"
                aria-hidden="true"
              >
                ✿
              </span>

              <h3>No encontramos eventos para esta selección</h3>

              <p>
                Todavía no tenemos experiencias publicadas
                para este mes y categoría. Explorá otra fecha
                o volvé a nuestra programación de noviembre.
              </p>

              {!isInitialMonth && (
                <button
                  type="button"
                  className="events-page__empty-button"
                  onClick={goToNovember}
                >
                  Ver eventos de noviembre
                </button>
              )}

              {isInitialMonth && selectedCategory !== 'all' && (
                <button
                  type="button"
                  className="events-page__empty-button"
                  onClick={() => setSelectedCategory('all')}
                >
                  Ver todas las categorías
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="events-page__closing">
        <div className="events-page__container">
          <span className="events-page__section-eyebrow">
            MÁS QUE UN ENCUENTRO
          </span>

          <h2>Cada experiencia tiene algo especial.</h2>

          <p>
            Un taller para descubrir una nueva pasión,
            una noche de música o una jornada entre plantas.
            Siempre hay una buena razón para encontrarnos
            en Cantinho.
          </p>
        </div>
      </section>
    </main>
  );
}

export default EventsPage;
