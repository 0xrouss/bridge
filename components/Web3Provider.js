"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia, polygonZkEvmCardona, astarZkyoto } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
    getDefaultConfig({
        // Your dApps chains
        chains: [sepolia, polygonZkEvmCardona, astarZkyoto],
        transports: {
            // RPC URL for each chain
            [sepolia.id]: http(sepolia.rpcUrls.default.http[0]),
            [polygonZkEvmCardona.id]: http(
                polygonZkEvmCardona.rpcUrls.default.http[0]
            ),
            [astarZkyoto.id]: http(astarZkyoto.rpcUrls.default.http[0]),
        },

        // Required API Keys
        walletConnectProjectId:
            process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,

        // Required App Info
        appName: "Your App Name",

        // Optional App Info
        appDescription: "Your App Description",
        appUrl: "https://family.co", // your app's url
        appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <ConnectKitProvider mode="light">{children}</ConnectKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};
