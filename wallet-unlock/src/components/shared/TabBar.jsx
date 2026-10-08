import './TabBar.css'

const TABS = [
  {
    id: 'recherche',
    label: 'Recherche',
    icon: 'https://www.figma.com/api/mcp/asset/eacebc7a-0a1c-47e2-a54e-f2a547e5990e.svg',
  },
  {
    id: 'favoris',
    label: 'Favoris',
    icon: 'https://www.figma.com/api/mcp/asset/b5a8f441-43af-460f-ba36-6d82ddafa5a7.svg',
  },
  {
    id: 'publier',
    label: 'Publier',
    icon: 'https://www.figma.com/api/mcp/asset/f1590199-0764-43bd-b1ae-54cca964e6a4.svg',
  },
  {
    id: 'messages',
    label: 'Messages',
    icon: 'https://www.figma.com/api/mcp/asset/37f9ec27-c4ac-4b83-91ac-7f5ed5fae938.svg',
  },
  {
    id: 'compte',
    label: 'Compte',
    icon: 'https://www.figma.com/api/mcp/asset/dfa4ceee-7da6-43a1-bc78-95cc2653cf46.svg',
  },
]

export default function TabBar({ active = 'compte', onChange }) {
  return (
    <nav className="tab-bar" aria-label="Navigation principale">
      {TABS.map(({ id, label, icon }) => (
        <button
          key={id}
          className={`tab-bar__item${active === id ? ' tab-bar__item--active' : ''}`}
          aria-current={active === id ? 'page' : undefined}
          onClick={() => onChange?.(id)}
        >
          <img src={icon} width="24" height="24" alt="" aria-hidden="true" />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}
