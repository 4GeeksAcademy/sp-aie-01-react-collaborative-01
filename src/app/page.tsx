import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white">PokeApi</h1>
      <p className="mt-3 text-gray-600 dark:text-gray-300">Selecciona un modulo:</p>
      <div className="mt-6 flex flex-col gap-3 text-lg">
        <Link className="text-blue-600 hover:underline" href="/wikidex">
          Wikidex
        </Link>
        <Link className="text-blue-600 hover:underline" href="/pokerastreo">
          Pokerastreo
        </Link>
        <Link className="text-blue-600 hover:underline" href="/infogym">
          Infogym
        </Link>
      </div>
    </div>
  );
}
