import { useState, useEffect } from "react";

export default function ClaimButton({
    txHash,
    destinationNetwork,
    status,
    timestamp,
}) {
    const isClaimed = status === "CLAIMED";

    // State to track whether the timestamp is within 15 minutes
    const [isBridging, setIsBridging] = useState(false);

    useEffect(() => {
        // Calculate the time difference between the current time and the timestamp
        const currentTime = new Date();
        const transactionTime = new Date(timestamp);
        const timeDifference = (currentTime - transactionTime) / 1000 / 60; // Convert to minutes

        // Check if the timestamp is within the last 15 minutes
        if (timeDifference < 20) {
            setIsBridging(true);
        } else {
            setIsBridging(false);
        }
    }, [timestamp]);

    return (
        <button
            disabled={isClaimed || isBridging}
            className={`w-24 p-2 rounded-md ${
                isClaimed || isBridging
                    ? "bg-white text-gray-500 border border-gray-300"
                    : "bg-custom-purple text-white hover:bg-indigo-600"
            }`}
            onClick={() => {
                if (!isClaimed && !isBridging) {
                    console.log(
                        `Claiming transaction: ${txHash} from ${destinationNetwork} at ${timestamp}`
                    );
                    // Logic to claim the transaction goes here
                }
            }}
        >
            {isClaimed ? "Claimed" : isBridging ? "Bridging" : "Claim"}
        </button>
    );
}
