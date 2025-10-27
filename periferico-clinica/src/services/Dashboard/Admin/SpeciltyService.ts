//src/services/Dashboard/Admin/SpecialtyService.ts

import type { AxiosResponse } from "axios"
import API from "../../constants/Api"
import { ENDPOINTS_SERVICES } from "../../constants/Endpoints"

// ==== SERVICIO PARA OBTENER LAS ESPECIALIDADES DE LOS PROFESIONALES DE SALUD ====

export const getSpecialities = async (accessToken: string): Promise<AxiosResponse> => {
  try {
    const response = await API.get(ENDPOINTS_SERVICES.DASHBOARD.ADMIN.GET_SPECIALTIES, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return Promise.resolve(response)
  } catch (error) {
    console.error("Error al obtener las especialidades: ", error)
    return Promise.reject(error)
  }
}
