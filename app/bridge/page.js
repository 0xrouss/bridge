"use client";

import { useEffect, useState } from "react";
import {
    useAccount,
    useBalance,
    useSwitchChain,
    useWalletClient,
    useWriteContract,
} from "wagmi";
import BigAmountInput from "@/components/BigAmountInput";
import ChainSelect from "@/components/ChainSelect";
import PreviousTransactions from "@/components/PreviousTransactions";
import { parseUnits } from "viem";
import PolygonZkEVMBridge from "@/lib/PolygonZkEVMBridge";
import { TESTNET_BRIDGE_ADDRESS, ZERO_ADDRESS } from "@/config/constants";
import { getChainIndex } from "@/utils/chainUtils";
import { chainSelectorOptions } from "@/config/chains";

export default function Page() {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOriginChainId, setSelectedOriginChainId] = useState(
        chainSelectorOptions[0].chainId
    );
    const [selectedDestChainId, setSelectedDestChainId] = useState(
        chainSelectorOptions[1].chainId
    );
    const [amount, setAmount] = useState("");
    const [isBalanceInsufficient, setIsBalanceInsufficient] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [buttonText, setButtonText] = useState("Please connect");
    const [buttonClass, setButtonClass] = useState("bg-gray-400");

    const { chain, switchChainAsync } = useSwitchChain();
    const { address, isConnected, chainId } = useAccount();
    const { data: hash, writeContractAsync: writeContract } =
        useWriteContract();
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
    const handleBridgeClick = async () => {
        try {
            setIsLoading(true);
            if (selectedOriginChainId !== chainId) {
                await switchChainAsync({ chainId: selectedOriginChainId });
            }

            const args = [
                getChainIndex(selectedDestChainId), // destinationNetwork
                address, // destinationAddress
                parseUnits(amount.toString(), 18), // amount
                ZERO_ADDRESS, // token
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

            console.log(tx); // TODO: toast
        } catch {
            console.log("----error----"); // TODO: toast
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const insufficientBalance =
            isSuccess &&
            parseFloat(amount) > parseFloat(balanceData?.formatted);
        setIsBalanceInsufficient(insufficientBalance);

        const buttonDisabled =
            !isConnected || insufficientBalance || isLoading || amount == 0;
        setIsButtonDisabled(buttonDisabled);

        if (!isConnected) {
            setButtonText("Please connect");
            setButtonClass("bg-gray-400");
        } else if (insufficientBalance) {
            setButtonText("Insufficient balance");
            setButtonClass("bg-gray-400");
        } else if (amount == 0) {
            setButtonText("Input amount");
            setButtonClass("bg-gray-400");
        } else if (isLoading) {
            setButtonText("Bridging...");
            setButtonClass("bg-custom-purple");
        } else {
            setButtonText("Bridge");
            setButtonClass("bg-custom-purple hover:bg-indigo-600");
        }
    }, [isConnected, isSuccess, balanceData, amount, isLoading]);

    return (
        <main>
            <div className="mt-4 text-center max-w-lg mx-auto p-4">
                <p className="font-bold text-2xl mb-4">
                    Bridge Ether with the LxLy Bridge
                </p>
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

                            <div>
                                <button
                                    onClick={handleBridgeClick}
                                    disabled={isButtonDisabled}
                                    className={`font-semibold text-lg h-16 mt-1 w-full border rounded-2xl text-white flex justify-center items-center ${buttonClass}`}
                                >
                                    {isLoading && (
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    )}
                                    {buttonText}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <PreviousTransactions />
            </div>
        </main>
    );
}
