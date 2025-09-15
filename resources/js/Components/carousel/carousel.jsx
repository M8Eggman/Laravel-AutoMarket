import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function CarImageCarousel({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carImages = images.filter((i) => i);
    const intervalRef = useRef(null);

    const startAutoSlide = () => {
        stopAutoSlide();
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === carImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);
    };

    const stopAutoSlide = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    useEffect(() => {
        startAutoSlide();
        return () => stopAutoSlide();
    }, [carImages.length]);

    const handleUserAction = (action) => {
        action();
        startAutoSlide();
    };

    const nextImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === carImages.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? carImages.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative h-[35rem] rounded-lg overflow-hidden">
            <div
                className="flex h-full transition-transform duration-700 ease-in-out"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                }}
            >
                {carImages.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt=""
                        className="w-full h-full object-cover object-center flex-shrink-0"
                    />
                ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>

            <button
                onClick={() => handleUserAction(prevImage)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300"
            >
                <FaChevronLeft className="w-5 h-5" />
            </button>
            <button
                onClick={() => handleUserAction(nextImage)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300"
            >
                <FaChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {carImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleUserAction(() => goToSlide(index))}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentIndex
                                ? "bg-white scale-110"
                                : "bg-white/50 hover:bg-white/75"
                        }`}
                    />
                ))}
            </div>

            <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {carImages.length}
            </div>
        </div>
    );
}
