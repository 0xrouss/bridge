"use client";

import { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import BigAmountInput from "@/components/BigAmountInput";
import ChainSelect from "@/components/ChainSelect";
import { polygonZkEvmCardona, sepolia, astarZkyoto } from "viem/chains";

// Make sure that this component is wrapped with ConnectKitProvider
export default function Page() {
    const { address, isConnected } = useAccount();
    const [selectedOriginChainId, setSelectedOriginChainId] = useState(
        sepolia.id
    );

    const [selectedDestChainId, setSelectedDestChainId] = useState(
        polygonZkEvmCardona.id
    );

    const { data: balanceData, isSuccess } = useBalance({
        address: address,
        chainId: selectedOriginChainId,
    });

    const handleOriginChainSelect = (chainId) => {
        if (chainId === selectedDestChainId) {
            setSelectedDestChainId(selectedOriginChainId);
        }
        setSelectedOriginChainId(chainId);
    };

    const handleDestChainSelect = (chainId) => {
        if (chainId === selectedOriginChainId) {
            setSelectedOriginChainId(selectedDestChainId);
        }
        setSelectedDestChainId(chainId);
    };

    return (
        <main>
            <div className="mt-4 text-center max-w-lg mx-auto p-4">
                <h1 className="font-bold text-2xl mb-4">Ethereum Bridge</h1>
                <section className="mx-auto flex flex-col items-center">
                    <div className="flex w-full flex-col justify-between rounded-2xl border bg-white">
                        <div className="p-5">
                            <div className="flex justify-between">
                                <div>
                                    <div className="text-left font-bold ml-1 mb-1 text-sm">
                                        From
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <ChainSelect
                                            selectedChainId={
                                                selectedOriginChainId
                                            }
                                            onChainSelect={
                                                handleOriginChainSelect
                                            }
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="text-right font-bold mr-1 mb-1 text-sm">
                                        To
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <ChainSelect
                                            selectedChainId={
                                                selectedDestChainId
                                            }
                                            onChainSelect={
                                                handleDestChainSelect
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-100 py-10 mt-2 border rounded-2xl">
                                <BigAmountInput />
                                <div className="font-medium text-gray-500 text-sm mt-2">
                                    {isConnected && isSuccess
                                        ? `${balanceData?.formatted.slice(
                                              0,
                                              6
                                          )} ${balanceData?.symbol} available`
                                        : "0"}
                                </div>
                            </div>

                            <div>
                                <button className="bg-indigo-500 text-white font-semibold text-2xl h-16 mt-1 w-full border rounded-2xl hover:bg-indigo-600">
                                    Bridge
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
