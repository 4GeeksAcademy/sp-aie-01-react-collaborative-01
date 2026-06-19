import Link from "next/link";

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
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${spriteId}.png`;

    return (
        <Link href={`/wikidex/${pokemon.name}`}>
            <p>#{index}</p>
            <p>{pokemon.name}</p>
            <img
                src={spriteUrl}
                alt={pokemon.name}
            />
        </Link>
    );
}

export default PokemonCard;