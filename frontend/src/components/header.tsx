'use client'
import Image from "next/image"
import SplashCursor from '@/ui/cursor'
import Link from "next/link"
import { ConnectWallet } from "./ConnectWallet"
import Aurora from '@/ui/aurora';

export default function Header() {
    return (
        <>
            {/* <SplashCursor /> */}
            <section className="py-4">
                <div className="container m-auto border border-dotted border-zinc-800 bg-zinc-900/90 px-5 py-3 rounded-full z-50 relative">
                    <div className="row flex items-center justify-between">
                        <div className="col">
                            <Image src="/media/logo3.png" alt="logo" height={150} width={150} />
                            {/* <h1 className="text-2xl">SamurAI</h1> */}
                        </div>
                        <div className="col flex items-center gap-5">
                            <div className="menu">
                                <ul className="flex items-center gap-5">
                                    <Link href="/"><li className="hover:text-cyan-800 transition">Home</li></Link>
                                    <Link href="/#agents"><li className="hover:text-cyan-800 transition">Agents</li></Link>
                                    <Link href="/#"><li className="hover:text-cyan-800 transition">Launchpad</li></Link>
                                    <Link href="/#"><li className="hover:text-cyan-800 transition">Docs</li></Link>
                                </ul>
                            </div>
                            <ConnectWallet />
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="mt-[-100px] z-10">
                    <Aurora colorStops={["#3A29FF", "#FF94B4", "#FF3232"]} speed={0.5} amplitude={3} />
                </div>
            </section>
        </>
    )
}