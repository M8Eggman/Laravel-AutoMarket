import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function BtnRemonter() {
    const [isVisible, setIsVisible] = useState(false);

    // Affiche le bouton apres avoir scrollé 200px
    useEffect(() => {
        function toggleVisibility() {
            window.scrollY > 200 ? setIsVisible(true) : setIsVisible(false);
        }

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <>
            <button
                className={`fixed bottom-6 right-6 flex items-center justify-center w-12 h-12 rounded-full bg-blue-700 hover:bg-blue-900 text-white shadow-lg transition duration-300 ${
                    isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
                <FaArrowUp className="text-lg" />
            </button>
        </>
    );
}
