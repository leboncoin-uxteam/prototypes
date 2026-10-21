import { useState, useRef, useEffect, createContext, useContext } from 'react'
import './WalletHome.css'
import Navbar from '../shared/Navbar'
import TabBar from '../shared/TabBar'

const walletOrnament      = './assets/wallet-ornament.svg'
const imgCameraShutter    = './assets/camera-shutter.svg'
const imgCameraGallery    = './assets/camera-gallery.png'
const imgUserUser         = './assets/user-user.svg'

function IconImport() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M9.99978 0C10.5521 -7.4505e-06 10.9998 0.447703 10.9998 0.999989L10.9999 10.7583L13.3946 7.96461C13.754 7.54528 14.3853 7.49672 14.8046 7.85614C15.2239 8.21557 15.2725 8.84687 14.9131 9.26619L10.7592 14.1124C10.5692 14.334 10.2919 14.4616 9.99996 14.4616C9.70804 14.4616 9.43069 14.334 9.24071 14.1124L5.08685 9.26619C4.72743 8.84687 4.77599 8.21557 5.19532 7.85614C5.61464 7.49672 6.24595 7.54528 6.60537 7.96461L8.99993 10.7583L8.99979 1.00002C8.99979 0.44773 9.4475 7.45069e-06 9.99978 0ZM1 13.8461C1.55229 13.8461 2 14.2939 2 14.8461V16.2308C2 16.7 2.18641 17.15 2.5182 17.4818C2.85 17.8136 3.30001 18 3.76924 18H16.2308C16.7 18 17.15 17.8136 17.4818 17.4818C17.8136 17.15 18 16.7 18 16.2308V14.8461C18 14.2939 18.4478 13.8461 19 13.8461C19.5523 13.8461 20 14.2939 20 14.8461V16.2308C20 17.2304 19.6029 18.1891 18.8961 18.896C18.1892 19.6029 17.2305 20 16.2308 20H3.76924C2.76957 20 1.81085 19.6029 1.10398 18.896C0.397115 18.1891 0 17.2304 0 16.2308V14.8461C0 14.2939 0.447716 13.8461 1 13.8461Z" fill="currentColor"/>
    </svg>
  )
}

function IconEdit() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M15.1622 1.95122C15.1072 1.95122 15.0528 1.9622 15.0021 1.98352C14.9514 2.00484 14.9055 2.03607 14.867 2.07538L14.8576 2.08484L3.59635 13.2875L2.3836 17.6172L6.71485 16.4049L17.926 5.14308C17.9647 5.10472 17.9954 5.05909 18.0163 5.00881C18.0373 4.95852 18.0481 4.90458 18.0481 4.8501C18.0481 4.79563 18.0373 4.74169 18.0163 4.6914C17.9954 4.64112 17.9647 4.59547 17.926 4.55711L17.9212 4.55236L15.4573 2.0754C15.4189 2.0361 15.373 2.00484 15.3223 1.98352C15.2716 1.9622 15.2172 1.95122 15.1622 1.95122ZM14.245 0.185052C14.5353 0.0629155 14.8472 0 15.1622 0C15.4772 0 15.789 0.0629155 16.0794 0.185052C16.3683 0.306576 16.6301 0.484291 16.8496 0.70785L19.3005 3.17175L19.3032 3.17443C19.5236 3.39363 19.6986 3.65412 19.8181 3.94101C19.9382 4.22907 20 4.53804 20 4.8501C20 5.16217 19.9382 5.47114 19.8181 5.7592C19.6986 6.04614 19.5235 6.30667 19.3031 6.52589L19.3005 6.52846L7.91718 17.9633C7.79839 18.0827 7.65073 18.1692 7.48855 18.2146L1.23912 19.9638C0.899595 20.0589 0.535189 19.9635 0.285873 19.7142C0.0365574 19.465 -0.0588991 19.1007 0.0361685 18.7613L1.78601 12.5141C1.83142 12.352 1.91802 12.2044 2.03739 12.0856L13.4767 0.705869C13.6958 0.483241 13.957 0.306216 14.245 0.185052Z" fill="currentColor"/>
    </svg>
  )
}

const imgKycIdCard              = './assets/kyc-id-card.svg'
const imgKycIdCardFront         = './assets/kyc-id-card-front.svg'
const imgKycPassport            = './assets/kyc-passport.svg'
const imgKycPassportFront       = './assets/kyc-passport-front.svg'
const imgKycDrivingLicense      = './assets/kyc-driving-license.svg'
const imgKycDrivingLicenseFront = './assets/kyc-driving-license-front.svg'
const imgKycChevron             = './assets/kyc-chevron.svg'
const imgImportAdd              = './assets/import-add.svg'
const imgImportNoPhoto          = './assets/import-no-photo.svg'
const imgImportQuestion         = './assets/import-question.svg'
const imgImportChevron          = './assets/import-chevron.svg'
const imgImportCheck            = './assets/import-check.svg'
const imgImportCniAnciRecto     = './assets/import-cni-anci-recto.svg'
const imgImportCniAnciVerso     = './assets/import-cni-anci-verso.svg'
const imgImportCniNouvRecto     = './assets/import-cni-nouv-recto.svg'
const imgImportCniNouvVerso     = './assets/import-cni-nouv-verso.svg'
const imgImportPassport         = './assets/import-passport.svg'
const imgImportPermisRecto      = './assets/import-permis-recto.svg'
const imgImportPermisVerso      = './assets/import-permis-verso.svg'
const imgAlertAlert             = './assets/alert-alert.svg'
const imgKycIdCardBack          = './assets/kyc-id-card-back.svg'
const imgKycDrivingLicenseBack  = './assets/kyc-driving-license-back.svg'
const imgTinG120  = './assets/tin-g120.svg'
const imgTinG121  = './assets/tin-g121.svg'
const imgTinG123  = './assets/tin-g123.svg'
const imgTinVec   = './assets/tin-vec.svg'
const imgTinG125  = './assets/tin-g125.svg'
const imgTinVec1  = './assets/tin-vec1.svg'
const imgTinVec2  = './assets/tin-vec2.svg'
const imgTinVec3  = './assets/tin-vec3.svg'
const imgTinVec4  = './assets/tin-vec4.svg'
const imgTinG124  = './assets/tin-g124.svg'
const imgTinG122  = './assets/tin-g122.svg'
const imgTinArrow = './assets/tin-arrow.svg'
const imgTinLabel = './assets/tin-label.svg'
const imgTinNum   = './assets/tin-num.svg'
const imgTinVec5  = './assets/tin-vec5.svg'
const imgTinVec6  = './assets/tin-vec6.svg'
const imgTinVec7  = './assets/tin-vec7.svg'
const imgTinVec8  = './assets/tin-vec8.svg'
const imgTinVec9  = './assets/tin-vec9.svg'
const imgTinVec10 = './assets/tin-vec10.svg'
const imgTinVec11 = './assets/tin-vec11.svg'
const imgTinVec12 = './assets/tin-vec12.svg'
const imgTinVec13 = './assets/tin-vec13.svg'
const imgTinVec14 = './assets/tin-vec14.svg'
const imgTinVec15 = './assets/tin-vec15.svg'
const imgTinVec16 = './assets/tin-vec16.svg'
const imgConfirmCheck     = './assets/confirm-check.svg'
const imgConfirmSandglass = './assets/confirm-sandglass.svg'
const imgConfirmPiggyBank = './assets/confirm-piggybank.svg'

function formatBalance(centimes) {
  return (centimes / 100).toFixed(2).replace('.', ',') + ' €'
}

function formatAmount(amount) {
  const sign = amount > 0 ? '+' : ''
  return `${sign}${amount.toFixed(2).replace('.', ',')} €`
}

function IconMonument({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M1.16762 6.4661H18.8324C19.1508 6.4661 19.425 6.35593 19.655 6.14407C19.885 5.9322 20 5.66102 20 5.34746C20 5.11864 19.9469 4.8983 19.8408 4.70339C19.7258 4.50847 19.5754 4.34746 19.372 4.23729L10.9686 0.211864C10.6678 0.0677966 10.3494 0 10.0133 0C9.67713 0 9.35869 0.0677966 9.05794 0.20339L0.68996 4.26271C0.459973 4.35593 0.291906 4.50847 0.168067 4.71186C0.0619195 4.90678 0 5.12712 0 5.35593C0 5.66102 0.114993 5.9322 0.34498 6.15254C0.566121 6.36441 0.849182 6.47458 1.16762 6.47458V6.4661ZM5.13932 4.3983L9.99558 2.07627L14.8518 4.3983H5.13932Z" fill="currentColor"/>
      <path d="M15.8072 8.04237C15.5153 8.04237 15.2499 8.14407 15.0464 8.33898C14.8518 8.5339 14.7457 8.77966 14.7457 9.05085V15.322C14.7457 15.6102 14.843 15.8559 15.0464 16.0593C15.2499 16.2627 15.5064 16.3559 15.8072 16.3559C16.1079 16.3559 16.3644 16.2542 16.5679 16.0593C16.7625 15.8644 16.8686 15.6186 16.8686 15.3475V9.07627C16.8686 8.78813 16.7713 8.54237 16.5679 8.33898C16.3644 8.13559 16.1079 8.04237 15.8072 8.04237Z" fill="currentColor"/>
      <path d="M3.4498 8.33898C3.2552 8.5339 3.14905 8.77966 3.14905 9.05085V15.322C3.14905 15.6102 3.24635 15.8559 3.4498 16.0593C3.65325 16.2627 3.90977 16.3559 4.21053 16.3559C4.51128 16.3559 4.7678 16.2542 4.97125 16.0593C5.16586 15.8644 5.272 15.6186 5.272 15.3475V9.07627C5.272 8.78813 5.1747 8.54237 4.97125 8.33898C4.7678 8.13559 4.51128 8.04237 4.21053 8.04237C3.90977 8.04237 3.65325 8.14407 3.4498 8.33898Z" fill="currentColor"/>
      <path d="M18.9739 17.9322H1.06148C0.769571 17.9322 0.504202 18.0339 0.300752 18.2288C0.0973021 18.4322 0 18.678 0 18.9661C0 19.2542 0.0884564 19.5 0.283061 19.6949C0.477665 19.8983 0.734188 20 1.03494 20H18.9385C19.2304 20 19.4958 19.8983 19.6992 19.7034C19.9027 19.5 20 19.2542 20 18.9661C20 18.678 19.9115 18.4322 19.7169 18.2373C19.5223 18.0339 19.2658 17.9322 18.9651 17.9322H18.9739Z" fill="currentColor"/>
      <path d="M10.0044 8.04237C9.71252 8.04237 9.44715 8.14407 9.2437 8.33898C9.04909 8.5339 8.94295 8.77966 8.94295 9.05085V15.322C8.94295 15.6102 9.04025 15.8559 9.2437 16.0593C9.44715 16.2627 9.70367 16.3559 10.0044 16.3559C10.3052 16.3559 10.5617 16.2542 10.7651 16.0593C10.9598 15.8644 11.0659 15.6186 11.0659 15.3475V9.07627C11.0659 8.78813 10.9686 8.54237 10.7651 8.33898C10.5617 8.13559 10.3052 8.04237 10.0044 8.04237Z" fill="currentColor"/>
    </svg>
  )
}

function IconClose() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function IconCoins() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="6" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="8" cy="12" r="6" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="8" cy="12" r="2.5" fill="currentColor" fillOpacity="0.6"/>
    </svg>
  )
}

function IconCart() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M2 3h2l2.5 9h9l2-6H6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="16.5" r="1.5" fill="currentColor"/>
      <circle cx="14" cy="16.5" r="1.5" fill="currentColor"/>
    </svg>
  )
}

function TxIcon({ type, onClick }) {
  const props = onClick ? { onClick, style: { cursor: 'pointer' } } : {}
  if (type === 'gain') {
    return <div className="tx-icon tx-icon--gain" {...props}><IconCoins /></div>
  }
  if (type === 'depense') {
    return <div className="tx-icon tx-icon--depense" {...props}><IconCart /></div>
  }
  return <div className="tx-icon tx-icon--transfert" {...props}><IconMonument size={20} /></div>
}

function ConfirmModal({ balance, ibanMasked, onCancel, onConfirm }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-confirm-title" onClick={e => e.stopPropagation()}>
        <button className="modal__close" onClick={onCancel} aria-label="Fermer">
          <IconClose />
        </button>
        <p id="modal-confirm-title" className="modal__title">
          Vous êtes sur le point de transférer votre solde de{' '}
          <strong>{formatBalance(balance)}</strong> vers votre compte bancaire.
        </p>
        <div className="modal__iban-section">
          <span className="modal__label">Compte enregistré :</span>
          <div className="iban-card">
            <IconMonument />
            <span>{ibanMasked}</span>
          </div>
        </div>
        <div className="modal__actions">
          <button className="btn-outlined-support" onClick={onCancel}>Annuler</button>
          <button className="btn-primary" onClick={onConfirm}>Confirmer le transfert</button>
        </div>
      </div>
    </div>
  )
}

function SuccessModal({ balance, onClose, onReturn }) {
  return (
    <div className="modal-overlay">
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-success-title">
        <button className="modal__close" onClick={onClose} aria-label="Fermer">
          <IconClose />
        </button>
        <div className="modal__illustration" aria-hidden="true">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="36" fill="#e0f2e9" />
            <path d="M24 40l12 12 20-20" stroke="#1d6340" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p id="modal-success-title" className="modal__title">
          Votre solde de <strong>{formatBalance(balance)}</strong> est en cours de transfert vers votre compte bancaire.
        </p>
        <p className="modal__subtitle">Il sera disponible sur votre compte bancaire d'ici 48h ouvrées</p>
        <button className="btn-primary" onClick={onReturn}>Retour au porte-monnaie</button>
      </div>
    </div>
  )
}

