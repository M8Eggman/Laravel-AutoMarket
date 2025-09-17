import { formatEuro, formatNumber } from "@/utils/format";
import { Link, router, usePage } from "@inertiajs/react";
import React from "react";
import { FaCalendarAlt, FaRoad, FaGasPump, FaCogs } from "react-icons/fa";

export default function Card({ car, deleteCar }) {
    const { auth } = usePage().props;

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative">
                <img
                    src={car.image1_path}
                    alt={car.model}
                    className="w-full aspect-video object-cover"
                />
                <span className="bg-gray-200 text-gray-800 text-sm-custom font-medium px-3 py-1 rounded-full absolute top-3 left-3">
                    {car.brand?.name}
                </span>
                {(auth.can.isAdmin || auth.can.isModo) && (
                    <button
                        className="absolute top-3 right-3 bg-red-600/75 hover:bg-red-700 text-white font-semibold text-sm-custom px-4 py-2  rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                        onClick={() => deleteCar(car.id)}
                    >
                        Supprimer
                    </button>
                )}
            </div>
            <div className="p-4 flex flex-col gap-2">
                <h4 className="font-semibold text-h6">
                    {car.brand?.name} {car.model}
                </h4>
                <p className="text-blue-800 font-bold text-h5">
                    {formatEuro(car.prix)}
                </p>
                <div className="grid grid-cols-2 gap-x-1 gap-y-2 text-gray-600 text-sm-custom">
                    <span className="flex items-center gap-1">
                        <FaCalendarAlt className="w-4 h-4" /> {car.annee}
                    </span>
                    <span className="flex items-center gap-1">
                        <FaRoad className="w-4 h-4" />{" "}
                        {formatNumber(car.kilometrage)} km
                    </span>
                    <span className="flex items-center gap-1">
                        <FaGasPump className="w-4 h-4" /> {car.fuel?.name}
                    </span>
                    <span className="flex items-center gap-1">
                        <FaCogs className="w-4 h-4" /> {car.type?.name}
                    </span>
                </div>
                <Link
                    href={route("cars.show", car.id)}
                    className="mt-2 w-full bg-blue-700 text-white text-center text-m-custom py-2 px-5 rounded hover:bg-blue-900 transition"
                >
                    Voir détails
                </Link>
            </div>
        </div>
    );
}
