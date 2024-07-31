"use client";

import Link from "next/link";
import { ConnectKitButton } from "connectkit";

export default function Navbar() {
    return (
        <>
            <nav className="bg-background flex h-16 w-full items-center justify-center border-b border-b-neutral-200">
                <div className="flex w-full max-w-6xl items-center justify-between px-4 md:px-6">
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="text-xl font-bold">
                            AggLayer Rouss
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="#" className="text-sm hidden sm:block">
                            How it works
                        </Link>

                        <ConnectKitButton />
                    </div>
                </div>
            </nav>
        </>
    );
}
