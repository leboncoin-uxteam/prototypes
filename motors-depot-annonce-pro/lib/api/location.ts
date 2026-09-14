import { AdLocation } from '../types/ad'

// Stub local — liste de villes françaises pour autocomplétion prototype
const CITIES: AdLocation[] = [
  { city: 'Paris', zipCode: '75001', department: 'Paris', region: 'Île-de-France', lat: 48.8566, lng: 2.3522 },
  { city: 'Lyon', zipCode: '69001', department: 'Rhône', region: 'Auvergne-Rhône-Alpes', lat: 45.7640, lng: 4.8357 },
  { city: 'Marseille', zipCode: '13001', department: 'Bouches-du-Rhône', region: 'Provence-Alpes-Côte d\'Azur', lat: 43.2965, lng: 5.3698 },
  { city: 'Toulouse', zipCode: '31000', department: 'Haute-Garonne', region: 'Occitanie', lat: 43.6047, lng: 1.4442 },
  { city: 'Nice', zipCode: '06000', department: 'Alpes-Maritimes', region: 'Provence-Alpes-Côte d\'Azur', lat: 43.7102, lng: 7.2620 },
  { city: 'Nantes', zipCode: '44000', department: 'Loire-Atlantique', region: 'Pays de la Loire', lat: 47.2184, lng: -1.5536 },
  { city: 'Strasbourg', zipCode: '67000', department: 'Bas-Rhin', region: 'Grand Est', lat: 48.5734, lng: 7.7521 },
  { city: 'Montpellier', zipCode: '34000', department: 'Hérault', region: 'Occitanie', lat: 43.6108, lng: 3.8767 },
  { city: 'Bordeaux', zipCode: '33000', department: 'Gironde', region: 'Nouvelle-Aquitaine', lat: 44.8378, lng: -0.5792 },
  { city: 'Lille', zipCode: '59000', department: 'Nord', region: 'Hauts-de-France', lat: 50.6292, lng: 3.0573 },
  { city: 'Rennes', zipCode: '35000', department: 'Ille-et-Vilaine', region: 'Bretagne', lat: 48.1173, lng: -1.6778 },
  { city: 'Gévezé', zipCode: '35850', department: 'Ille-et-Vilaine', region: 'Bretagne', lat: 48.1721, lng: -1.8089 },
  { city: 'Reims', zipCode: '51100', department: 'Marne', region: 'Grand Est', lat: 49.2583, lng: 4.0317 },
  { city: 'Saint-Étienne', zipCode: '42000', department: 'Loire', region: 'Auvergne-Rhône-Alpes', lat: 45.4397, lng: 4.3872 },
  { city: 'Toulon', zipCode: '83000', department: 'Var', region: 'Provence-Alpes-Côte d\'Azur', lat: 43.1242, lng: 5.9280 },
  { city: 'Grenoble', zipCode: '38000', department: 'Isère', region: 'Auvergne-Rhône-Alpes', lat: 45.1885, lng: 5.7245 },
  { city: 'Dijon', zipCode: '21000', department: 'Côte-d\'Or', region: 'Bourgogne-Franche-Comté', lat: 47.3220, lng: 5.0415 },
  { city: 'Angers', zipCode: '49000', department: 'Maine-et-Loire', region: 'Pays de la Loire', lat: 47.4784, lng: -0.5632 },
  { city: 'Nîmes', zipCode: '30000', department: 'Gard', region: 'Occitanie', lat: 43.8367, lng: 4.3601 },
  { city: 'Villeurbanne', zipCode: '69100', department: 'Rhône', region: 'Auvergne-Rhône-Alpes', lat: 45.7719, lng: 4.8902 },
]

export async function searchLocation(query: string): Promise<AdLocation[]> {
  if (!query || query.length < 2) return []

  const q = query.toLowerCase().trim()
  return CITIES.filter(
    (loc) =>
      loc.city.toLowerCase().includes(q) ||
      loc.zipCode.startsWith(q) ||
      loc.department.toLowerCase().includes(q)
  ).slice(0, 5)
}

export async function getLocationByZip(zipCode: string): Promise<AdLocation | undefined> {
  return CITIES.find((loc) => loc.zipCode === zipCode)
}
