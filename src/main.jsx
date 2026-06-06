import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Cpu, Lock, ShoppingBag, Radio, Shield, Zap, Database, Terminal, Crown, Eye, PackageCheck } from 'lucide-react';
import './styles.css';

const products = [
  {
    slug: 'crown-circuit-cargo-black',
    code: 'EXP-001',
    name: 'Crown Circuit Cargo',
    category: 'experiment',
    status: 'ACTIVE',
    price: 88,
    image: '/assets/1000005378.jpg',
    secondaryImage: '/assets/1000005377.jpg',
    lore: 'Field garment issued to operators moving through signal-heavy districts. Black-on-black circuitry masks motion; the crowned cortex badge identifies breach-clearance status.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    slug: 'green-cortex-crewneck',
    code: 'BR-017',
    name: 'Green Cortex Crewneck',
    category: 'breach',
    status: 'LIMITED',
    price: 96,
    image: '/assets/1000005376.jpg',
    secondaryImage: '/assets/1000005375.jpg',
    lore: 'A neural sovereignty artifact disguised as comfortwear. The enlarged crowned brain marks the wearer as a live node in the resistance archive.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    slug: 'meg-tactical-crop-jacket',
    code: 'CL-404',
    name: 'M.E.G. Tactical Crop Jacket',
    category: 'classified',
    status: 'CONTAINMENT FAILED',
    price: 148,
    image: '/assets/1000005374.jpg',
    secondaryImage: '/assets/1000005374.jpg',
    lore: 'A command-layer shell built from black utility geometry, white insignia, modular straps, and the original Mad Evil Genius directive patch.',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    slug: 'neural-jar-hoodie',
    code: 'EXP-009',
    name: 'Neural Jar Hoodie',
    category: 'experiment',
    status: 'ACTIVE',
    price: 92,
    image: '/assets/1000005371.jpg',
    secondaryImage: '/assets/1000005370.jpg',
    lore: 'The mind preserved outside institutional control. Cyan and violet interference graphics signal memory, captivity, and data corruption.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    slug: 'skull-circuit-breach-poster',
    code: 'FILE-666',
    name: 'Skull Circuit Breach Graphic',
    category: 'vault',
    status: 'ARCHIVED',
    price: 34,
    image: '/assets/1000005330.jpg',
    secondaryImage: '/assets/1000005330.jpg',
    lore: 'A legacy visual file from the first Mad Evil Genius doctrine: intellect under pressure, electricity through bone, design as survival language.',
    sizes: ['Print', 'Patch', 'Digital File']
  }
];

const logs = [
  ['LOG 00.1', 'The first breach was not an attack. It was a refusal to stay contained.'],
  ['REPORT 17', 'Operators recovered a black cargo prototype from a dead network beneath the city.'],
  ['CASE 404', 'The Crown is not decorative. It is a signal that the mind remains sovereign.']
];

function App() {
  const [filter, setFilter] = useState('all');
  const [cart, setCart] = useState([]);
  const visibleProducts = useMemo(() => filter === 'all' ? products : products.filter((p) => p.category === filter || p.status === filter), [filter]);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const addToCart = (product) => setCart((current) => [...current, product]);

  return (
    <main>
      <section className="boot-panel">
        <div className="terminal-bar"><span></span><span></span><span></span></div>
        <p className="mono green">NEURAL BREACH // ACCESSING MAD EVIL GENIUS ARCHIVE</p>
        <h1 data-text="NEURAL BREACH">NEURAL BREACH</h1>
        <p className="tagline">The system was never meant to hold.</p>
        <div className="hero-actions">
          <a href="#archive" className="btn primary"><Zap size={18}/> Initiate Breach</a>
          <a href="#log" className="btn secondary"><Radio size={18}/> Read The Breach Log</a>
        </div>
      </section>

      <section className="signal-strip">
        <div><Cpu/> Cybernetic streetwear</div>
        <div><Shield/> Limited drops</div>
        <div><Lock/> Classified files</div>
        <div><Database/> Supabase-ready commerce</div>
      </section>

      <section className="featured" id="current-breach">
        <div>
          <p className="eyebrow">CURRENT BREACH // DROP ALPHA</p>
          <h2>Crown Series: intellect as weapon, garment as file.</h2>
          <p>Mad Evil Genius enters commerce as a story system: every hoodie, cargo, patch, and jacket becomes evidence from a larger cyberpunk world. The storefront is built to sell product while increasing brand mythology with each release.</p>
        </div>
        <div className="featured-card">
          <img src="/assets/1000005372.jpg" alt="Glowing crowned neural circuit logo" />
        </div>
      </section>

      <section className="archive" id="archive">
        <div className="section-heading">
          <p className="eyebrow">THE ARCHIVE</p>
          <h2>Recovered Experiments</h2>
        </div>
        <div className="filters">
          {['all', 'experiment', 'breach', 'classified', 'vault', 'ACTIVE', 'LIMITED', 'CONTAINMENT FAILED'].map((item) => (
            <button key={item} onClick={() => setFilter(item)} className={filter === item ? 'active' : ''}>{item}</button>
          ))}
        </div>
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.slug}>
              <div className="image-wrap">
                <img src={product.image} alt={product.name} />
                <img className="hover-img" src={product.secondaryImage} alt={`${product.name} alternate view`} />
                <span className="status">{product.status}</span>
              </div>
              <div className="product-copy">
                <p className="mono">{product.code} // {product.category}</p>
                <h3>{product.name}</h3>
                <p>{product.lore}</p>
                <div className="size-row">{product.sizes.map((s) => <span key={s}>{s}</span>)}</div>
                <div className="buy-row">
                  <strong>${product.price}</strong>
                  <button onClick={() => addToCart(product)}><ShoppingBag size={16}/> Add File</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="log" id="log">
        <div className="section-heading">
          <p className="eyebrow">THE BREACH LOG</p>
          <h2>Lore Engine</h2>
        </div>
        <div className="log-grid">
          {logs.map(([code, text]) => (
            <div className="log-card" key={code}>
              <Terminal/>
              <p className="mono green">{code}</p>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="terminal" id="access-terminal">
        <div>
          <p className="eyebrow">ACCESS TERMINAL</p>
          <h2>Pending Extractions</h2>
          <p>Cart state is wired locally for prototype review and ready for Supabase order persistence plus Stripe or Shopify checkout integration.</p>
        </div>
        <div className="cart-box">
          {cart.length === 0 ? <p>No acquisitions staged.</p> : cart.map((item, index) => <p key={`${item.slug}-${index}`}><PackageCheck size={15}/> {item.name} — ${item.price}</p>)}
          <strong>Total: ${total}</strong>
          <button className="checkout"><Crown size={16}/> Request Checkout Link</button>
        </div>
      </section>

      <footer>
        <div><Eye/> MAD EVIL GENIUS // NEURAL BREACH</div>
        <p>Powered by Saga Solutions. Built for limited drops, lore commerce, and future Supabase-backed storefront operations.</p>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
