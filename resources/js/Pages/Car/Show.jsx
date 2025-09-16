import CarImageCarousel from "@/Components/carousel/carousel";
import FrontLayout from "@/Layouts/FrontLayout";
import { formatEuro, formatPercent } from "@/utils/format";
import { router } from "@inertiajs/react";
import { FaCalendarAlt, FaRoad, FaGasPump, FaCogs } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import { LuCalculator } from "react-icons/lu";

export default function CarShow({ car, financement, flash, auth }) {
    return (
        <section className="flex justify-center py-10 bg-gray-100">
            <div
                className="flex gap-5 flex-col md:flex-row"
                style={{ width: "min(1500px, 90vw)" }}
            >
                {/* Message de succès */}
                {flash?.success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-5">
                        {flash.success}
                    </div>
                )}

                {/* Information de la voiture */}
                <div className="flex flex-col gap-5 flex-grow">
                    <div className="hidden sm:block">
                        <CarImageCarousel
                            images={[
                                car.image1_path,
                                car.image2_path,
                                car.image3_path,
                                car.image4_path,
                            ]}
                        />
                    </div>
                    <div className="bg-white rounded-lg shadow-md px-7 py-5">
                        <div className="flex flex-col gap-5 border-b pb-5">
                            <div className="flex gap-2 items-start justify-between">
                                <div>
                                    <h1 className="font-semibold text-h4">
                                        {car.brand?.name} {car.model}
                                    </h1>
                                    <p className="text-blue-800 font-bold text-h3">
                                        {car.prix.toLocaleString()} €
                                    </p>
                                </div>
                                {(auth.can.isAdmin || auth.can.isModo) && (
                                    <button
                                        className="bg-red-600 hover:bg-red-700 text-white font-semibold text-sm-custom px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                                        onClick={() =>
                                            router.delete(
                                                route("cars.destroy", car.id)
                                            )
                                        }
                                    >
                                        Supprimer
                                    </button>
                                )}
                            </div>
                            <div className="flex justify-between gap-5 text-gray-600 font-medium text-m-custom flex-wrap">
                                <span className="flex items-center gap-2">
                                    <FaCalendarAlt className="w-4 h-4" />
                                    {car.annee}
                                </span>
                                <span className="flex items-center gap-2">
                                    <FaRoad className="w-4 h-4" />
                                    {car.kilometrage.toLocaleString()} km
                                </span>
                                <span className="flex items-center gap-2">
                                    <FaGasPump className="w-4 h-4" />
                                    {car.fuel?.name}
                                </span>
                                <span className="flex items-center gap-2">
                                    <FaCogs className="w-4 h-4" />{" "}
                                    {car.type?.name}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 border-b py-5">
                            <h2 className="font-semibold text-h5">
                                Description
                            </h2>
                            <p className="text-sm-custom">{car.description}</p>
                        </div>
                        <div className="flex flex-col gap-5 py-5">
                            <h2 className="font-semibold text-h5">
                                Caractéristique
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                                <div className="flex justify-between">
                                    <span className="font-medium">État :</span>
                                    <span>{car.etat}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Année :</span>
                                    <span>{car.annee}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Kilométrage :
                                    </span>
                                    <span>
                                        {car.kilometrage.toLocaleString()} km
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">ABS :</span>
                                    <span>{car.abs ? "Oui" : "Non"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Prix :</span>
                                    <span>{car.prix.toLocaleString()} €</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Marque :
                                    </span>
                                    <span>{car.brand?.name || "-"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Carburant :
                                    </span>
                                    <span>{car.fuel?.name || "-"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Type :</span>
                                    <span>{car.type?.name || "-"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Jantes :
                                    </span>
                                    <span>{car.jante?.size || "-"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Sellerie :
                                    </span>
                                    <span>{car.sellerie?.type || "-"}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">
                                        Couleur :
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-6 h-6 rounded"
                                            style={{
                                                backgroundColor:
                                                    car.color?.hex || "#ffffff",
                                            }}
                                        ></div>
                                        <span>{car.color?.name}</span>
                                    </div>
                                </div>
                                {car.cylindree?.size !== "NONE" && (
                                    <div className="flex justify-between">
                                        <span className="font-medium">
                                            Cylindrée :
                                        </span>
                                        <span>
                                            {car.cylindree?.size || "-"}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Paiement et Contact */}
                <div className="lg:min-w-[28rem] flex flex-col gap-5">
                    <div className="flex flex-col gap-2.5 text-m-custom bg-white rounded-lg p-5">
                        <h3 className="font-bold text-h6">Vendeur</h3>
                        <p className="font-medium text-m-custom">
                            {car.user.first_name} {car.user.last_name}
                        </p>
                        <button className="flex items-center justify-center gap-2 bg-blue-700 text-white py-2 px-5 rounded hover:bg-blue-900 transition">
                            <GoMail /> Contacter le vendeur
                        </button>
                        <small className="text-xs-custom text-gray-500">
                            Connectez-vous pour contacter le vendeur
                        </small>
                    </div>
                    <div className="flex flex-col gap-5 text-m-custom bg-white rounded-lg p-5">
                        <h3 className="font-bold text-h6 flex items-center gap-2">
                            <LuCalculator />
                            Simulation de financement
                        </h3>
                        <div className="flex justify-between gap-5 flex-col lg:flex-row">
                            <div className="bg-gray-200 rounded-lg flex-1 px-5 py-3">
                                <h4 className="text-sm-custom text-gray-700">
                                    Prix du véhicule
                                </h4>
                                <p className="font-bold">
                                    {formatEuro(financement.prix)}
                                </p>
                            </div>
                            <div className="bg-gray-200 rounded-lg flex-1 px-5 py-3">
                                <h4 className="text-sm-custom text-gray-700">
                                    TAEG
                                </h4>
                                <p className="font-bold">
                                    {formatPercent(financement.taeg)}
                                </p>
                            </div>
                        </div>
                        <div className="bg-blue-50 border border-blue-500 flex gap-5 justify-between items-center rounded-lg flex-1 px-5 py-3">
                            <h4 className="flex items-center gap-2">
                                <span className="text-blue-700 font-medium text-l-custom">
                                    €
                                </span>
                                Mensualité
                            </h4>
                            <p className="text-blue-700 font-medium text-l-custom">
                                {formatEuro(financement.mensualite)}
                            </p>
                        </div>
                        <small className="text-xs-custom text-gray-500">
                            Simulation indicative sur {financement.duree} mois
                            avec {formatEuro(financement.apport)} d'apport
                            initial
                        </small>
                    </div>
                </div>
            </div>
        </section>
    );
}

CarShow.layout = (page) => <FrontLayout>{page}</FrontLayout>;
