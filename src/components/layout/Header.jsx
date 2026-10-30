
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

import { useCart } from '../../context/useCart.js';

import '../../styles/layout/Header.css';

function Header() {
  const { cartCount } = useCart();

  return (
    <Navbar expand="lg" className="site-header">
      <Container fluid>

        {/* LOGO */}
        <Navbar.Brand as={Link} to="/">
          <img
            src="/logocantinho.png"
            alt="Cantinho da Selva — Vivero & Café"
            className="site-header__logo"
          />
        </Navbar.Brand>

        {/* MENÚ MÓVIL */}
        <Navbar.Toggle
          aria-controls="main-navbar"
          aria-label="Abrir o cerrar navegación"
        />

        <Navbar.Collapse id="main-navbar">

          {/* NAVEGACIÓN */}
          <Nav className="me-auto">

            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>

            <NavDropdown
              title="Plantas"
              id="plants-dropdown"
            >
              <NavDropdown.Item
                as={Link}
                to="/plantas"
              >
                Ver todos los productos
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item
                as={Link}
                to="/plantas?categoria=interior"
              >
                Plantas de interior
              </NavDropdown.Item>

              <NavDropdown.Item
                as={Link}
                to="/plantas?categoria=exterior"
              >
                Plantas de exterior
              </NavDropdown.Item>

              <NavDropdown.Item
                as={Link}
                to="/plantas?categoria=frutales"
              >
                Frutales
              </NavDropdown.Item>

              <NavDropdown.Item
                as={Link}
                to="/plantas?categoria=macetas"
              >
                Macetas y accesorios
              </NavDropdown.Item>

              <NavDropdown.Item
                as={Link}
                to="/plantas?categoria=sustratos"
              >
                Sustratos y fertilizantes
              </NavDropdown.Item>

              <NavDropdown.Item
                as={Link}
                to="/plantas?categoria=herramientas"
              >
                Herramientas y cuidados
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/cafeteria">
              Cafetería
            </Nav.Link>

            <Nav.Link as={Link} to="/eventos">
              Eventos
            </Nav.Link>

            <Nav.Link as={Link} to="/#nosotros">
              Nosotros
            </Nav.Link>

          </Nav>

          {/* ACCIONES */}
          <div className="site-header__actions">

            {/* INICIAR SESIÓN */}
            <Button
              variant="outline-success"
              disabled
            >
              Iniciar sesión
            </Button>

            {/* CARRITO */}
            <Button
              as={Link}
              to="/carrito"
              variant="outline-success"
              className="site-header__cart"
              aria-label={`Ver carrito, ${cartCount} productos`}
            >
              <span aria-hidden="true">🛒</span>
              <span>Carrito</span>

              {cartCount > 0 && (
                <span className="site-header__cart-count">
                  {cartCount}
                </span>
              )}
            </Button>

          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
