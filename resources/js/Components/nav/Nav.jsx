import { Link, router, usePage } from "@inertiajs/react";
import { LuCar } from "react-icons/lu";
import { GoGear, GoPlus } from "react-icons/go";
import { useEffect, useRef, useState } from "react";

export default function Nav() {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    // Fermer le dropdown si clic à l'extérieur
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav
            className="flex items-center justify-between gap-4 py-3 bg-white/50 backdrop-blur-sm shadow-md sticky top-0 z-50"
            style={{ paddingInline: "max(5vw, 1rem)" }}
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
            <ul className="hidden items-center md:flex gap-2.5 flex-1 justify-start">
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
            </ul>
            <div className="flex gap-2.5 flex-wrap justify-end">
                {auth.user ? (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 rounded-md transition"
                        >
                            <span className="font-medium text-gray-800">
                                {auth.user.first_name}
                            </span>
                            <div className="w-8 h-8">
                                <img
                                    src={
                                        auth.user.avatar?.path
                                            ? `/storage/${auth.user.avatar.path}`
                                            : "/storage/default/default-avatar.jpg"
                                    }
                                    alt=""
                                    className="rounded-full object-cover object-center"
                                />
                            </div>
                        </button>

                        {open && (
                            <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded shadow-lg z-50 flex flex-col">
                                <Link
                                    href={route("home")}
                                    className="flex md:hidden items-center w-full justify-end gap-2 px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300"
                                >
                                    Catalogue
                                </Link>

                                <Link
                                    href={route("cars.create")}
                                    className="flex md:hidden items-center w-full justify-end gap-2 px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300"
                                >
                                    <GoPlus />
                                    Vendez votre voiture
                                </Link>

                                {(auth.can.isAdmin || auth.can.isModo) && (
                                    <Link
                                        href={route("administration")}
                                        className="flex items-center w-full justify-end gap-2 px-4 py-2 text-gray-800 hover:bg-blue-700 hover:text-white transition-colors duration-300"
                                    >
                                        <GoGear />
                                        Administration
                                    </Link>
                                )}

                                <button
                                    onClick={() => router.post(route("logout"))}
                                    className="flex items-center w-full justify-end gap-2 px-4 py-2 text-gray-800 hover:bg-red-500 hover:text-white transition-colors duration-300"
                                >
                                    Se Déconnecter
                                </button>
                            </div>
                        )}
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
