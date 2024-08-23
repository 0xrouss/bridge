import { chains } from "@/config/chains";

export const getChainIndex = (chainId) => {
    return chains[chainId] !== undefined ? chains[chainId] : null;
};
