"use client";

import Image from "next/image";
import Link from "next/link";
import { ConnectKitButton } from "connectkit";

export default function Navbar() {
    return (
        <>
            <nav className="bg-background flex h-16 w-full items-center justify-center border-b border-b-neutral-200">
                <div className="flex w-full max-w-6xl items-center justify-between px-4 md:px-6">
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="text-xl font-bold">
                            <h1 className="text-6xl font-thin text-custom-purple font-subscribe pb-2">
                                rouss
                            </h1>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <ConnectKitButton />
                    </div>
                </div>
            </nav>
        </>
    );
}
