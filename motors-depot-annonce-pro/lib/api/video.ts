import { useAdStore } from '../store/adStore'

export interface VideoGenerationResult {
  videoUrl: string
  status: 'ready'
}

// Stub — simule une génération vidéo avec délai
export async function generateVideo(adId: string): Promise<VideoGenerationResult> {
  await delay(1500)

  const store = useAdStore.getState()
  const ad = store.getAd(adId)
  if (!ad) throw new Error(`Ad ${adId} not found`)

  // En prototype : vidéo fictive, à remplacer par un vrai service (ex. Creatomate, Shotstack)
  const videoUrl = `/videos/generated-${adId}.mp4`
  store.updateAd(adId, { videoUrl })

  return { videoUrl, status: 'ready' }
}

export async function generateVideoFromDraft(): Promise<VideoGenerationResult> {
  await delay(1500)
  const videoUrl = `/videos/preview-draft.mp4`
  useAdStore.getState().updateDraft({ videoUrl })
  return { videoUrl, status: 'ready' }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
