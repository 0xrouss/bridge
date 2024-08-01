import React, { useState, useRef, useEffect } from "react";

export default function PreviousTransactions() {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.style.maxHeight = isOpen
                ? `${contentRef.current.scrollHeight}px`
                : "0";
        }
    }, [isOpen]);

    return (
        <div
            className={`transition-all duration-300 ease-in-out ${
                isOpen ? "shadow-lg rounded-2xl" : ""
            }`}
        >
            <button
                className={`bg-white font-semibold w-full border rounded-2xl p-2 flex justify-between items-center transition-all duration-300 ${
                    isOpen ? "rounded-b-none" : "shadow-lg"
                }`}
                onClick={toggleDropdown}
            >
                <span className="ml-5">Show transactions</span>
                <svg
                    className={`w-5 h-5 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </button>
            <div
                ref={contentRef}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "opacity-100" : "opacity-0"
                }`}
                style={{ maxHeight: "0" }}
            >
                <div className="border border-t-0 rounded-b-2xl p-4 bg-white">
                    <ul className="space-y-2">
                        <li>Transaction 1</li>
                        <li>Transaction 2</li>
                        <li>Transaction 3</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
