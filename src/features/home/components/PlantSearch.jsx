
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { plantCategories } from '../../vivero/data/categories.js';

import '../styles/PlantSearch.css';

function PlantSearch() {
  return (
    <Form
      action="/plantas"
      method="get"
      className="plant-search"
      role="search"
      aria-label="Buscar productos del vivero"
    >
      <Form.Group controlId="plant-search-query">
        <Form.Label>Nombre o palabras clave</Form.Label>

        <Form.Control
          type="search"
          name="q"
          placeholder="Monstera, sombra, trepadora…"
        />
      </Form.Group>

      <div className="plant-search__filters">
        <Form.Group controlId="plant-search-category">
          <Form.Label>Categoría</Form.Label>

          <Form.Select name="categoria" defaultValue="">
            <option value="">
              Todas las categorías
            </option>

            {plantCategories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="plant-search-min-price">
          <Form.Label>Precio mínimo</Form.Label>

          <Form.Control
            type="number"
            name="precioMin"
            min="0"
            step="0.01"
            placeholder="Desde"
          />
        </Form.Group>

        <Form.Group controlId="plant-search-max-price">
          <Form.Label>Precio máximo</Form.Label>

          <Form.Control
            type="number"
            name="precioMax"
            min="0"
            step="0.01"
            placeholder="Hasta"
          />
        </Form.Group>
      </div>

      <div className="plant-search__actions">
        <Button type="reset" variant="outline-secondary">
          Limpiar
        </Button>

        <Button type="submit" variant="success">
          Buscar plantas
        </Button>
      </div>
    </Form>
  );
}

export default PlantSearch;
