import React from "react";

interface ButtonProps {
  pokemonId: number;
  onNavigate: (pokemonId: number) => void;
}

const Button: React.FC<ButtonProps> = ({ pokemonId, onNavigate }) => {
  return (
    <button
      onClick={() => onNavigate(pokemonId)}
      className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded"
    >
      Details
    </button>
  );
};

export default Button;
