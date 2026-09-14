import './WalletHome.css'
import Navbar from '../shared/Navbar'
import TabBar from '../shared/TabBar'

const walletOrnament = 'https://www.figma.com/api/mcp/asset/d628cb7f-ce19-48ff-9a72-a348926982ee.svg'

function formatBalance(centimes) {
  return (centimes / 100).toFixed(2).replace('.', ',') + ' €'
}

function formatAmount(amount) {
  const sign = amount > 0 ? '+' : ''
  return `${sign}${amount.toFixed(2).replace('.', ',')} €`
}

function IconBank({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="10" width="14" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 10V8.5a5 5 0 0 1 10 0V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="8" y="13" width="4" height="3" rx="1" fill="currentColor" />
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

function TxIcon({ type }) {
  if (type === 'gain') {
    return (
      <div className="tx-icon tx-icon--gain">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="8"  cy="11" r="4.5" fill="none" stroke="#1d6340" strokeWidth="1.5" />
          <circle cx="12" cy="11" r="4.5" fill="none" stroke="#1d6340" strokeWidth="1.5" />
          <circle cx="10" cy="8"  r="4.5" fill="#e0f2e9" stroke="#1d6340" strokeWidth="1.5" />
          <path d="M10 6.5v3M8.5 8h3" stroke="#1d6340" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    )
  }
  if (type === 'depense') {
    return (
      <div className="tx-icon tx-icon--depense">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M3 4h1.5l2.2 8h8.3l1.5-5H6.5" stroke="#3a4757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="8"    cy="15.5" r="1.5" fill="#3a4757" />
          <circle cx="13.5" cy="15.5" r="1.5" fill="#3a4757" />
        </svg>
      </div>
    )
  }
  return (
    <div className="tx-icon tx-icon--transfert">
      <IconBank />
    </div>
  )
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
            <IconBank />
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

export default function WalletHome({
  balance, locked, completedSteps, steps, ibanMasked,
  transferStep, setTransferStep, transactions,
  onUnlock, onGoToStep, onReturnToWallet,
}) {
  const stepsRemaining = 3 - completedSteps
  const nextStep = Object.keys(steps).find(k => steps[k] === 'todo') ?? null

  let footerContent = null
  if (locked && stepsRemaining > 1) {
    footerContent = (
      <button className="btn-primary" onClick={onUnlock}>
        Débloquer mon porte-monnaie
      </button>
    )
  } else if (locked && stepsRemaining === 1) {
    footerContent = (
      <button className="btn-tinted" onClick={() => onGoToStep(nextStep)}>
        Transférer
      </button>
    )
  } else if (!locked && balance > 0) {
    footerContent = (
      <button className="btn-tinted" onClick={() => setTransferStep('confirm')}>
        Transférer
        <IconBank size={18} />
      </button>
    )
  }

  return (
    <div className="wallet-home">
      <Navbar title="Mon porte-monnaie" showBack />

      <div className="wallet-home__content">
        <div className="wallet-card">
          <div className="wallet-card__header">
            <img className="wallet-card__ornament" src={walletOrnament} alt="" aria-hidden="true" />
            <span className="wallet-card__label">Solde disponible</span>
            <span className="wallet-card__amount">{formatBalance(balance)}</span>
            {locked && <div className="wallet-card__overlay" aria-hidden="true" />}
          </div>
          {footerContent && (
            <div className="wallet-card__footer">
              {footerContent}
            </div>
          )}
        </div>

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
                      <TxIcon type={tx.type} />
                      <div className="tx-item__desc">
                        <span className="tx-item__label">{tx.label}</span>
                        <span className="tx-item__date">{tx.date}</span>
                      </div>
                      <span className={`tx-item__amount tx-item__amount--${tx.type}`}>
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

      <TabBar active="compte" />

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
    </div>
  )
}
