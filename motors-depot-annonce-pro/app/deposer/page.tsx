'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DepositHeader } from '@/components/depot/DepositHeader'
import { FormSection } from '@/components/depot/FormSection'
import { SidebarTip } from '@/components/depot/SidebarTip'
import { PhotoGrid } from '@/components/depot/PhotoGrid'
import { FormInput } from '@/components/ui/FormInput'
import { FormSelect } from '@/components/ui/FormSelect'
import { FormTextarea } from '@/components/ui/FormTextarea'
import { FormToggle } from '@/components/ui/FormToggle'
import { ChipGroup } from '@/components/ui/ChipGroup'
import { RadioGroup } from '@/components/ui/RadioGroup'
import { PrefixInput } from '@/components/ui/PrefixInput'
import { useAdStore } from '@/lib/store/adStore'
import { addPhotosToDraft } from '@/lib/api/photos'

const CATEGORIES = ['Voitures', 'Utilitaires', 'Motos', 'Caravaning & Camping-car', 'Nautisme'].map(v => ({ value: v, label: v }))
const BRANDS = ['PEUGEOT', 'Volkswagen', 'Renault', 'Citroën', 'BMW', 'Mercedes', 'Audi', 'Toyota', 'Ford', 'Opel'].map(v => ({ value: v, label: v }))
const MODELS: Record<string, string[]> = {
  PEUGEOT: ['208', '308', '3008', '5008', '2008', '508'],
  Volkswagen: ['Golf', 'Polo', 'T-Cross', 'T-Roc', 'Tiguan', 'Passat'],
  Renault: ['Clio', 'Megane', 'Captur', 'Kadjar', 'Scenic', 'Duster'],
}
const YEARS = Array.from({ length: 30 }, (_, i) => 2024 - i).map(y => ({ value: String(y), label: String(y) }))
const VEHICLE_TYPES = ['Berline', 'SUV / Crossover', 'Citadine', 'Break', 'Coupé', 'Cabriolet', 'Monospace', 'Utilitaire'].map(v => ({ value: v, label: v }))
const CARROSSERIE = ['5 portes', '3 portes', '4 portes', 'Break', 'Cabriolet'].map(v => ({ value: v, label: v }))
const DOORS = ['2', '3', '4', '5'].map(v => ({ value: v, label: v }))
const SEATS = ['2', '4', '5', '7', '9'].map(v => ({ value: v, label: v }))
const TRANSMISSIONS = ['Intégrale', 'Traction', 'Propulsion'].map(v => ({ value: v, label: v }))
const COLORS = ['Blanc', 'Noir', 'Gris', 'Rouge', 'Bleu', 'Vert', 'Jaune', 'Orange', 'Marron', 'Beige'].map(v => ({ value: v, label: v }))
const EMISSIONS = ['Euro 1', 'Euro 2', 'Euro 3', 'Euro 4', 'Euro 5', 'Euro 6', 'Euro 6d'].map(v => ({ value: v, label: v }))
const SPARE_PARTS = ['Moins de 5 ans', '5 à 10 ans', '10 à 15 ans', 'Plus de 15 ans', 'Non renseigné'].map(v => ({ value: v, label: v }))
const ENERGY_OPTIONS = ['Essence', 'Diesel', 'Hybride', 'Hybride rechargeable', 'Électrique', 'Hydrogène', 'GPL', 'Gaz naturel (GNV)', 'Autre']
const CRITAIR_OPTIONS = ['1', '2', '3', '4', '5', '6', 'Non classé']
const GEARBOX_OPTIONS = [{ value: 'manuelle', label: 'Manuelle' }, { value: 'automatique', label: 'Automatique' }]
const PERMIS_OPTIONS = [{ value: 'avec', label: 'Avec permis' }, { value: 'sans', label: 'Sans permis' }]
const GENERIC_OPTIONS = [{ value: '', label: 'Choisissez' }]
const ENTRETIEN_OPTIONS = ['Carnet d\'entretien complet', 'Entretien partiel', 'Sans historique'].map(v => ({ value: v, label: v }))
const ETAT_OPTIONS = ['Excellent état', 'Très bon état', 'Bon état', 'État correct', 'Véhicule endommagé'].map(v => ({ value: v, label: v }))

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-bold text-[20px] leading-7 text-on-background px-6">{children}</h2>
}

