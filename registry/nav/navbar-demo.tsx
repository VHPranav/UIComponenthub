"use client"

import React, { useRef } from 'react'
import Navbar from './navbar'

export function NavbarDemo() {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <div 
            ref={containerRef}
            className="w-full h-[600px] bg-zinc-950 rounded-2xl border border-dashed border-zinc-800 relative overflow-y-auto overflow-x-hidden"
        >
            {/* 
                Pass the containerRef to the Navbar so it:
                1. Stays 'absolute' instead of 'fixed' (contained in this box)
                2. Attaches its scroll listeners to this specific div
                3. Portals dropdowns into this div (if usePortal is true)
            */}
            <Navbar containerRef={containerRef} usePortal={true} />
            
            {/* Visual content to enable scrolling and showcase glassmorphism */}
            <div className="p-8 md:p-20 pt-40 space-y-20">
                <section className="h-[400px] rounded-3xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-white/10 text-center px-4">
                    <h2 className="text-white text-2xl md:text-3xl font-bold">Scroll Down to see Navbar transform</h2>
                </section>
                
                <section className="h-[400px] rounded-3xl bg-gradient-to-br from-amber-500/20 to-red-500/20 flex items-center justify-center border border-white/10 text-center px-4">
                    <h2 className="text-white text-2xl md:text-3xl font-bold">Dynamic Shadow & Blur</h2>
                </section>

                <section className="h-[400px] rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center border border-white/10 text-center px-4">
                    <h2 className="text-white text-2xl md:text-3xl font-bold">Mega Menu Portal Handling</h2>
                </section>
            </div>
        </div>
    )
}

export default NavbarDemo
