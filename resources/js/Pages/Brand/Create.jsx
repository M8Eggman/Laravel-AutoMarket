import BackLayout from "@/Layouts/BackLayout";
import { useForm } from "@inertiajs/react";
import { FaArrowLeft } from "react-icons/fa";

export default function BrandCreate() {
    const { data, setData, post, errors } = useForm({
        name: "",
        logo: null,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("brands.store"));
    }

    return (
        <section className="relative flex flex-col items-center py-5 gap-5 bg-gray-100 min-h-screen">
            <div
                className="flex flex-col gap-2.5"
                style={{ width: "min(600px, 90vw)" }}
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
                    <h1 className="text-h4 font-medium">Créer une marque</h1>

                    {/* Nom de la marque */}
                    <div className="flex flex-col">
                        <label htmlFor="name" className="font-medium mb-1">
                            Nom <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Ex : Renault"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className={`border rounded-md px-3 py-2 ${
                                errors.name ? "border-red-500" : ""
                            }`}
                        />
                        {errors.name && (
                            <small className="text-red-600">
                                {errors.name}
                            </small>
                        )}
                    </div>

                    {/* Logo */}
                    <div className="flex flex-col">
                        <label htmlFor="logo" className="font-medium mb-1">
                            Logo <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="file"
                            id="logo"
                            onChange={(e) => setData("logo", e.target.files[0])}
                            className={`border rounded-md px-3 py-2 ${
                                errors.logo ? "border-red-500" : ""
                            }`}
                        />
                        {errors.logo && (
                            <small className="text-red-600">
                                {errors.logo}
                            </small>
                        )}
                    </div>

                    {/* Bouton */}
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Enregistrer la marque
                    </button>
                </form>
            </div>
        </section>
    );
}

BrandCreate.layout = (page) => <BackLayout>{page}</BackLayout>;
