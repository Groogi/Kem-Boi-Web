import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() })
    setTimeout(() => setToast(null), 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] w-full max-w-sm px-6 animate-toast-in">
          <div
            className={`
            flex items-center gap-4 p-5 rounded-[2rem] shadow-2xl border backdrop-blur-md
            ${
              toast.type === 'error'
                ? 'bg-red-50/90 border-red-100 text-red-600'
                : 'bg-[#EEF4E4]/90 border-primary/5 text-primary'
            }
          `}
          >
            <div
              className={`
              w-10 h-10 rounded-full flex items-center justify-center shrink-0
              ${toast.type === 'error' ? 'bg-red-100' : 'bg-[#FBFBF5]'}
            `}
            >
              <span className="material-symbols-outlined text-[20px]">
                {toast.type === 'error' ? 'error' : 'check_circle'}
              </span>
            </div>
            <p className="text-sm font-bold tracking-tight">{toast.message}</p>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
