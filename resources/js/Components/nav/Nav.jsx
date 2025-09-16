import { Link, router, usePage } from "@inertiajs/react";
import { LuCar } from "react-icons/lu";
import { GoGear, GoPlus } from "react-icons/go";

export default function Nav() {
    const { auth } = usePage().props;

    return (
        <nav
            className="flex flex-col items-center lg:flex-row justify-between gap-3 lg:gap-4 py-3 bg-white/50 backdrop-blur-sm shadow-md sticky top-0 z-50"
            style={{ paddingInline: "max(8vw, 1rem)" }}
        >
            <Link
                href={route("home")}
                className="flex items-center gap-2.5 flex-shrink-0"
            >
                <LuCar className="text-3xl text-blue-900" />
                <span className="text-xl font-medium bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                    AutoMarket
                </span>
            </Link>
            <ul className="flex flex-col items-center lg:flex-row gap-2.5 lg:gap-5 flex-1 justify-center md:justify-start">
                <li>
                    <Link
                        href={route("home")}
                        className="font-medium hover:text-blue-700 transition-colors duration-300"
                    >
                        Catalogue
                    </Link>
                </li>
                <li>
                    <Link
                        href={route("cars.create")}
                        className="flex items-center gap-2.5 font-medium hover:text-blue-700 transition-colors duration-300"
                    >
                        <GoPlus />
                        Vendez votre voiture
                    </Link>
                </li>
                {(auth.can.isAdmin || auth.can.isModo) && (
                    <li>
                        <Link className="flex items-center gap-2.5 font-medium hover:text-blue-700 transition-colors duration-300">
                            <GoGear />
                            Administration
                        </Link>
                    </li>
                )}
            </ul>
            <div className="flex gap-2.5 flex-wrap mt-2 md:mt-0">
                {auth.user ? (
                    <div>
                        <button
                            onClick={() => router.post(route("logout"))}
                            className="py-2 px-4 rounded-lg border border-gray-400 bg-white text-black hover:bg-blue-700 hover:text-white transition-all duration-300"
                        >
                            Se Déconnecter
                        </button>
                    </div>
                ) : (
                    <>
                        <Link
                            href={route("login")}
                            className="py-2 px-4 rounded-lg border border-gray-400 bg-white text-black transition-all duration-300 hover:text-white hover:bg-blue-700 hover:border-transparent"
                        >
                            Connexion
                        </Link>
                        <Link
                            href={route("register")}
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
