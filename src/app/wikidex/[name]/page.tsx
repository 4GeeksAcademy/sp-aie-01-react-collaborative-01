import Link from "next/link";
import { notFound } from "next/navigation";

type PokemonDetail = {
    name: string;
    height: number;
    weight: number;
    sprites: {
        front_default: string | null;
    };
    types: Array<{
        slot: number;
        type: {
            name: string;
        };
    }>;
    abilities: Array<{
        ability: {
            name: string;
        };
    }>;
};

type PokemonDetailPageProps = {
    params: Promise<{
        name: string;
    }>;
};

async function getPokemonDetail(name: string): Promise<PokemonDetail | null> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
        next: { revalidate: 3600 },
    });

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error("No se pudo cargar el pokemon");
    }

    return response.json();
}

export default async function PokemonDetailPage({ params }: PokemonDetailPageProps) {
    const { name } = await params;
    const pokemon = await getPokemonDetail(name);

    if (!pokemon) {
        notFound();
    }

    return (
        <div>
            <Link href="/wikidex">
                Volver a Wikidex
            </Link>

            <div>
                <h1>{pokemon.name}</h1>

                <img
                    src={pokemon.sprites.front_default ?? ""}
                    alt={pokemon.name}
                />

                <div>
                    <div>
                        <p>Altura</p>
                        <p>{pokemon.height}</p>
                    </div>
                    <div>
                        <p>Peso</p>
                        <p>{pokemon.weight}</p>
                    </div>
                </div>

                <div>
                    <h2>Tipos</h2>
                    <div>
                        {pokemon.types
                            .sort((a, b) => a.slot - b.slot)
                            .map((entry) => (
                                <span key={entry.type.name}>
                                    {entry.type.name}
                                </span>
                            ))}
                    </div>
                </div>

                <div>
                    <h2>Habilidades</h2>
                    <ul>
                        {pokemon.abilities.map((entry) => (
                            <li key={entry.ability.name}>
                                {entry.ability.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
