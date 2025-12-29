'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

type Toast = {
  id: number
  title?: string
  message: string
  variant?: 'success' | 'error' | 'info'
  duration?: number
}

type ToastContextType = {
  show: (message: string, options?: Omit<Toast, 'id' | 'message'>) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const show = useCallback((message: string, options?: Omit<Toast, 'id' | 'message'>) => {
    const id = Date.now() + Math.random()
    const toast: Toast = { id, message, variant: 'info', duration: 2500, ...options }
    setToasts((prev) => [...prev, toast])
    const timeout = toast.duration ?? 2500
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, timeout)
  }, [])

  const value = useMemo(() => ({ show }), [show])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={
              'min-w-[240px] max-w-sm rounded-md border px-4 py-3 shadow-md text-sm ' +
              (t.variant === 'success'
                ? 'bg-green-50 border-green-200 text-green-800'
                : t.variant === 'error'
                ? 'bg-red-50 border-red-200 text-red-800'
                : 'bg-slate-50 border-slate-200 text-slate-800')
            }
          >
            {t.title && <div className="font-semibold mb-0.5">{t.title}</div>}
            <div>{t.message}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
