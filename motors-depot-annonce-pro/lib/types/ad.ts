export type AdStatus = 'draft' | 'published' | 'expired'

export type Energy =
  | 'essence'
  | 'diesel'
  | 'électrique'
  | 'hybride'
  | 'hybride-rechargeable'
  | 'gpl'
  | 'gnv'

export type Gearbox = 'manuelle' | 'automatique' | 'semi-automatique'

export type Condition = 'excellent' | 'très-bon' | 'bon' | 'correct' | 'endommagé'

export type CritAir = '0' | '1' | '2' | '3' | '4' | '5' | 'non-classé'

export interface AdLocation {
  city: string
  zipCode: string
  department: string
  region: string
  lat?: number
  lng?: number
}

export interface VehicleAd {
  id: string

  // Identité
  category: string
  brand: string
  model: string
  version: string
  trim: string
  year: number
  registrationNumber?: string

  // Dates
  firstRegistrationDate: string
  endRegistrationDate?: string

  // Technique
  energy: Energy
  gearbox: Gearbox
  vehicleType: string
  doors: number
  seats: number
  fiscalPower: number
  dinPower: number
  mileage: number
  color: string
  upholstery?: string

  // Environnement
  critAir?: CritAir
  emissionClass?: string

  // État & historique
  condition: Condition
  maintenanceHistory?: string
  vehicleHistory?: string
  sparePartsAvailability?: string

  // Équipements
  equipment: string[]

  // Médias
  photos: string[]
  videoUrl?: string

  // Annonce
  title: string
  price: number
  location: AdLocation
  phone?: string
  email?: string
  availabilityDays?: number

  // Meta
  status: AdStatus
  createdAt: string
  updatedAt: string
}

export type VehicleAdDraft = Partial<VehicleAd> & { id: string }
