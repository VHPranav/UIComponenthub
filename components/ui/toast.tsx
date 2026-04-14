"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, XCircle, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"

type ToastType = "success" | "error" | "info"

interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />,
  error: <XCircle className="h-4 w-4 text-red-400 shrink-0" />,
  info: <Info className="h-4 w-4 text-blue-400 shrink-0" />,
}

const colors: Record<ToastType, string> = {
  success: "border-emerald-500/30 bg-emerald-950/80",
  error: "border-red-500/30 bg-red-950/80",
  info: "border-blue-500/30 bg-blue-950/80",
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => { setMounted(true) }, [])

  const toast = React.useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  const dismiss = (id: string) =>
    setToasts((prev) => prev.filter((t) => t.id !== id))

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {mounted && createPortal(
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
          <AnimatePresence mode="popLayout">
            {toasts.map((t) => (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={cn(
                  "pointer-events-auto flex items-center gap-3 rounded-xl border px-4 py-3",
                  "backdrop-blur-xl shadow-2xl min-w-[240px] max-w-[360px]",
                  colors[t.type]
                )}
              >
                {icons[t.type]}
                <p className="text-sm font-medium text-white flex-1">{t.message}</p>
                <button
                  onClick={() => dismiss(t.id)}
                  className="text-white/40 hover:text-white/80 transition-colors ml-1"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within ToastProvider")
  return ctx
}
