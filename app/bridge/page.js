"use client";

import { useEffect, useState } from "react";
import {
    useAccount,
    useBalance,
    useSwitchChain,
    useWriteContract,
} from "wagmi";
import BigAmountInput from "@/components/BigAmountInput";
import ChainSelect from "@/components/ChainSelect";
import { polygonZkEvmCardona, sepolia, astarZkyoto } from "viem/chains";
import PreviousTransactions from "@/components/PreviousTransactions";
import { parseUnits } from "viem";
import PolygonZkEVMBridge from "@/lib/PolygonZkEVMBridge";
import { TESTNET_BRIDGE_ADDRESS } from "@/config/constants";
import { config } from "@/components/Web3Provider";

export default function Page() {
    const { chain, switchChain } = useSwitchChain();
    const { address, isConnected, chainId } = useAccount();
    const [selectedOriginChainId, setSelectedOriginChainId] = useState(
        sepolia.id
    );
    const [selectedDestChainId, setSelectedDestChainId] = useState(
        polygonZkEvmCardona.id
    );
    const [amount, setAmount] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // To store error messages
    const {
        data: hash,
        error,
        writeContractAsync: writeContract,
    } = useWriteContract();
    const { data: balanceData, isSuccess } = useBalance({
        address: address,
        chainId: selectedOriginChainId,
    });

    const chains = {
        11155111: 0,
        2442: 1,
        6038361: 2,
    };

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

    const handleSwitchChain = async () => {
        try {
            if (selectedOriginChainId !== chainId) {
                await switchChain({ chainId: selectedOriginChainId });
                setErrorMessage(""); // Clear any previous error message
            }
        } catch (error) {
            if (error.code === 4001) {
                // 4001 is the error code for user rejection in MetaMask
                setErrorMessage("Network switch was rejected by the user.");
            } else {
                setErrorMessage("Failed to switch network. Please try again.");
            }
        }
    };

    const handleBridgeClick = async () => {
        try {
            setErrorMessage(""); // Clear any previous error message

            const args = [
                chains[selectedDestChainId], // destinationNetwork
                address, // destinationAddress
                parseUnits(amount.toString(), 18), // amount
                "0x0000000000000000000000000000000000000000", // token
                true, // forceUpdateGlobalExitRoot
                "", // permitData
            ];

            const tx = await writeContract({
                address: TESTNET_BRIDGE_ADDRESS,
                abi: PolygonZkEVMBridge,
                functionName: "bridgeAsset",
                args: args,
                value: parseUnits(amount.toString(), 18),
            });

            console.log(tx);
        } catch (error) {
            console.log(error);
            if (error.code === 4001) {
                // 4001 is the error code for user rejection in MetaMask
                setErrorMessage("Transaction was rejected by the user.");
            } else {
                setErrorMessage(
                    "Failed to complete the transaction. Please try again."
                );
            }
        }
    };

    const isBalanceInsufficient =
        isSuccess && parseFloat(amount) > parseFloat(balanceData?.formatted);
    const isChainMismatch = selectedOriginChainId !== chainId;
    const isButtonDisabled = !isConnected || isBalanceInsufficient;

    const getButtonText = () => {
        if (!isConnected) {
            return "Please connect";
        } else if (isChainMismatch) {
            return "Change chain";
        } else if (isBalanceInsufficient) {
            return "Insufficient balance";
        } else {
            return "Bridge";
        }
    };

    const handleButtonClick = async () => {
        if (isChainMismatch) {
            await handleSwitchChain();
        } else {
            await handleBridgeClick();
        }
    };

    return (
        <main>
            <div className="mt-4 text-center max-w-lg mx-auto p-4">
                <h1 className="font-bold text-2xl mb-4">Ethereum Bridge</h1>
                <section className="mx-auto flex flex-col items-center">
                    <div className="flex w-full flex-col justify-between rounded-2xl border shadow-md bg-white">
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

                            <div className="py-10 mt-2 border rounded-2xl">
                                <BigAmountInput
                                    inputValue={amount}
                                    setInputValue={setAmount}
                                />
                                <div className="font-medium text-gray-500 text-sm mt-2">
                                    {isConnected && isSuccess
                                        ? `${balanceData?.formatted.slice(
                                              0,
                                              6
                                          )} ${balanceData?.symbol} available`
                                        : "Please connect"}
                                </div>
                            </div>

                            {errorMessage && (
                                <div className="text-red-500 text-sm mb-2">
                                    {errorMessage}
                                </div>
                            )}

                            <div>
                                <button
                                    onClick={handleButtonClick}
                                    disabled={
                                        isButtonDisabled && !isChainMismatch
                                    }
                                    className={`font-semibold text-lg h-16 mt-1 w-full border rounded-2xl 
                                        ${
                                            isButtonDisabled && !isChainMismatch
                                                ? "bg-gray-400"
                                                : "bg-indigo-500 hover:bg-indigo-600"
                                        } text-white`}
                                >
                                    {getButtonText()}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
