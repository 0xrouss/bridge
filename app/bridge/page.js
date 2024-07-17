"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Navbar from "@/components/navbar";

// Make sure that this component is wrapped with ConnectKitProvider
export default function Page() {
    const { address, isConnecting, isDisconnected } = useAccount();
    const [text, setText] = useState("Connecting...");

    useEffect(() => {
        if (isConnecting) {
            setText("Connecting...");
        } else if (isDisconnected) {
            setText("Disconnected");
        } else {
            setText(address.slice(0, 4) + "..." + address.slice(-4));
        }
    }, [isConnecting, isDisconnected, address]);

    return (
        <main>
            <Navbar />
            <div className="mt-4 text-center max-w-2xl bg-blue-400 mx-auto p-4">
                <h1 className="font-bold text-6xl">Bridge</h1>
                <p>Connected Wallet: {text}</p>
                <section className="mx-auto flex flex-col items-center">
                    <div className="flex size-[400px] flex-col justify-between rounded-2xl border bg-white">
                        <div className="p-5">
                            <div className="flex items-center justify-between text-xs mb-3"></div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
