"use client"

import React, { useState } from 'react'
import { BalloonBackground } from './balloon-background'
import { Button } from '@/components/ui/button'
import { RefreshCcw } from 'lucide-react'

export function BalloonBackgroundDemo() {
    const [key, setKey] = useState(0)

    const handleRefresh = () => {
        setKey(prev => prev + 1)
    }

    return (
        <div className="relative w-full h-[600px] flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-950/50 overflow-hidden">
            {/* The background itself - fixed inset-0 */}
            <BalloonBackground key={key} />

            <div className="relative z-10 flex flex-col items-center gap-6 p-8 text-center">
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold tracking-tight text-white font-display">Balloon Carnival</h3>
                    <p className="text-zinc-400 max-w-[300px] text-sm">
                        A playful, mouse-reactive background with procedural canvas textures.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleRefresh}
                        className="gap-2 bg-white/5 border-white/10 hover:bg-white/10 text-white"
                    >
                        <RefreshCcw className="w-4 h-4" />
                        Reset Scene
                    </Button>
                </div>
            </div>

            {/* Visual indicator of the "container" bounds */}
            <div className="absolute inset-0 border-2 border-indigo-500/10 pointer-events-none rounded-xl" />
        </div>
    )
}

export default BalloonBackgroundDemo
