import { chainsIndexed } from "@/config/chains";
import { TESTNET_BRIDGE_ADDRESS, ZERO_ADDRESS } from "@/config/constants";
import { computeGlobalIndex, getMerkleProof } from "@/lib/agglayerAPI";
import PolygonZkEVMBridge from "@/lib/PolygonZkEVMBridge";
import { useState, useEffect } from "react";
import { useAccount, useSwitchChain, useWriteContract } from "wagmi";

export default function ClaimButton({ tx }) {
    const { chainId } = useAccount();
    const { chain, switchChainAsync } = useSwitchChain();
    const { data: hash, writeContractAsync: writeContract } =
        useWriteContract();
    const [isLoading, setIsLoading] = useState(false);
    const isClaimed = tx.status === "CLAIMED";

    // State to track whether the timestamp is within 15 minutes
    const [isBridging, setIsBridging] = useState(false);

    useEffect(() => {
        // Calculate the time difference between the current time and the timestamp
        const currentTime = new Date();
        const transactionTime = new Date(tx.timestamp);
        const timeDifference = (currentTime - transactionTime) / 1000 / 60; // Convert to minutes

        // Check if the timestamp is within the last 15 minutes
        if (timeDifference < 15) {
            setIsBridging(true);
        } else {
            setIsBridging(false);
        }
    }, [tx.timestamp]);

    const handleClaimClick = async () => {
        try {
            setIsLoading(true);

            if (chainsIndexed[tx.destinationNetwork].chainId !== chainId) {
                await switchChainAsync({
                    chainId: chainsIndexed[tx.destinationNetwork].chainId,
                });
            }

            const merkleProof = await getMerkleProof(
                tx.sourceNetwork,
                tx.counter
            );

            const args = [
                merkleProof.merkle_proof,
                merkleProof.rollup_merkle_proof,
                computeGlobalIndex(tx.counter, tx.sourceNetwork).toString(),
                merkleProof.main_exit_root,
                merkleProof.rollup_exit_root,
                tx.originTokenNetwork,
                ZERO_ADDRESS,
                tx.destinationNetwork,
                tx.userAddress,
                BigInt(tx.amounts[0]),
                "0x",
            ];

            const hash = await writeContract({
                address: TESTNET_BRIDGE_ADDRESS,
                abi: PolygonZkEVMBridge,
                functionName: "claimAsset",
                args: args,
            });

            console.log(hash); // TODO: toast
        } catch (e) {
            console.log("----error----", e); // TODO: toast
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            disabled={isClaimed || isBridging}
            className={`w-24 p-2 rounded-md flex items-center justify-center ${
                isClaimed || isBridging
                    ? "bg-white text-gray-500 border border-gray-300"
                    : "bg-custom-purple text-white hover:bg-indigo-600"
            }`}
            onClick={handleClaimClick}
        >
            {isLoading && (
                <div className="animate-spin rounded-full h-2 w-2 border-b-2 border-white mr-2"></div>
            )}
            {isClaimed ? "Claimed" : isBridging ? "Bridging" : "Claim"}
        </button>
    );
}
