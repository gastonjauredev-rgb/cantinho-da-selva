
import { useState } from 'react';

import {
  TABLE_AREAS,
  getAllTables,
} from '../data/tables.js';

import '../styles/TableMap.css';

/* =========================================
   CANTINHO DA SELVA
   MAPA INTERACTIVO DE MESAS
========================================= */

function TableMap({
  selectedTable = null,
  onSelectTable = () => {},
  occupiedTableIds = [],
  guests = 2,
}) {
  const [activeArea, setActiveArea] = useState('all');

  const visibleTables = getAllTables().filter(
    (table) =>
      table.active &&
      (activeArea === 'all' || table.area === activeArea)
  );

  const getTableStatus = (table) => {
    if (occupiedTableIds.includes(table.id)) {
      return 'occupied';
    }

    if (table.capacity < guests) {
      return 'insufficient';
    }

    if (selectedTable?.id === table.id) {
      return 'selected';
    }

    return 'available';
  };

  const handleAreaChange = (area) => {
    setActiveArea(area);
  };

  return (
    <section className="table-map">
      {/* ENCABEZADO */}
      <header className="table-map__header">
        <span className="table-map__eyebrow">
          TU LUGAR EN CANTINHO
        </span>

        <h2>Elegí tu rincón favorito</h2>

        <p>
          Explorá nuestro salón y jardín, descubrí las mesas
          disponibles y elegí dónde te gustaría disfrutar
          tu experiencia.
        </p>
      </header>

      {/* FILTROS */}
      <div
        className="table-map__areas"
        role="group"
        aria-label="Filtrar mesas por ambiente"
      >
        <button
          type="button"
          className={`table-map__area-button ${
            activeArea === 'all'
              ? 'table-map__area-button--active'
              : ''
          }`}
          onClick={() => handleAreaChange('all')}
          aria-pressed={activeArea === 'all'}
        >
          Todo el local
        </button>

        {TABLE_AREAS.map((area) => (
          <button
            key={area.id}
            type="button"
            className={`table-map__area-button ${
              activeArea === area.id
                ? 'table-map__area-button--active'
                : ''
            }`}
            onClick={() => handleAreaChange(area.id)}
            aria-pressed={activeArea === area.id}
          >
            {area.name}
          </button>
        ))}
      </div>

      {/* PLANO REALISTA */}
      <div className="table-map__viewport">
        <div className="table-map__canvas">
          <img
            src="/plano-cantinho.png"
            alt="Vista aérea de Cantinho da Selva, con salón interior, jardín y vivero"
            className="table-map__image"
            draggable="false"
          />

          {/* INDICADORES INTERACTIVOS */}
          {visibleTables.map((table) => {
            const status = getTableStatus(table);

            const disabled =
              status === 'occupied' ||
              status === 'insufficient';

            const statusLabel = {
              occupied: 'ocupada',
              insufficient: 'capacidad insuficiente',
              selected: 'seleccionada',
              available: 'disponible',
            }[status];

            return (
              <button
                key={table.id}
                type="button"
                className={[
                  'table-map__table',
                  `table-map__table--${status}`,
                  `table-map__table--capacity-${table.capacity}`,
                ].join(' ')}
                style={{
                  left: `${table.x}%`,
                  top: `${table.y}%`,
                }}
                disabled={disabled}
                onClick={() => onSelectTable(table)}
                aria-pressed={status === 'selected'}
                aria-label={`Mesa ${table.number}, ${table.capacity} personas, ${statusLabel}`}
                title={`Mesa ${table.number} · ${table.capacity} personas · ${statusLabel}`}
              >
                <span className="table-map__table-number">
                  {table.id}
                </span>

                <span className="table-map__table-capacity">
                  {table.capacity} pers.
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* LEYENDA */}
      <div className="table-map__legend">
        <div className="table-map__legend-item">
          <span className="table-map__legend-color table-map__legend-color--available" />
          <span>Disponible</span>
        </div>

        <div className="table-map__legend-item">
          <span className="table-map__legend-color table-map__legend-color--occupied" />
          <span>Ocupada</span>
        </div>

        <div className="table-map__legend-item">
          <span className="table-map__legend-color table-map__legend-color--selected" />
          <span>Seleccionada</span>
        </div>

        <div className="table-map__legend-item">
          <span className="table-map__legend-color table-map__legend-color--insufficient" />
          <span>Capacidad insuficiente</span>
        </div>
      </div>

      {/* MESA SELECCIONADA */}
      {selectedTable && (
        <div className="table-map__selection">
          <div>
            <span className="table-map__selection-label">
              TU MESA
            </span>

            <h3>Mesa {selectedTable.number}</h3>

            <p>
              {selectedTable.capacity} personas ·{' '}
              {
                TABLE_AREAS.find(
                  (area) => area.id === selectedTable.area
                )?.name
              }
            </p>
          </div>

          <span
            className="table-map__selection-check"
            aria-hidden="true"
          >
            ✓
          </span>
        </div>
      )}
    </section>
  );
}

export default TableMap;
