export default function Home() {
  const imageUrl =
    "https://static.posters.cz/image/1300/posters/pokemon-eevee-evolution-i34218.jpg";

  return (
    <main className="min-h-[140vh] w-full bg-black p-4">
      <div className="relative mx-auto w-full max-w-[1400px]">
      <img
        src={imageUrl}
        alt="Fotografia de Pokémon"
        className="block h-auto w-full object-contain"
      />

      <div className="absolute inset-0 bg-black/55" />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-col items-center gap-4 px-4 pt-6 text-center md:pt-10">
        <img
          src="/pngwing.com.png"
          alt="Logo Pokémon"
          className="w-[min(80vw,300px)]"
        />
        <div className="flex flex-col gap-0 leading-tight">
          <p className="max-w-2xl text-2xl font-bold text-white md:text-4xl">
            Tu aventura empieza aquí.
          </p>
          <p className="max-w-2xl text-base font-medium text-white/90 md:text-xl">
            La Pokedex, tu la escribes.
          </p>
        </div>
      </div>
      </div>
    </main>
  );
}
