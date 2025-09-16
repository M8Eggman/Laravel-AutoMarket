import BackLayout from "@/Layouts/BackLayout";
import { formatEuro, formatNumber } from "@/utils/format";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import {
    FaUsers,
    FaCar,
    FaCheckCircle,
    FaChartLine,
    FaTrademark,
} from "react-icons/fa";

export default function Administration({ auth, users, cars, brands, roles }) {
    // Variable choix de la sous page
    const [sousPage, setSousPage] = useState(
        auth?.can.isAdmin ? "utilisateur" : "voiture"
    );

    // Variable local de users et cars pour un effet instantané de suppression
    const [localCars, setLocalCars] = useState(cars);
    const [localUsers, setLocalUsers] = useState(users);

    function handleCarDelete(id) {
        setLocalCars((c) => c.filter((car) => car.id !== id));
        router.delete(route("cars.destroy", id));
    }

    function handleUserDelete(id) {
        setLocalUsers((u) => u.filter((user) => user.id !== id));
        router.delete(route("users.destroy", id));
    }

    return (
        <section className="relative flex flex-col justify-center items-center py-5 gap-5 bg-gray-100 min-h-screen">
            <div
                className="flex flex-col gap-5"
                style={{ width: "min(1400px, 90vw)" }}
            >
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center text-m-custom font-medium gap-2"
                >
                    <FaArrowLeft />
                    Retour
                </button>

                {/* Titre et sous-titres */}
                <div>
                    <h1 className="text-2xl font-bold">
                        Tableau de bord administrateur
                    </h1>
                    <p className="text-gray-600">
                        Gérez les utilisateurs et les marques de véhicules
                    </p>
                </div>

                {/* Statistiques */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-white rounded shadow relative">
                        <FaUsers
                            className="absolute top-4 right-4 text-black"
                            size={20}
                        />
                        <p className="text-m-custom text-gray-500">
                            Utilisateurs
                        </p>
                        <p className="text-xl-custom font-bold">
                            {localUsers.length}
                        </p>
                        <p className="text-sm-custom text-gray-500">
                            Total des inscrits
                        </p>
                    </div>

                    <div className="p-4 bg-white rounded shadow relative">
                        <FaCar
                            className="absolute top-4 right-4 text-black"
                            size={20}
                        />
                        <p className="text-m-custom text-gray-500">Véhicules</p>
                        <p className="text-xl-custom font-bold">
                            {localCars.length}
                        </p>
                        <p className="text-sm-custom text-gray-500">
                            Total des annonces
                        </p>
                    </div>

                    <div className="p-4 bg-white rounded shadow relative">
                        <FaCheckCircle
                            className="absolute top-4 right-4 text-black"
                            size={20}
                        />
                        <p className="text-m-custom text-gray-500">Actives</p>
                        <p className="text-xl-custom font-bold">
                            {localCars.length}
                        </p>
                        <p className="text-sm-custom text-gray-500">
                            Annonces en ligne
                        </p>
                    </div>

                    <div className="p-4 bg-white rounded shadow relative">
                        <FaChartLine
                            className="absolute top-4 right-4 text-black"
                            size={20}
                        />
                        <p className="text-m-custom text-gray-500">
                            Croissance
                        </p>
                        <p className="text-xl-custom font-bold">+12%</p>
                        <p className="text-sm-custom text-gray-500">Ce mois</p>
                    </div>
                </div>

                {/* Navigation sous-page */}
                <div className="flex me-auto flex-wrap justify-center gap-2 bg-gray-300 rounded-md p-1">
                    {auth.can.isAdmin && (
                        <button
                            onClick={() => setSousPage("utilisateur")}
                            className={`flex items-center gap-1 px-2 py-1 text-sm-custom rounded ${
                                sousPage === "utilisateur" ? "bg-white" : ""
                            }`}
                        >
                            <FaUsers /> Utilisateurs
                        </button>
                    )}

                    <button
                        onClick={() => setSousPage("voiture")}
                        className={`flex items-center gap-1 px-2 py-1 text-sm-custom rounded ${
                            sousPage === "voiture" ? "bg-white" : ""
                        }`}
                    >
                        <FaCar /> Voitures
                    </button>

                    <button
                        onClick={() => setSousPage("marque")}
                        className={`flex items-center gap-1 px-2 py-1 text-sm-custom rounded ${
                            sousPage === "marque" ? "bg-white" : ""
                        }`}
                    >
                        <FaTrademark /> Marques
                    </button>
                </div>

                <div className="flex flex-col gap-4 mt-4 bg-white rounded-md p-4">
                    {sousPage === "utilisateur" && (
                        <>
                            <div className="flex gap-4 sm:gap-2 flex-col sm:flex-row sm:items-center justify-between">
                                <h2 className="text-h4 font-medium">
                                    Gestion des utilisateurs
                                </h2>
                                <input
                                    className="rounded-md w-full sm:w-60"
                                    type="search"
                                    name=""
                                    id=""
                                    placeholder="Rechercher un utilisateur ..."
                                />
                            </div>
                            {localUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex flex-col gap-4 sm:flex-row justify-between items-center p-4 bg-white rounded shadow"
                                >
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full overflow-hidden">
                                            <img
                                                src={
                                                    user.avatar?.path
                                                        ? user.avatar.path
                                                        : "/storage/default/default-avatar.jpg"
                                                }
                                                alt=""
                                                className="w-full h-full object-cover object-center"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium">
                                                {user.first_name}{" "}
                                                {user.last_name}
                                            </p>
                                            <p className="text-gray-500">
                                                {user.email}
                                            </p>
                                            <p className="text-gray-400">
                                                {user.cars?.length || 0}{" "}
                                                véhicule(s)
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        {user.id !==
                                            users.find(
                                                (u) => u.role !== "admin"
                                            ).id && (
                                            <>
                                                <select
                                                    className="border rounded ps-2 py-1"
                                                    value={user.role_id}
                                                >
                                                    {roles.map((r) => (
                                                        <option
                                                            key={r.id}
                                                            value={r.id}
                                                        >
                                                            {r.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <button
                                                    className="flex items-center gap-1 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition"
                                                    onClick={() =>
                                                        handleUserDelete(
                                                            user.id
                                                        )
                                                    }
                                                >
                                                    <FaTrash />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {/* Voitures */}
                    {sousPage === "voiture" && (
                        <>
                            <div className="flex gap-4 sm:gap-2 flex-col sm:flex-row sm:items-center justify-between">
                                <h2 className="text-h4 font-medium">
                                    Gestion des véhicules
                                </h2>
                                <div className="flex gap-2">
                                    <input
                                        className="rounded-md w-full sm:w-60"
                                        type="search"
                                        placeholder="Rechercher une voiture ..."
                                    />
                                    <Link
                                        className="text-white text-m-custom bg-blue-700 hover:bg-blue-900 px-5 py-2 rounded-md transition"
                                        href={route("cars.create")}
                                    >
                                        + Créer une voiture
                                    </Link>
                                </div>
                            </div>
                            {localCars.map((car) => (
                                <div
                                    key={car.id}
                                    className="flex justify-between items-center p-4 bg-white rounded shadow"
                                >
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full overflow-hidden">
                                            <img
                                                src={car.image1_path}
                                                alt=""
                                                className="w-full h-full object-cover object-center"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium">
                                                {car.model} ({car.annee})
                                            </p>
                                            <p className="text-gray-500">
                                                {car.brand?.name}
                                            </p>
                                            <p className="text-gray-400">
                                                {formatNumber(car.kilometrage)}{" "}
                                                km
                                            </p>
                                            <p className="text-gray-400">
                                                {formatEuro(car.prix)} €
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        className="flex items-center gap-1 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition"
                                        onClick={() => handleCarDelete(car.id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </>
                    )}

                    {/* Marques */}
                    {sousPage === "marque" && (
                        <>
                            <div className="flex gap-4 sm:gap-2 flex-col sm:flex-row sm:items-center justify-between">
                                <h2 className="text-h4 font-medium">
                                    Gestion des marques
                                </h2>
                                <div className="flex gap-2">
                                    <input
                                        className="rounded-md w-full sm:w-60"
                                        type="search"
                                        placeholder="Rechercher une marque ..."
                                    />
                                    <Link
                                        className="text-white text-m-custom bg-blue-700 hover:bg-blue-900 px-5 py-2 rounded-md transition"
                                        href={route("brands.create")}
                                    >
                                        + Créer une marque
                                    </Link>
                                </div>
                            </div>
                            {brands.map((brand) => (
                                <div
                                    key={brand.id}
                                    className="flex justify-between items-center p-4 bg-white rounded shadow"
                                >
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full overflow-hidden">
                                            <img
                                                src={brand.logo}
                                                alt=""
                                                className="w-full h-full object-cover object-center"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium">
                                                {brand.name}
                                            </p>
                                            <p className="text-gray-500">
                                                {brand.cars?.length} véhicule(s)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

Administration.layout = (page) => <BackLayout>{page}</BackLayout>;
