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
        <div>
            <h1>Wikidex</h1>
            <div>
            {pokemon.map((poke, index) => (
                <PokemonCard
                    key={poke.name}
                    pokemon={poke}
                    index={index + 1}
                    spriteId={getPokemonIdFromUrl(poke.url)}
                />
            ))}
            </div>
        </div>
    );
}