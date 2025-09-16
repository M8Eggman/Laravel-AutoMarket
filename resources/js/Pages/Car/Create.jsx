import FrontLayout from "@/Layouts/FrontLayout";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function CarCreate({
    brands,
    fuels,
    jantes,
    selleries,
    colors,
    types,
    cylindrees,
}) {
    const { data, setData, post, errors } = useForm({
        model: "",
        etat: "",
        annee: "",
        kilometrage: "",
        abs: false,
        prix: 0,
        description: "",
        image1_path: "",
        image2_path: null,
        image3_path: null,
        image4_path: null,
        brand_id: null,
        fuel_id: null,
        jante_id: null,
        sellerie_id: null,
        color_id: null,
        type_id: null,
        cylindree_id: null,
    });

    useEffect(() => {
        if (fuels.find((f) => f.id === data.fuel_id) === "Electrique") {
            setData(
                "cylindree_id",
                cylindrees.find((c) => c.size === "NONE")?.id ?? null
            );
        } else {
            setData("cylindree_id", "");
        }
    }, [data.fuel_id]);

    useEffect(() => {
        if (data.etat === "Neuf") {
            setData("kilometrage", 0);
        }
    }, [data.etat]);

    function handleSubmit(e) {
        e.preventDefault();
        post(route("cars.store"));
    }

    return (
        <section className="relative flex flex-col justify-center items-center py-5 gap-5 bg-gray-100">
            <div
                className="flex flex-col gap-2.5"
                style={{ width: "min(900px, 90vw)" }}
            >
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center text-m-custom font-medium gap-2"
                >
                    <FaArrowLeft />
                    Retour
                </button>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white flex flex-col gap-4 rounded-lg p-5"
                >
                    <h1 className="text-h4 font-medium">
                        Vendez votre voiture
                    </h1>

                    {/* Model */}
                    <div className="flex flex-col">
                        <label htmlFor="model" className="font-medium mb-1">
                            Modèle <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="model"
                            value={data.model}
                            onChange={(e) => setData("model", e.target.value)}
                            className={`border rounded-md px-3 py-2 ${
                                errors.model ? "border-red-500" : ""
                            }`}
                        />
                        {errors.model && (
                            <small className="text-red-600">
                                {errors.model}
                            </small>
                        )}
                    </div>

                    {/* Etat */}
                    <div className="flex flex-col">
                        <label htmlFor="etat" className="font-medium mb-1">
                            État <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="etat"
                            value={data.etat}
                            onChange={(e) => setData("etat", e.target.value)}
                            className="border rounded-md px-3 py-2"
                        >
                            <option value="">
                                Choisissez un état de la voiture
                            </option>
                            <option value="Neuf">Neuf</option>
                            <option value="Occasion">Occasion</option>
                        </select>
                        {errors.etat && (
                            <small className="text-red-600">
                                {errors.etat}
                            </small>
                        )}
                    </div>

                    {/* Année */}
                    <div className="flex flex-col">
                        <label htmlFor="annee" className="font-medium mb-1">
                            Année <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            id="annee"
                            value={data.annee}
                            onChange={(e) => setData("annee", e.target.value)}
                            className="border rounded-md px-3 py-2"
                        />
                    </div>

                    {/* Kilométrage */}
                    {data.etat !== "Neuf" && (
                        <div className="flex flex-col">
                            <label
                                htmlFor="kilometrage"
                                className="font-medium mb-1"
                            >
                                Kilométrage{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="kilometrage"
                                value={data.kilometrage}
                                onChange={(e) =>
                                    setData("kilometrage", e.target.value)
                                }
                                className="border rounded-md px-3 py-2"
                            />
                        </div>
                    )}

                    {/* ABS */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="abs"
                            checked={data.abs}
                            onChange={(e) => setData("abs", e.target.checked)}
                        />
                        <label htmlFor="abs">ABS</label>
                    </div>

                    {/* Prix */}
                    <div className="flex flex-col">
                        <label htmlFor="prix" className="font-medium mb-1">
                            Prix (€) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            id="prix"
                            value={data.prix}
                            onChange={(e) => setData("prix", e.target.value)}
                            className="border rounded-md px-3 py-2"
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="description"
                            className="font-medium mb-1"
                        >
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="description"
                            rows="4"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="border rounded-md px-3 py-2"
                        />
                    </div>

                    {/* Images */}
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex flex-col">
                            <label
                                htmlFor={`image${i}_path`}
                                className="font-medium mb-1"
                            >
                                Image {i}{" "}
                                {i === 1 && (
                                    <span className="text-red-500">*</span>
                                )}
                            </label>
                            <input
                                type="file"
                                id={`image${i}_path`}
                                onChange={(e) =>
                                    setData(`image${i}_path`, e.target.files[0])
                                }
                                className="border rounded-md px-3 py-2"
                            />
                        </div>
                    ))}

                    {/* Foreign keys */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Marque */}
                        <div className="flex flex-col">
                            <label
                                htmlFor="brand_id"
                                className="font-medium mb-1"
                            >
                                Marque <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="brand_id"
                                value={data.brand_id || ""}
                                onChange={(e) =>
                                    setData("brand_id", e.target.value)
                                }
                                className="border rounded-md px-3 py-2"
                            >
                                <option value="">Choisir une marque</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                            {errors.brand_id && (
                                <small className="text-red-600">
                                    {errors.brand_id}
                                </small>
                            )}
                        </div>

                        {/* Carburant */}
                        <div className="flex flex-col">
                            <label
                                htmlFor="fuel_id"
                                className="font-medium mb-1"
                            >
                                Carburant{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="fuel_id"
                                value={data.fuel_id || ""}
                                onChange={(e) =>
                                    setData("fuel_id", e.target.value)
                                }
                                className="border rounded-md px-3 py-2"
                            >
                                <option value="">Choisir un carburant</option>
                                {fuels.map((fuel) => (
                                    <option key={fuel.id} value={fuel.id}>
                                        {fuel.name}
                                    </option>
                                ))}
                            </select>
                            {errors.fuel_id && (
                                <small className="text-red-600">
                                    {errors.fuel_id}
                                </small>
                            )}
                        </div>

                        {/* Jantes */}
                        <div className="flex flex-col">
                            <label
                                htmlFor="jante_id"
                                className="font-medium mb-1"
                            >
                                Jantes <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="jante_id"
                                value={data.jante_id || ""}
                                onChange={(e) =>
                                    setData("jante_id", e.target.value)
                                }
                                className="border rounded-md px-3 py-2"
                            >
                                <option value="">Choisir des jantes</option>
                                {jantes.map((jante) => (
                                    <option key={jante.id} value={jante.id}>
                                        {jante.size}
                                    </option>
                                ))}
                            </select>
                            {errors.jante_id && (
                                <small className="text-red-600">
                                    {errors.jante_id}
                                </small>
                            )}
                        </div>

                        {/* Sellerie */}
                        <div className="flex flex-col">
                            <label
                                htmlFor="sellerie_id"
                                className="font-medium mb-1"
                            >
                                Sellerie <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="sellerie_id"
                                value={data.sellerie_id || ""}
                                onChange={(e) =>
                                    setData("sellerie_id", e.target.value)
                                }
                                className="border rounded-md px-3 py-2"
                            >
                                <option value="">Choisir une sellerie</option>
                                {selleries.map((sellerie) => (
                                    <option
                                        key={sellerie.id}
                                        value={sellerie.id}
                                    >
                                        {sellerie.type}
                                    </option>
                                ))}
                            </select>
                            {errors.sellerie_id && (
                                <small className="text-red-600">
                                    {errors.sellerie_id}
                                </small>
                            )}
                        </div>

                        {/* Couleur */}
                        <div className="flex flex-col">
                            <label
                                htmlFor="color_id"
                                className="font-medium mb-1"
                            >
                                Couleur <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="color_id"
                                value={data.color_id || ""}
                                onChange={(e) =>
                                    setData("color_id", e.target.value)
                                }
                                className="border rounded-md px-3 py-2"
                            >
                                <option value="">Choisir une couleur</option>
                                {colors.map((color) => (
                                    <option key={color.id} value={color.id}>
                                        {color.name}
                                    </option>
                                ))}
                            </select>
                            {errors.color_id && (
                                <small className="text-red-600">
                                    {errors.color_id}
                                </small>
                            )}
                        </div>

                        {/* Type */}
                        <div className="flex flex-col">
                            <label
                                htmlFor="type_id"
                                className="font-medium mb-1"
                            >
                                Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="type_id"
                                value={data.type_id || ""}
                                onChange={(e) =>
                                    setData("type_id", e.target.value)
                                }
                                className="border rounded-md px-3 py-2"
                            >
                                <option value="">Choisir un type</option>
                                {types.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                            {errors.type_id && (
                                <small className="text-red-600">
                                    {errors.type_id}
                                </small>
                            )}
                        </div>

                        {/* Cylindrée */}
                        {data.fuel_id != 3 && (
                            <div className="flex flex-col">
                                <label
                                    htmlFor="cylindree_id"
                                    className="font-medium mb-1"
                                >
                                    Cylindrée{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="cylindree_id"
                                    value={data.cylindree_id || ""}
                                    onChange={(e) =>
                                        setData("cylindree_id", e.target.value)
                                    }
                                    className="border rounded-md px-3 py-2"
                                >
                                    <option value="">
                                        Choisir une cylindrée
                                    </option>
                                    {cylindrees.map((cylindree) => (
                                        <option
                                            key={cylindree.id}
                                            value={cylindree.id}
                                        >
                                            {cylindree.size}
                                        </option>
                                    ))}
                                </select>
                                {errors.cylindree_id && (
                                    <small className="text-red-600">
                                        {errors.cylindree_id}
                                    </small>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Bouton */}
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Publier l'annonce
                    </button>

                    <p className="text-gray-700 text-sm sm:text-base mt-4">
                        Tous les champs accompagnés de{" "}
                        <span className="text-red-500 font-semibold">*</span>{" "}
                        sont obligatoires.
                    </p>
                </form>
            </div>
        </section>
    );
}

CarCreate.layout = (page) => <FrontLayout>{page}</FrontLayout>;
