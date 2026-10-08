import './Home.css'
import TabBar from '../shared/TabBar'
import { products } from '../../data/products'

// Assets Figma — FT Internal PSP TRX node 27099:43198
const IMG_LOGO   = 'https://www.figma.com/api/mcp/asset/c2be1f71-737c-458a-aeb9-4049ea5d3658.svg'
const IMG_BELL   = 'https://www.figma.com/api/mcp/asset/c3bdc96b-2454-47a6-92f6-92aeab0c94b4.svg'
const IMG_SEARCH = 'https://www.figma.com/api/mcp/asset/14733962-b65d-4cd4-9bbb-ba9e4660456a.svg'
const IMG_CAMERA = 'https://www.figma.com/api/mcp/asset/4ed7a546-13d0-4e81-9d2e-3b72ccfa36e1.svg'
const IMG_MICRO  = 'https://www.figma.com/api/mcp/asset/3c3d1886-b03a-4905-a3cf-942481e426f3.svg'

const CATEGORIES = [
  { id: 'immo',      label: 'Immobilier',  icon: 'https://www.figma.com/api/mcp/asset/7579be64-ec7a-4583-ba2a-31812c69e51e.svg' },
  { id: 'vehicules', label: 'Véhicules',   icon: 'https://www.figma.com/api/mcp/asset/f6f58a85-8615-429b-b0f5-f3f5078d6fd8.svg' },
  { id: 'vacances',  label: 'Vacances',    icon: 'https://www.figma.com/api/mcp/asset/cda55b8c-6cfe-4847-96ab-f96b716ed741.svg' },
  { id: 'emploi',    label: 'Emploi',      icon: 'https://www.figma.com/api/mcp/asset/804813e7-8044-4824-be82-93c6afa4d251.svg' },
  { id: 'autres',    label: 'Autres',      icon: 'https://www.figma.com/api/mcp/asset/510176ad-9bef-454e-a099-ca51c91c42c4.svg' },
]

function formatPrice(price) {
  if (price === null) return 'Gratuit'
  return price.toLocaleString('fr-FR') + ' €'
}

export default function Home({ onTabChange }) {
  return (
    <div className="home">

      {/* Logo — remonte au scroll */}
      <div className="home-logo-bar">
        <img src={IMG_LOGO} alt="leboncoin" className="home-logo" />
        <button className="icon-btn" aria-label="Notifications" onClick={() => onTabChange?.('compte')}>
          <img src={IMG_BELL} width="24" height="24" alt="" aria-hidden="true" />
          <span className="notif-badge" aria-label="1 notification">1</span>
        </button>
      </div>

      {/* Search + catégories — ancrés au scroll */}
      <div className="home-search-sticky">
        <div className="home-search">
          <button className="home-search__bar" aria-label="Rechercher sur leboncoin">
            <img src={IMG_SEARCH} width="16" height="16" alt="" aria-hidden="true" className="home-search__icon" />
            <span className="home-search__placeholder">Rechercher sur leboncoin</span>
            <div className="home-search__ai" aria-hidden="true">
              <img src={IMG_CAMERA} width="24" height="24" alt="" />
              <img src={IMG_MICRO}  width="24" height="24" alt="" />
            </div>
          </button>
        </div>
        <div className="home-categories" role="list" aria-label="Catégories">
          {CATEGORIES.map(cat => (
            <button key={cat.id} className="home-cat" role="listitem">
              <span className="home-cat__icon-wrap" aria-hidden="true">
                <img src={cat.icon} width="20" height="20" alt="" />
              </span>
              <span className="home-cat__label">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contenu */}
      <div className="home-content">
        <section className="home-ads">
          <h2 className="home-ads__title">Annonces récentes</h2>
          <div className="home-ads__grid">
            {products.map(p => (
              <article key={p.id} className="ad-card">
                <div className="ad-card__img-wrap">
                  <img src={p.image} alt={p.title} className="ad-card__img" loading="lazy" />
                  {p.isUrgent && <span className="ad-card__badge ad-card__badge--urgent">Urgent</span>}
                  {p.isPro    && <span className="ad-card__badge ad-card__badge--pro">Pro</span>}
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
