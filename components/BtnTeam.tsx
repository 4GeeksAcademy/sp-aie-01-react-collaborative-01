"use client";

import Link from "next/link";
import { useState } from "react";
import { usePokemonTeam } from "@/context/PokemonTeamContext";

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M9 3h6l1 2h4v2H4V5h4l1-2zm1 6h2v9h-2V9zm4 0h2v9h-2V9zM7 9h2v9H7V9z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function BtnTeam() {
  const [open, setOpen] = useState(false);
  const { team, deletePokemon } = usePokemonTeam();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        className="team-btn"
        aria-expanded={open}
      >
        Team
        <span className="team-badge">{team.length}</span>
      </button>

      {open && (
        <div className="team-dropdown">
          <h3>Equipo Pokemon</h3>
          {team.length === 0 && <p>No tienes pokemon en el equipo.</p>}
          <ul>
            {team.map((pokemon) => (
              <li key={pokemon.name}>
                <Link href={`/wikidex/${pokemon.name}`}>{pokemon.name}</Link>
                <button
                  type="button"
                  onClick={() => deletePokemon(pokemon.name)}
                  className="icon-btn"
                  aria-label={`Eliminar ${pokemon.name}`}
                >
                  <TrashIcon />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
