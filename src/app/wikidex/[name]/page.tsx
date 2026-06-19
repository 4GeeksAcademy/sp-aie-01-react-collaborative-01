import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";

type PokemonDetail = {
    name: string;
    height: number;
    weight: number;
    species: {
        url: string;
    };
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

type PokemonSpecies = {
    evolution_chain: {
        url: string;
    };
};

type EvolutionNode = {
    species: {
        name: string;
    };
    evolves_to: EvolutionNode[];
};

type EvolutionChainResponse = {
    chain: EvolutionNode;
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

async function getPokemonSpecies(url: string): Promise<PokemonSpecies> {
    const response = await fetch(url, {
        next: { revalidate: 3600 },
    });

    if (!response.ok) {
        throw new Error("No se pudo cargar la especie del pokemon");
    }

    return response.json();
}

async function getEvolutionChain(url: string): Promise<EvolutionChainResponse> {
    const response = await fetch(url, {
        next: { revalidate: 3600 },
    });

    if (!response.ok) {
        throw new Error("No se pudo cargar la cadena evolutiva");
    }

    return response.json();
}

function collectEvolutionNames(node: EvolutionNode, names: string[] = []) {
    names.push(node.species.name);

    for (const evolution of node.evolves_to) {
        collectEvolutionNames(evolution, names);
    }

    return names;
}

function getTypeColor(typeName: string) {
    const typeColors: Record<string, string> = {
        normal: "#9CA3AF",
        fire: "#F97316",
        water: "#0EA5E9",
        electric: "#FACC15",
        grass: "#22C55E",
        ice: "#67E8F9",
        fighting: "#DC2626",
        poison: "#A855F7",
        ground: "#B45309",
        flying: "#60A5FA",
        psychic: "#EC4899",
        bug: "#84CC16",
        rock: "#A16207",
        ghost: "#7C3AED",
        dragon: "#2563EB",
        dark: "#374151",
        steel: "#6B7280",
        fairy: "#F472B6",
    };

    return typeColors[typeName] ?? "#64748B";
}

export default async function PokemonDetailPage({ params }: PokemonDetailPageProps) {
    const { name } = await params;
    const pokemon = await getPokemonDetail(name);

    if (!pokemon) {
        notFound();
    }

    const species = await getPokemonSpecies(pokemon.species.url);
    const evolutionChain = await getEvolutionChain(species.evolution_chain.url);
    const evolutionNames = Array.from(new Set(collectEvolutionNames(evolutionChain.chain)));

    return (
        <div className="app-shell detail-layout">
            <div className="detail-top">
                <Link href="/wikidex" className="detail-back">
                    Volver a Wikidex
                </Link>
            </div>

            <section className="detail-card detail-hero">
                <h1 className="detail-title">{pokemon.name}</h1>

                <div className="detail-body">
                    <img
                        src={pokemon.sprites.front_default ?? ""}
                        alt={pokemon.name}
                        className="pokemon-sprite"
                    />

                    <div className="detail-stats">
                        <div className="detail-stat">
                            <p>Altura</p>
                            <p>{pokemon.height}</p>
                        </div>
                        <div className="detail-stat">
                            <p>Peso</p>
                            <p>{pokemon.weight}</p>
                        </div>
                    </div>

                    <div className="detail-panel">
                        <h2>Tipos</h2>
                        <div className="chip-list">
                            {pokemon.types
                                .sort((a, b) => a.slot - b.slot)
                                .map((entry) => (
                                    <span
                                        className="chip chip-type"
                                        key={entry.type.name}
                                        style={{ "--type-color": getTypeColor(entry.type.name) } as CSSProperties}
                                    >
                                        {entry.type.name}
                                    </span>
                                ))}
                        </div>
                    </div>

                    <div className="detail-panel abilities-panel">
                        <h2>Habilidades</h2>
                        <ul className="abilities-list abilities-grid">
                            {pokemon.abilities.map((entry) => (
                                <li className="ability-chip" key={entry.ability.name}>
                                    <span className="ability-star">★</span>
                                    {entry.ability.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="detail-panel evolution-panel">
                        <h2>Evoluciones posibles</h2>
                        <div className="evolution-chain">
                            {evolutionNames.map((evolutionName, index) => (
                                <div className="evolution-step" key={evolutionName}>
                                    {index > 0 && <span className="evolution-arrow">→</span>}
                                    <Link
                                        href={`/wikidex/${evolutionName}`}
                                        className={`evolution-link ${evolutionName === pokemon.name ? "current" : ""}`}
                                    >
                                        {evolutionName}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
