

/**
 * Resonse:
{
    "CARD": "Cardiología",
    "DERM": "Dermatología",
    "PED": "Pediatría",
    "GIN": "Ginecología",
    "TRAU": "Traumatología",
    "OFT": "Oftalmología",
    "ORL": "Otorrinolaringología",
    "NEU": "Neurología",
    "PSIQ": "Psiquiatría",
    "MED": "Medicina General",
    "DEV": "Desarrollo de Software"
}
 */



export type SpecialtyKeys = 'CARD' | 'DERM' | 'PED' | 'GIN' | 'TRAU' | 'OFT' | 'ORL' | 'NEU' | 'PSIQ' | 'MED' | 'DEV';

export type SpecialtyValues = 'Cardiología' | 'Dermatología' | 'Pediatría' | 'Ginecología' | 'Traumatología' | 'Oftalmología' | 'Otorrinolaringología' | 'Neurología' | 'Psiquiatría' | 'Medicina General' | 'Desarrollo de Software';


export type SpecialityResponse = Record<SpecialtyKeys, SpecialtyValues>;


export type SpecialityState = Partial<Record<SpecialtyKeys, SpecialtyValues>>;