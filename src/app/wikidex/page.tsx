import PokemonCard from "../../../components/pokemoncard";

type PokemonListItem = {
    name: string;
    url: string;
};

type PokemonListResponse = {
    results: PokemonListItem[];
};

function getPokemonIdFromUrl(url: string): number {
    const parts = url.split("/").filter(Boolean);
    return Number(parts[parts.length - 1]);
}

async function getPokemonList(): Promise<PokemonListItem[]> {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151", {
        next: { revalidate: 3600 },
    });

    if (!response.ok) {
        throw new Error("No se pudo cargar la lista de pokemon");
    }

    const data: PokemonListResponse = await response.json();
    return data.results;
}

export default async function WikidexPage() {
    const pokemon = await getPokemonList();


    return (
        <div className="app-shell">
            <section className="pokemon-section">
            <h1 className="section-title">Wikidex Kanto</h1>
            <p className="section-subtitle">Explora los 151 pokemon de primera generacion y arma tu equipo ideal.</p>
            <div className="pokemon-grid">
            {pokemon.map((poke, index) => (
                <PokemonCard
                    key={poke.name}
                    pokemon={poke}
                    index={index + 1}
                    spriteId={getPokemonIdFromUrl(poke.url)}
                />
            ))}
            </div>
            </section>
        </div>
    );
}