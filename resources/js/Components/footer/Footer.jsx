import { Link } from "@inertiajs/react";
import { LuCar } from "react-icons/lu";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-blue-900 text-white">
            <div
                className="py-10 grid gap-10 items-center md:items-start"
                style={{ paddingInline: "max(6vw, 1rem)" }}
            >
                <div className="grid md:grid-cols-[1fr_3fr] gap-10">
                    <Link
                        href={route("home")}
                        className="flex items-center gap-2.5 flex-shrink-0"
                    >
                        <div className="flex items-center gap-2.5">
                            <LuCar className="text-3xl text-white" />
                            <span className="text-xl font-medium">
                                AutoMarket
                            </span>
                        </div>
                    </Link>
                    <div className="flex flex-col md:items-end gap-3">
                        <span className="font-medium mb-2 md:mb-0">
                            Abonnez-vous à la newsletter
                        </span>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <input
                                type="email"
                                placeholder="Votre email"
                                className="p-2 sm:px-4 sm:py-2  rounded-l-lg border border-gray-300 text-black flex-1 min-w-0 sm:w-80"
                            />
                            <button className="p-2 sm:px-4 sm:py-2 bg-white text-blue-900 rounded-r-lg font-medium hover:bg-gray-200 transition-colors duration-300">
                                S’abonner
                            </button>
                        </div>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 items-center gap-10">
                    <ul className="flex flex-col md:flex-row gap-5">
                        <li>
                            <Link className="hover:underline">Catalogue</Link>
                        </li>
                        <li>
                            <Link className="hover:underline">
                                Vendez votre voiture
                            </Link>
                        </li>
                    </ul>
                    <div className="flex gap-5 text-2xl justify-start md:justify-end">
                        <Link href="https://github.com" target="_blank">
                            <FaGithub className="hover:text-gray-300 transition-colors duration-300" />
                        </Link>
                        <Link href="https://twitter.com" target="_blank">
                            <FaTwitter className="hover:text-gray-300 transition-colors duration-300" />
                        </Link>
                        <Link href="https://linkedin.com" target="_blank">
                            <FaLinkedin className="hover:text-gray-300 transition-colors duration-300" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="text-center text-gray-300 text-sm p-5 border-t">
                &copy; {new Date().getFullYear()} AutoMarket. Tous droits
                réservés.
            </div>
        </footer>
    );
}
