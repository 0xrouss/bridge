import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { astarZkyoto, polygonZkEvmCardona, sepolia } from "viem/chains";

const options = [
    { label: "Sepolia", imageSrc: "/eth.svg", chainId: sepolia.id },
    {
        label: "Cardona",
        imageSrc: "/polygon.svg",
        chainId: polygonZkEvmCardona.id,
    },
    { label: "zKyoto", imageSrc: "/zkyoto.svg", chainId: astarZkyoto.id },
];

export default function ChainSelect({ selectedChainId, onChainSelect }) {
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(
        options.find((option) => option.chainId === selectedChainId)
    );

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onChainSelect(option.chainId);
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    useEffect(() => {
        const newSelectedOption = options.find(
            (option) => option.chainId === selectedChainId
        );
        setSelectedOption(newSelectedOption);
    }, [selectedChainId]);

    return (
        <div className="relative inline-block w-32" ref={dropdownRef}>
            <button
                id="selectButton"
                className="w-full flex items-center bg-white border border-gray-300 rounded-full shadow-sm px-2 py-1 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-200"
                onClick={toggleDropdown}
            >
                <Image
                    src={selectedOption.imageSrc}
                    alt={selectedOption.label}
                    width={22}
                    height={22}
                    priority
                    className="inline-block mr-2"
                />
                {selectedOption.label}
                <svg
                    className={`absolute top-0 right-0 m-2 h-5 w-5 text-gray-400 pointer-events-none transform transition-transform duration-200 ${
                        isOpen ? "rotate-180" : "rotate-0"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <ul
                    id="dropdownMenu"
                    className="absolute left-1/2 transform -translate-x-1/2 z-10 mt-1 w-40 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden transform origin-top transition-all duration-300 ease-in-out opacity-100 scale-100"
                >
                    {options.map((option) => (
                        <li
                            key={option.label}
                            className="hover:bg-indigo-100 hover:text-white px-4 py-2 cursor-pointer flex border-t border-gray-300 first:border-t-0"
                            onClick={() => handleOptionClick(option)}
                        >
                            <Image
                                src={option.imageSrc}
                                alt={`${option.label} Logo`}
                                width={22}
                                height={22}
                                priority
                            />
                            <p className="pl-4 text-gray-800">{option.label}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
