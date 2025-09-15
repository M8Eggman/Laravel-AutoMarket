import React from "react";

export default function Card({ car }) {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative">
                <img
                    src={`/storage/${car.image1_path}`}
                    alt={car.model}
                    className="w-full h-48 object-cover"
                />
                <h2 className="font-semibold text-lg bg-gray-200 px-4 rounded-full z-10 absolute top-3 left-3">
                    {car.brand?.name} {car.model}
                </h2>
            </div>

            <div className="p-4 flex flex-col gap-2">
                <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full self-start">
                    {car.brand?.name}
                </span>
                <p className="text-blue-600 font-bold text-xl">
                    {car.prix.toLocaleString()} €
                </p>
                <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
                    <span>📅 {car.annee}</span>
                    <span>🛣 {car.kilometrage.toLocaleString()} km</span>
                    <span>⛽ {car.fuel?.name}</span>
                    <span>⚙ {car.type?.name}</span>
                </div>
                <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                    Voir détails
                </button>
            </div>
        </div>
    );
}
