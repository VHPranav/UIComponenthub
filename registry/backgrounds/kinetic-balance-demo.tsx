"use client"

import React from 'react'
import { KineticBalance } from './kinetic-balance'

export function KineticBalanceDemo() {
    return (
        <div className="relative w-full h-[600px] rounded-xl border border-dashed border-zinc-800 bg-zinc-950 overflow-hidden flex items-center justify-center">
            <KineticBalance />
        </div>
    )
}

export default KineticBalanceDemo
