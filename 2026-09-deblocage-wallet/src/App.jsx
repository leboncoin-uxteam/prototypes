import { useState, useCallback } from 'react'
import Home from './components/home/Home'
import WalletHome from './components/wallet-home/WalletHome'

const devPanelStyle = {
  position: 'fixed',
  bottom: '76px',
  right: '12px',
  zIndex: 999,
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  alignItems: 'flex-end',
  pointerEvents: 'none',
}

const devBtnStyle = {
  pointerEvents: 'auto',
  border: 'none',
  borderRadius: '999px',
  padding: '6px 12px',
  fontSize: '12px',
  fontWeight: '700',
  fontFamily: 'inherit',
  color: '#fff',
  cursor: 'pointer',
  opacity: 0.85,
  boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
  whiteSpace: 'nowrap',
}

const MONTHS_SHORT = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.']
const MONTHS_CAP  = ['Jan.', 'Févr.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.']

const INITIAL_TRANSACTIONS = [
  {
    month: 'Sept. 2024',
    items: [
      { id: 1, label: 'Vélo de route Trek',     date: '18 sept. 2024', type: 'gain',      amount:  85.00 },
      { id: 2, label: 'Chargeur USB-C Anker',   date: '12 sept. 2024', type: 'depense',   amount:  -9.50 },
      { id: 3, label: 'Virement FR76****2847',  date: '5 sept. 2024',  type: 'transfert', amount: -30.00 },
    ],
  },
  {
    month: 'Août 2024',
    items: [
      { id: 4, label: 'Appareil photo vintage', date: '22 août 2024', type: 'gain',    amount: 42.00 },
      { id: 5, label: 'Lampe de bureau',        date: '14 août 2024', type: 'gain',    amount: 35.00 },
      { id: 6, label: "T-shirt Levi's",         date: '8 août 2024',  type: 'depense', amount: -20.00 },
    ],
  },
]

export default function App() {
  const [screen, setScreen] = useState('recherche')

  const [balance,       setBalance]       = useState(14250)
  const [locked,        setLocked]        = useState(true)
  const [completedSteps]                  = useState(0)
  const [steps]                           = useState({ kyc: 'todo', iban: 'todo', dac7: 'todo' })
  const [ibanMasked]                      = useState('FR64**** Y90')
  const [transferStep,  setTransferStep]  = useState(null)
  const [transactions,  setTransactions]  = useState(INITIAL_TRANSACTIONS)

  const onReturnToWallet = useCallback(() => {
    const transferAmount = balance

    const today    = new Date()
    const dateStr  = `${today.getDate()} ${MONTHS_SHORT[today.getMonth()]} ${today.getFullYear()}`
    const monthKey = `${MONTHS_CAP[today.getMonth()]} ${today.getFullYear()}`

    const newTx = {
      id:     Date.now(),
      label:  `Virement ${ibanMasked}`,
      date:   dateStr,
      type:   'transfert',
      amount: -(transferAmount / 100),
    }

    setTransferStep(null)
    setTransactions(prev => {
      if (prev[0]?.month === monthKey) {
        return [{ ...prev[0], items: [newTx, ...prev[0].items] }, ...prev.slice(1)]
      }
      return [{ month: monthKey, items: [newTx] }, ...prev]
    })

    setTimeout(() => {
      const start    = performance.now()
      const duration = 800

      function tick(now) {
        const elapsed  = now - start
        const progress = Math.min(elapsed / duration, 1)
        const eased    = 1 - (1 - progress) ** 2
        setBalance(Math.round(transferAmount * (1 - eased)))
        if (progress < 1) requestAnimationFrame(tick)
      }

      requestAnimationFrame(tick)
    }, 350)
  }, [balance, ibanMasked])

  if (screen !== 'compte') {
    return <Home onTabChange={setScreen} />
  }

  return (
    <>
      <WalletHome
        balance={balance}
        locked={locked}
        completedSteps={completedSteps}
        steps={steps}
        ibanMasked={ibanMasked}
        transferStep={transferStep}
        setTransferStep={setTransferStep}
        transactions={transactions}
        onUnlock={() => {}}
        onGoToStep={() => {}}
        onReturnToWallet={onReturnToWallet}
        onTabChange={setScreen}
      />
      <div style={devPanelStyle}>
        <button
          onClick={() => setLocked(l => !l)}
          style={{ ...devBtnStyle, background: locked ? '#3a4757' : '#1d6340' }}
        >
          {locked ? '🔒 Locked' : '🔓 Unlocked'}
        </button>
        <button
          onClick={() => setBalance(b => b + 5000)}
          style={{ ...devBtnStyle, background: '#094171' }}
        >
          +50 €
        </button>
      </div>
    </>
  )
}
