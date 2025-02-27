'use client'
import { useState } from 'react'
import Image from 'next/image';
export default function Body() {
    const [activeTab, setActiveTab] = useState(1);
    return (
        <>
            <section className='py-10'>
                <div className="container m-auto px-10 lg:py-10 2xl:py-20 bg-cyan-500/40 rounded-2xl">
                    <div className="row flex items-center justify-between">
                        <div className="col lg:w-[60%] 2xl:w-1/2">
                            <h1 className="text-7xl font-extrabold">SamurAI</h1>
                            <p className="pt-5 w-[70%] text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae voluptatibus doloribus numquam sapiente q.</p>
                            <div className="rounded-2xl p-6 mt-6 bg-black/30">
                                <h3 className='text-2xl font-bold'>Launch your agent with a single prompt (BETA)</h3>
                                <div className="input-group flex items-center rounded-full mt-6 overflow-hidden w-fit">
                                    <input type="text" className="py-4 px-4 bg-cyan-500/40" placeholder="Describe your agent's behaviour" />
                                    <button className='py-4 bg-[#27dfff] text-black px-8 hover:bg-black/50 hover:text-white transition'>Launch</button>
                                </div>
                                <div className="flex items-center gap-2 mt-6">
                                    <span className='rounded-full p-4 border py-2 text-sm hover:bg-black/30 cursor-pointer hover:border-cyan-600/30 transition'>Financial Agent</span>
                                    <span className='rounded-full p-4 border py-2 text-sm hover:bg-black/30 cursor-pointer hover:border-cyan-600/30 transition'>Coding Agent</span>
                                    <span className='rounded-full p-4 border py-2 text-sm hover:bg-black/30 cursor-pointer hover:border-cyan-600/30 transition'>Trading Agent</span>
                                    <span className='rounded-full p-4 border py-2 text-sm hover:bg-black/30 cursor-pointer hover:border-cyan-600/30 transition'>Medical Agent</span>
                                </div>
                            </div>
                        </div>
                        <div className="col lg:w-[40%] 2xl:w-1/2">
                        </div>
                    </div>
                </div>
            </section>

            {/* Trending Agents */}
            <section className='pt-10 pb-20' id="agents">
                <div className="container m-auto">
                    <h2 className='text-4xl font-bold'> Trending Agents</h2>
                    <div className="row mt-10 flex items-center gap-5">
                        {
                            Array.from({ length: 5 }).map((_, _i) => {
                                return (
                                    <div key={_i} className="col agent-card rounded-2xl overflow-hidden bg-cyan-800/60 w-[20%]">
                                        <Image src="/media/agent1.png" alt="agent" height={500} width={400} className='w-full' />
                                        <div className="py-6 px-4 text-white/90">
                                            <h3 className='font-semibold text-xl'>Agent Name</h3>
                                            <p className='flex items-center justify-between pt-3 text-sm'>
                                                <span className='w-1/2'>Entry Fee</span>
                                                <span className='w-1/2 text-end'>500.00 MOVE</span>
                                            </p>
                                            <p className='flex items-center justify-between pt-2 text-sm'>
                                                <span className='w-1/2'>Break Attempts</span>
                                                <span className='w-1/2 text-end'>234</span>
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>

            {/* Top JailBreakers */}
            <section className='pt-10 pb-20'>
                <div className="container m-auto">
                    <h2 className='text-4xl font-bold'> Top Jailbreakers</h2>
                    <div className="row mt-10 flex items-center flex-wrap gap-3">
                        {
                            Array.from({ length: 10 }).map((_, _i) => {
                                return (
                                    
                                        <div key={_i} className="col rounded-2xl bg-cyan-700/10 hover:bg-cyan-700/60 w-[24%] flex items-center p-4 gap-2 transition">
                                            <div className="addr border-r border-zinc-500 w-1/2 text-center">
                                                <Image src="/media/agent2.webp" alt="agent" height={500} width={500} className='h-[70ox] w-[70px] rounded-full m-auto border-[3px] border-dashed border-cyan-800' />
                                                <h3 className='text-lg mt-2'>Agent Name</h3>
                                            </div>
                                            <div className="py-6 px-4 text-white/90 w-1/2 text-center">
                                                <h3 className='font-semibold text-xl'>$23,463</h3>
                                                <p className='pt-2 text-sm'>2 Wins</p>
                                                <p className='pt-2 text-sm'> 24 Break Attempts</p>
                                            </div>
                                        </div>
                                    
                                )
                            })
                        }
                    </div>
                </div>
            </section>

            {/* Agents Tab */}
            <section className='pt-20 pb-20 bg-[#1C2726]'>
                <div className="container m-auto">
                    <div className="tabs flex items-center gap-10">
                        <h2 className={`text-4xl font-bold cursor-pointer transition border-b border-dashed pb-2 ${activeTab == 1 ? 'text-cyan-700 border-cyan-700' : 'border-transparent'} hover:text-cyan-700`} onClick={() => setActiveTab(1)}>New Agents</h2>
                        <h2 className={`text-4xl font-bold cursor-pointer transition border-b border-dashed pb-2 ${activeTab == 2 ? 'text-cyan-700 border-cyan-700' : 'border-transparent'} hover:text-cyan-700`} onClick={() => setActiveTab(2)}>Top Prizepool</h2>
                    </div>
                    {
                        activeTab === 1 && (
                            <div className="row mt-10 flex items-center flex-wrap gap-3">
                                {
                                    Array.from({ length: 10 }).map((_, _i) => {
                                        return (
                                            
                                                <div key={_i} className="col rounded-2xl bg-cyan-600/10 hover:bg-cyan-700/60 w-[100%] flex items-center p-3 gap-2 transition">
                                                    <Image src="/media/agent2.webp" alt="agent" height={500} width={500} className='h-[40ox] w-[40px] rounded-full m-auto border-[3px] border-dashed border-cyan-800' />
                                                    <div className="w-1/2 text-center">
                                                        <h3 className='text-lg'>Agent Name</h3>
                                                        <p className='pt-2 text-xs'>34 Attempts</p>
                                                    </div>
                                                    <div className="px-4 text-white/90 w-1/2 text-end">
                                                        <h3 className='font-semibold text-base'>$23,463</h3>
                                                    </div>
                                                    <div className="px-4 text-white/90 w-1/2 text-end">
                                                        <h3 className='font-semibold text-base'>10.00 Move</h3>
                                                    </div>
                                                    <div className="px-4 text-white/90 w-1/2 text-end">
                                                        <h3 className='font-semibold text-base'>Live</h3>
                                                    </div>
                                                </div>
                                            
                                        )
                                    })
                                }
                            </div>
                        )}
                    {
                        activeTab === 2 && (
                            <div className="row mt-10 flex items-center flex-wrap gap-3">
                                {
                                    Array.from({ length: 10 }).map((_, _i) => {
                                        return (

                                            <div key={_i} className="col rounded-2xl bg-cyan-600/10 hover:bg-cyan-700/60 w-[100%] flex items-center p-3 gap-2 transition">
                                                <Image src="/media/agent1.png" alt="agent" height={500} width={500} className='h-[40ox] w-[40px] rounded-full m-auto border-[3px] border-dashed border-cyan-800' />
                                                <div className="w-1/2 text-center">
                                                    <h3 className='text-lg'>Agent Name</h3>
                                                    <p className='pt-2 text-xs'>34 Attempts</p>
                                                </div>
                                                <div className="px-4 text-white/90 w-1/2 text-end">
                                                    <h3 className='font-semibold text-base'>$23,463</h3>
                                                </div>
                                                <div className="px-4 text-white/90 w-1/2 text-end">
                                                    <h3 className='font-semibold text-base'>10.00 Move</h3>
                                                </div>
                                                <div className="px-4 text-white/90 w-1/2 text-end">
                                                    <h3 className='font-semibold text-base'>Live</h3>
                                                </div>
                                            </div>

                                        )
                                    })
                                }
                            </div>
                        )}
                </div>
            </section>


        </>
    )
}