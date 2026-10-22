import { useState, useCallback, useEffect } from 'react'
import Home from './components/home/Home'
import MonCompte from './components/compte/MonCompte'
import WalletHome from './components/wallet-home/WalletHome'
import { PROTO_USERS } from './proto-users.js'

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
  const navigate = (tab) => { if (tab !== 'publier') setScreen(tab) }

  const [protoUser, setProtoUser] = useState({ phone: '00', prenom: '', nom: '', dateNaissance: '', adresse: '' })

  useEffect(() => {
    const n = parseInt(window.location.hash.replace(/^#/, ''))
    if (!n) return
    const user = PROTO_USERS.find(u => u.user_id === String(n))
    if (user) {
      setProtoUser(user)
      setScreen('wallet')
    }
  }, [])

  const [balance,       setBalance]       = useState(5000)
  const [locked,        setLocked]        = useState(true)
  const [kycPending,    setKycPending]    = useState(false)
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

  if (screen === 'compte') {
    return (
      <MonCompte
        onTabChange={navigate}
        onBack={() => setScreen('recherche')}
        onWallet={() => setScreen('wallet')}
        balance={balance}
      />
    )
  }

  if (screen === 'wallet') {
    return (
      <>
        <WalletHome
          balance={balance}
          locked={locked}
          kycPending={kycPending}
          completedSteps={completedSteps}
          steps={steps}
          ibanMasked={ibanMasked}
          transferStep={transferStep}
          setTransferStep={setTransferStep}
          transactions={transactions}
          protoUser={protoUser}
          onUnlock={() => setLocked(false)}
          onKycComplete={() => { setLocked(false); setKycPending(true) }}
          onGoToStep={() => {}}
          onToggleLocked={() => setLocked(l => !l)}
          onAddBalance={() => setBalance(b => b + 2500)}
          onReturnToWallet={onReturnToWallet}
          onTabChange={navigate}
          onBack={() => setScreen('compte')}
        />
      </>
    )
  }

  return <Home onTabChange={navigate} />
}
