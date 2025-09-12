import { Link, usePage } from "@inertiajs/react";
import { LuCar, LuPlus } from "react-icons/lu";
import { GoGear, GoPlus } from "react-icons/go";

export default function Nav() {
    const { auth } = usePage().props;

    return (
        <nav
            className="flex items-center gap-10 py-3 bg-white shadow-md sticky top-0"
            style={{ paddingInline: "max(10vw, 2rem)" }}
        >
            <Link href={route("home")}>
                <div className="flex items-center gap-2.5">
                    <LuCar className="text-3xl text-blue-900" />
                    <span className="text-xl font-medium bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                        AutoMarket
                    </span>
                </div>
            </Link>
            <ul className="flex gap-5">
                <li>
                    <Link className="font-medium">Catalogue</Link>
                </li>

                <li>
                    <Link className="flex items-center gap-2 font-medium">
                        <GoPlus className="inline mr-1" />
                        Vendez votre voiture
                    </Link>
                </li>

                <li>
                    <Link className="flex items-center gap-2 font-medium">
                        <GoGear className="inline mr-1" />
                        Administration
                    </Link>
                </li>
            </ul>
            <div className="flex gap-2.5 ms-auto">
                {auth.user ? (
                    <button>Se Déconnecter</button>
                ) : (
                    <>
                        <Link
                            href={route("register")}
                            className="py-2 px-4 rounded-lg border border-gray-400 bg-white text-black transition-all duration-300 hover:text-white hover:bg-blue-700 hover:border-transparent"
                        >
                            Connexion
                        </Link>
                        <Link
                            href={route("login")}
                            className="py-2 px-4 rounded-lg bg-blue-700 text-white transition-all duration-300 hover:bg-blue-900"
                        >
                            Inscription
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
