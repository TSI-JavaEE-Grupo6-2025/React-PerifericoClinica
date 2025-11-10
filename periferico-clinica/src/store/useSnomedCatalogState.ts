import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { SnomedCatalogItem } from '../types/clinical-document';

interface SnomedCatalogState {
    // Estados de los catálogos
    consultationReasons: SnomedCatalogItem[];
    problemStatus: SnomedCatalogItem[];
    certaintyLevels: SnomedCatalogItem[];

    // Timestamps para control de caché (opcional, para invalidar después de X tiempo)
    lastUpdated: {
        consultationReasons: number | null;
        problemStatus: number | null;
        certaintyLevels: number | null;
    };

    // Acciones para setear catálogos
    setConsultationReasons: (reasons: SnomedCatalogItem[]) => void;
    setProblemStatus: (status: SnomedCatalogItem[]) => void;
    setCertaintyLevels: (levels: SnomedCatalogItem[]) => void;

    // Acciones para limpiar/invalidar caché
    clearConsultationReasons: () => void;
    clearProblemStatus: () => void;
    clearCertaintyLevels: () => void;
    clearAll: () => void;

    // Getters para verificar si hay datos en caché
    hasConsultationReasons: () => boolean;
    hasProblemStatus: () => boolean;
    hasCertaintyLevels: () => boolean;
}

/**
 * Store para gestión de catálogos SNOMED con persistencia en localStorage
 * 
 * Almacena en caché los catálogos SNOMED para evitar llamadas innecesarias al backend.
 * Los catálogos se persisten en localStorage para mantenerlos entre sesiones.
 * 
 * @example
 * ```typescript
 * // Obtener catálogos del store
 * const { consultationReasons, problemStatus, certaintyLevels } = useSnomedCatalogStore();
 * 
 * // Setear catálogos después de cargarlos del backend
 * const { setConsultationReasons } = useSnomedCatalogStore();
 * setConsultationReasons(response.reasons);
 * 
 * // Verificar si hay datos en caché
 * const { hasConsultationReasons } = useSnomedCatalogStore();
 * if (hasConsultationReasons()) {
 *   // Usar datos del caché
 * }
 * 
 * // Limpiar caché
 * const { clearAll } = useSnomedCatalogStore();
 * clearAll();
 * ```
 * 
 * @version 1.0.0
 */
export const useSnomedCatalogStore = create<SnomedCatalogState>()(
    persist(
        (set, get) => ({
            // Estado inicial
            consultationReasons: [],
            problemStatus: [],
            certaintyLevels: [],
            lastUpdated: {
                consultationReasons: null,
                problemStatus: null,
                certaintyLevels: null,
            },

            /**
             * Establece los motivos de consulta en el caché
             * 
             * @param {SnomedCatalogItem[]} reasons - Lista de motivos de consulta
             */
            setConsultationReasons: (reasons: SnomedCatalogItem[]) =>
                set({
                    consultationReasons: reasons,
                    lastUpdated: {
                        ...get().lastUpdated,
                        consultationReasons: Date.now(),
                    },
                }),

            /**
             * Establece los estados de problema en el caché
             * 
             * @param {SnomedCatalogItem[]} status - Lista de estados de problema
             */
            setProblemStatus: (status: SnomedCatalogItem[]) =>
                set({
                    problemStatus: status,
                    lastUpdated: {
                        ...get().lastUpdated,
                        problemStatus: Date.now(),
                    },
                }),

            /**
             * Establece los grados de certeza en el caché
             * 
             * @param {SnomedCatalogItem[]} levels - Lista de grados de certeza
             */
            setCertaintyLevels: (levels: SnomedCatalogItem[]) =>
                set({
                    certaintyLevels: levels,
                    lastUpdated: {
                        ...get().lastUpdated,
                        certaintyLevels: Date.now(),
                    },
                }),

            /**
             * Limpia el caché de motivos de consulta
             */
            clearConsultationReasons: () =>
                set({
                    consultationReasons: [],
                    lastUpdated: {
                        ...get().lastUpdated,
                        consultationReasons: null,
                    },
                }),

            /**
             * Limpia el caché de estados de problema
             */
            clearProblemStatus: () =>
                set({
                    problemStatus: [],
                    lastUpdated: {
                        ...get().lastUpdated,
                        problemStatus: null,
                    },
                }),

            /**
             * Limpia el caché de grados de certeza
             */
            clearCertaintyLevels: () =>
                set({
                    certaintyLevels: [],
                    lastUpdated: {
                        ...get().lastUpdated,
                        certaintyLevels: null,
                    },
                }),

            /**
             * Limpia todos los catálogos del caché
             */
            clearAll: () =>
                set({
                    consultationReasons: [],
                    problemStatus: [],
                    certaintyLevels: [],
                    lastUpdated: {
                        consultationReasons: null,
                        problemStatus: null,
                        certaintyLevels: null,
                    },
                }),

            /**
             * Verifica si hay motivos de consulta en caché
             * 
             * @returns {boolean} true si hay datos en caché
             */
            hasConsultationReasons: () => {
                const reasons = get().consultationReasons;
                return reasons.length > 0;
            },

            /**
             * Verifica si hay estados de problema en caché
             * 
             * @returns {boolean} true si hay datos en caché
             */
            hasProblemStatus: () => {
                const status = get().problemStatus;
                return status.length > 0;
            },

            /**
             * Verifica si hay grados de certeza en caché
             * 
             * @returns {boolean} true si hay datos en caché
             */
            hasCertaintyLevels: () => {
                const levels = get().certaintyLevels;
                return levels.length > 0;
            },
        }),
        {
            name: 'snomed-catalog-storage',
            storage: createJSONStorage(() => localStorage), // Persistir en localStorage
            // Persistir todos los catálogos y timestamps
            partialize: (state) => ({
                consultationReasons: state.consultationReasons,
                problemStatus: state.problemStatus,
                certaintyLevels: state.certaintyLevels,
                lastUpdated: state.lastUpdated,
            }),
        }
    )
);

