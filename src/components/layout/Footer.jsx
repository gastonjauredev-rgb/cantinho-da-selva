
import { Link } from 'react-router-dom';
import '../../styles/layout/Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <div className="site-footer__container">

          {/* IDENTIDAD */}
          <div className="site-footer__brand">
            <Link to="/" className="site-footer__logo-link">
              <img
                src="/logocantinho.png"
                alt="Cantinho da Selva"
                className="site-footer__logo"
              />
            </Link>

            <p>
              Un espacio para conectar con la naturaleza,
              disfrutar de un buen café y compartir
              momentos especiales.
            </p>

            <span className="site-footer__tagline">
              Naturaleza, sabores y encuentros.
            </span>
          </div>

          {/* NAVEGACIÓN */}
          <div className="site-footer__column">
            <h3>Explorá Cantinho</h3>

            <nav aria-label="Navegación del pie de página">
              <Link to="/">Inicio</Link>
              <Link to="/plantas">Vivero</Link>
              <span>Cafetería · Próximamente</span>
              <span>Eventos · Próximamente</span>
            </nav>
          </div>

          {/* INFORMACIÓN */}
          <div className="site-footer__column">
            <h3>Tu experiencia</h3>

            <div className="site-footer__links">
              <Link to="/carrito">Mi carrito</Link>
              <Link to="/plantas">Comprar plantas</Link>
              <span>Reservas · Próximamente</span>
              <span>Pedidos take away · Próximamente</span>
            </div>
          </div>

          {/* CONTACTO */}
          <div className="site-footer__column site-footer__contact">
            <h3>Conectemos</h3>

            <p>
              ¿Tenés alguna consulta sobre nuestras plantas
              o querés conocer más sobre Cantinho?
            </p>

            <p>
              Muy pronto vas a encontrar acá nuestros
              canales de contacto y redes sociales.
            </p>
          </div>

        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="site-footer__container">
          <span>
            © {currentYear} Cantinho da Selva.
            Todos los derechos reservados.
          </span>

          <span>
            Hecho con amor por la naturaleza 🌿
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
