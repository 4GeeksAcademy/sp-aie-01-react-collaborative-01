export default function Home() {
  const imageUrl =
    "https://static.posters.cz/image/1300/posters/pokemon-eevee-evolution-i34218.jpg";

  return (
    <main className="min-h-[140vh] w-full bg-black p-4">
      <img
        src={imageUrl}
        alt="Fotografia de Pokémon"
        className="mx-auto block h-auto w-full max-w-[1400px] object-contain"
      />

      <div className="absolute inset-0 bg-black/55" />

      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <img
          src="/pngwing.com.png"
          alt="Logo Pokémon"
          className="w-[min(80vw,300px)]"
        />
      </div>
    </main>
  );
}