function IconPerson() {
  return (
    <svg width="20" height="20" viewBox="0 0 12.2222 13.3333" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M6.11105 1.46117C5.04431 1.46117 4.16051 2.29948 4.16051 3.35611C4.16051 4.41273 5.04431 5.25104 6.11105 5.25104C7.17778 5.25104 8.06158 4.41273 8.06158 3.35611C8.06158 2.29948 7.17778 1.46117 6.11105 1.46117ZM2.62566 3.35611C2.62566 1.51266 4.17561 0 6.11105 0C8.04649 0 9.59643 1.51266 9.59643 3.35611C9.59643 5.19955 8.04649 6.71221 6.11105 6.71221C4.17561 6.71221 2.62566 5.19955 2.62566 3.35611Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M6.11111 9.04618C4.87659 9.04618 3.69033 9.51981 2.81393 10.3664C2.1423 11.0152 1.69485 11.8424 1.5223 12.7349C1.44558 13.1317 1.04547 13.3942 0.628638 13.3211C0.211804 13.2481 -0.0639101 12.8672 0.0128135 12.4704C0.240174 11.2944 0.830346 10.2009 1.72074 9.34077C2.8832 8.21784 4.46224 7.58501 6.11111 7.58501C7.75998 7.58501 9.33902 8.21784 10.5015 9.34077C11.3919 10.2009 11.982 11.2944 12.2094 12.4704C12.2861 12.8672 12.0104 13.2481 11.5936 13.3211C11.1767 13.3942 10.7766 13.1317 10.6999 12.7349C10.5274 11.8424 10.0799 11.0152 9.40829 10.3664C8.53189 9.51981 7.34563 9.04618 6.11111 9.04618Z" fill="currentColor"/>
    </svg>
  )
}

function IconDocument() {
  return (
    <svg width="20" height="20" viewBox="0 0 11.6667 13.3333" fill="none" aria-hidden="true">
      <path d="M3.48078 5.0027H5.36392C5.72627 5.0027 6.02275 4.71097 6.02275 4.3544C6.02275 3.99784 5.72627 3.7061 5.36392 3.7061H3.48078C3.11843 3.7061 2.82196 3.99784 2.82196 4.3544C2.82196 4.71097 3.11843 5.0027 3.48078 5.0027Z" fill="currentColor"/>
      <path d="M3.48078 7.77958H8.18588C8.54824 7.77958 8.84471 7.48784 8.84471 7.13128C8.84471 6.77472 8.54824 6.48298 8.18588 6.48298H3.48078C3.11843 6.48298 2.82196 6.77472 2.82196 7.13128C2.82196 7.48784 3.11843 7.77958 3.48078 7.77958Z" fill="currentColor"/>
      <path d="M11.48 4.81902L6.76941 0.189087C6.64863 0.0648298 6.47843 0 6.30275 0H1.59765C1.1749 0 0.768628 0.167477 0.466667 0.459211C0.164706 0.750945 0 1.15613 0 1.57212V11.7612C0 12.1772 0.170196 12.577 0.466667 12.8741C0.768628 13.1713 1.1749 13.3333 1.59765 13.3333H10.069C10.4918 13.3333 10.898 13.1659 11.2 12.8741C11.502 12.5824 11.6667 12.1772 11.6667 11.7612V5.27823C11.6667 5.10535 11.5953 4.94327 11.4745 4.81902H11.48ZM1.31765 1.57212C1.31765 1.49649 1.3451 1.42626 1.4 1.37763C1.4549 1.32901 1.52627 1.2966 1.59765 1.2966H6.02824L10.349 5.54835V11.7612C10.349 11.8368 10.3216 11.9071 10.2667 11.9557C10.2118 12.0043 10.1404 12.0367 10.069 12.0367H1.59765C1.52078 12.0367 1.44941 12.0097 1.4 11.9557C1.3451 11.9017 1.31765 11.8314 1.31765 11.7612V1.57212Z" fill="currentColor"/>
      <path d="M3.48078 10.5565H8.18588C8.54824 10.5565 8.84471 10.2647 8.84471 9.90816C8.84471 9.55159 8.54824 9.25986 8.18588 9.25986H3.48078C3.11843 9.25986 2.82196 9.55159 2.82196 9.90816C2.82196 10.2647 3.11843 10.5565 3.48078 10.5565Z" fill="currentColor"/>
    </svg>
  )
}

function CircleMeter({ completed, total }) {
  const r = 56
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - completed / total)
  return (
    <div className="circle-meter">
      <svg width="128" height="128" viewBox="0 0 128 128" aria-hidden="true">
        <circle cx="64" cy="64" r={r} stroke="var(--color-neutral-container)" strokeWidth="8" fill="none" />
        {completed > 0 && (
          <circle cx="64" cy="64" r={r} stroke="var(--color-main)" strokeWidth="8" fill="none"
            strokeDasharray={circ} strokeDashoffset={offset}
            strokeLinecap="round" transform="rotate(-90 64 64)" />
        )}
      </svg>
      <div className="circle-meter__inner" aria-label={`${completed} sur ${total} étapes`}>
        <span className="circle-meter__value">{completed}/{total}</span>
        <span className="circle-meter__label">étapes</span>
      </div>
    </div>
  )
}

function UnlockStep({ icon, title, desc, link, onLink }) {
  return (
    <div className="unlock-step">
      <div className="unlock-step__icon">{icon}</div>
      <div className="unlock-step__text">
        <span className="unlock-step__title">{title}</span>
        <span className="unlock-step__desc">{desc}</span>
        {link && <button className="unlock-step__link" onClick={onLink}>{link}</button>}
      </div>
      <span className="unlock-step__tag">À faire</span>
    </div>
  )
}

function KycLearnMoreSheet({ onClose }) {
  return (
    <>
      <div className="kyc-sheet-overlay" onClick={onClose} aria-hidden="true" />
      <div className="kyc-sheet" role="dialog" aria-modal="true" aria-labelledby="kyc-title">
        <div className="kyc-sheet__header">
          <button className="kyc-sheet__close" onClick={onClose} aria-label="Fermer">
            <IconClose />
          </button>
        </div>
        <div className="kyc-sheet__body">
          <div className="kyc-block">
            <h2 id="kyc-title" className="kyc-block__title">Pourquoi dois-je vérifier mon identité&nbsp;?</h2>
            <div className="kyc-block__body">
              <p>En tant qu'établissement de monnaie électronique réglementé, notre prestataire de services de paiement Adyen doit procéder à la vérification de votre identité avant de pouvoir transférer les fonds. Il s'agit d'une procédure légale obligatoire visant à lutter contre le blanchiment d'argent et le financement du terrorisme.</p>
              <p>Si vous avez effectué une vente via le paiement sécurisé, vous devrez vous soumettre à cette procédure de vérification d'identité pour pouvoir utiliser votre porte-monnaie (faire un transfert ou un paiement).</p>
              <p>Cette vérification est essentielle pour faire de leboncoin un environnement sûr.</p>
            </div>
          </div>

          <div className="kyc-block">
            <h2 className="kyc-block__title">Comment se passe la vérification d'identité&nbsp;?</h2>
            <div className="kyc-block__body">
              <p>Vous fournissez simplement les informations et les éventuels documents demandés.</p>
              <p>Les documents doivent être clairement lisibles, apparaître dans leur intégralité (recto et verso) et être en cours de validité.</p>
              <p>L'examen de vos documents par notre partenaire de paiement peut prendre de quelques minutes à 3 jours ouvrés.</p>
            </div>
          </div>

          <div className="kyc-block">
            <h2 className="kyc-block__title">Important</h2>
            <div className="kyc-block__body">
              <p>leboncoin ne conserve pas et n'a accès à aucun des documents que vous envoyez. Ceux-ci sont directement transférés à Adyen, qui se charge de les traiter en toute sécurité.</p>
              <p><strong>Et si je ne fournis pas les documents demandés ?</strong><br />Vos transferts et vos paiements par porte-monnaie seront interrompus jusqu'à ce que la vérification d'identité ait été effectuée avec succès.</p>
            </div>
          </div>
        </div>
        <div className="kyc-sheet__footer">
          <button className="btn-primary btn-primary--full" onClick={onClose}>J'ai compris !</button>
        </div>
      </div>
    </>
  )
}

function Dac7LearnMoreSheet({ onClose }) {
  return (
    <>
      <div className="kyc-sheet-overlay" onClick={onClose} aria-hidden="true" />
      <div className="kyc-sheet" role="dialog" aria-modal="true" aria-labelledby="dac7-title">
        <div className="kyc-sheet__header">
          <button className="kyc-sheet__close" onClick={onClose} aria-label="Fermer">
            <IconClose />
          </button>
        </div>
        <div className="kyc-sheet__body">
          <div className="dac7-block">
            <h2 id="dac7-title" className="dac7-block__title">Quelles sont vos obligations fiscales&nbsp;?</h2>
            <div className="dac7-block__body">
              <p>Les plateformes de ventes entre particuliers sont concernées par une nouvelle directive européenne (DAC7) qui a pour objectif d'améliorer la transparence des transactions en ligne.</p>
              <p><strong>Rassurez vous, cela ne signifie pas que vous serez imposé sur vos ventes.</strong></p>
              <p>Dans ce cadre, nous sommes tenus de collecter les informations fiscales de nos membres lorsqu'ils atteignent un certain seuil d'activité défini par les autorités (plus de 30 transactions ou 2&nbsp;000&nbsp;€ de revenu par année civile).</p>
              <p>Nous vous invitons donc à renseigner ces informations pour conserver une expérience utilisateur optimale. À défaut, nous serons contraints de bloquer temporairement l'utilisation de votre porte-monnaie. Celui-ci sera de nouveau accessible dès lors que vous aurez renseigné les informations demandées.</p>
              <p>Pour en savoir plus sur cette directive et ses implications, nous vous invitons à consulter notre <strong><u>page d'information dédiée.</u></strong></p>
            </div>
          </div>
        </div>
        <div className="kyc-sheet__footer">
          <button className="btn-primary btn-primary--full" onClick={onClose}>J'ai compris !</button>
        </div>
      </div>
    </>
  )
}

