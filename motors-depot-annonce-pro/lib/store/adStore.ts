'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { VehicleAd, VehicleAdDraft } from '../types/ad'
import { seedAds } from '../data/seed'

interface AdStore {
  ads: VehicleAd[]
  draft: VehicleAdDraft | null

  // Ads
  setAds: (ads: VehicleAd[]) => void
  addAd: (ad: VehicleAd) => void
  updateAd: (id: string, data: Partial<VehicleAd>) => void
  getAd: (id: string) => VehicleAd | undefined

  // Draft (formulaire multi-étapes en cours)
  initDraft: () => string
  updateDraft: (data: Partial<VehicleAdDraft>) => void
  commitDraft: () => VehicleAd | null
  clearDraft: () => void
}

function generateId(): string {
  return `ad-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

function now(): string {
  return new Date().toISOString()
}

export const useAdStore = create<AdStore>()(
  persist(
    (set, get) => ({
      ads: seedAds,
      draft: null,

      setAds: (ads) => set({ ads }),

      addAd: (ad) => set((s) => ({ ads: [...s.ads, ad] })),

      updateAd: (id, data) =>
        set((s) => ({
          ads: s.ads.map((ad) =>
            ad.id === id ? { ...ad, ...data, updatedAt: now() } : ad
          ),
        })),

      getAd: (id) => get().ads.find((ad) => ad.id === id),

      initDraft: () => {
        const id = generateId()
        set({
          draft: {
            id,
            status: 'draft',
            createdAt: now(),
            updatedAt: now(),
            photos: [],
            equipment: [],
          },
        })
        return id
      },

      updateDraft: (data) =>
        set((s) => ({
          draft: s.draft
            ? { ...s.draft, ...data, updatedAt: now() }
            : null,
        })),

      commitDraft: () => {
        const { draft, ads } = get()
        if (!draft) return null

        const ad = draft as VehicleAd
        set({ ads: [...ads, ad], draft: null })
        return ad
      },

      clearDraft: () => set({ draft: null }),
    }),
    {
      name: 'motors-ads-store',
    }
  )
)
