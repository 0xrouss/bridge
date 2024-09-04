import React, { useState, useRef, useEffect } from "react";
import { useAccount } from "wagmi"; // To get the user's wallet address
import { getUserBridgeTransactions } from "@/lib/agglayerAPI";
import { chainsIndexed } from "@/config/chains";
import Image from "next/image";
import { formatEther } from "viem";

export default function PreviousTransactions() {
    const [isOpen, setIsOpen] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const contentRef = useRef(null);
    const { address } = useAccount(); // Get the connected user's address

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

    // Fetch transactions when the dropdown is opened
    useEffect(() => {
        const fetchTransactions = async () => {
            if (isOpen && address) {
                setLoading(true);
                setError(null);
                try {
                    const fetchedTransactions = await getUserBridgeTransactions(
                        address
                    );
                    setTransactions(fetchedTransactions);
                } catch (err) {
                    setError("Failed to load transactions");
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchTransactions();
    }, [isOpen, address]);

    return (
        <div className="mt-4 w-full max-w-4xl mx-auto">
            <button
                className={`bg-white font-semibold w-full border rounded-t-2xl p-4 flex justify-between items-center transition-all duration-300 ${
                    isOpen ? "shadow-lg" : "rounded-b-2xl shadow"
                }`}
                onClick={toggleDropdown}
            >
                <span className="text-md ml-2">Show transactions</span>
                <svg
                    className={`w-6 h-6 transition-transform duration-300 ${
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
                    isOpen ? "opacity-100 shadow-lg rounded-b-2xl" : "opacity-0"
                }`}
                style={{ maxHeight: "0" }}
            >
                <div className="border border-t-0 bg-white">
                    {loading ? (
                        <p className="p-4">Loading transactions...</p>
                    ) : error ? (
                        <p className="p-4 text-red-500">{error}</p>
                    ) : transactions.length > 0 ? (
                        <>
                            <div>
                                {transactions.map((tx, index) => (
                                    <div
                                        key={index}
                                        className="border-b border-gray-200 p-4 hover:bg-gray-50"
                                    >
                                        <div className="text-md text-gray-500 flex justify-between items-center">
                                            <div className="text-md text-gray-500 mb-1 flex">
                                                From{" "}
                                                {
                                                    chainsIndexed[
                                                        tx.sourceNetwork
                                                    ].label
                                                }
                                                <Image
                                                    src={
                                                        chainsIndexed[
                                                            tx.sourceNetwork
                                                        ]?.imageSrc ||
                                                        "/next.svg"
                                                    }
                                                    alt={`${
                                                        chainsIndexed[
                                                            tx.sourceNetwork
                                                        ]?.logo || "Unknown"
                                                    } Logo`}
                                                    width={20}
                                                    height={20}
                                                    className="mx-1"
                                                />
                                            </div>
                                            <div className="text-md text-gray-500 mb-1 flex">
                                                To{" "}
                                                {chainsIndexed[
                                                    tx.destinationNetwork
                                                ]?.label || "Unknown"}
                                                <Image
                                                    src={
                                                        chainsIndexed[
                                                            tx
                                                                .destinationNetwork
                                                        ]?.imageSrc ||
                                                        "/next.svg"
                                                    }
                                                    alt={`${
                                                        chainsIndexed[
                                                            tx
                                                                .destinationNetwork
                                                        ]?.logo || "Unknown"
                                                    } Logo`}
                                                    width={20}
                                                    height={20}
                                                    className="mx-1"
                                                />
                                            </div>
                                        </div>
                                        <div className="text-md text-gray-500 flex justify-between items-center">
                                            <div>
                                                <span className="text-md text-gray-500">
                                                    Amount:{" "}
                                                    {formatEther(tx.amounts)}{" "}
                                                    ETH
                                                </span>
                                            </div>
                                            <div className="text-md text-gray-500">
                                                Date:{" "}
                                                {new Date(
                                                    tx.timestamp
                                                ).toLocaleString()}
                                            </div>
                                        </div>
                                        <div className="text-md text-gray-500 flex justify-between items-center">
                                            <div>
                                                <span className="text-md text-gray-500">
                                                    <a
                                                        href={`${
                                                            chainsIndexed[
                                                                tx.sourceNetwork
                                                            ]?.explorer ||
                                                            "Unknown"
                                                        }tx/${
                                                            tx.transactionHash
                                                        }`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600"
                                                    >
                                                        Explorer
                                                    </a>
                                                </span>
                                            </div>
                                            <div className="text-md text-gray-500">
                                                Status: {tx.status}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p className="p-4">
                            No transactions found for this address.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
