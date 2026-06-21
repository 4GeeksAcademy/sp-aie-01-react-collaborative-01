"use client";

import Link from "next/link";
import { usePokemonTeam } from "@/context/PokemonTeamContext";

type PokemonListItem = {
    name: string;
    url: string;
};

type PokemonCardProps = {
    pokemon: PokemonListItem;
    index: number;
    spriteId: number;
};

function PokemonCard({ pokemon, index, spriteId }: PokemonCardProps) {
    const { catchPokemon, deletePokemon, isPokemonCaught, getPokemonStorage } = usePokemonTeam();
    const isFavorite = isPokemonCaught(pokemon.name);
    const storage = getPokemonStorage(pokemon.name);
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${spriteId}.png`;

    return (
        <div className="pokemon-card">
            <Link href={`/wikidex/${pokemon.name}`} className="pokemon-card-link">
                <p className="pokemon-number">#{index}</p>
                <p className="pokemon-name">{pokemon.name}</p>
                <img
                    src={spriteUrl}
                    alt={pokemon.name}
                    className="pokemon-sprite"
                />
            </Link>

            <button
                type="button"
                className={`pokeball-btn ${storage === "team" ? "team" : ""} ${storage === "pc" ? "pc" : ""}`}
                onClick={() => {
                    if (isFavorite) {
                        deletePokemon(pokemon.name);
                        return;
                    }

                    catchPokemon({
                        name: pokemon.name,
                        url: pokemon.url,
                        spriteId,
                    });
                }}
                aria-label={isFavorite ? `Soltar ${pokemon.name}` : `Capturar ${pokemon.name}`}
            >
                <span className="pokeball-icon" aria-hidden="true" />
            </button>
        </div>
    );
}

export default PokemonCard;