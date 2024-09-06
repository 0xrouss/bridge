import { AGGLAYER_API_URL } from "@/config/constants";

export async function getUserBridgeTransactions(userAddress, pageIndex = 0) {
    const url = `${AGGLAYER_API_URL}transactions?userAddress=${userAddress}&page=${pageIndex}`;
    const response = await fetch(url);
    const { result } = await response.json();
    return result;
}

export async function getMerkleProof(networkID, depositCount) {
    const url = `${AGGLAYER_API_URL}merkle-proof?networkId=${networkID}&depositCount=${depositCount}`;
    const response = await fetch(url);
    const { proof } = await response.json();
    return proof;
}

const _GLOBAL_INDEX_MAINNET_FLAG = BigInt(2 ** 64);
export function computeGlobalIndex(indexLocal, sourceNetworkId) {
    if (BigInt(sourceNetworkId) === BigInt(0)) {
        return BigInt(indexLocal) + _GLOBAL_INDEX_MAINNET_FLAG;
    } else {
        return (
            BigInt(indexLocal) + BigInt(sourceNetworkId - 1) * BigInt(2 ** 32)
        );
    }
}
