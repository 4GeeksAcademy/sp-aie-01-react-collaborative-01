"use client";

import { createContext, useContext, useState } from "react";

export type CapturedPokemon = {
  name: string;
  url: string;
  spriteId: number;
};

type PokemonTeamContextValue = {
  team: CapturedPokemon[];
  pc: CapturedPokemon[];
  catchPokemon: (pokemon: CapturedPokemon) => void;
  deletePokemon: (name: string) => void;
  isPokemonCaught: (name: string) => boolean;
  getPokemonStorage: (name: string) => "team" | "pc" | null;
  movePcToTeam: (name: string) => void;
};

const PokemonTeamContext = createContext<PokemonTeamContextValue | undefined>(undefined);

export function PokemonTeamProvider({ children }: { children: React.ReactNode }) {
  const [team, setTeam] = useState<CapturedPokemon[]>([]);
  const [pc, setPc] = useState<CapturedPokemon[]>([]);

  const catchPokemon = (pokemon: CapturedPokemon) => {
    const alreadyCaught =
      team.some((entry) => entry.name === pokemon.name) ||
      pc.some((entry) => entry.name === pokemon.name);

    if (alreadyCaught) {
      return;
    }

    if (team.length < 6) {
      setTeam((previous) => [...previous, pokemon]);
      return;
    }

    setPc((previous) => [...previous, pokemon]);
  };

  const deletePokemon = (name: string) => {
    setTeam((previous) => previous.filter((pokemon) => pokemon.name !== name));
    setPc((previous) => previous.filter((pokemon) => pokemon.name !== name));
  };

  const isPokemonCaught = (name: string) => {
    return team.some((pokemon) => pokemon.name === name) || pc.some((pokemon) => pokemon.name === name);
  };

  const getPokemonStorage = (name: string) => {
    if (team.some((pokemon) => pokemon.name === name)) {
      return "team";
    }

    if (pc.some((pokemon) => pokemon.name === name)) {
      return "pc";
    }

    return null;
  };

  const movePcToTeam = (name: string) => {
    if (team.length >= 6) {
      return;
    }

    const pokemonInPc = pc.find((pokemon) => pokemon.name === name);
    if (!pokemonInPc) {
      return;
    }

    setPc((previous) => previous.filter((pokemon) => pokemon.name !== name));
    setTeam((previous) => [...previous, pokemonInPc]);
  };

  const value = {
    team,
    pc,
    catchPokemon,
    deletePokemon,
    isPokemonCaught,
    getPokemonStorage,
    movePcToTeam,
  };

  return <PokemonTeamContext.Provider value={value}>{children}</PokemonTeamContext.Provider>;
}

export function usePokemonTeam() {
  const context = useContext(PokemonTeamContext);

  if (!context) {
    throw new Error("usePokemonTeam debe usarse dentro de PokemonTeamProvider");
  }

  return context;
}
