import Card from "@/Components/carCard/card";
import FrontLayout from "@/Layouts/FrontLayout";
import React, { useEffect, useState } from "react";

export default function Home({ brands, fuels, cars }) {
    const [filteredCars, setFilteredCars] = useState(cars);
    const [brandFilter, setBrandFilter] = useState("all");
    const [fuelFilter, setFuelFilter] = useState("all");
    const [searchFilter, setSearchFilter] = useState("");

    useEffect(() => {
        let filtered = cars;

        // filtre par marque
        if (brandFilter !== "all") {
            filtered = filtered.filter((car) => car.brand.name === brandFilter);
        }

        // filtre par carburant
        if (fuelFilter !== "all") {
            filtered = filtered.filter((car) => car.fuel.name === fuelFilter);
        }

        // filtre par marque, model, type, annee ou fuel
        if (searchFilter !== "") {
            const filterLower = searchFilter.toLowerCase().trim();
            filtered = filtered.filter(
                (car) =>
                    car.model.toLowerCase().includes(filterLower) ||
                    car.brand?.name.toLowerCase().includes(filterLower) ||
                    car.fuel?.name.toLowerCase().includes(filterLower) ||
                    car.type?.name.toLowerCase().includes(filterLower) ||
                    car.annee.toLowerCase().includes(filterLower)
            );
        }

        setFilteredCars(filtered);
    }, [brandFilter, fuelFilter, searchFilter, cars]);

    return (
        <>
            <section
                className="flex py-20 justify-center items-center text-white bg-blue-700"
                // Au click de la section la search bar est focus
                onClick={() => document.getElementById("search").focus()}
                style={{ paddingInline: "max(5vw, 1rem)" }}
            >
                <div className="flex flex-col text-center items-center gap-2.5">
                    <h1 className="text-h1 font-bold">
                        Trouvez votre véhicule idéal
                    </h1>
                    <p className="text-l-custom font-medium">
                        Des millers d'annonces vérifiées à votre disposition
                    </p>
                    <input
                        className="w-full px-6 py-3 mt-2.5 rounded-lg border border-gray-300 text-black focus:ring-gray-700 focus:shadow-xl"
                        type="search"
                        placeholder="Rechercher par marque, modèle..."
                        name="search"
                        id="search"
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                    />
                </div>
            </section>
            <section
                className="relative flex flex-col sm:flex-col md:flex-row justify-center items-start py-5 gap-5 bg-gray-100"
                style={{ paddingInline: "max(5vw, 1rem)" }}
            >
                <div className="md:sticky top-20 flex flex-col gap-5 bg-white rounded-lg px-5 py-6 w-full md:w-[20rem]">
                    <h2 className="text-h4 font-medium">Filtres</h2>
                    <div className="flex flex-col gap-2.5">
                        <label htmlFor="brand">Marque</label>
                        <select
                            name="brand"
                            id="brand"
                            className="rounded-md bg-gray-50"
                            onChange={(e) => setBrandFilter(e.target.value)}
                        >
                            <option value="all">Toutes les marques</option>
                            {brands.map((el) => (
                                <option key={el.id} value={el.name}>
                                    {el.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <label htmlFor="carburant">Carburant</label>

                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="carburant"
                                value="all"
                                checked={fuelFilter === "all"}
                                onChange={(e) => setFuelFilter(e.target.value)}
                            />
                            <span>Tous</span>
                        </label>
                        {fuels.map((fuel) => (
                            <label
                                key={fuel.id}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="radio"
                                    name="carburant"
                                    value={fuel.name}
                                    checked={fuelFilter === fuel.name}
                                    onChange={(e) =>
                                        setFuelFilter(e.target.value)
                                    }
                                />
                                <span>{fuel.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2.5 flex-grow w-full">
                    <h3 className="text-h5 font-medium">
                        {filteredCars.length} véhicules disponible
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredCars.map((el) => (
                            <Card key={el.id} car={el} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

Home.layout = (page) => <FrontLayout>{page}</FrontLayout>;
