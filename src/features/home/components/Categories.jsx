import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import {
  experienceCategories,
  plantCategories,
} from '../../vivero/data/categories.js';

import '../styles/Categories.css';

function Categories() {
  return (
    <section
      className="home-categories"
      aria-labelledby="categories-title"
    >
      <Container>
        <h2 id="categories-title">Explorá Cantinho</h2>
        <p>
          Encontrá tu próxima planta o descubrí nuestras experiencias.
        </p>

        <h3>Vivero</h3>

        <div className="home-categories__grid">
          {plantCategories.map((category) => (
            <Card
              key={category.id}
              as="a"
              href={category.href}
              className="home-categories__card"
            >
              <Card.Img
                variant="top"
                src={category.image}
                alt=""
                loading="lazy"
              />

              <Card.Body>
                <Card.Title as="h4">
                  {category.name}
                </Card.Title>
              </Card.Body>
            </Card>
          ))}
        </div>

        <h3>Cafetería y eventos</h3>

        <div className="home-categories__grid">
          {experienceCategories.map((category) => (
            <Card
              key={category.id}
              as="a"
              href={category.href}
              className="home-categories__card"
            >
              <Card.Img
                variant="top"
                src={category.image}
                alt=""
                loading="lazy"
              />

              <Card.Body>
                <Card.Title as="h4">
                  {category.name}
                </Card.Title>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Categories;