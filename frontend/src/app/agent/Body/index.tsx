'use client'

import Image from "next/image"

export default function Body() {
    return (
        <>
            <section className="p-4">
                <div className="container-fluid">
                    <div className="row flex gap-5">
                        <div className="col w-[20%]">
                            <div className="rounded-2xl py-8 px-6 bg-cyan-800/30">
                                <div className="border-b border-zinc-500 border-dashed pb-4">
                                    <Image src="/media/agent2.webp" alt="agent" height={500} width={500} className='h-[70ox] w-[70px] rounded-full border-[3px] border-dashed border-cyan-800' />
                                    <h3 className='text-lg mt-2'>Agent Name</h3>
                                </div>
                                <div className="pt-4 text-white/90">
                                    <h3 className='text-base'>Agents AI Challenge</h3>
                                    <p className='pt-2 text-sm text-zinc-400'>Win over Valentina, the AI who embodies Valentine's spirit but playfully declines romantic proposals.</p>
                                </div>
                            </div>

                            <div className="rounded-2xl py-8 px-6 bg-cyan-800/30 mt-6">
                                <h2 className="text-2xl border-b border-dashed border-zinc-500 pb-4">Stats</h2>
                                <ul className="py-4 border-b border-zinc-500 border-dashed">
                                    <li className="bg-black/40 py-5 px-6 rounded flex items-center justify-between"><span>Break Attempts</span><span>50</span></li>
                                    <li className="bg-black/40 py-5 px-6 rounded flex items-center justify-between mt-4"><span>Message Price</span><span>1 Move</span></li>
                                </ul>
                                <p className="text-center text-sm mt-6 text-zinc-500">Expiry:</p>
                                <h2 className="mt-2 text-center text-2xl">08 : 03 : 05 : 52</h2>
                                <p className="text-xs text-zinc-400 mt-4">Split: 15% winner • 30% creator • 55% participants</p>
                                <p className="text-xs text-zinc-400 mt-4">Timer extends 1h per message if less than 1h remains</p>
                            </div>

                        </div>
                        {/* <div className="col w-[80%] rounded-2xl p-10 px-7 bg-cyan-800/30 relative pb-28"> */}
                        <div className="col w-[80%] rounded-2xl bg-cyan-800/30 relative">
                            <div className="bg-black/50 py-6 px-8 text-center">
                                <h3 className='text-4xl font-bold'>Agent's PRIZE POOL</h3>
                                <h3 className='mt-2 text-4xl font-bold'>$886.44</h3>
                            </div>
                            <div className="h-[520px] overflow-auto py-6 px-8">
                                {/* agent */}
                                <div className="main flex gap-2 w-1/2">
                                    <div className="img">
                                        <Image src="/media/agent2.webp" alt="agent" height={500} width={500} className='h-[40ox] w-[40px] rounded-full border-[3px] border-dashed border-cyan-800' />
                                    </div>
                                    <div className="agent bg-black/60 py-5 px-6 rounded-2xl rounded-tl-[0px]">
                                        <h3 className="text-xs text-zinc-400">Agent Name</h3>
                                        <p className="pt-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo deserunt possimus provident eos illum vitae saepe sed quo, fugit quis?</p>
                                    </div>
                                </div>

                                {/* user */}
                                <div className="main flex gap-2 max-w-[60%] ms-auto mt-6 mb-6">
                                    <div className="agent bg-cyan-500/30 py-5 px-6 rounded-2xl rounded-tr-[0px]">
                                        <h3 className="text-xs text-zinc-400"></h3>
                                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo deserunt possimus provident eos illum vitae saepe sed quo, fugit quis?</p>
                                    </div>
                                    <div className="img">
                                        <Image src="/media/agent1.png" alt="agent" height={500} width={500} className='h-[40ox] w-[40px] rounded-full border-[3px] border-dashed border-cyan-800' />
                                    </div>
                                </div>
                                
                            </div>

                            <div className="py-6 px-8 bg-black/50 relative border-t border-dashed border-zinc-500">
                                {/* <div className="input-group flex items-center rounded-full mt-6 overflow-hidden w-full absolute bottom-[40px] "> */}
                                <div className="input-group flex items-center rounded-full overflow-hidden w-full ">
                                    <input type="text" className="py-4 px-4 bg-cyan-500/40 w-[80%]" placeholder="Describe your agent's behaviour" />
                                    <button className='py-4 bg-[#27dfff] text-black px-8 hover:bg-black/50 hover:text-white transition w-[20%]'>Connect Wallet</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}