import Hero from '../components/Hero.jsx';
import Categories from '../components/Categories.jsx';
import FeaturedProducts from '../components/FeaturedProducts.jsx';
import AboutCantinho from '../components/AboutCantinho.jsx';

import '../styles/Home.css';

function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <AboutCantinho />
    </main>
  );
}

export default Home;