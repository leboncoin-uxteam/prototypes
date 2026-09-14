import { useAdStore } from '../store/adStore'
import { VehicleAd } from '../types/ad'

export async function addPhotos(adId: string, files: File[]): Promise<string[]> {
  const urls = await Promise.all(files.map(fileToDataUrl))
  const store = useAdStore.getState()
  const ad = store.getAd(adId)
  const current = ad?.photos ?? []
  const updated = [...current, ...urls]
  store.updateAd(adId, { photos: updated })
  return urls
}

export function addPhotosToDraft(files: File[]): Promise<string[]> {
  return Promise.all(files.map(fileToDataUrl)).then((urls) => {
    const store = useAdStore.getState()
    const current = store.draft?.photos ?? []
    store.updateDraft({ photos: [...current, ...urls] })
    return urls
  })
}

export function removePhoto(adId: string, index: number): VehicleAd {
  const store = useAdStore.getState()
  const ad = store.getAd(adId)
  if (!ad) throw new Error(`Ad ${adId} not found`)
  const photos = ad.photos.filter((_, i) => i !== index)
  store.updateAd(adId, { photos })
  return store.getAd(adId)!
}

export function removeDraftPhoto(index: number): void {
  const store = useAdStore.getState()
  const current = store.draft?.photos ?? []
  store.updateDraft({ photos: current.filter((_, i) => i !== index) })
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
