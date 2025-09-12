import { Link, usePage } from "@inertiajs/react";
import { LuCar, LuPlus } from "react-icons/lu";
import { GoGear, GoPlus } from "react-icons/go";

export default function Nav() {
    const { auth } = usePage().props;

    return (
        <nav
            className="flex items-center gap-10 py-3"
            style={{ paddingInline: "max(10vw, 10px)" }}
        >
            <div className="flex items-center gap-2.5">
                <LuCar className="text-3xl text-blue-900" />
                <span className="text-xl font-medium bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                    AutoMarket
                </span>
            </div>
            <ul className="flex gap-5">
                <li>
                    <Link>Catalogue</Link>
                </li>

                <li>
                    <Link className="flex items-center gap-2">
                        <GoPlus className="inline mr-1" />
                        Vendez votre voiture
                    </Link>
                </li>

                <li>
                    <Link className="flex items-center gap-2">
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
                        <Link href={route("login")}>Connexion</Link>
                        <Link href={route("register")}>Inscription</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
