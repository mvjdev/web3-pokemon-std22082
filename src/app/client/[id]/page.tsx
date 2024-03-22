"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokemonSprites {
  front_default: string;
  // Add other sprites as needed
}

interface Pokemon {
  name: string;
  sprites: PokemonSprites;
  height: number;
  weight: number;
  types: PokemonType[];
  order: number;
}

const Page: React.FC = () => {
  const [data, setData] = useState<Pokemon | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data: Pokemon) => {
        setData(data);
      });
  }, [id]);

  if (!data) {
    return <p>NO PROFIL DATA</p>;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-white border-4 border-red-500 p-4 rounded-lg max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">{data.name}</h1>
        <img
          src={data.sprites.front_default}
          alt={data.name}
          className="w-64 h-64 mb-4 object-cover"
        />
        <p>
          <span className="font-bold underline text-red-600">Taille:</span>{" "}
          <span className="text-black">{data.height}</span>
        </p>
        <p>
          <span className="font-bold underline text-red-600">Poids:</span>{" "}
          <span className="text-black">{data.weight}</span>
        </p>
        <p>
          <span className="font-bold underline text-red-600">Types:</span>{" "}
          <span className="text-black">
            {data.types.map((type) => type.type.name).join(", ")}
          </span>
        </p>
        <p>
          <span className="font-bold underline text-red-600">Numéro:</span>{" "}
          <span className="text-black">{data.order}</span>
        </p>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="mt-10 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Retour
        </button>
      </div>
    </>
  );
};

export default Page;
