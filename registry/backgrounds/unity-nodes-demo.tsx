"use client"

import React from 'react'
import { UnityNodes } from './unity-nodes'

export function UnityNodesDemo() {
    return (
        <div className="relative w-full h-[600px] rounded-xl border border-dashed border-zinc-800 bg-zinc-950 overflow-hidden">
            <UnityNodes />
        </div>
    )
}

export default UnityNodesDemo