function OtpScreen({ onBack, onSuccess, phone, direction = 'up' }) {
  const SLOTS = 6
  const [digits, setDigits] = useState([])
  const [validated, setValidated] = useState(false)

  const handleKey = key => {
    if (validated) return
    if (key === 'del') {
      setDigits(prev => prev.slice(0, -1))
    } else {
      setDigits(prev => {
        if (prev.length >= SLOTS) return prev
        const next = [...prev, key]
        if (next.length === SLOTS) {
          setTimeout(() => {
            setValidated(true)
            setTimeout(onSuccess, 700)
          }, 300)
        }
        return next
      })
    }
  }

  const KEYS = ['1','2','3','4','5','6','7','8','9','','0','del']

  return (
    <div className={`otp-screen kyc-screen--${direction}`} role="dialog" aria-modal="true" aria-label="Vérification du numéro de téléphone">
      <div className="otp-screen__navbar">
        <button className="otp-screen__back" onClick={onBack} aria-label="Retour">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="otp-screen__navbar-title">Débloquer mon porte-monnaie</span>
      </div>
      <div className="otp-screen__content">
        <div className="otp-screen__header">
          <h1 className="otp-screen__title">Vérifions votre numéro de téléphone</h1>
          <p className="otp-screen__subtitle">
            Saisissez le code reçu au{' '}
            <strong>+33 6 ** ** ** {phone || '00'}</strong>
          </p>
        </div>
        <div className="otp-screen__fields-wrap">
          <div className="otp-fields">
            {Array.from({ length: SLOTS }, (_, i) => {
              const isActive = !validated && i === digits.length
              const isFilled = i < digits.length
              return (
                <div
                  key={i}
                  className={[
                    'otp-field',
                    isActive ? 'otp-field--active' : '',
                    validated ? 'otp-field--valid' : '',
                  ].filter(Boolean).join(' ')}
                >
                  <span className="otp-field__char">
                    {isFilled ? digits[i] : isActive ? '|' : '−'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
        <div className="otp-screen__resend">
          <span>Je n'ai rien reçu</span>
          <button className="otp-screen__resend-link">Me renvoyer un code</button>
        </div>
      </div>

      <div className="otp-keyboard" role="group" aria-label="Clavier numérique">
        {KEYS.map((key, i) => {
          if (key === '') return <div key={i} className="otp-key otp-key--special" aria-hidden="true" />
          if (key === 'del') return (
            <button key={i} className="otp-key otp-key--special" onClick={() => handleKey('del')} aria-label="Supprimer">
              <svg width="24" height="18" viewBox="0 0 24 18" fill="none" aria-hidden="true">
                <path d="M9 1H22C22.55 1 23 1.45 23 2V16C23 16.55 22.55 17 22 17H9L1 9L9 1Z" fill="currentColor" opacity="0" />
                <path d="M9 1H22C22.55 1 23 1.45 23 2V16C23 16.55 22.55 17 22 17H9L1 9L9 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M14 6.5L19 11.5M19 6.5L14 11.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          )
          return (
            <button key={i} className="otp-key" onClick={() => handleKey(key)}>
              <span className="otp-key__num">{key}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

const KycShortcutCtx = createContext(null)

function KycProgressTracker({ step }) {
  const onShortcut = useContext(KycShortcutCtx)
  const tapRef = useRef({ step: null, count: 0, timer: null })

  function handleTap(num) {
    if (!onShortcut) return
    const t = tapRef.current
    if (t.timer) clearTimeout(t.timer)
    if (t.step !== num) { t.step = num; t.count = 0 }
    t.count++
    if (t.count >= 3) {
      t.count = 0; t.step = null
      onShortcut(num)
      return
    }
    t.timer = setTimeout(() => { t.count = 0; t.step = null }, 600)
  }

  const steps = [
    { num: 1, label: 'Identité' },
    { num: 2, label: 'IBAN' },
    { num: 3, label: 'Fiscalité' },
  ]
  return (
    <div className="kyc-progress" role="list">
      {steps.map(s => (
        <div
          key={s.num}
          role="listitem"
          onClick={() => handleTap(s.num)}
          className={[
            'kyc-progress__step',
            s.num === step ? 'kyc-progress__step--active' : '',
            s.num < step  ? 'kyc-progress__step--done'   : '',
          ].filter(Boolean).join(' ')}
        >
          <div className="kyc-progress__dot">{s.num}</div>
          <span className="kyc-progress__label">{s.label}</span>
        </div>
      ))}
    </div>
  )
}

function KycCameraScreen({ onBack, onCapture, direction = 'forward', docType = 'card' }) {
  const [captured, setCaptured] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    if (!navigator.mediaDevices?.getUserMedia) return
    let stream
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(s => { stream = s; if (videoRef.current) videoRef.current.srcObject = s })
      .catch(() => {})
    return () => stream?.getTracks().forEach(t => t.stop())
  }, [])

  const handleShutter = () => {
    if (captured) return
    setCaptured(true)
    setTimeout(onCapture, 420)
  }

  return (
    <div className={`kyc-camera-screen kyc-screen--${direction}`}>
      {/* Top bar */}
      <div className="kyc-camera-screen__top-bar">
        <button className="kyc-camera-screen__cancel" onClick={onBack}>Annuler</button>
        <div className="kyc-camera-screen__top-dot" aria-hidden="true" />
      </div>

      {/* Viewfinder */}
      <div className="kyc-camera-screen__viewfinder">
        <video ref={videoRef} className="kyc-camera-screen__video" autoPlay playsInline muted />
        <div className={`kyc-camera-screen__scan-zone${docType === 'passport' ? ' kyc-camera-screen__scan-zone--passport' : ''}`} aria-hidden="true">
          <div className="kyc-camera-screen__scan-line" />
        </div>
        {captured && <div className="kyc-camera-screen__flash" aria-hidden="true" />}
      </div>

      {/* Bottom bar */}
      <div className="kyc-camera-screen__bottom-bar">
        <img src={imgCameraGallery} width="48" height="48" alt="" aria-hidden="true" className="kyc-camera-screen__gallery" />
        <button className="kyc-camera-screen__shutter" onClick={handleShutter} aria-label="Prendre la photo">
          <img src={imgCameraShutter} width="60" height="60" alt="" aria-hidden="true" />
        </button>
        <div className="kyc-camera-screen__bottom-spacer" aria-hidden="true" />
      </div>
    </div>
  )
}

function KycDocPhotoScreen({
  onBack, onTakePhoto, onImport, direction = 'forward',
  title, subtitle = 'Votre document doit être lisible pour que la vérification se fasse correctement.',
  imgSrc, imgWidth, imgHeight, primaryLabel,
  secondaryLabel = 'Importer un fichier', showTips = true,
}) {
  return (
    <div className={`kyc-idcard-screen kyc-screen--${direction}`}>
      <div className="otp-screen__navbar">
        <button className="otp-screen__back" onClick={onBack} aria-label="Retour">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="otp-screen__navbar-title">Débloquer mon porte-monnaie</span>
      </div>

      <div className="kyc-idcard-screen__body">
        <div className="kyc-idcard-screen__content">
          <div className="kyc-idcard-screen__header">
            <h1 className="kyc-idcard-screen__title">{title}</h1>
            <p className="kyc-idcard-screen__subtitle">{subtitle}</p>
          </div>

          <div className="kyc-idcard-screen__illu">
            <img src={imgSrc} width={imgWidth} height={imgHeight} alt="" aria-hidden="true" />
          </div>

          {showTips && (
            <div className="kyc-idcard-screen__tips">
              <p className="kyc-idcard-screen__tips-title">Conseils de capture&nbsp;:</p>
              <ul className="kyc-idcard-screen__tips-list">
                <li>Utilisez un document original en cours de validité.</li>
                <li>Placez-vous dans un endroit bien éclairé, sans contre-jour.</li>
                <li>Évitez les reflets et le flou.</li>
                <li>Cadrez le document en entier, <strong>avec la bande d'identification au bas de la pièce d'identité.</strong></li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="kyc-idcard-screen__footer">
        <button className="btn-primary btn-primary--full" onClick={onTakePhoto}>{primaryLabel}</button>
        {secondaryLabel && (
          <button className="btn-outlined-support btn-outlined-support--full" onClick={onImport}>{secondaryLabel}</button>
        )}
      </div>
    </div>
  )
}

const DOC_PHOTO_CONFIG = {
  'cni-front': {
    title: 'Photographiez le recto',
    imgSrc: imgKycIdCardFront,
    imgWidth: 189, imgHeight: 120,
    primaryLabel: 'Photographier le recto',
    scanScreen: 'cni-scan',
  },
  'passport-front': {
    title: 'Photographiez votre passeport',
    imgSrc: imgKycPassportFront,
    imgWidth: 171, imgHeight: 120,
    primaryLabel: 'Photographier mon passeport',
    scanScreen: 'passport-scan',
  },
  'permis-front': {
    title: 'Photographiez le recto',
    imgSrc: imgKycDrivingLicenseFront,
    imgWidth: 195, imgHeight: 120,
    primaryLabel: 'Photographier le recto',
    scanScreen: 'permis-scan',
  },
}

const KYC_SCAN_BACK = {
  'cni-scan': 'cni-front',
  'passport-scan': 'passport-front',
  'permis-scan': 'permis-front',
}

const KYC_SCAN_DATA = {
  'cni-scan': 'cni-data',
  'passport-scan': 'passport-data',
  'permis-scan': 'permis-data',
}

const KYC_DATA_BACK = {
  'cni-data': 'cni-scan',
  'passport-data': 'passport-scan',
  'permis-data': 'permis-scan',
}

const KYC_DATA_RETAKE_LABEL = {
  'cni-data': 'Reprendre le recto',
  'passport-data': 'Reprendre la photo',
  'permis-data': 'Reprendre le recto',
}

const DOC_BACK_CONFIG = {
  'cni-back': {
    title: 'Photographiez le verso',
    subtitle: "Retournez votre carte et photographiez l'autre face.",
    imgSrc: imgKycIdCardBack,
    imgWidth: 198, imgHeight: 120,
    primaryLabel: 'Photographier le verso',
    secondaryLabel: null,
    showTips: true,
    scanScreen: 'cni-back-scan',
  },
  'permis-back': {
    title: 'Photographiez le verso',
    subtitle: "Retournez votre carte et photographiez l'autre face.",
    imgSrc: imgKycDrivingLicenseBack,
    imgWidth: 195, imgHeight: 120,
    primaryLabel: 'Photographier le verso',
    secondaryLabel: null,
    showTips: true,
    scanScreen: 'permis-back-scan',
  },
}

const KYC_BACK_PREV = {
  'cni-back': 'cni-data',
  'permis-back': 'permis-data',
}

const KYC_BACK_SCAN_BACK = {
  'cni-back-scan': 'cni-back',
  'permis-back-scan': 'permis-back',
}

function KycDataScreen({ onBack, onConfirm, onRetake, onImportDoc, onManualEntry, nom, prenom, dateNaissance, retakeLabel = 'Reprendre le recto', direction = 'forward' }) {
  return (
    <div className={`kyc-data-screen kyc-screen--${direction}`}>
      <div className="otp-screen__navbar">
        <button className="otp-screen__back" onClick={onBack} aria-label="Retour">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="otp-screen__navbar-title">Débloquer mon porte-monnaie</span>
      </div>

      <div className="kyc-data-screen__body">
        <KycProgressTracker step={1} />

        <div className="kyc-data-screen__content">
          <h1 className="kyc-data-screen__title">Confirmez que les informations ci-dessous sont correctes</h1>

          <div className="kyc-data-card">
            <div className="kyc-data-card__header">
              <img src={imgUserUser} width="20" height="20" alt="" aria-hidden="true" />
              <span className="kyc-data-card__heading">Identité</span>
            </div>
            <hr className="kyc-data-card__divider" />
            <dl className="kyc-data-card__list">
              <div className="kyc-data-card__item">
                <dt>Nom(s)</dt>
                <dd>{nom || 'Martin'}</dd>
              </div>
              <div className="kyc-data-card__item">
                <dt>Prénom(s)</dt>
                <dd>{prenom || 'Maëlys-Gaëlle'}</dd>
              </div>
              <div className="kyc-data-card__item">
                <dt>Date de naissance</dt>
                <dd>{dateNaissance || '13 juillet 1990'}</dd>
              </div>
            </dl>
          </div>

          <div className="kyc-data-screen__correction">
            <p className="kyc-data-screen__correction-label">Les données ne sont pas correctes&nbsp;?</p>
            <button className="btn-ghost-support" onClick={onImportDoc || onRetake}>
              <IconImport />
              Importer ma pièce d'identité
            </button>
            <button className="btn-ghost-support" onClick={onManualEntry || onImportDoc || onRetake}>
              <IconEdit />
              Saisir mes informations manuellement
            </button>
          </div>
        </div>
      </div>

      <div className="kyc-data-screen__footer">
        <button className="btn-primary btn-primary--full" onClick={onConfirm}>Je valide les informations</button>
        <button className="btn-outlined-support btn-outlined-support--full" onClick={onRetake}>{retakeLabel}</button>
      </div>
    </div>
  )
}

function KycAddressScreen({ onBack, onConfirm, onRetake, onImportDoc, onManualEntry, retakeLabel = 'Reprendre le verso', confirmLabel = 'Je valide les informations', showRetake = true, showCorrection = true, defaultValue = '24 Rue des Jeuneurs, 75002 Paris', direction = 'forward' }) {
  const [value, setValue] = useState(defaultValue)
  const [error, setError] = useState(false)

  function handleConfirm() {
    if (!value.trim()) { setError(true); return }
    setError(false)
    onConfirm()
  }

  return (
    <div className={`kyc-data-screen kyc-screen--${direction}`}>
      <div className="otp-screen__navbar">
        <button className="otp-screen__back" onClick={onBack} aria-label="Retour">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="otp-screen__navbar-title">Débloquer mon porte-monnaie</span>
      </div>

      <div className="kyc-data-screen__body">
        <KycProgressTracker step={1} />

        <div className="kyc-data-screen__content">
          <div className="kyc-address-screen__header">
            <h1 className="kyc-data-screen__title">Confirmez votre adresse de résidence</h1>
            <p className="kyc-address-screen__subtitle">Elle peut être différente de celle de votre pièce d'identité.</p>
          </div>

          <div className="kyc-textfield">
            <label className="kyc-textfield__label" htmlFor="kyc-address">
              Adresse de résidence <span className="kyc-textfield__mandatory">(obligatoire)</span>
            </label>
            <div className={`kyc-textfield__wrapper${error ? ' kyc-textfield__wrapper--error' : ''}`}>
              <input
                id="kyc-address"
                className="kyc-textfield__input"
                type="text"
                value={value}
                onChange={e => { setValue(e.target.value); if (error) setError(false) }}
              />
              {value && (
                <button className="kyc-textfield__clear" onClick={() => setValue('')} aria-label="Effacer">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="8" fill="rgba(21,34,51,0.32)" />
                    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </div>
            {error && (
              <div className="kyc-field-error">
                <img src={imgAlertAlert} width="16" height="16" alt="" aria-hidden="true" style={{ flexShrink: 0 }} />
                <p>Veuillez saisir votre adresse de résidence.</p>
              </div>
            )}
          </div>

          {showCorrection && (
            <div className="kyc-data-screen__correction">
              <p className="kyc-data-screen__correction-label">Les données ne sont pas correctes&nbsp;?</p>
              <button className="btn-ghost-support" onClick={onImportDoc || onRetake}>
                <IconImport />
                Importer ma pièce d'identité
              </button>
              <button className="btn-ghost-support" onClick={onManualEntry || onImportDoc || onRetake}>
                <IconEdit />
                Saisir mes informations manuellement
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="kyc-data-screen__footer">
        <button className="btn-primary btn-primary--full" onClick={handleConfirm}>{confirmLabel}</button>
        {showRetake && (
          <button className="btn-outlined-support btn-outlined-support--full" onClick={onRetake}>{retakeLabel}</button>
        )}
      </div>
    </div>
  )
}

const RULES_BASE = [
  "Seul le document original en cours de validité est accepté.",
  "Le document doit être en couleur, net et lisible.",
  "La bande d'identification en bas du document doit être entièrement visibles.",
]
const RULE_RECTO_VERSO = "Le recto et le verso doivent chacun être dans un fichier séparé."

const KYC_IMPORT_CONFIG = {
  cni: {
    title: "Importer votre carte d'identité",
    twoSides: true,
    rules: [RULES_BASE[0], RULE_RECTO_VERSO, RULES_BASE[1], RULES_BASE[2]],
    illustrations: [
      {
        images: [{ src: imgImportCniAnciRecto, w: 107, h: 75 }, { src: imgImportCniAnciVerso, w: 107, h: 75 }],
        name: "Carte d'identité", sub: 'Ancien format',
      },
      {
        images: [{ src: imgImportCniNouvRecto, w: 102, h: 65 }, { src: imgImportCniNouvVerso, w: 102, h: 65 }],
        name: "Carte d'identité", sub: 'Nouveau format',
      },
    ],
  },
  passport: {
    title: 'Importer votre passeport',
    twoSides: false,
    rules: RULES_BASE,
    illustrations: [
      { images: [{ src: imgImportPassport, w: 107, h: 75 }], name: 'Passeport', sub: null },
    ],
  },
  permis: {
    title: 'Importer votre permis de conduire',
    twoSides: true,
    rules: [RULES_BASE[0], RULE_RECTO_VERSO, RULES_BASE[1], RULES_BASE[2]],
    illustrations: [
      {
        images: [{ src: imgImportPermisRecto, w: 105, h: 65 }, { src: imgImportPermisVerso, w: 105, h: 65 }],
        name: 'Permis de conduire', sub: 'Nouveau format',
      },
    ],
  },
}

const KYC_IMPORT_BACK = {
  'cni-import': 'cni-data',
  'passport-import': 'passport-data',
  'permis-import': 'permis-data',
}

const IMPORT_ERROR_MSG = {
  cni: {
    none: "Importez le recto et le verso de votre carte d'identité pour continuer.",
    noVerso: "Importez le verso de votre carte d'identité pour continuer.",
  },
  passport: { none: 'Importez votre passeport pour continuer.' },
  permis: {
    none: 'Importez le recto et le verso de votre permis de conduire pour continuer.',
    noVerso: 'Importez le verso de votre permis de conduire pour continuer.',
  },
}

function KycImportScreen({ onBack, onContinue, docType = 'cni', direction = 'forward' }) {
  const [rulesOpen, setRulesOpen] = useState(true)
  const [rectoFile, setRectoFile] = useState(null)
  const [versoFile, setVersoFile] = useState(null)
  const rectoInputRef = useRef(null)
  const versoInputRef = useRef(null)
  const cfg = KYC_IMPORT_CONFIG[docType]

  const ACCEPT = '.pdf,.jpeg,.jpg,.png,image/*'

  return (
    <div className={`kyc-import-screen kyc-screen--${direction}`}>
      <input ref={rectoInputRef} type="file" accept={ACCEPT} style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) setRectoFile(e.target.files[0]); e.target.value = '' }} />
      {cfg.twoSides && <input ref={versoInputRef} type="file" accept={ACCEPT} style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) setVersoFile(e.target.files[0]); e.target.value = '' }} />}

      <div className="otp-screen__navbar">
        <button className="otp-screen__back" onClick={onBack} aria-label="Retour">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="otp-screen__navbar-title">Débloquer mon porte-monnaie</span>
      </div>

      <div className="kyc-import-screen__body">
        <KycProgressTracker step={1} />

        <div className="kyc-import-screen__content">
          <h1 className="kyc-import-screen__title">{cfg.title}</h1>

          <div className="kyc-import-upload">
            <div className="kyc-import-upload__buttons">
              <button
                className={`kyc-import-btn${rectoFile ? ' kyc-import-btn--done' : ' kyc-import-btn--active'}`}
                onClick={() => rectoInputRef.current?.click()}
              >
                <img src={rectoFile ? imgImportCheck : imgImportAdd} width="16" height="16" alt="" aria-hidden="true" />
                <span className="kyc-import-btn__label">{rectoFile ? rectoFile.name : (cfg.twoSides ? 'Ajouter le document recto' : 'Ajouter le document')}</span>
              </button>
              {cfg.twoSides && (rectoFile ? (
                <button
                  className={`kyc-import-btn${versoFile ? ' kyc-import-btn--done' : ' kyc-import-btn--active'}`}
                  onClick={() => versoInputRef.current?.click()}
                >
                  <img src={versoFile ? imgImportCheck : imgImportAdd} width="16" height="16" alt="" aria-hidden="true" />
                  <span className="kyc-import-btn__label">{versoFile ? versoFile.name : 'Ajouter le document verso'}</span>
                </button>
              ) : (
                <div className="kyc-import-btn kyc-import-btn--empty">
                  <img src={imgImportNoPhoto} width="16" height="16" alt="" aria-hidden="true" />
                  <span className="kyc-import-btn__label">Ajouter le document verso</span>
                </div>
              ))}
            </div>
            <p className="kyc-import-hint">La pièce d'identité doit être parfaitement lisible et ne pas dépasser 7 Mo. Formats acceptés&nbsp;: pdf, jpeg, jpg et png</p>
          </div>

          <div className="kyc-import-rules">
            <button className="kyc-import-rules__header" onClick={() => setRulesOpen(o => !o)} aria-expanded={rulesOpen}>
              <div className="kyc-import-rules__header-left">
                <div className="kyc-import-rules__icon">
                  <img src={imgImportQuestion} width="16" height="16" alt="" aria-hidden="true" />
                </div>
                <span className="kyc-import-rules__header-text">Quelles sont les règles à respecter&nbsp;?</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ transform: rulesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                <path d="M4 6l4 4 4-4" stroke="#3d4d5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {rulesOpen && (
              <div className="kyc-import-rules__body">
                <ul className="kyc-import-rules__list">
                  {cfg.rules.map((rule, i) => (
                    <li key={i} className="kyc-import-rules__item">
                      <img src={imgImportCheck} width="16" height="16" alt="" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }} />
                      <p>{rule}</p>
                    </li>
                  ))}
                </ul>

                <p className="kyc-import-rules__warning">Tout document modifié, falsifié ou spécimen entraînera la suspension définitive de votre compte et le blocage de votre argent.</p>

                <div className="kyc-import-illus-list">
                  {cfg.illustrations.map((illus, i) => (
                    <div key={i} className="kyc-import-illus-card">
                      <div className="kyc-import-illus-card__images">
                        {illus.images.map((img, j) => (
                          <div key={j} className="kyc-import-illus-card__check-wrap">
                            <div className="kyc-import-illus-card__img-check">
                              <img src={img.src} width={img.w} height={img.h} alt="" aria-hidden="true" />
                            </div>
                            <div className="kyc-import-illus-card__check">
                              <img src={imgImportCheck} width="16" height="16" alt="" aria-hidden="true" />
                            </div>
                          </div>
                        ))}
                      </div>
                      <hr className="kyc-import-illus-card__divider" />
                      <p className="kyc-import-illus-card__label">{illus.name}</p>
                      {illus.sub && <p className="kyc-import-illus-card__sublabel">{illus.sub}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="kyc-import-screen__footer">
        <button className="btn-primary btn-primary--full" onClick={onContinue}>Continuer</button>
      </div>
    </div>
  )
}

const NAME_RE = /^[a-zA-ZÀ-ÿ\s\-']+$/

function isValidDate(str) {
  const parts = str.split('/')
  if (parts.length !== 3 || parts[2].length < 4) return false
  const [d, m, y] = parts.map(Number)
  if (m < 1 || m > 12 || d < 1 || d > 31) return false
  const date = new Date(y, m - 1, d)
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d
}

function isAdult(str) {
  const [dd, mm, yyyy] = str.split('/').map(Number)
  const birth = new Date(yyyy, mm - 1, dd)
  const today = new Date()
  const age = today.getFullYear() - birth.getFullYear()
  const diff = today.getMonth() - birth.getMonth()
  return age > 18 || (age === 18 && (diff > 0 || (diff === 0 && today.getDate() >= birth.getDate())))
}

const PIN_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="rgba(21,34,51,0.72)" />
  </svg>
)

function KycManualEntryScreen({ onBack, onContinue, direction = 'forward' }) {
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [naissance, setNaissance] = useState('')
  const [adresse, setAdresse] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const adresseTimerRef = useRef(null)
  const suggestionsRef = useRef(null)

  function handleDate(raw) {
    const digits = raw.replace(/\D/g, '').slice(0, 8)
    let formatted = digits
    if (digits.length > 4) formatted = digits.slice(0, 2) + '/' + digits.slice(2, 4) + '/' + digits.slice(4)
    else if (digits.length > 2) formatted = digits.slice(0, 2) + '/' + digits.slice(2)
    setNaissance(formatted)
  }

  function handleAdresseChange(val) {
    setAdresse(val)
    if (adresseTimerRef.current) clearTimeout(adresseTimerRef.current)
    if (val.length < 3) { setSuggestions([]); setShowSuggestions(false); return }
    adresseTimerRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(val)}&limit=6`
        )
        const data = await res.json()
        const items = data.features?.map(f => f.properties.label) ?? []
        setSuggestions(items)
        setShowSuggestions(items.length > 0)
      } catch { setSuggestions([]); setShowSuggestions(false) }
    }, 400)
  }

  function selectSuggestion(s) {
    setAdresse(s)
    setSuggestions([])
    setShowSuggestions(false)
  }


  return (
    <div className={`kyc-manual-screen kyc-screen--${direction}`}>
      <div className="otp-screen__navbar">
        <button className="otp-screen__back" onClick={onBack} aria-label="Retour">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="otp-screen__navbar-title">Débloquer mon porte-monnaie</span>
      </div>

      <div className="kyc-manual-screen__body">
        <KycProgressTracker step={1} />
        <div className="kyc-manual-screen__content">
          <div className="kyc-manual-screen__heading">
            <h1 className="kyc-manual-screen__title">Vérification sans pièce d'identité</h1>
            <p className="kyc-manual-screen__subtitle">Sans pièce d'identité, vous n'obtiendrez pas le badge «&nbsp;Vérifié&nbsp;» sur votre profil.</p>
            <p className="kyc-manual-screen__mandatory-hint"><span className="kyc-manual-screen__mandatory-star">*</span> Champs obligatoires</p>
          </div>

          {/* Nom */}
          <div className="kyc-textfield">
            <label className="kyc-textfield__label" htmlFor="kyc-nom">
              Nom <span className="kyc-textfield__mandatory">*</span>
            </label>
            <div className="kyc-textfield__wrapper">
              <input id="kyc-nom" className="kyc-textfield__input" type="text" placeholder="Nom" value={nom}
                onChange={e => setNom(e.target.value)} autoComplete="family-name" />
              {nom && <button className="kyc-textfield__clear" onClick={() => setNom('')} aria-label="Effacer">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="8" fill="rgba(21,34,51,0.32)" /><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </button>}
            </div>
            <p className="kyc-field-helper">Renseignez le(s) même(s) nom(s) que sur votre carte d'identité</p>
          </div>

          {/* Prénom */}
          <div className="kyc-textfield">
            <label className="kyc-textfield__label" htmlFor="kyc-prenom">
              Prénom(s) <span className="kyc-textfield__mandatory">*</span>
            </label>
            <div className="kyc-textfield__wrapper">
              <input id="kyc-prenom" className="kyc-textfield__input" type="text" placeholder="Prénom(s)" value={prenom}
                onChange={e => setPrenom(e.target.value)} autoComplete="given-name" />
              {prenom && <button className="kyc-textfield__clear" onClick={() => setPrenom('')} aria-label="Effacer">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="8" fill="rgba(21,34,51,0.32)" /><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </button>}
            </div>
            <p className="kyc-field-helper">Renseignez le(s) même(s) prénom(s) que sur votre carte d'identité</p>
          </div>

          <hr className="kyc-manual-divider" />

          {/* Date de naissance */}
          <div className="kyc-textfield">
            <label className="kyc-textfield__label" htmlFor="kyc-naissance">
              Date de naissance <span className="kyc-textfield__mandatory">*</span>
            </label>
            <div className="kyc-textfield__wrapper">
              <input id="kyc-naissance" className="kyc-textfield__input" type="text" inputMode="numeric"
                placeholder="jj/mm/aaaa" value={naissance} onChange={e => handleDate(e.target.value)} />
              {naissance && <button className="kyc-textfield__clear" onClick={() => setNaissance('')} aria-label="Effacer">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="8" fill="rgba(21,34,51,0.32)" /><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </button>}
            </div>
          </div>

          {/* Adresse avec autocomplete */}
          <div className="kyc-textfield">
            <label className="kyc-textfield__label" htmlFor="kyc-adresse-manual">
              Adresse de résidence <span className="kyc-textfield__mandatory">*</span>
            </label>
            <div className="kyc-autocomplete" ref={suggestionsRef}>
              <div className={`kyc-textfield__wrapper${showSuggestions ? ' kyc-textfield__wrapper--open' : ''}`}>
                {PIN_ICON}
                <input id="kyc-adresse-manual" className="kyc-textfield__input" type="text" autoComplete="off"
                  placeholder="Saisissez une ville, un code postal" value={adresse}
                  onChange={e => handleAdresseChange(e.target.value)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)} />
                {adresse && <button className="kyc-textfield__clear" onClick={() => { setAdresse(''); setSuggestions([]); setShowSuggestions(false) }} aria-label="Effacer">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="8" fill="rgba(21,34,51,0.32)" /><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </button>}
              </div>
              {showSuggestions && (
                <ul className="kyc-autocomplete__list" role="listbox">
                  {suggestions.map((s, i) => (
                    <li key={i} className="kyc-autocomplete__item" role="option" onMouseDown={() => selectSuggestion(s)}>
                      {PIN_ICON}
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="kyc-manual-legal">
            <p><span className="kyc-manual-legal__link">En savoir plus</span> sur le traitement de mes données personnelles par le prestataire de service de paiement, Adyen.</p>
            <p>En cliquant sur "Envoyer", vous attestez que toutes vos informations ont été vérifiées et que toutes les données fournies, nouvelles ou déjà existantes, sont exactes et à jour.</p>
          </div>
        </div>
      </div>

      <div className="kyc-manual-screen__footer">
        <button className="btn-primary btn-primary--full" onClick={onContinue}>Continuer</button>
      </div>
    </div>
  )
}

function KycIdCardFrontScreen({ onContinue, ...props }) {
  return <KycDocPhotoScreen {...DOC_PHOTO_CONFIG['cni-front']} onTakePhoto={onContinue} onImport={onContinue} {...props} />
}

function KycDocumentScreen({ onBack, onSelectDoc, direction = 'forward' }) {
  const [showLearnMore, setShowLearnMore] = useState(false)
  const DOCS = [
    { id: 'cni',      label: "Carte d'identité",  img: imgKycIdCard },
    { id: 'passport', label: 'Passeport',          img: imgKycPassport },
    { id: 'permis',   label: 'Permis de conduire', img: imgKycDrivingLicense },
  ]

  return (
    <div className={`kyc-doc-screen kyc-screen--${direction}`}>
      <div className="otp-screen__navbar">
        <button className="otp-screen__back" onClick={onBack} aria-label="Retour">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="otp-screen__navbar-title">Débloquer mon porte-monnaie</span>
      </div>

      <div className="kyc-doc-screen__body">
        <KycProgressTracker step={1} />

        <div className="kyc-doc-screen__content">
          <div className="kyc-doc-screen__header">
            <h1 className="kyc-doc-screen__title">Sélectionnez un document d'identité</h1>
            <p className="kyc-doc-screen__subtitle">
              La vérification de votre identité est nécessaire pour sécuriser votre compte.{' '}
              <button className="kyc-doc-screen__link" onClick={() => setShowLearnMore(true)}>En savoir plus</button>
            </p>
          </div>

          <div className="kyc-doc-list">
            {DOCS.map(doc => (
              <button key={doc.id} className="kyc-doc-entry" onClick={() => onSelectDoc(doc.id)}>
                <div className="kyc-doc-entry__illu">
                  <img src={doc.img} height="56" alt="" aria-hidden="true" />
                </div>
                <span className="kyc-doc-entry__label">{doc.label}</span>
                <img src={imgKycChevron} width="16" height="16" alt="" aria-hidden="true" />
              </button>
            ))}
          </div>

          <button className="kyc-doc-screen__no-id" onClick={() => onSelectDoc('manual-entry')}>Je n'ai pas de pièce d'identité</button>

          <p className="kyc-doc-screen__legal">
            Les informations de votre pièce d'identité seront traitées conformément à notre{' '}
            <button className="kyc-doc-screen__link">politique de confidentialité</button>
            {' '}et ne seront jamais partagées avec les autres membres leboncoin.
          </p>
        </div>
      </div>
      {showLearnMore && <KycLearnMoreSheet onClose={() => setShowLearnMore(false)} />}
    </div>
  )
}

function UnlockSheet({ onClose, onStart }) {
  const [dragY, setDragY] = useState(0)
  const [showKyc, setShowKyc] = useState(false)
  const [showDac7, setShowDac7] = useState(false)
  const startY = useRef(0)

  const handlePointerDown = e => {
    e.currentTarget.setPointerCapture(e.pointerId)
    startY.current = e.clientY
  }
  const handlePointerMove = e => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return
    const delta = e.clientY - startY.current
    if (delta > 0) setDragY(delta)
  }
  const handlePointerUp = () => {
    if (dragY > 100) { onClose() }
    else { setDragY(0) }
  }

  return (
    <>
      <div
        className="bottom-sheet-overlay"
        style={{ opacity: Math.max(0, 1 - dragY / 300) }}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="bottom-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="unlock-sheet-title"
        style={{
          transform: `translateY(${dragY}px)`,
          transition: dragY === 0 ? 'transform 0.28s cubic-bezier(0.32,0.72,0,1)' : 'none',
        }}
      >
        <div
          className="bottom-sheet__drag-zone"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          aria-hidden="true"
        >
          <div className="bottom-sheet__handle" />
        </div>
        <div className="bottom-sheet__body">
          <CircleMeter completed={0} total={3} />
          <h2 id="unlock-sheet-title" className="bottom-sheet__title">Débloquez votre porte-monnaie</h2>
          <p className="bottom-sheet__desc">Complétez ces étapes pour pouvoir utiliser votre porte-monnaie.</p>
          <div className="unlock-steps">
            <UnlockStep
              icon={<IconPerson />}
              title="Vérifiez votre identité"
              desc="Pour sécuriser votre compte."
              link="En savoir plus"
              onLink={() => setShowKyc(true)}
            />
            <UnlockStep
              icon={<IconMonument size={20} />}
              title="Ajoutez votre IBAN"
              desc="Pour transférer votre argent vers votre compte bancaire."
            />
            <UnlockStep
              icon={<IconDocument />}
              title="Ajoutez votre numéro fiscal"
              desc="Pour garder votre porte-monnaie actif."
              link="En savoir plus"
              onLink={() => setShowDac7(true)}
            />
          </div>
        </div>
        <div className="bottom-sheet__footer">
          <button className="btn-primary btn-primary--full" onClick={onStart}>
            Commencer
          </button>
        </div>
      </div>
      {showKyc && <KycLearnMoreSheet onClose={() => setShowKyc(false)} />}
      {showDac7 && <Dac7LearnMoreSheet onClose={() => setShowDac7(false)} />}
    </>
  )
}

const BANKS_FR = [
  { id: 'axa',        name: 'AXA Banque',          abbr: 'AX', color: '#00008f', domain: 'axa.fr' },
  { id: 'bp',         name: 'Banque Populaire',    abbr: 'BP', color: '#e4032e', domain: 'banquepopulaire.fr' },
  { id: 'bforbank',   name: 'BforBank',            abbr: 'BF', color: '#0057a8', domain: 'bforbank.com' },
  { id: 'bnp',        name: 'BNP Paribas',         abbr: 'BN', color: '#00965e', domain: 'bnpparibas.com',           logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/85/BNP_Paribas_logo.svg' },
  { id: 'boursorama', name: 'BoursoBank',          abbr: 'BB', color: '#e60028', domain: 'boursobank.com' },
  { id: 'bunq',       name: 'Bunq',                abbr: 'B',  color: '#00c895', domain: 'bunq.com' },
  { id: 'ce',         name: "Caisse d'Épargne",    abbr: 'CE', color: '#6ab023', domain: 'caisse-epargne.fr',        logoUrl: 'https://ce-prod.cloudimg.io/_images_/app/uploads/sites/3/2022/02/17172803/logo-ce-mobile.png?func=bound&w=80&h=80&gravity=auto&optipress=2' },
  { id: 'cic',        name: 'CIC',                 abbr: 'CI', color: '#003d7c', domain: 'cic.fr',                   logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Cic_logo.svg' },
  { id: 'ca',         name: 'Crédit Agricole',     abbr: 'CA', color: '#007731', domain: 'credit-agricole.fr' },
  { id: 'cm',         name: 'Crédit Mutuel',       abbr: 'CM', color: '#003d7c', domain: 'creditmutuel.fr',           logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Cr%C3%A9dit_Mutuel_2022_logo.svg' },
  { id: 'fortuneo',   name: 'Fortuneo',            abbr: 'FO', color: '#43a047', domain: 'fortuneo.fr' },
  { id: 'hello',      name: 'Hello bank!',         abbr: 'HB', color: '#2f3d7e', domain: 'hellobank.fr' },
  { id: 'hsbc',       name: 'HSBC',                abbr: 'HS', color: '#db0011', domain: 'hsbc.com' },
  { id: 'lbp',        name: 'La Banque Postale',   abbr: 'LP', color: '#006fba', domain: 'www.labanquepostale.fr',    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Logo_La_Banque_postale_2022.svg' },
  { id: 'lcl',        name: 'LCL',                 abbr: 'LC', color: '#2b5ca8', domain: 'lcl.fr',                   logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/LCL_banque_logo.svg' },
  { id: 'monabanq',   name: 'Monabanq',            abbr: 'MO', color: '#e4007b', domain: 'monabanq.com' },
  { id: 'n26',        name: 'N26',                 abbr: 'N2', color: '#29a9a4', domain: 'n26.com' },
  { id: 'nickel',     name: 'Nickel',              abbr: 'NI', color: '#ff5a00', domain: 'nickel.eu' },
  { id: 'qonto',      name: 'Qonto',               abbr: 'Q',  color: '#141414', domain: 'qonto.com' },
  { id: 'revolut',    name: 'Revolut',             abbr: 'R',  color: '#191c1f', domain: 'app.revolut.com',          logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Revolut_logo.svg' },
  { id: 'sg',         name: 'Société Générale',    abbr: 'SG', color: '#e4032e', domain: 'groupe.societegenerale.com', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Soci%C3%A9t%C3%A9_G%C3%A9n%C3%A9rale.svg' },
  { id: 'sumeria',    name: 'Sumeria',             abbr: 'SU', color: '#6c47ff', domain: 'lydia-app.com' },
]

function BankBadge({ bank }) {
  const sources = [
    ...(bank.logoUrl ? [bank.logoUrl] : []),
    `https://icon.horse/icon/${bank.domain}`,
    `https://www.google.com/s2/favicons?domain=${bank.domain}&sz=128`,
  ]
  const [attempt, setAttempt] = useState(0)
  if (attempt < sources.length) {
    return (
      <img
        className="kyc-ob-item__logo"
        src={sources[attempt]}
        alt={bank.name}
        onError={() => setAttempt(a => a + 1)}
      />
    )
  }
  return (
    <span className="kyc-ob-item__badge" style={{ background: bank.color }}>
      {bank.abbr}
    </span>
  )
}

function KycOpenBankingScreen({ onBack, onSelect, direction = 'forward' }) {
  const [query, setQuery] = useState('')
  const [pendingBank, setPendingBank] = useState(null)
  const filtered = query.trim()
    ? BANKS_FR.filter(b => b.name.toLowerCase().includes(query.toLowerCase()))
    : BANKS_FR

  return (
    <div className={`kyc-data-screen kyc-screen--${direction}`}>
      <div className="otp-screen__navbar">
        <button className="otp-screen__back" onClick={onBack} aria-label="Retour">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="otp-screen__navbar-title">Débloquer mon porte-monnaie</span>
      </div>

      <div className="kyc-ob-screen__body">
        <div className="kyc-ob-screen__content">
          <div className="kyc-ob-screen__header">
            <h2 className="kyc-data-screen__title">Choisissez votre banque</h2>
            <p className="kyc-iban-screen__subtitle">Vous serez redirigé vers votre application bancaire pour autoriser la connexion.</p>
          </div>

          <div className="kyc-textfield__wrapper kyc-ob-search">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
              <circle cx="8.5" cy="8.5" r="5.5" stroke="rgba(21,34,51,0.56)" strokeWidth="1.5" />
              <path d="M13 13l3.5 3.5" stroke="rgba(21,34,51,0.56)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              className="kyc-textfield__input"
              type="text"
              placeholder="Rechercher une banque"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            {query && (
              <button className="kyc-textfield__clear" onClick={() => setQuery('')} aria-label="Effacer">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="8" fill="rgba(21,34,51,0.32)" />
                  <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>

          <ul className="kyc-ob-list">
            {filtered.map(bank => (
              <li key={bank.id}>
                <button className="kyc-ob-item" onClick={() => setPendingBank(bank)}>
                  <BankBadge bank={bank} />
                  <span className="kyc-ob-item__name">{bank.name}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="kyc-ob-item__chevron">
                    <path d="M9 18l6-6-6-6" stroke="rgba(21,34,51,0.40)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="kyc-ob-empty">Aucune banque trouvée pour « {query} ».</li>
            )}
          </ul>
        </div>
      </div>

      {pendingBank && (
        <>
          <div className="kyc-ob-sheet__backdrop" onClick={() => setPendingBank(null)} />
          <div className="kyc-ob-sheet">
            <div className="kyc-ob-sheet__handle" />
            <div className="kyc-ob-sheet__bank">
              <BankBadge bank={pendingBank} />
              <span className="kyc-ob-sheet__bank-name">{pendingBank.name}</span>
            </div>
            <h3 className="kyc-ob-sheet__title">Connectez votre banque</h3>
            <p className="kyc-ob-sheet__desc">
              Connectez-vous à {pendingBank.name} pour récupérer votre IBAN automatiquement et vous permettre de transférer le solde de votre porte-monnaie vers votre compte bancaire.
            </p>
            <div className="kyc-ob-sheet__actions">
              <button className="btn-primary btn-primary--full" onClick={() => onSelect(pendingBank)}>
                Accepter
              </button>
              <button className="btn-outlined-support btn-outlined-support--full" onClick={() => setPendingBank(null)}>
                Refuser
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function TinIllustration() {
  const a = (t, r, b, l, extra) => ({ position: 'absolute', top: t, right: r, bottom: b, left: l, ...extra })
  const fill = { position: 'absolute', inset: 0, maxWidth: 'none', width: '100%', height: '100%', display: 'block' }
  const docImgs = [
    [imgTinG120, 'calc(11.86% + 0.17px)', '85.41%', 'calc(76.79% - 0.34px)', '5.77%'],
    [imgTinG121, 'calc(12.27% + 0.18px)', '23.89%', 'calc(72.89% - 0.4px)', '27.11%'],
    [imgTinG123, 'calc(27.11% + 0.4px)', '79.92%', 'calc(60.52% - 0.58px)', '5.49%'],
    [imgTinVec,  'calc(60.57% + 0.89px)', '71.49%', 'calc(33.83% - 0.97px)', '11.63%'],
    [imgTinG125, 'calc(72.07% + 1.06px)', '6.61%',  'calc(13.36% - 1.27px)', '78.17%'],
    [imgTinVec1, 'calc(71.76% + 1.05px)', '84.05%', 'calc(25.34% - 1.1px)',  '8.13%'],
    [imgTinVec2, 'calc(78.55% + 1.15px)', '81.64%', 'calc(18.55% - 1.2px)',  '8.25%'],
    [imgTinVec3, 'calc(85.19% + 1.25px)', '70.74%', 'calc(11.91% - 1.29px)', '8.25%'],
    [imgTinVec4, 'calc(72.34% + 1.06px)', '67.6%',  'calc(25.58% - 1.09px)', '19.51%'],
    [imgTinVec4, 'calc(79.28% + 1.16px)', '67.6%',  'calc(18.65% - 1.19px)', '19.51%'],
    [imgTinG124, 'calc(41.19% + 0.6px)',  '5.56%',  'calc(45.18% - 0.8px)',  '78.09%'],
    [imgTinG122, 'calc(43.39% + 0.64px)', '88.37%', 'calc(47.38% - 0.77px)', '5.77%'],
  ]
  const refVecs = [
    [imgTinVec5,  '59.74%','24.76%','37.43%','74.05%'], [imgTinVec6,  '59.74%','26.15%','37.43%','72.5%'],
    [imgTinVec7,  '59.74%','27.61%','37.43%','71.18%'], [imgTinVec8,  '59.74%','29.11%','37.48%','69.58%'],
    [imgTinVec9,  '59.74%','30.71%','37.43%','67.95%'], [imgTinVec10, '59.72%','32.15%','37.48%','66.92%'],
    [imgTinVec11, '58.3%', '33.36%','37.43%','65.29%'], [imgTinVec12, '58.56%','34.74%','37.48%','64.19%'],
    [imgTinVec11, '58.3%', '35.92%','37.43%','62.73%'], [imgTinVec13, '59.72%','37.36%','37.48%','61.71%'],
    [imgTinVec14, '59.74%','39.35%','37.43%','59.46%'], [imgTinVec15, '59.74%','40.76%','37.43%','57.81%'],
    [imgTinVec16, '58.59%','42.09%','37.48%','55.81%'],
  ]
  return (
    <div style={{ position: 'relative', width: '256px', height: '131.83px', flexShrink: 0, margin: '0 auto' }} aria-hidden="true">
      <div style={a(0, 0, '6.74%', 0, { background: 'white', borderBottom: '1.468px dashed #a8b4c0', overflow: 'hidden' })}>
        {docImgs.map(([src, t, r, b, l], i) => (
          <div key={i} style={a(t, r, b, l)}>
            <img alt="" src={src} style={fill} />
          </div>
        ))}
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 'calc(0% - 1.47px)', left: 0, borderTop: '1.468px solid #bfdfe3', borderLeft: '1.468px solid #bfdfe3', borderRight: '1.468px solid #bfdfe3', borderRadius: '4.404px 4.404px 0 0', pointerEvents: 'none' }} />
        <div style={a('calc(62.66% + 0.92px)', '65.87%', 'calc(8.12% - 1.35px)', '6.14%', { border: '1.468px solid #234678', borderRadius: '4.404px' })} />
        <div style={a('calc(58.15% + 0.85px)', '64.76%', 'calc(21.45% - 1.15px)', '5.29%', { border: '1.468px solid #d93426' })} />
        <div style={{ position: 'absolute', left: '88.81px', top: '83.69px', width: '28.623px', height: '17.091px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ flexShrink: 0, transform: 'rotate(30.84deg)', height: 0, position: 'relative', width: '33.337px' }}>
            <div style={{ position: 'absolute', top: '-4.24px', bottom: '-4.24px', left: 0, right: 0 }}>
              <img alt="" src={imgTinArrow} style={{ display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} />
            </div>
          </div>
        </div>
      </div>
      <div style={a('60.61%', '7.08%', '3.76%', '49.34%', { background: 'white', border: '1.468px solid #234678', borderRadius: '5.872px' })}>
        <div style={a('calc(36.44% - 0.4px)', 'calc(46.91% - 0.09px)', 'calc(51.57% + 0.05px)', 'calc(8.33% - 1.22px)')}>
          <img alt="" src={imgTinLabel} style={fill} />
        </div>
        <div style={a('calc(60.66% + 0.31px)', 'calc(30.54% - 0.57px)', 'calc(28.01% - 0.65px)', 'calc(8.1% - 1.23px)')}>
          <img alt="" src={imgTinNum} style={fill} />
        </div>
      </div>
      <div style={{ position: 'absolute', top: '54.98%', right: '21.19%', bottom: '32.98%', left: '52.4%', background: '#234678', borderRadius: '11.744px' }} />
      {refVecs.map(([src, t, r, b, l], i) => (
        <div key={`v${i}`} style={a(t, r, b, l)}>
          <img alt="" src={src} style={fill} />
        </div>
      ))}
      <div style={{ position: 'absolute', top: '51.48%', right: '1.89%', bottom: 0, left: '45.87%', border: '1.468px solid #d93426' }} />
    </div>
  )
}

function KycSelect({ id, title, value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        id={id}
        className="kyc-textfield__wrapper kyc-select__trigger"
        onClick={() => setOpen(true)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={`kyc-select__display${!value ? ' kyc-select__display--placeholder' : ''}`}>
          {value || placeholder || 'Sélectionnez'}
        </span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="kyc-select__chevron" style={{ pointerEvents: 'none', flexShrink: 0 }}>
          <path d="M5 7.5l5 5 5-5" stroke="rgba(21,34,51,0.56)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="kyc-bottomsheet-overlay" onClick={() => setOpen(false)}>
          <div className="kyc-bottomsheet" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
            <div className="kyc-bottomsheet__handle" aria-hidden="true" />
            <p className="kyc-bottomsheet__title">{title}</p>
            <ul className="kyc-bottomsheet__list" role="listbox">
              {options.map(opt => (
                <li
                  key={opt}
                  role="option"
                  aria-selected={opt === value}
                  className={`kyc-bottomsheet__item${opt === value ? ' kyc-bottomsheet__item--selected' : ''}`}
                  onClick={() => { onChange(opt); setOpen(false) }}
                >
                  <span>{opt}</span>
                  {opt === value && (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                      <path d="M4 10l4.5 4.5L16 6" stroke="var(--color-support)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

const EU_COUNTRIES = [
  'Allemagne','Autriche','Belgique','Bulgarie','Chypre','Croatie','Danemark',
  'Espagne','Estonie','Finlande','France','Grèce','Hongrie','Irlande','Italie',
  'Lettonie','Lituanie','Luxembourg','Malte','Pays-Bas','Pologne','Portugal',
  'République tchèque','Roumanie','Slovaquie','Slovénie','Suède',
]

const WORLD_COUNTRIES = [
  'Afghanistan','Afrique du Sud','Albanie','Algérie','Allemagne','Andorre','Angola',
  'Arabie Saoudite','Argentine','Arménie','Australie','Autriche','Azerbaïdjan',
  'Bahreïn','Bangladesh','Belgique','Biélorussie','Bolivie','Bosnie-Herzégovine',
  'Brésil','Bulgarie','Cambodge','Cameroun','Canada','Chili','Chine','Chypre',
  'Colombie','Congo','Corée du Sud','Costa Rica',"Côte d'Ivoire",'Croatie','Cuba',
  'Danemark','Égypte','Émirats arabes unis','Équateur','Espagne','Estonie',
  'États-Unis','Éthiopie','Finlande','France','Gabon','Géorgie','Ghana','Grèce',
  'Guatemala','Hongrie','Inde','Indonésie','Irak','Iran','Irlande','Islande',
  'Israël','Italie','Jamaïque','Japon','Jordanie','Kazakhstan','Kenya','Kosovo',
  'Koweït','Laos','Lettonie','Liban','Libye','Lituanie','Luxembourg',
  'Macédoine du Nord','Madagascar','Malaisie','Mali','Malte','Maroc','Maurice',
  'Mauritanie','Mexique','Moldavie','Monaco','Mongolie','Monténégro','Mozambique',
  'Myanmar','Namibie','Népal','Nicaragua','Niger','Nigéria','Norvège',
  'Nouvelle-Zélande','Oman','Ouganda','Ouzbékistan','Pakistan','Panama','Paraguay',
  'Pays-Bas','Pérou','Philippines','Pologne','Portugal','Qatar',
  'République dominicaine','République tchèque','Roumanie','Royaume-Uni','Russie',
  'Rwanda','Saint-Marin','Salvador','Sénégal','Serbie','Sierra Leone','Singapour',
  'Slovaquie','Slovénie','Somalie','Soudan','Sri Lanka','Suède','Suisse','Syrie',
  'Taïwan','Tanzanie','Tchad','Thaïlande','Tunisie','Turquie','Ukraine','Uruguay',
  'Venezuela','Viêt Nam','Yémen','Zimbabwe',
]

function KycFiscaliteScreen({ onBack, onConfirm, direction = 'forward' }) {
  const [resident, setResident] = useState('oui')
  const [euCountry, setEuCountry] = useState('France')
  const [tin, setTin] = useState('')
  const [birthCountry, setBirthCountry] = useState('')
  const [birthCity, setBirthCity] = useState('')
  const [showTinHelp, setShowTinHelp] = useState(false)
  const [showDac7, setShowDac7] = useState(false)

  function formatTin(val) {
    const digits = val.replace(/\D/g, '').slice(0, 13)
    return digits.replace(/(\d{2})(?=\d)/g, '$1 ').trim()
  }

  return (
    <div className={`kyc-data-screen kyc-screen--${direction}`}>
      <div className="otp-screen__navbar">
        <button className="otp-screen__back" onClick={onBack} aria-label="Retour">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="otp-screen__navbar-title">Débloquer mon porte-monnaie</span>
      </div>

      <div className="kyc-data-screen__body">
        <KycProgressTracker step={3} />
        <div className="kyc-data-screen__content">

          <div className="kyc-fiscalite__header">
            <h2 className="kyc-data-screen__title">Numéro d'identification fiscale</h2>
            <p className="kyc-fiscalite__required">* Champs obligatoires</p>
            <p className="kyc-fiscalite__subtitle">
              La réglementation DAC7 nous impose de collecter vos informations fiscales.{' '}
              <button className="kyc-fiscalite__link" type="button" onClick={() => setShowDac7(true)}>En savoir plus</button>
            </p>
          </div>

          <div className="kyc-textfield">
            <div className="kyc-textfield__label-row">
              <label className="kyc-textfield__label">Je suis résident de l'Union Européenne</label>
              <span className="kyc-textfield__mandatory">*</span>
            </div>
            <div className="kyc-segmented" role="group" aria-label="Résident UE">
              <span
                className="kyc-segmented__pill"
                aria-hidden="true"
                style={{ transform: resident === 'non' ? 'translateX(calc(100% + 4px))' : 'translateX(0)' }}
              />
              <button
                className={`kyc-segmented__option${resident === 'oui' ? ' kyc-segmented__option--active' : ''}`}
                onClick={() => setResident('oui')}
              >Oui</button>
              <button
                className={`kyc-segmented__option${resident === 'non' ? ' kyc-segmented__option--active' : ''}`}
                onClick={() => setResident('non')}
              >Non</button>
            </div>
          </div>

          {resident === 'oui' ? (
            <>
              <div className="kyc-textfield">
                <div className="kyc-textfield__label-row">
                  <label className="kyc-textfield__label" htmlFor="kyc-pays">Pays</label>
                  <span className="kyc-textfield__mandatory">*</span>
                </div>
                <KycSelect
                  id="kyc-pays"
                  title="Pays"
                  value={euCountry}
                  onChange={setEuCountry}
                  options={EU_COUNTRIES}
                />
              </div>

              <div className="kyc-textfield">
                <div className="kyc-textfield__label-row">
                  <label className="kyc-textfield__label" htmlFor="kyc-tin">Numéro fiscal</label>
                  <span className="kyc-textfield__mandatory">*</span>
                </div>
                <div className="kyc-textfield__wrapper">
                  <input
                    id="kyc-tin"
                    className="kyc-textfield__input"
                    type="text"
                    inputMode="numeric"
                    placeholder="00 00 000 000 000"
                    value={tin}
                    onChange={e => setTin(formatTin(e.target.value))}
                  />
                </div>
                <button className="kyc-fiscalite__helper-link" type="button" onClick={() => setShowTinHelp(true)}>Où trouver mon numéro fiscal ?</button>
              </div>

              <p className="kyc-fiscalite__hint">
                Si vous payez des impôts dans plus d'un pays, vous pouvez ajouter plusieurs numéros d'identification fiscale.
              </p>
            </>
          ) : (
            <div className="kyc-fiscalite__lieu-naissance">
              <div className="kyc-fiscalite__lieu-header">
                <p className="kyc-fiscalite__lieu-title">Lieu de naissance</p>
                <p className="kyc-fiscalite__lieu-desc">En l'absence d'un numéro fiscal de l'UE, vous devez fournir vos informations de lieu de naissance.</p>
              </div>

              <div className="kyc-textfield">
                <div className="kyc-textfield__label-row">
                  <label className="kyc-textfield__label" htmlFor="kyc-birth-country">Pays de naissance</label>
                  <span className="kyc-textfield__mandatory">*</span>
                </div>
                <KycSelect
                  id="kyc-birth-country"
                  title="Pays de naissance"
                  value={birthCountry}
                  onChange={setBirthCountry}
                  options={WORLD_COUNTRIES}
                  placeholder="Sélectionnez votre pays de naissance"
                />
              </div>

              <div className="kyc-textfield">
                <div className="kyc-textfield__label-row">
                  <label className="kyc-textfield__label" htmlFor="kyc-birth-city">Ville de naissance</label>
                  <span className="kyc-textfield__mandatory">*</span>
                </div>
                <div className="kyc-textfield__wrapper">
                  <input
                    id="kyc-birth-city"
                    className="kyc-textfield__input"
                    type="text"
                    placeholder=""
                    value={birthCity}
                    onChange={e => setBirthCity(e.target.value)}
                  />
                  {birthCity && (
                    <button className="kyc-textfield__clear" onClick={() => setBirthCity('')} aria-label="Effacer">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <circle cx="8" cy="8" r="8" fill="rgba(21,34,51,0.32)" />
                        <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          <p className="kyc-fiscalite__legal">
            Renseignez-vous sur les finalités du traitement de mes données personnelles, les destinataires, le responsable du traitement, les durées de conservation, les coordonnées du DPO et mes droits.
          </p>

        </div>
      </div>

      <div className="kyc-data-screen__footer">
        <button className="btn-primary btn-primary--full" onClick={onConfirm}>Valider</button>
      </div>

      {showDac7 && <Dac7LearnMoreSheet onClose={() => setShowDac7(false)} />}

      {showTinHelp && (
        <div className="kyc-bottomsheet-overlay" onClick={() => setShowTinHelp(false)}>
          <div className="kyc-bottomsheet kyc-bottomsheet--hug" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
            <div className="kyc-bottomsheet__handle" aria-hidden="true" />
            <div className="kyc-tinhelp">
              <p className="kyc-tinhelp__title">Où trouver mon Numéro Fiscal&nbsp;?</p>
              <p className="kyc-tinhelp__body">Votre Numéro Fiscal figure en haut de la première page de votre dernière déclaration de revenus. Vous pouvez également le retrouver sur les principaux documents fiscaux qui vous sont adressés (avis d'impôt sur le revenu et d'impôts locaux, etc.).</p>
              <TinIllustration />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const LOCK_ICON = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <rect x="4" y="9" width="12" height="9" rx="2" stroke="rgba(21,34,51,0.56)" strokeWidth="1.5" />
    <path d="M7 9V6.5a3 3 0 016 0V9" stroke="rgba(21,34,51,0.56)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const ARROW_RIGHT_ICON = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const FR_IBAN_RE = /^FR\d{2}[0-9A-Z]{23}$/

function formatIban(raw) {
  const stripped = raw.replace(/\s/g, '').toUpperCase()
  return stripped.match(/.{1,4}/g)?.join(' ') ?? stripped
}

function KycIbanScreen({ onBack, onConfirm, onOpenBanking, direction = 'forward' }) {
  const [iban, setIban] = useState('')

  function handleIbanChange(e) {
    const raw = e.target.value.replace(/\s/g, '').toUpperCase().replace(/[^A-Z0-9]/g, '')
    if (raw.length <= 27) setIban(raw.length ? formatIban(raw) : '')
  }

  return (
    <div className={`kyc-data-screen kyc-screen--${direction}`}>
      <div className="otp-screen__navbar">
        <button className="otp-screen__back" onClick={onBack} aria-label="Retour">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="otp-screen__navbar-title">Débloquer mon porte-monnaie</span>
      </div>

      <div className="kyc-data-screen__body">
        <KycProgressTracker step={2} />

        <div className="kyc-data-screen__content">
          <div className="kyc-iban-screen__header">
            <h2 className="kyc-data-screen__title">Ajoutez votre IBAN</h2>
            <p className="kyc-iban-screen__subtitle">Votre IBAN est nécessaire pour transférer votre argent vers votre compte bancaire.</p>
          </div>

          <button className="iban-link-card" onClick={onOpenBanking || onConfirm}>
            <div className="iban-link-card__left">
              <span className="iban-tag iban-tag--recommande">Recommandé</span>
              <p className="iban-link-card__title">Ajouter mon IBAN en quelques clics</p>
              <p className="iban-link-card__desc">En vous connectant via votre application bancaire, votre IBAN est récupéré automatiquement.</p>
            </div>
            <div className="iban-link-card__arrow">{ARROW_RIGHT_ICON}</div>
          </button>

          <div className="iban-divider-ou">
            <div className="iban-divider-ou__line" />
            <span className="iban-divider-ou__text">ou</span>
            <div className="iban-divider-ou__line" />
          </div>

          <div className="kyc-textfield">
            <label className="kyc-textfield__label" htmlFor="kyc-iban">
              Saisir mon IBAN <span className="kyc-textfield__mandatory">(obligatoire)</span>
            </label>
            <div className="kyc-textfield__wrapper">
              {LOCK_ICON}
              <input
                id="kyc-iban"
                className="kyc-textfield__input"
                type="text"
                inputMode="text"
                autoCapitalize="characters"
                placeholder="FR76 XXXX XXXX XXXX XXXX XXXX XXX"
                value={iban}
                onChange={handleIbanChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="kyc-data-screen__footer">
        <button className="btn-primary btn-primary--full" onClick={onConfirm}>Valider</button>
      </div>
    </div>
  )
}

function KycConfirmationScreen({ onClose, direction = 'forward' }) {
  const [showLearnMore, setShowLearnMore] = useState(false)
  return (
    <div className={`kyc-confirm-screen kyc-screen--${direction}`}>
      <div className="otp-screen__navbar">
        <span className="otp-screen__navbar-title">Débloquer mon porte-monnaie</span>
      </div>

      <div className="kyc-confirm-screen__body">
        <div className="kyc-confirm-check" aria-hidden="true">
          <svg viewBox="0 0 120 120" fill="none" className="kyc-confirm-check__svg" aria-hidden="true">
            <circle cx="60" cy="60" r="60" fill="#e0f2e9" className="kyc-confirm-check__circle" />
            <path d="M34 63l18 18 34-34" stroke="#1d6340" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="kyc-confirm-check__path" />
          </svg>
        </div>

        <h1 className="kyc-confirm-screen__title">Votre demande a bien été enregistrée</h1>

        <div className="kyc-confirm-card">
          <p className="kyc-confirm-card__title">État de votre demande</p>

          <div className="kyc-confirm-steps">
            <div className="kyc-confirm-step">
              <div className="kyc-confirm-step__left">
                <div className="kyc-confirm-step__dot kyc-confirm-step__dot--success">
                  <img src={imgConfirmCheck} width="16" height="16" alt="" aria-hidden="true" />
                </div>
                <div className="kyc-confirm-step__line" />
              </div>
              <p className="kyc-confirm-step__label">Ajout de votre IBAN</p>
            </div>

            <div className="kyc-confirm-step">
              <div className="kyc-confirm-step__left">
                <div className="kyc-confirm-step__dot kyc-confirm-step__dot--success">
                  <img src={imgConfirmCheck} width="16" height="16" alt="" aria-hidden="true" />
                </div>
                <div className="kyc-confirm-step__line" />
              </div>
              <p className="kyc-confirm-step__label">Numéro d'identification fiscale</p>
            </div>

            <div className="kyc-confirm-step">
              <div className="kyc-confirm-step__left">
                <div className="kyc-confirm-step__dot kyc-confirm-step__dot--support">
                  <img src={imgConfirmSandglass} width="16" height="16" alt="" aria-hidden="true" />
                </div>
                <div className="kyc-confirm-step__line" />
              </div>
              <div className="kyc-confirm-step__content">
                <p className="kyc-confirm-step__label kyc-confirm-step__label--bold">Vérification de l'identité en cours</p>
                <p className="kyc-confirm-step__sublabel">Cette étape peut prendre de quelques minutes à 3 jours ouvrés. <button className="kyc-confirm-step__link" type="button" onClick={() => setShowLearnMore(true)}>En savoir plus.</button></p>
              </div>
            </div>

            <div className="kyc-confirm-step kyc-confirm-step--last">
              <div className="kyc-confirm-step__left">
                <div className="kyc-confirm-step__dot kyc-confirm-step__dot--neutral">
                  <img src={imgConfirmPiggyBank} width="16" height="16" alt="" aria-hidden="true" />
                </div>
              </div>
              <p className="kyc-confirm-step__label">Vous pouvez utiliser votre porte-monnaie&nbsp;!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="kyc-confirm-screen__footer">
        <button className="btn-primary btn-primary--full" onClick={onClose}>Fermer</button>
      </div>

      {showLearnMore && <KycLearnMoreSheet onClose={() => setShowLearnMore(false)} />}
    </div>
  )
}

function WalletKycStatusCard({ onLearnMore }) {
  return (
    <div className="kyc-confirm-card">
      <p className="kyc-confirm-card__title">État de votre demande</p>
      <div className="kyc-confirm-steps">
        <div className="kyc-confirm-step">
          <div className="kyc-confirm-step__left">
            <div className="kyc-confirm-step__dot kyc-confirm-step__dot--success">
              <img src={imgConfirmCheck} width="16" height="16" alt="" aria-hidden="true" />
            </div>
            <div className="kyc-confirm-step__line" />
          </div>
          <p className="kyc-confirm-step__label">Informations envoyées</p>
        </div>
        <div className="kyc-confirm-step">
          <div className="kyc-confirm-step__left">
            <div className="kyc-confirm-step__dot kyc-confirm-step__dot--support">
              <img src={imgConfirmSandglass} width="16" height="16" alt="" aria-hidden="true" />
            </div>
            <div className="kyc-confirm-step__line" />
          </div>
          <div className="kyc-confirm-step__content">
            <p className="kyc-confirm-step__label kyc-confirm-step__label--bold">Vérification de l'identité en cours</p>
            <p className="kyc-confirm-step__sublabel">Cette étape peut prendre de quelques minutes à 3 jours ouvrés. <button className="kyc-confirm-step__link" type="button" onClick={onLearnMore}>En savoir plus.</button></p>
          </div>
        </div>
        <div className="kyc-confirm-step kyc-confirm-step--last">
          <div className="kyc-confirm-step__left">
            <div className="kyc-confirm-step__dot kyc-confirm-step__dot--neutral">
              <img src={imgConfirmPiggyBank} width="16" height="16" alt="" aria-hidden="true" />
            </div>
          </div>
          <p className="kyc-confirm-step__label">Vous pouvez utiliser votre porte-monnaie&nbsp;!</p>
        </div>
      </div>
    </div>
  )
}

export default function WalletHome({
  balance, locked, kycPending, completedSteps, steps, ibanMasked,
  transferStep, setTransferStep, transactions,
  protoUser,
  onUnlock, onKycComplete, onGoToStep, onToggleLocked, onAddBalance, onReturnToWallet, onTabChange, onBack,
}) {
  const stepsRemaining = 3 - completedSteps
  const nextStep = Object.keys(steps).find(k => steps[k] === 'todo') ?? null
  const [showUnlockSheet, setShowUnlockSheet] = useState(false)
  const [showKycLearnMore, setShowKycLearnMore] = useState(false)
  const [kycScreen, setKycScreen] = useState(null)
  const [prevKycScreen, setPrevKycScreen] = useState(null)
  const [navDirection, setNavDirection] = useState('up')
  const kycTimerRef = useRef(null)

  const kycNavigate = (screen, dir = 'forward') => {
    if (kycTimerRef.current) clearTimeout(kycTimerRef.current)
    setNavDirection(dir)
    if (screen === null) {
      setKycScreen(null)
      setPrevKycScreen(null)
      return
    }
    setPrevKycScreen(kycScreen)
    setKycScreen(screen)
    kycTimerRef.current = setTimeout(() => {
      setPrevKycScreen(null)
      kycTimerRef.current = null
    }, 340)
  }

  const kycShortcut = (num) => {
    if (num === 1) kycNavigate('document-select', 'forward')
    else if (num === 2) kycNavigate('iban', 'forward')
    else if (num === 3) kycNavigate('fiscalite', 'forward')
  }

  return (
    <KycShortcutCtx.Provider value={kycShortcut}>
    <div className="wallet-home">
      <Navbar title="Mon porte-monnaie" showBack onBack={onBack} />

      <div className="wallet-home__content">
        <div className="wallet-card">
          <div className="wallet-card__header">
            <img className="wallet-card__ornament" src={walletOrnament} alt="" aria-hidden="true" />
            <div className="wallet-card__balance">
              <span className="wallet-card__label">Solde disponible</span>
              <span className="wallet-card__amount">{formatBalance(balance)}</span>
            </div>
            {locked && <div className="wallet-card__overlay" aria-hidden="true" />}
            {locked ? (
              <button className="btn-primary wallet-card__unlock-btn" onClick={() => setShowUnlockSheet(true)}>
                Débloquer mon porte-monnaie
              </button>
            ) : (
              <button className="btn-tinted" disabled={kycPending} onClick={kycPending ? undefined : () => setTransferStep('confirm')}>
                Transférer
                <IconMonument size={18} />
              </button>
            )}
          </div>
        </div>

        {kycPending && <WalletKycStatusCard onLearnMore={() => setShowKycLearnMore(true)} />}

        <div className="wallet-ops">
          <h2 className="wallet-ops__title">Liste des opérations</h2>

          <div className="chip-bar" role="group" aria-label="Filtrer les opérations">
            <button className="chip chip--selected" aria-pressed="true">Tout</button>
            <button className="chip" aria-pressed="false">Gains</button>
            <button className="chip" aria-pressed="false">Dépenses</button>
            <button className="chip" aria-pressed="false">Transferts</button>
          </div>

          <div className="montant-avenir">
            <div className="montant-avenir__left">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="6.5" stroke="#3a4757" strokeWidth="1.4" />
                <path d="M8 4.5V8.2l2.5 1.5" stroke="#3a4757" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <span>Montant à venir</span>
            </div>
            <span>+0,00&nbsp;€</span>
          </div>

          <div className="tx-months">
            {transactions.map(group => (
              <div key={group.month} className="tx-month">
                <h3 className="tx-month__label">{group.month}</h3>
                <div className="tx-list">
                  {group.items.map(tx => (
                    <div key={tx.id} className="tx-item">
                      <TxIcon
                        type={tx.type}
                        onClick={tx.label === "T-shirt Levi's" ? onToggleLocked : undefined}
                      />
                      <div className="tx-item__desc">
                        <span className="tx-item__label">{tx.label}</span>
                        <span className="tx-item__date">{tx.date}</span>
                      </div>
                      <span
                        className={`tx-item__amount tx-item__amount--${tx.type}`}
                        onClick={tx.label === "T-shirt Levi's" ? onAddBalance : undefined}
                        style={tx.label === "T-shirt Levi's" ? { cursor: 'pointer' } : undefined}
                      >
                        {formatAmount(tx.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TabBar active="compte" onChange={onTabChange} />

      {transferStep === 'confirm' && (
        <ConfirmModal
          balance={balance}
          ibanMasked={ibanMasked}
          onCancel={() => setTransferStep(null)}
          onConfirm={() => setTransferStep('success')}
        />
      )}
      {transferStep === 'success' && (
        <SuccessModal
          balance={balance}
          onClose={() => setTransferStep(null)}
          onReturn={onReturnToWallet}
        />
      )}
      {showUnlockSheet && (
        <UnlockSheet
          onClose={() => setShowUnlockSheet(false)}
          onStart={() => { setShowUnlockSheet(false); kycNavigate('otp', 'up') }}
        />
      )}
      {prevKycScreen === 'otp' && (
        <OtpScreen direction="stable" onBack={() => {}} onSuccess={() => {}} />
      )}
      {prevKycScreen === 'document-select' && (
        <KycDocumentScreen direction="stable" onBack={() => {}} onSelectDoc={() => {}} />
      )}
      {['cni-front','passport-front','permis-front'].includes(prevKycScreen) && (
        <KycDocPhotoScreen direction="stable" onBack={() => {}} onTakePhoto={() => {}} onImport={() => {}} {...DOC_PHOTO_CONFIG[prevKycScreen]} />
      )}
      {['cni-scan','passport-scan','permis-scan'].includes(prevKycScreen) && (
        <KycCameraScreen direction="stable" onBack={() => {}} onCapture={() => {}} />
      )}
      {['cni-data','passport-data','permis-data'].includes(prevKycScreen) && (
        <KycDataScreen direction="stable" onBack={() => {}} onConfirm={() => {}} onRetake={() => {}} />
      )}
      {['cni-back','permis-back'].includes(prevKycScreen) && (
        <KycDocPhotoScreen direction="stable" onBack={() => {}} onTakePhoto={() => {}} onImport={() => {}} {...DOC_BACK_CONFIG[prevKycScreen]} />
      )}
      {['cni-back-scan','permis-back-scan'].includes(prevKycScreen) && (
        <KycCameraScreen direction="stable" onBack={() => {}} onCapture={() => {}} />
      )}
      {prevKycScreen === 'cni-back-data' && (
        <KycAddressScreen direction="stable" onBack={() => {}} onConfirm={() => {}} onRetake={() => {}} />
      )}
      {prevKycScreen === 'passport-address' && (
        <KycAddressScreen direction="stable" onBack={() => {}} onConfirm={() => {}} onRetake={() => {}} confirmLabel="Valider" showRetake={false} />
      )}
      {prevKycScreen === 'permis-address' && (
        <KycAddressScreen direction="stable" onBack={() => {}} onConfirm={() => {}} onRetake={() => {}} confirmLabel="Valider" showRetake={false} showCorrection={false} defaultValue="" />
      )}
      {kycScreen === 'otp' && (
        <OtpScreen
          direction={navDirection}
          phone={protoUser?.phone}
          onBack={() => { kycNavigate(null); setShowUnlockSheet(true) }}
          onSuccess={() => kycNavigate('document-select', 'forward')}
        />
      )}
      {kycScreen === 'document-select' && (
        <KycDocumentScreen
          direction={navDirection}
          onBack={() => kycNavigate(null)}
          onSelectDoc={docId => {
            if (docId === 'cni') kycNavigate('cni-front', 'forward')
            else if (docId === 'passport') kycNavigate('passport-front', 'forward')
            else if (docId === 'permis') kycNavigate('permis-front', 'forward')
            else if (docId === 'manual-entry') kycNavigate('manual-entry', 'forward')
            else onUnlock()
          }}
        />
      )}
      {['cni-front','passport-front','permis-front'].includes(kycScreen) && (
        <KycDocPhotoScreen
          direction={navDirection}
          onBack={() => kycNavigate('document-select', 'back')}
          onTakePhoto={() => kycNavigate(DOC_PHOTO_CONFIG[kycScreen].scanScreen, 'forward')}
          onImport={() => {
            if (kycScreen === 'cni-front') kycNavigate('cni-import', 'forward')
            else if (kycScreen === 'passport-front') kycNavigate('passport-import', 'forward')
            else kycNavigate('permis-import', 'forward')
          }}
          {...DOC_PHOTO_CONFIG[kycScreen]}
        />
      )}
      {['cni-scan','passport-scan','permis-scan'].includes(kycScreen) && (
        <KycCameraScreen
          direction={navDirection}
          docType={kycScreen === 'passport-scan' ? 'passport' : 'card'}
          onBack={() => kycNavigate(KYC_SCAN_BACK[kycScreen], 'back')}
          onCapture={() => kycNavigate(KYC_SCAN_DATA[kycScreen], 'forward')}
        />
      )}
      {['cni-data','passport-data','permis-data'].includes(kycScreen) && (
        <KycDataScreen
          direction={navDirection}
          nom={protoUser?.nom}
          prenom={protoUser?.prenom}
          dateNaissance={protoUser?.dateNaissance}
          retakeLabel={KYC_DATA_RETAKE_LABEL[kycScreen]}
          onBack={() => kycNavigate(KYC_DATA_BACK[kycScreen], 'back')}
          onImportDoc={() => {
            if (kycScreen === 'cni-data') kycNavigate('cni-import', 'forward')
            else if (kycScreen === 'passport-data') kycNavigate('passport-import', 'forward')
            else kycNavigate('permis-import', 'forward')
          }}
          onManualEntry={() => kycNavigate('manual-entry', 'forward')}
          onConfirm={() => {
            if (kycScreen === 'cni-data') kycNavigate('cni-back', 'forward')
            else if (kycScreen === 'permis-data') kycNavigate('permis-back', 'forward')
            else if (kycScreen === 'passport-data') kycNavigate('passport-address', 'forward')
            else kycNavigate('iban', 'forward')
          }}
          onRetake={() => kycNavigate(KYC_DATA_BACK[kycScreen], 'back')}
        />
      )}
      {['cni-back','permis-back'].includes(kycScreen) && (
        <KycDocPhotoScreen
          direction={navDirection}
          onBack={() => kycNavigate(KYC_BACK_PREV[kycScreen], 'back')}
          onTakePhoto={() => kycNavigate(DOC_BACK_CONFIG[kycScreen].scanScreen, 'forward')}
          onImport={() => kycNavigate(KYC_BACK_PREV[kycScreen], 'back')}
          {...DOC_BACK_CONFIG[kycScreen]}
        />
      )}
      {['cni-back-scan','permis-back-scan'].includes(kycScreen) && (
        <KycCameraScreen
          direction={navDirection}
          onBack={() => kycNavigate(KYC_BACK_SCAN_BACK[kycScreen], 'back')}
          onCapture={() => {
            if (kycScreen === 'cni-back-scan') kycNavigate('cni-back-data', 'forward')
            else if (kycScreen === 'permis-back-scan') kycNavigate('permis-address', 'forward')
            else kycNavigate('iban', 'forward')
          }}
        />
      )}
      {kycScreen === 'cni-back-data' && (
        <KycAddressScreen
          direction={navDirection}
          defaultValue="24 Rue des Jeuneurs, 75002 Paris"
          onBack={() => kycNavigate('cni-back-scan', 'back')}
          onConfirm={() => kycNavigate('iban', 'forward')}
          onRetake={() => kycNavigate('cni-back-scan', 'back')}
          onImportDoc={() => kycNavigate('cni-import', 'forward')}
          onManualEntry={() => kycNavigate('manual-entry', 'forward')}
        />
      )}
      {kycScreen === 'passport-address' && (
        <KycAddressScreen
          direction={navDirection}
          confirmLabel="Valider"
          showRetake={false}
          defaultValue="24 Rue des Jeuneurs, 75002 Paris"
          onBack={() => kycNavigate('passport-data', 'back')}
          onConfirm={() => kycNavigate('iban', 'forward')}
          onRetake={() => kycNavigate('passport-scan', 'back')}
          onImportDoc={() => kycNavigate('passport-import', 'forward')}
          onManualEntry={() => kycNavigate('manual-entry', 'forward')}
        />
      )}
      {kycScreen === 'permis-address' && (
        <KycAddressScreen
          direction={navDirection}
          confirmLabel="Valider"
          showRetake={false}
          showCorrection={false}
          defaultValue=""
          onBack={() => kycNavigate('permis-back-scan', 'back')}
          onConfirm={() => kycNavigate('iban', 'forward')}
          onRetake={() => {}}
        />
      )}
      {['cni-import','passport-import','permis-import'].includes(prevKycScreen) && (
        <KycImportScreen direction="stable" docType={prevKycScreen.split('-')[0]} onBack={() => {}} onContinue={() => {}} />
      )}
      {['cni-import','passport-import','permis-import'].includes(kycScreen) && (
        <KycImportScreen
          direction={navDirection}
          docType={kycScreen.split('-')[0]}
          onBack={() => kycNavigate(KYC_IMPORT_BACK[kycScreen], 'back')}
          onContinue={() => kycNavigate('iban', 'forward')}
        />
      )}
      {prevKycScreen === 'manual-entry' && (
        <KycManualEntryScreen direction="stable" onBack={() => {}} onContinue={() => {}} />
      )}
      {kycScreen === 'manual-entry' && (
        <KycManualEntryScreen
          direction={navDirection}
          onBack={() => kycNavigate(prevKycScreen || 'document-select', 'back')}
          onContinue={() => kycNavigate('iban', 'forward')}
        />
      )}
      {prevKycScreen === 'iban' && (
        <KycIbanScreen direction="stable" onBack={() => {}} onConfirm={() => {}} />
      )}
      {kycScreen === 'iban' && (
        <KycIbanScreen
          direction={navDirection}
          onBack={() => kycNavigate(prevKycScreen || 'document-select', 'back')}
          onConfirm={() => kycNavigate('fiscalite', 'forward')}
          onOpenBanking={() => kycNavigate('open-banking', 'forward')}
        />
      )}
      {prevKycScreen === 'open-banking' && (
        <KycOpenBankingScreen direction="stable" onBack={() => {}} onSelect={() => {}} />
      )}
      {kycScreen === 'open-banking' && (
        <KycOpenBankingScreen
          direction={navDirection}
          onBack={() => kycNavigate('iban', 'back')}
          onSelect={() => kycNavigate('fiscalite', 'forward')}
        />
      )}
      {prevKycScreen === 'fiscalite' && (
        <KycFiscaliteScreen direction="stable" onBack={() => {}} onConfirm={() => {}} />
      )}
      {kycScreen === 'fiscalite' && (
        <KycFiscaliteScreen
          direction={navDirection}
          onBack={() => kycNavigate(prevKycScreen || 'iban', 'back')}
          onConfirm={() => kycNavigate('confirmation', 'forward')}
        />
      )}
      {prevKycScreen === 'confirmation' && (
        <KycConfirmationScreen direction="stable" onClose={() => {}} />
      )}
      {kycScreen === 'confirmation' && (
        <KycConfirmationScreen
          direction={navDirection}
          onClose={() => { kycNavigate(null); (onKycComplete ?? onUnlock)() }}
        />
      )}
      {showKycLearnMore && <KycLearnMoreSheet onClose={() => setShowKycLearnMore(false)} />}
    </div>
    </KycShortcutCtx.Provider>
  )
}
