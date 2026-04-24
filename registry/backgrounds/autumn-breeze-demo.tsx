"use client"

import React from 'react'
import { AutumnBreeze } from './autumn-breeze'

export function AutumnBreezeDemo() {
    return (
        <div className="relative w-full h-[600px] rounded-xl border border-dashed border-zinc-800 bg-zinc-950 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-zinc-800 text-sm font-medium uppercase tracking-[0.3em]">
                    Scroll to trigger wind
                </span>
            </div>
            <AutumnBreeze />
        </div>
    )
}

export default AutumnBreezeDemo
