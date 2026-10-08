import './Home.css'
import TabBar from '../shared/TabBar'
import { products } from '../../data/products'

const CATEGORIES = [
  { id: 'immo', label: 'Immobilier', emoji: '🏠' },
  { id: 'vehicules', label: 'Véhicules', emoji: '🚗' },
  { id: 'materiel-pro', label: 'Matériel pro', emoji: '🔧' },
  { id: 'emploi', label: 'Emploi', emoji: '💼' },
  { id: 'mode', label: 'Mode', emoji: '👗' },
  { id: 'maison', label: 'Maison & Jardin', emoji: '🛋️' },
  { id: 'famille', label: 'Famille', emoji: '👶' },
  { id: 'electronique', label: 'Électronique', emoji: '📱' },
  { id: 'loisirs', label: 'Loisirs', emoji: '🎮' },
  { id: 'autres', label: 'Autres', emoji: '📦' },
  { id: 'bons-plans', label: 'Bons plans !', emoji: '🏷️' },
]

function formatPrice(price) {
  if (price === null) return 'Gratuit'
  return price.toLocaleString('fr-FR') + ' €'
}

export default function Home({ onTabChange }) {
  return (
    <div className="home">
      <header className="home-header">
        <span className="home-header__logo">leboncoin</span>
        <div className="home-header__actions">
          <button className="icon-btn" aria-label="Notifications">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
          </button>
          <button className="icon-btn" aria-label="Mon compte" onClick={() => onTabChange?.('compte')}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </button>
        </div>
      </header>

      <div className="home-scroll">
        <div className="home-search">
          <button className="home-search__bar" aria-label="Rechercher sur leboncoin">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M16.5 16.5L21 21" />
            </svg>
            <span>Que recherchez-vous ?</span>
          </button>
        </div>

        <div className="home-categories" role="list" aria-label="Catégories">
          {CATEGORIES.map(cat => (
            <button key={cat.id} className="home-cat" role="listitem">
              <span className="home-cat__icon-wrap" aria-hidden="true">{cat.emoji}</span>
              <span className="home-cat__label">{cat.label}</span>
            </button>
          ))}
        </div>

        <section className="home-ads">
          <h2 className="home-ads__title">Annonces récentes</h2>
          <div className="home-ads__grid">
            {products.map(p => (
              <article key={p.id} className="ad-card">
                <div className="ad-card__img-wrap">
                  <img src={p.image} alt={p.title} className="ad-card__img" loading="lazy" />
                  {p.isUrgent && <span className="ad-card__badge ad-card__badge--urgent">Urgent</span>}
                  {p.isPro && <span className="ad-card__badge ad-card__badge--pro">Pro</span>}
                </div>
                <div className="ad-card__body">
                  <p className="ad-card__price">{formatPrice(p.price)}</p>
                  <p className="ad-card__title">{p.title}</p>
                  <p className="ad-card__meta">{p.city} · {p.publishedAt}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <TabBar active="recherche" onChange={onTabChange} />
    </div>
  )
}
