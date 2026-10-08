import './Home.css'
import TabBar from '../shared/TabBar'
import { products } from '../../data/products'

const IMG_LOGO = 'https://www.figma.com/api/mcp/asset/c08857d1-c40d-4f23-a4ae-92e35bf95e8b.svg'
const IMG_BURGER = 'https://www.figma.com/api/mcp/asset/547b6f39-1403-431a-96e0-2ef8a75f7a27.svg'
const IMG_SEARCH_ICON = 'https://www.figma.com/api/mcp/asset/d7fb592e-cb43-4a8c-bdf2-601800e1ee5b.svg'

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
        <img src={IMG_BURGER} alt="" className="home-header__burger" aria-hidden="true" />
        <img src={IMG_LOGO} alt="leboncoin" className="home-header__logo" />
      </header>

      <div className="home-scroll">
        <div className="home-search">
          <button className="home-search__bar" aria-label="Rechercher sur leboncoin">
            <img src={IMG_SEARCH_ICON} width="16" height="16" alt="" aria-hidden="true" />
            <span>Rechercher sur leboncoin</span>
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
