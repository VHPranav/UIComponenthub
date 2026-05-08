'use client';

import * as React from 'react';
import {
  AnimatedDialog,
  AnimatedDialogTrigger,
  AnimatedDialogPopup,
  AnimatedDialogHeader,
  AnimatedDialogFooter,
  AnimatedDialogTitle,
  AnimatedDialogDescription,
  AnimatedDialogClose,
} from '@/components/ui/animated-dialog';
import { Button } from '@/components/ui/button';
import { User, Settings, Shield, LogOut } from 'lucide-react';

export default function ModalDemo() {
  return (
    <div className="flex items-center justify-center p-20 bg-zinc-950/50 rounded-2xl border border-zinc-800 border-dashed">
      <AnimatedDialog>
        <AnimatedDialogTrigger asChild>
          <Button
            size="lg"
            style={{ color: '#e5e5e6ff', backgroundColor: 'transparent' }}
            className="rounded-full px-8 transition-all hover:scale-105 active:scale-95 shadow-lg border-none font-bold text-base h-12"
          >
            Open Animated Dialog
          </Button>
        </AnimatedDialogTrigger>
        <AnimatedDialogPopup className="max-w-md bg-zinc-900 border-zinc-800 text-zinc-100">
          <AnimatedDialogHeader>
            <div className="mx-auto w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-2">
              <User className="h-6 w-6 text-zinc-400" />
            </div>
            <AnimatedDialogTitle className="text-center text-2xl tracking-tight">Account Settings</AnimatedDialogTitle>
            <AnimatedDialogDescription className="text-center text-zinc-500">
              Manage your personal information and security preferences.
            </AnimatedDialogDescription>
          </AnimatedDialogHeader>

          <div className="grid gap-2 py-6">
            <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-zinc-800 transition-colors text-left group">
              <div className="p-2 rounded-md bg-zinc-800 group-hover:bg-zinc-700">
                <Settings className="h-4 w-4 text-zinc-400" />
              </div>
              <div>
                <div className="text-sm font-medium">Profile Settings</div>
                <div className="text-xs text-zinc-500">Update your bio and avatar</div>
              </div>
            </button>
            <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-zinc-800 transition-colors text-left group">
              <div className="p-2 rounded-md bg-zinc-800 group-hover:bg-zinc-700">
                <Shield className="h-4 w-4 text-zinc-400" />
              </div>
              <div>
                <div className="text-sm font-medium">Privacy & Security</div>
                <div className="text-xs text-zinc-500">Manage your password and 2FA</div>
              </div>
            </button>
            <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-zinc-800 transition-colors text-left group">
              <div className="p-2 rounded-md bg-zinc-800 group-hover:bg-zinc-700 text-red-400">
                <LogOut className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-medium text-red-400">Sign Out</div>
                <div className="text-xs text-zinc-500 text-red-900/50">End your current session</div>
              </div>
            </button>
          </div>

          <AnimatedDialogFooter className="sm:justify-center border-t border-zinc-800 pt-6">
            <AnimatedDialogClose asChild>
              <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
                Cancel
              </Button>
            </AnimatedDialogClose>
            <AnimatedDialogClose asChild>
              <Button
                size="lg"
                style={{ color: '#0f0f10ff', backgroundColor: '#ffffff' }}
                className="rounded-full px-4 transition-all hover:scale-105 active:scale-95 border-none font-regular text-base"
              >
                Save Preferences
              </Button>
            </AnimatedDialogClose>
          </AnimatedDialogFooter>
        </AnimatedDialogPopup>
      </AnimatedDialog>
    </div>
  );
}
