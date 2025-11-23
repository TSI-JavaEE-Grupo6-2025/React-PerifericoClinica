interface FileReaderCallbacks {
    onLoadEnd: (result: string | ArrayBuffer | null) => void
    onError?: (error: DOMException | null) => void
    onAbort?: () => void
}

const createFileReader = (
    file: File,
    callbacks: FileReaderCallbacks
): FileReader => {
    const reader = new FileReader()

    // Manejo de éxito: cuando termina de leer
    reader.onloadend = () => {
        if (reader.readyState === FileReader.DONE) {
            callbacks.onLoadEnd(reader.result)
        }
    }

    // Manejo de errores
    reader.onerror = () => {
        const error = reader.error
        if (callbacks.onError) {
            callbacks.onError(error)
        } else {
            console.error('Error al leer el archivo:', error)
        }
        // Limpiar handlers para evitar memory leaks
        reader.onloadend = null
        reader.onerror = null
        reader.onabort = null
    }

    // Manejo de abort
    reader.onabort = () => {
        if (callbacks.onAbort) {
            callbacks.onAbort()
        }
        // Limpiar handlers para evitar memory leaks
        reader.onloadend = null
        reader.onerror = null
        reader.onabort = null
    }

    reader.readAsDataURL(file)
    return reader
}

const abortFileReader = (reader: FileReader | null): void => {
    if (reader) {
        // Limpiar todos los handlers antes de abortar
        reader.onloadend = null
        reader.onerror = null
        reader.onabort = null
        // Solo abortar si está en proceso de lectura
        if (reader.readyState === FileReader.LOADING) {
            reader.abort()
        }
    }
}

export const fileReader = {
    createFileReader,
    abortFileReader
}