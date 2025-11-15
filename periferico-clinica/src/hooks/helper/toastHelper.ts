import type { ToastState } from "../use-toast";


/**
 * Marca un toast como cerrado
 * @param toast - El estado de los toasts
 * @param id - El id del toast a marcar como cerrado
 * @returns El estado de los toasts actualizado
 */
export const markToastAsClosed = (toast: ToastState[], id: string): ToastState[] => {
    return toast.map((toast) => (toast.id === id ? { ...toast, open: false} : toast))
}

/**
 * Elimina un toast del estado
 * @param toast - El estado de los toasts
 * @param id - El id del toast a eliminar
 * @returns El estado de los toasts actualizado
 */
export const removeToast = (toast: ToastState[], id: string): ToastState[] => {
    return toast.filter((toast) => toast.id !== id)
}