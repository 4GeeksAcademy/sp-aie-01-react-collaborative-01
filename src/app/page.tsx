export default function Home() {
  const imageUrl =
    "https://static.posters.cz/image/1300/posters/pokemon-eevee-evolution-i34218.jpg";

  return (
    <div className="app-shell">
      <section className="hero-home">
        <div className="home-image-wrap">
          <img
            src={imageUrl}
            alt="Fotografia de Pokémon"
            className="home-image"
          />

          <div className="home-overlay" />

          <div className="home-content">
            <img
              src="/pngwing.com.png"
              alt="Logo Pokémon"
              className="home-logo"
            />
            <p className="home-title">Tu aventura empieza aqui.</p>
            <p className="home-subtitle">La Pokedex, tu la escribes.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
