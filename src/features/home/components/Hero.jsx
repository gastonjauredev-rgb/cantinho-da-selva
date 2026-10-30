import '../styles/Hero.css';
import PlantSearch from './PlantSearch.jsx';




function Hero() {
  return (
    <section className="home-hero" aria-labelledby="hero-title">
      <div className="home-hero__content">
        <h1 id="hero-title">Cantinho da Selva</h1>
        <p>Plantas, café y encuentros en un mismo lugar.</p>
        <PlantSearch />
      </div>
    </section>
  );
}

export default Hero;