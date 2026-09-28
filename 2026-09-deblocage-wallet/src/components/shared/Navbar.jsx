import './Navbar.css'

export default function Navbar({ title, showBack = false, onBack }) {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        {showBack && (
          <button className="navbar__back" aria-label="Retour" onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        <h1 className="navbar__title">{title}</h1>
      </div>
    </header>
  )
}
