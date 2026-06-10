import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, Cpu, Lock, Radio, Shield, ShoppingBag, Sparkles, Zap } from 'lucide-react';
import './styles.css';
import { products, collections, dropSchedule } from './products.js';
import { createShopifyCheckout } from './shopify.js';

const signalIcons = [Cpu, Radio, Shield, Zap];

function App() {
  const [activeCollection, setActiveCollection] = useState('all');
  const [cart, setCart] = useState([]);
  const [status, setStatus] = useState('');

  const filteredProducts = useMemo(() => {
    if (activeCollection === 'all') return products;
    return products.filter((product) => product.collection === activeCollection);
  }, [activeCollection]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
    setStatus(`${product.name} added to cart.`);
  };

  const removeFromCart = (productId) => {
    setCart((current) => current.filter((item) => item.id !== productId));
  };

  const checkout = async () => {
    if (!cart.length) {
      setStatus('Add at least one item before checkout.');
      return;
    }

    setStatus('Opening secure Shopify checkout...');
    try {
      const checkoutUrl = await createShopifyCheckout(cart);
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error(error);
      setStatus(
        'Checkout needs Shopify environment variables and product variant IDs before live transactions can process.'
      );
    }
  };

  return (
    <main className="site-shell">
      <section className="hero" id="mad-evil-genius-shop">
        <nav className="nav" aria-label="Mad Evil Genius shop navigation">
          <a href="#mad-evil-genius-shop" className="brandmark">
            <span className="brand-sigil">MEG</span>
            <span>
              <strong>Mad Evil Genius</strong>
              <small>Neural Breach Commerce Node</small>
            </span>
          </a>
          <div className="nav-links">
            <a href="#collections">Collections</a>
            <a href="#drop-system">Drop System</a>
            <a href="#cart">Cart</a>
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Cyberpunk fashion / artifact commerce / Neural Breach ready</p>
            <h1>The shop for the intelligence they failed to contain.</h1>
            <p className="lede">
              Mad Evil Genius is a standalone Shopify-ready storefront built to plug directly into
              the Neural Breach project page while functioning as its own complete fashion and
              artifact shop.
            </p>
            <div className="hero-actions">
              <a href="#collections" className="button primary">
                Enter the Shop <ArrowRight size={18} />
              </a>
              <a href="#integration" className="button ghost">
                View Integration Notes
              </a>
            </div>
          </div>

          <aside className="terminal-card" aria-label="Shop status panel">
            <div className="terminal-header">
              <span /> <span /> <span />
            </div>
            <p className="terminal-line">node://mad-evil-genius/shop</p>
            <p className="terminal-line green">STATUS: STOREFRONT READY</p>
            <p className="terminal-line">SHOPIFY: ENV-BASED CHECKOUT</p>
            <p className="terminal-line">NEURAL BREACH: EMBED ANCHOR ENABLED</p>
            <div className="scan-panel">
              {signalIcons.map((Icon, index) => (
                <div className="scan-cell" key={Icon.name}>
                  <Icon size={22} />
                  <span>{['Signal', 'Broadcast', 'Defense', 'Voltage'][index]}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="manifesto-section">
        <div>
          <p className="eyebrow">Brand Thesis</p>
          <h2>Not generic merch. Wearable insurgent mythology.</h2>
        </div>
        <p>
          The line carries black, acid green, chrome, bone white, warning red, signal blue,
          distressed typography, corrupted interfaces, lab-note symbolism, and premium streetwear
          cues. It should feel less like a logo pasted onto shirts and more like a product archive
          from a forbidden design lab.
        </p>
      </section>

      <section className="collections" id="collections">
        <div className="section-heading">
          <p className="eyebrow">Shop Collections</p>
          <h2>Core drop architecture</h2>
        </div>

        <div className="filter-bar" aria-label="Product collection filters">
          <button
            type="button"
            className={activeCollection === 'all' ? 'active' : ''}
            onClick={() => setActiveCollection('all')}
          >
            All Products
          </button>
          {collections.map((collection) => (
            <button
              type="button"
              key={collection.id}
              className={activeCollection === collection.id ? 'active' : ''}
              onClick={() => setActiveCollection(collection.id)}
            >
              {collection.name}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-art" style={{ '--accent': product.accent }}>
                <span>{product.code}</span>
              </div>
              <div className="product-meta">
                <p className="product-type">{product.type}</p>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-details">
                  <span>${product.price.toFixed(2)}</span>
                  <span>{product.status}</span>
                </div>
                <button type="button" className="button product-button" onClick={() => addToCart(product)}>
                  <ShoppingBag size={17} /> Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="drop-system" id="drop-system">
        <div className="section-heading">
          <p className="eyebrow">Release System</p>
          <h2>Built for episodic Neural Breach drops</h2>
        </div>
        <div className="drop-grid">
          {dropSchedule.map((drop) => (
            <article key={drop.phase} className="drop-card">
              <p className="drop-phase">{drop.phase}</p>
              <h3>{drop.title}</h3>
              <p>{drop.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cart-panel" id="cart">
        <div>
          <p className="eyebrow">Live Cart</p>
          <h2>Checkout node</h2>
          <p>
            Cart creation uses Shopify Storefront API when the store domain, public Storefront
            access token, and product variant IDs are configured. Until then, this functions as a
            complete storefront preview and integration-ready sales page.
          </p>
        </div>

        <div className="cart-box">
          {!cart.length ? (
            <p className="empty-cart">No items selected yet.</p>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  <span>
                    {item.name} <small>x{item.quantity}</small>
                  </span>
                  <button type="button" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="cart-total">
            <span>Total</span>
            <strong>${cartTotal.toFixed(2)}</strong>
          </div>
          <button type="button" className="button primary checkout-button" onClick={checkout}>
            Secure Shopify Checkout <Lock size={17} />
          </button>
          {status && <p className="status-line">{status}</p>}
        </div>
      </section>

      <section className="integration" id="integration">
        <div className="section-heading">
          <p className="eyebrow">Neural Breach Integration</p>
          <h2>How this shop fills the missing pieces</h2>
        </div>
        <div className="integration-grid">
          <article>
            <Sparkles size={24} />
            <h3>Standalone shop</h3>
            <p>Can be deployed as its own Vite site, linked from bios, ads, QR codes, and campaigns.</p>
          </article>
          <article>
            <Cpu size={24} />
            <h3>Project-page module</h3>
            <p>The root anchor <code>#mad-evil-genius-shop</code> lets Neural Breach embed or route here cleanly.</p>
          </article>
          <article>
            <ShoppingBag size={24} />
            <h3>Shopify path</h3>
            <p>Replace placeholder Shopify variant IDs after products are created or imported into Shopify.</p>
          </article>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
