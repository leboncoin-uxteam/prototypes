'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { StepLayout } from '@/components/depot/StepLayout'
import { FormInput } from '@/components/ui/FormInput'
import { FormSelect } from '@/components/ui/FormSelect'
import { RadioGroup } from '@/components/ui/RadioGroup'
import { ContinueButton } from '@/components/ui/ContinueButton'
import { useAdStore } from '@/lib/store/adStore'

const CATEGORIES = [
  { value: 'Voitures', label: 'Voitures' },
  { value: 'Utilitaires', label: 'Utilitaires' },
  { value: 'Motos', label: 'Motos' },
  { value: 'Caravaning & Camping-car', label: 'Caravaning & Camping-car' },
  { value: 'Nautisme', label: 'Nautisme' },
]

const AD_TYPES = [
  { value: 'offre', label: 'Offre' },
  { value: 'demande', label: 'Demande' },
]

export default function Step1() {
  const router = useRouter()
  const store = useAdStore()

  const [title, setTitle] = useState(store.draft?.title ?? '')
  const [category, setCategory] = useState(store.draft?.category ?? 'Voitures')
  const [adType, setAdType] = useState('offre')

  function handleContinue() {
    if (!store.draft) store.initDraft()
    store.updateDraft({ title, category })
    router.push('/deposer/step-2')
  }

  return (
    <StepLayout
      step={1}
      title="Déposer une annonce"
      showBack={false}
      footer={<ContinueButton onClick={handleContinue} disabled={!title.trim()} />}
    >
      <div className="flex flex-col gap-8 p-6 bg-background">
        <h2 className="font-bold text-[20px] leading-7 text-on-background">
          Commençons par l'essentiel
        </h2>

        <p className="text-[16px] leading-6 text-on-surface">
          Un titre précis et la bonne catégorie, c'est le meilleur moyen pour que vos futurs acheteurs voient votre annonce !
        </p>

        <FormInput
          label="Quel est le titre de l'annonce ?"
          required
          value={title}
          onChange={setTitle}
          placeholder="Placeholder"
          maxLength={60}
          showCounter
        />

        <FormSelect
          value={category}
          onChange={setCategory}
          options={CATEGORIES}
        />

        <RadioGroup
          label="Type d'annonce"
          options={AD_TYPES}
          value={adType}
          onChange={setAdType}
        />
      </div>
    </StepLayout>
  )
}
