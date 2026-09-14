import { useAdStore } from '../store/adStore'
import { VehicleAd, VehicleAdDraft } from '../types/ad'

export function createAd(data: Partial<VehicleAd>): VehicleAd {
  const store = useAdStore.getState()
  const id = store.initDraft()
  store.updateDraft(data)
  const ad = store.commitDraft()
  if (!ad) throw new Error('Failed to create ad')
  return ad
}

export function updateAd(id: string, data: Partial<VehicleAd>): VehicleAd {
  const store = useAdStore.getState()
  store.updateAd(id, data)
  const updated = store.getAd(id)
  if (!updated) throw new Error(`Ad ${id} not found`)
  return updated
}

export function getAd(id: string): VehicleAd | undefined {
  return useAdStore.getState().getAd(id)
}

export function getAllAds(): VehicleAd[] {
  return useAdStore.getState().ads
}

export function initDraft(): string {
  return useAdStore.getState().initDraft()
}

export function updateDraft(data: Partial<VehicleAdDraft>): void {
  useAdStore.getState().updateDraft(data)
}

export function commitDraft(): VehicleAd | null {
  return useAdStore.getState().commitDraft()
}

export function clearDraft(): void {
  useAdStore.getState().clearDraft()
}
