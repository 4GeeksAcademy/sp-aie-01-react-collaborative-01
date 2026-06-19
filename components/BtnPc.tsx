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

export default function BtnPc() {
  const [open, setOpen] = useState(false);
  const { pc, team, deletePokemon, movePcToTeam } = usePokemonTeam();
  const teamIsFull = team.length >= 6;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        className="team-btn"
        aria-expanded={open}
      >
        PC
        <span className="team-badge">{pc.length}</span>
      </button>

      {open && (
        <div className="team-dropdown">
          <h3>Pokemon en PC</h3>
          {pc.length === 0 && <p>No tienes pokemon en el PC.</p>}
          <ul>
            {pc.map((pokemon) => (
              <li key={pokemon.name}>
                <Link href={`/wikidex/${pokemon.name}`}>{pokemon.name}</Link>
                <span className="pc-tag">PC</span>
                <button
                  type="button"
                  onClick={() => movePcToTeam(pokemon.name)}
                  className="promote-btn"
                  disabled={teamIsFull}
                  title={teamIsFull ? "El equipo ya tiene 6 pokemon" : "Pasar al equipo"}
                >
                  Team
                </button>
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
