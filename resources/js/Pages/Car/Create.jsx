import FrontLayout from "@/Layouts/FrontLayout";
import { useForm } from "@inertiajs/react";
import { FaArrowLeft } from "react-icons/fa";

export default function CarCreate() {
    const { data, setData } = useForm({});

    return (
        <section className="relative flex flex-col justify-center items-center py-5 gap-5 bg-gray-100">
            <div style={{ width: "min(1500px, 90vw)" }}>
                <button>
                    <FaArrowLeft />
                </button>
                <form
                    action=""
                    className="bg-white flex flex-col gap-2.5 rounded-lg p-5"
                >
                    <h1 className="text-h4 font-medium">
                        Vendez votre voiture
                    </h1>
                    <div>
                        <label htmlFor="">
                            Modèle <span className="text-red-500">*</span>
                        </label>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base mb-4">
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
