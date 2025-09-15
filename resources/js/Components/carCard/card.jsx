import React from "react";
import { FaCalendarAlt, FaRoad, FaGasPump, FaCogs } from "react-icons/fa";

export default function Card({ car }) {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative">
                <img
                    src={car.image1_path}
                    alt={car.model}
                    className="w-full h-60 object-cover"
                />
                <span className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full absolute top-3 left-3">
                    {car.brand?.name}
                </span>
            </div>
            <div className="p-4 flex flex-col gap-2">
                <h4 className="font-semibold text-h5">
                    {car.brand?.name} {car.model}
                </h4>
                <p className="text-blue-800 font-bold text-h4">
                    {car.prix.toLocaleString()} €
                </p>
                <div className="grid grid-cols-2 gap-4 text-gray-600 text-sm-custom">
                    <span className="flex items-center gap-1">
                        <FaCalendarAlt className="w-4 h-4" /> {car.annee}
                    </span>
                    <span className="flex items-center gap-1">
                        <FaRoad className="w-4 h-4" />{" "}
                        {car.kilometrage.toLocaleString()} km
                    </span>
                    <span className="flex items-center gap-1">
                        <FaGasPump className="w-4 h-4" /> {car.fuel?.name}
                    </span>
                    <span className="flex items-center gap-1">
                        <FaCogs className="w-4 h-4" /> {car.type?.name}
                    </span>
                </div>
                <button className="mt-2 w-full bg-blue-700 text-white py-2.5 rounded hover:bg-blue-900 transition">
                    Voir détails
                </button>
            </div>
        </div>
    );
}
