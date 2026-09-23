import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface NotificationContextType {
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 4);
    setToasts(prev => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      {/* Global Toast Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl animate-fade-in text-sm ${
              toast.type === 'success'
                ? 'bg-white dark:bg-[#111318] border-emerald-200 dark:border-emerald-900/50 text-slate-800 dark:text-[#F8FAFC]'
                : toast.type === 'info'
                ? 'bg-white dark:bg-[#111318] border-blue-200 dark:border-blue-900/50 text-slate-800 dark:text-[#F8FAFC]'
                : toast.type === 'warning'
                ? 'bg-white dark:bg-[#111318] border-amber-200 dark:border-amber-900/50 text-slate-800 dark:text-[#F8FAFC]'
                : 'bg-white dark:bg-[#111318] border-red-200 dark:border-red-900/50 text-slate-800 dark:text-[#F8FAFC]'
            }`}
          >
            <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${
              toast.type === 'success' ? 'bg-emerald-500' :
              toast.type === 'info' ? 'bg-blue-500' :
              toast.type === 'warning' ? 'bg-amber-500' : 'bg-red-500'
            }`} />
            <div className="flex-1">
              <h5 className="font-semibold text-dark-900 dark:text-[#F8FAFC] text-sm">{toast.title}</h5>
              <p className="text-slate-600 dark:text-[#A7AFBD] text-xs mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 dark:text-[#7F8795] dark:hover:text-[#F8FAFC] text-base leading-none p-1"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
