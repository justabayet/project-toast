import React from 'react';
import useKey from '../../hooks/useKey';


export const ToastContext = React.createContext()

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);


  const resetToasts = React.useCallback(() => {
    setToasts([])
  }, [])

  useKey({
    callback: resetToasts,
    keyCode: 'Escape'
  })

  const addToast = React.useCallback((variant, message) => {
    setToasts([
      ...toasts,
      { variant, message, id: Math.random() }
    ])
  }, [toasts])

  const deleteToast = React.useCallback((id) => {
    setToasts(toasts.filter(toast => toast.id !== id))
  }, [toasts])

  const value = React.useMemo(() => {
    return {
      toasts,
      addToast,
      deleteToast
    }
  }, [toasts, addToast, deleteToast])

  return (
    <ToastContext.Provider value={value}>
      { children }
    </ToastContext.Provider>
  )
}

export default ToastProvider;
