import Image from "next/image";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { chainSelectorOptions as options } from "@/config/chains";

// DropdownOption memoized for performance
const DropdownOption = ({ option, onClick, isSelected }) => (
    <li
        role="option"
        aria-selected={isSelected}
        className={`hover:bg-indigo-100 hover:text-white px-4 py-2 cursor-pointer flex border-t border-gray-300 first:border-t-0 ${
            isSelected ? "bg-indigo-100 text-white" : ""
        }`}
        onClick={onClick}
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
);

export default function ChainSelect({ selectedChainId, onChainSelect }) {
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [focusedOptionIndex, setFocusedOptionIndex] = useState(null);

    // Memoize options
    const memoizedOptions = useMemo(() => options, []);

    const selectedOption = useMemo(
        () =>
            memoizedOptions.find(
                (option) => option.chainId === selectedChainId
            ),
        [selectedChainId, memoizedOptions]
    );

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleOptionClick = (option) => {
        setIsOpen(false);
        onChainSelect(option.chainId);
    };

    const handleClickOutside = useCallback((event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setIsOpen(false);
        }
    }, []);

    const handleKeyDown = useCallback(
        (event) => {
            if (!isOpen) return;

            switch (event.key) {
                case "ArrowDown":
                    setFocusedOptionIndex((prevIndex) =>
                        prevIndex === null ||
                        prevIndex === memoizedOptions.length - 1
                            ? 0
                            : prevIndex + 1
                    );
                    break;
                case "ArrowUp":
                    setFocusedOptionIndex((prevIndex) =>
                        prevIndex === null || prevIndex === 0
                            ? memoizedOptions.length - 1
                            : prevIndex - 1
                    );
                    break;
                case "Enter":
                    if (focusedOptionIndex !== null) {
                        handleOptionClick(memoizedOptions[focusedOptionIndex]);
                    }
                    break;
                case "Escape":
                    setIsOpen(false);
                    break;
                default:
                    break;
            }
        },
        [isOpen, focusedOptionIndex, memoizedOptions]
    );

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside, true);
        window.addEventListener("keydown", handleKeyDown, true);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside, true);
            window.removeEventListener("keydown", handleKeyDown, true);
        };
    }, [handleClickOutside, handleKeyDown]);

    useEffect(() => {
        if (isOpen) {
            setFocusedOptionIndex(
                memoizedOptions.findIndex(
                    (option) => option.chainId === selectedChainId
                )
            );
        }
    }, [isOpen, selectedChainId, memoizedOptions]);

    return (
        <div className="relative inline-block w-32" ref={dropdownRef}>
            <button
                id="selectButton"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
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
                    role="listbox"
                    aria-labelledby="selectButton"
                    className="absolute left-1/2 transform -translate-x-1/2 z-10 mt-1 w-40 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden transform origin-top transition-all duration-300 ease-in-out opacity-100 scale-100"
                >
                    {memoizedOptions.map((option, index) => (
                        <DropdownOption
                            key={option.label}
                            option={option}
                            isSelected={index === focusedOptionIndex}
                            onClick={() => handleOptionClick(option)}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}
