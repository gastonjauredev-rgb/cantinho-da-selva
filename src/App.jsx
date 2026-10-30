
import { Routes, Route } from 'react-router-dom';

// =========================================
// LAYOUT COMPARTIDO
// =========================================

import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';

// =========================================
// HOME
// =========================================

import Home from './features/home/pages/Home.jsx';

// =========================================
// VIVERO
// =========================================

import PlantCatalog from './features/vivero/pages/PlantCatalog.jsx';
import ProductDetail from './features/vivero/pages/ProductDetail.jsx';

// =========================================
// CAFETERÍA Y RESTAURANTE
// =========================================

import CafeteriaPage from './features/cafeteria/pages/CafeteriaPage.jsx';

// =========================================
// EVENTOS
// =========================================

import EventsPage from './features/eventos/pages/EventsPage.jsx';
import EventDetailPage from './features/eventos/pages/EventDetailPage.jsx';
import EventCheckoutPage from './features/eventos/pages/EventCheckoutPage.jsx';

// =========================================
// CARRITO Y CHECKOUT
// =========================================

import CartPage from './features/carrito/pages/CartPage.jsx';
import CheckoutPage from './features/checkout/pages/CheckoutPage.jsx';

// =========================================
// APLICACIÓN PRINCIPAL
// =========================================

function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* VIVERO */}
        <Route path="/plantas" element={<PlantCatalog />} />
        <Route path="/plantas/:id" element={<ProductDetail />} />

        {/* CAFETERÍA */}
        <Route path="/cafeteria" element={<CafeteriaPage />} />

        {/* EVENTOS */}
        <Route path="/eventos" element={<EventsPage />} />
        <Route
          path="/eventos/checkout"
          element={<EventCheckoutPage />}
        />
        <Route
          path="/eventos/:id"
          element={<EventDetailPage />}
        />

        {/* CARRITO */}
        <Route path="/carrito" element={<CartPage />} />

        {/* CHECKOUT */}
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