function FieldRow({ children }: { children: React.ReactNode }) {
  return <div className="px-6">{children}</div>
}

export default function DeposerPage() {
  const router = useRouter()
  const store = useAdStore()

  if (!store.draft) store.initDraft()

  const [photos, setPhotos] = useState<string[]>([])
  const [packPhotos, setPackPhotos] = useState(false)
  const [immat, setImmat] = useState('')
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')
  const [firstRegDate, setFirstRegDate] = useState('')
  const [ctDate, setCtDate] = useState('')
  const [energy, setEnergy] = useState('')
  const [gearbox, setGearbox] = useState('automatique')
  const [vehicleType, setVehicleType] = useState('')
  const [carrosserie, setCarrosserie] = useState('')
  const [doors, setDoors] = useState('')
  const [seats, setSeats] = useState('')
  const [fiscalPower, setFiscalPower] = useState('')
  const [dinPower, setDinPower] = useState('')
  const [transmission, setTransmission] = useState('')
  const [trim, setTrim] = useState('')
  const [version, setVersion] = useState('')
  const [gearChange, setGearChange] = useState('')
  const [ptac, setPtac] = useState('')
  const [permis, setPermis] = useState('avec')
  const [mileage, setMileage] = useState('')
  const [color, setColor] = useState('')
  const [roofPanoramic, setRoofPanoramic] = useState(false)
  const [history, setHistory] = useState('')
  const [condition, setCondition] = useState('')
  const [critAir, setCritAir] = useState('')
  const [emissionClass, setEmissionClass] = useState('')
  const [euroNorm, setEuroNorm] = useState(false)
  const [spareParts, setSpareParts] = useState('')
  const [garantieCommerciale, setGarantieCommerciale] = useState(false)
  const [garantieConstructeur, setGarantieConstructeur] = useState(false)
  const [adTitle, setAdTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url360, setUrl360] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [reference, setReference] = useState('')
  const [price, setPrice] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [hidePhone, setHidePhone] = useState(false)
  const [acceptMarketing, setAcceptMarketing] = useState(false)

  async function handleAddPhotos(files: File[]) {
    const urls = await addPhotosToDraft(files)
    setPhotos(prev => [...prev, ...urls])
  }

  function handleSave() {
    store.updateDraft({
      title: adTitle, brand, model, year: Number(year), energy: energy as any,
      gearbox: gearbox as any, mileage: Number(mileage), color, price: Number(price),
      photos, critAir: critAir as any, emissionClass, condition: condition as any,
    })
  }

  function handlePublish() {
    handleSave()
    store.commitDraft()
    router.push('/')
  }

  const modelOptions = (MODELS[brand] ?? []).map(v => ({ value: v, label: v }))

  return (
    <div className="min-h-screen bg-background-variant">
      <DepositHeader />

      <div className="max-w-[1440px] mx-auto px-[187px] pt-8 pb-16 flex flex-col gap-6">

        {/* ── Section Photos ── */}
        <FormSection
          tip={
            <SidebarTip>
              Ajoutez un maximum de photos pour augmenter le nombre de contacts et bénéficier d'une vidéo de votre véhicule générée par IA.
            </SidebarTip>
          }
        >
          <SectionTitle>Ajoutez des photos</SectionTitle>
          <p className="px-6 text-[14px] text-neutral">Faites glisser vos photos pour changer leur ordre.</p>
          <div className="px-6">
            <PhotoGrid photos={photos} onAdd={handleAddPhotos} />
          </div>
          <FieldRow>
            <FormToggle
              label="Acheter un Pack 5 Photos supplémentaires  12,42 € HT"
              checked={packPhotos}
              onChange={setPackPhotos}
            />
          </FieldRow>
        </FormSection>


        {/* ── Section Données véhicule ── */}
        <FormSection
          tip={
            <SidebarTip>
              Mettez en valeur votre annonce ! Plus il y a de détails, plus vos futurs contacts vous trouveront rapidement.
            </SidebarTip>
          }
        >
          <SectionTitle>Dites-nous en plus</SectionTitle>

          <FieldRow>
            <FormInput
              label="Immatriculation"
              value={immat}
              onChange={setImmat}
              placeholder="Ex : AA-123-BB"
              hint="Vos données seront utilisées pour le formulaire. Il est conservé pour pré-remplir d'autres formulaires et fonctionnalités sur leboncoin."
              action={
                <button type="button" className="shrink-0 bg-main text-on-main font-bold text-[14px] px-4 py-3 rounded-lg hover:bg-main-hovered transition-colors">
                  Valider
                </button>
              }
            />
          </FieldRow>

          <FieldRow>
            <div className="max-w-[400px]">
              <FormSelect label="Marque" value={brand} onChange={setBrand} options={[{ value: '', label: 'Choisissez' }, ...BRANDS]} />
            </div>
          </FieldRow>
          <FieldRow>
            <div className="max-w-[400px]">
              <FormSelect label="Modèle" value={model} onChange={setModel} options={[{ value: '', label: 'Choisissez' }, ...modelOptions]} />
            </div>
          </FieldRow>
          <FieldRow>
            <div className="max-w-[400px]">
              <FormSelect label="Année modèle" value={year} onChange={setYear} options={[{ value: '', label: 'Choisissez' }, ...YEARS]} />
            </div>
          </FieldRow>
          <FieldRow>
            <div className="max-w-[400px]">
              <FormInput label="Date de première mise en circulation" value={firstRegDate} onChange={setFirstRegDate} placeholder="MM/AAAA" />
            </div>
          </FieldRow>
          <FieldRow>
            <div className="max-w-[400px]">
              <FormInput label="Date de fin de validité du contrôle technique" value={ctDate} onChange={setCtDate} placeholder="MM/AAAA" />
            </div>
          </FieldRow>

          <FieldRow>
            <ChipGroup
              label="Énergie"
              required
              options={ENERGY_OPTIONS}
              value={energy}
              onChange={(v) => setEnergy(v as string)}
            />
          </FieldRow>

          <FieldRow>
            <RadioGroup
              label="Boîte de vitesse"
              options={GEARBOX_OPTIONS}
              value={gearbox}
              onChange={setGearbox}
            />
          </FieldRow>

          <FieldRow>
            <div className="max-w-[400px]">
              <FormSelect label="Type de véhicule" value={vehicleType} onChange={setVehicleType} options={[{ value: '', label: 'Choisissez' }, ...VEHICLE_TYPES]} />
            </div>
          </FieldRow>
          <FieldRow>
            <div className="max-w-[400px]">
              <FormSelect label="Carrosserie spécifique" value={carrosserie} onChange={setCarrosserie} options={[{ value: '', label: 'Choisissez' }, ...CARROSSERIE]} />
            </div>
          </FieldRow>
          <FieldRow>
            <div className="max-w-[400px]">
              <FormSelect label="Nombre de portes" value={doors} onChange={setDoors} options={[{ value: '', label: 'Choisissez' }, ...DOORS]} />
            </div>
          </FieldRow>
          <FieldRow>
            <div className="max-w-[400px]">
              <FormSelect label="Nombre de place(s)" value={seats} onChange={setSeats} options={[{ value: '', label: 'Choisissez' }, ...SEATS]} />
            </div>
          </FieldRow>

          <FieldRow>
            <div className="max-w-[400px]">
              <FormInput
                label="Puissance fiscale"
                value={fiscalPower}
                onChange={setFiscalPower}
                placeholder="Puissance fiscale"
                suffix="CV"
                hint="Il s'agit de la puissance fiscale de votre véhicule. Elle se trouve dans le champ P6 de votre carte grise."
              />
            </div>
          </FieldRow>
          <FieldRow>
            <div className="max-w-[400px]">
              <FormInput
                label="Puissance DIN"
                value={dinPower}
                onChange={setDinPower}
                placeholder="Puissance DIN"
                suffix="Ch"
                hint="Il s'agit de la puissance réelle de votre véhicule. Elle se trouve dans la documentation de votre véhicule."
              />
            </div>
          </FieldRow>

          <FieldRow>
            <div className="max-w-[400px]">
              <FormSelect label="Transmission" value={transmission} onChange={setTransmission} options={[{ value: '', label: 'Choisissez' }, ...TRANSMISSIONS]} />
            </div>
          </FieldRow>
          <FieldRow>
            <div className="max-w-[400px]">
              <FormSelect label="Finition" value={trim} onChange={setTrim} options={GENERIC_OPTIONS} />
            </div>
          </FieldRow>
          <FieldRow>
            <div className="max-w-[400px]">
              <FormSelect label="Version" value={version} onChange={setVersion} options={GENERIC_OPTIONS} />
            </div>
          </FieldRow>
          <FieldRow>
            <div className="max-w-[400px]">
              <FormSelect label="Valise de changement" value={gearChange} onChange={setGearChange} options={GENERIC_OPTIONS} />
            </div>
          </FieldRow>
          <FieldRow>
            <div className="max-w-[400px]">
              <FormSelect label="PTAC" value={ptac} onChange={setPtac} options={GENERIC_OPTIONS} />
            </div>
          </FieldRow>

          <FieldRow>
            <RadioGroup
              label="Permis"
              options={PERMIS_OPTIONS}
              value={permis}
              onChange={setPermis}
            />
          </FieldRow>

          <FieldRow>
            <div className="max-w-[400px]">
              <FormInput
                label="Kilométrage"
                value={mileage}
                onChange={setMileage}
                placeholder="Kilométrage"
                suffix="km"
                hint="Mentionnez obligatoirement dans le cadre de la vente du véhicule."
              />
            </div>
          </FieldRow>
          <FieldRow>
            <div className="max-w-[400px]">
              <FormSelect label="Couleur" value={color} onChange={setColor} options={[{ value: '', label: 'Choisissez' }, ...COLORS]} />
            </div>
          </FieldRow>

          <FieldRow>
            <FormToggle label="Toit panoramique" checked={roofPanoramic} onChange={setRoofPanoramic} />
          </FieldRow>

          <FieldRow>
            <div className="max-w-[400px]">
              <FormSelect label="Historique et entretien" value={history} onChange={setHistory} options={[{ value: '', label: 'Choisissez' }, ...ENTRETIEN_OPTIONS]} />
            </div>
          </FieldRow>
          <FieldRow>
            <div className="max-w-[400px]">
              <FormSelect label="État du véhicule" value={condition} onChange={setCondition} options={[{ value: '', label: 'Choisissez' }, ...ETAT_OPTIONS]} />
            </div>
          </FieldRow>

          <FieldRow>
            <ChipGroup
              label="Crit'Air"
              options={CRITAIR_OPTIONS}
              value={critAir}
              onChange={(v) => setCritAir(v as string)}
            />
          </FieldRow>

          <FieldRow>
            <div className="max-w-[400px]">
              <FormSelect label="Classe d'émission" value={emissionClass} onChange={setEmissionClass} options={[{ value: '', label: 'Choisissez' }, ...EMISSIONS]} />
            </div>
          </FieldRow>

          <FieldRow>
            <FormToggle label="Sourire à 0,0,0" checked={euroNorm} onChange={setEuroNorm} />
          </FieldRow>

          <FieldRow>
            <div className="max-w-[400px]">
              <FormSelect
                label="Durée de disponibilité des pièces détachées"
                value={spareParts}
                onChange={setSpareParts}
                options={[{ value: '', label: 'Choisissez' }, ...SPARE_PARTS]}
              />
            </div>
          </FieldRow>

          <FieldRow>
            <div className="flex flex-col gap-4">
              <FormToggle label="Garantie commerciale" checked={garantieCommerciale} onChange={setGarantieCommerciale} />
              <FormToggle label="Garantie constructeur" checked={garantieConstructeur} onChange={setGarantieConstructeur} />
            </div>
          </FieldRow>
        </FormSection>


        {/* ── Section Description ── */}
        <FormSection
          tip={
            <SidebarTip>
              Offrez une expérience immersive à vos acheteurs et permettez-leur d'explorer l'intérieur comme l'extérieur du véhicule.
            </SidebarTip>
          }
        >
          <SectionTitle>Décrivez votre bien !</SectionTitle>

          <FieldRow>
            <FormTextarea
              label="Titre de l'annonce"
              required
              value={adTitle}
              onChange={setAdTitle}
              placeholder="Ajoutez un titre"
              maxLength={300}
              rows={2}
              aiButton
              onAiClick={() => setAdTitle(`${brand} ${model} ${year}`.trim())}
            />
          </FieldRow>

          <FieldRow>
            <FormTextarea
              label="Description de l'annonce"
              required
              value={description}
              onChange={setDescription}
              placeholder="Ajoutez une description"
              rows={5}
              hint="Indiquez dans le texte de l'annonce si vous proposez un droit de rétractation à l'acheteur."
            />
          </FieldRow>

          <FieldRow>
            <p className="font-bold text-[16px] leading-6 text-on-background mb-4">Importez vos contenus immersifs</p>
            <div className="flex flex-col gap-6">
              <PrefixInput label="Vue 360°" value={url360} onChange={setUrl360} hint="Vues 360° acceptées sur notre site" />
              <PrefixInput label="Vidéo" value={videoUrl} onChange={setVideoUrl} hint="Types de vidéos acceptées sur notre site" />
            </div>
          </FieldRow>

          <FieldRow>
            <FormInput label="Référence" value={reference} onChange={setReference} placeholder="Votre référence" />
          </FieldRow>

          {/* AI Video card */}
          <FieldRow>
            <div className="border border-outline rounded-xl p-5 bg-surface-hovered/50">
              <div className="flex items-center gap-2 mb-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-support">
                  <path d="M10 1l2 6h6l-5 3.5 2 6L10 13l-5 3.5 2-6L2 7h6L10 1z" fill="currentColor" />
                </svg>
                <span className="font-bold text-[16px] text-on-background">Génération d'une vidéo avec l'IA</span>
                <span className="ml-auto bg-accent-container text-on-accent-container text-[11px] font-bold px-2 py-0.5 rounded-full">Option</span>
              </div>
              <p className="text-[14px] text-neutral mb-4">
                Vous pouvez désormais choisir de générer une vidéo de votre véhicule, pour cela vous avez besoin de :
              </p>
              <ul className="text-[14px] text-success flex flex-col gap-1 mb-5">
                <li className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M13 4L6 11 3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                  5 photos ou plus ajoutées
                </li>
                <li className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M13 4L6 11 3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                  Marque, Modèle, Année &amp; Couleur ajoutés
                </li>
              </ul>
              <button
                type="button"
                className="flex items-center justify-center gap-2 w-full bg-support text-on-support font-bold text-[14px] py-3 rounded-lg hover:bg-support-hovered transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1l1.5 4.5L14 7l-4.5 1.5L8 13l-1.5-4.5L2 7l4.5-1.5L8 1z" fill="currentColor" />
                </svg>
                Générer une vidéo
              </button>
            </div>
          </FieldRow>
        </FormSection>


        {/* ── Section Prix ── */}
        <FormSection
          tip={
            <SidebarTip>
              Vous le savez le prix est important. Soyez juste, mais ayez en tête une marge de négociation si besoin.
            </SidebarTip>
          }
        >
          <SectionTitle>Quel est votre prix ?</SectionTitle>
          <FieldRow>
            <div className="max-w-[400px]">
              <FormInput
                label="Votre prix de vente"
                required
                value={price}
                onChange={setPrice}
                placeholder="12 000"
                suffix="€"
                type="number"
                hint="Le prix est important pour les futurs acheteurs."
              />
            </div>
          </FieldRow>
        </FormSection>


        {/* ── Section Localisation ── */}
        <FormSection
          tip={
            <SidebarTip>
              Pour des raisons de confidentialité, si vous renseignez votre adresse exacte, celle-ci n'apparaîtra jamais sur votre annonce.
            </SidebarTip>
          }
        >
          <SectionTitle>Où se situe votre bien ?</SectionTitle>
          <FieldRow>
            <FormInput
              label="Adresse"
              required
              value={address}
              onChange={setAddress}
              placeholder="Numéro, nom de rue"
            />
          </FieldRow>
          <FieldRow>
            {/* Static map placeholder */}
            <div className="w-full h-[232px] rounded-xl bg-neutral-container/40 border border-outline flex items-center justify-center overflow-hidden">
              <div className="text-center text-neutral text-[14px]">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="mx-auto mb-2 text-outline">
                  <circle cx="16" cy="13" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="16" cy="13" r="2" fill="currentColor" />
                  <path d="M16 20c-4 4-9 5-9 5s2-5 4-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M16 20c4 4 9 5 9 5s-2-5-4-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Carte interactive
              </div>
            </div>
          </FieldRow>
          <FieldRow>
            <p className="text-[12px] leading-5 text-neutral">
              Complétez votre adresse et les personnes utilisant la recherche autour de soi trouveront plus facilement votre annonce. Si vous ne souhaitez pas renseigner votre adresse exacte, indiquez votre rue sans donner le numéro.
            </p>
          </FieldRow>
        </FormSection>


        {/* ── Section Coordonnées ── */}
        <FormSection
          tip={
            <SidebarTip>
              Pour plus de sécurité et faciliter vos échanges avec vos futurs contacts, merci d'entrer un numéro de téléphone valide.
            </SidebarTip>
          }
        >
          <SectionTitle>Vos coordonnées</SectionTitle>

          <FieldRow>
            <div className="max-w-[400px]">
              <FormInput label="E-mail" required value={email} onChange={setEmail} type="email" placeholder="votre@email.com" />
            </div>
          </FieldRow>

          <FieldRow>
            <div className="max-w-[400px]">
              <label className="font-bold text-[16px] leading-6 text-on-background block mb-2">Téléphone</label>
              <div className="flex border border-outline rounded-lg overflow-hidden focus-within:border-support transition-colors">
                <div className="px-3 py-3 bg-neutral-container/50 border-r border-outline flex items-center gap-1.5 shrink-0">
                  <span className="text-[14px]">🇫🇷</span>
                  <span className="text-[14px] text-neutral">+33</span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="6 12 34 56 78"
                  className="flex-1 px-4 py-3 text-[16px] leading-6 text-on-surface bg-surface outline-none"
                />
              </div>
            </div>
          </FieldRow>

          <FieldRow>
            <div className="flex flex-col gap-4">
              <FormToggle label="Masquer le numéro" checked={hidePhone} onChange={setHidePhone} />
              <FormToggle label="Accepter les démarchages commerciaux" checked={acceptMarketing} onChange={setAcceptMarketing} />
            </div>
          </FieldRow>

          <FieldRow>
            <p className="text-[12px] leading-5 text-neutral">
              En validant la diffusion de mon annonce, j'accepte les conditions générales d'utilisation et les règles de diffusion du site leboncoin.fr et j'autorise leboncoin à diffuser mon annonce.
            </p>
          </FieldRow>

          {/* Footer actions */}
          <div className="px-6 pt-4 flex items-center gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="border border-outline rounded-full px-6 py-3 text-[14px] font-bold text-on-surface hover:bg-neutral-container transition-colors"
            >
              Retour
            </button>
            <div className="flex-1" />
            <button
              type="button"
              onClick={handleSave}
              className="border border-support rounded-full px-6 py-3 text-[14px] font-bold text-support hover:bg-support-container transition-colors"
            >
              Enregistrer sans publier
            </button>
            <button
              type="button"
              onClick={handlePublish}
              className="bg-main text-on-main rounded-full px-6 py-3 text-[14px] font-bold hover:bg-main-hovered transition-colors"
            >
              Continuer
            </button>
          </div>
        </FormSection>

      </div>
    </div>
  )
}
