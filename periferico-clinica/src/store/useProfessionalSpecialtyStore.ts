import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { SpecialityResponse } from "../types/Specialty"

interface ProfessionalSpecialtyState {
  specialties: SpecialityResponse | null
  lastUpdated: number | null

  setSpecialties: (specialties: SpecialityResponse) => void
  getSpecialties: () => SpecialityResponse | null
  clearSpecialties: () => void
}

export const useProfessionalSpecialtyStore = create<ProfessionalSpecialtyState>()(
  persist(
    (set, get) => ({
      specialties: null,
      lastUpdated: null,

      setSpecialties: (specialties) =>
        set({
          specialties,
          lastUpdated: Date.now(),
        }),

      getSpecialties: () => get().specialties,

      clearSpecialties: () =>
        set({
          specialties: null,
          lastUpdated: null,
        }),
    }),
    {
      name: "professional-specialties-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        specialties: state.specialties,
        lastUpdated: state.lastUpdated,
      }),
    }
  )
)