"use client"

import React, { useState } from 'react'
import { BalloonBackground } from './balloon-background'

export function BalloonBackgroundDemo() {
    const [key, setKey] = useState(0)

    const handleRefresh = () => {
        setKey(prev => prev + 1)
    }

    return (
        <div 
            onClick={handleRefresh}
            className="relative w-full h-[600px] cursor-pointer rounded-xl border border-dashed border-zinc-800 bg-zinc-950/50 overflow-hidden"
            title="Click to reset balloons"
        >
            <BalloonBackground key={key} />
        </div>
    )
}

export default BalloonBackgroundDemo
