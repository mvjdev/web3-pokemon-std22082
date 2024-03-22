"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/button";
interface Sprites {
  front_default: string;
}

interface Pokemon {
  name: string;
  url: string;
  sprites: Sprites;
  id: number;
}

interface PokemonList {
  results: Pokemon[];
}

export default function Page() {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=50&offset=0")
      .then((res) => res.json())
      .then((data: PokemonList) => {
        const fetchPokemonDetails = data.results.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        );

        Promise.all(fetchPokemonDetails).then((pokemonDetails) => {
          setPokemonData(pokemonDetails);
        });
      });
  }, []);

  const navigateToClient = (pokemonId: number) => {
    window.location.href = `/client/${pokemonId}`;
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-8 text-center">LISTS POKEMON</h1>
      <div className="flex flex-wrap justify-center">
        {pokemonData.length > 0 ? (
          pokemonData.map((pokemon, index) => (
            <div
              key={index}
              className="max-w-sm rounded overflow-hidden shadow-lg m-2 bg-white border-2 border-rose-500 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              <img
                className="w-30 h-30 object-cover"
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl text-purple-500 mb-2">
                  {pokemon.name}
                </div>
                <Button pokemonId={pokemon.id} onNavigate={navigateToClient} />
              </div>
            </div>
          ))
        ) : (
          <p>Chargement...</p>
        )}
      </div>
    </>
  );
}
