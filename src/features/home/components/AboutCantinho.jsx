
import { Link } from 'react-router-dom';

import '../styles/AboutCantinho.css';

const spaces = [
  {
    number: '01',
    title: 'Vivero',
    description:
      'Plantas, macetas y accesorios para transformar tus espacios y cultivar tu conexión con la naturaleza.',
    label: 'Explorar el vivero',
    link: '/plantas',
  },
  {
    number: '02',
    title: 'Cafetería',
    description:
      'Café de especialidad, pastelería artesanal y sabores para disfrutar sin apuro, rodeados de verde.',
    label: 'Próximamente',
    link: null,
  },
  {
    number: '03',
    title: 'Eventos',
    description:
      'Un espacio diferente para celebrar, compartir experiencias y crear recuerdos especiales.',
    label: 'Próximamente',
    link: null,
  },
];

function AboutCantinho() {
  return (
    <section
      className="about-cantinho"
      id="nosotros"
      aria-labelledby="about-cantinho-title"
    >
      <div className="about-cantinho__container">

        {/* PRESENTACIÓN CON FOTOGRAFÍA */}
        <div className="about-cantinho__intro">

          <div className="about-cantinho__image-wrapper">
            <img
              src="/cantinho-espacio.png"
              alt="Patio de Cantinho da Selva, con árboles, plantas, un camino de ladrillos y una cafetería integrada al vivero."
              className="about-cantinho__image"
              loading="lazy"
            />

            <div className="about-cantinho__image-caption">
              <span>CANTINHO DA SELVA</span>
              <strong>Un rincón para disfrutar.</strong>
            </div>
          </div>

          <div className="about-cantinho__content">
            <span className="about-cantinho__eyebrow">
              NUESTRA ESENCIA
            </span>

            <h2 id="about-cantinho-title">
              Un lugar para conectar
              <em> con la naturaleza.</em>
            </h2>

            <p>
              En Cantinho da Selva creemos que los mejores
              momentos nacen de las cosas simples: una planta
              que crece, un café compartido o una conversación
              que se extiende sin mirar el reloj.
            </p>

            <p>
              Creamos un espacio donde la naturaleza, los
              sabores y los encuentros forman parte de una
              misma experiencia.
            </p>

            <p>
              Entre árboles, senderos de ladrillo y rincones
              llenos de verde, te invitamos a descubrir un
              lugar para disfrutar sin apuro.
            </p>

            <Link
              to="/plantas"
              className="about-cantinho__button"
            >
              Descubrí nuestro vivero
              <span aria-hidden="true"> →</span>
            </Link>
          </div>
        </div>

        {/* NUESTROS ESPACIOS */}
        <div className="about-cantinho__spaces-heading">
          <span className="about-cantinho__eyebrow">
            MUCHO MÁS QUE UN VIVERO
          </span>

          <h3>Tres espacios, una misma esencia.</h3>
        </div>

        <div className="about-cantinho__spaces">
          {spaces.map((space) => (
            <article
              className="about-cantinho__space"
              key={space.number}
            >
              <span className="about-cantinho__number">
                {space.number}
              </span>

              <h4>{space.title}</h4>

              <p>{space.description}</p>

              {space.link ? (
                <Link
                  to={space.link}
                  className="about-cantinho__link"
                >
                  {space.label}
                  <span aria-hidden="true"> →</span>
                </Link>
              ) : (
                <span className="about-cantinho__coming">
                  {space.label}
                </span>
              )}
            </article>
          ))}
        </div>

        <div className="about-cantinho__closing">
          <span aria-hidden="true">🌿</span>
          <p>
            Cantinho da Selva
            <strong> Naturaleza, sabores y encuentros.</strong>
          </p>
        </div>

      </div>
    </section>
  );
}

export default AboutCantinho;
