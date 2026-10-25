"use client";
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'motion/react';
import { ArrowUpRight, ArrowRight, ArrowDown, Plus, X, Menu, Phone, MapPin, Heart, Sparkles, Compass, Eye, Diamond, Check, Leaf } from 'lucide-react';
import { motionTokens as T, springs, shouldAnimate } from './motion';
import { company, products, values, flavors } from './content';
import { lozinOtherIngredients } from './product-details';
import DiamondScene from './DiamondScene';
import './style.css';

const images = import.meta.glob('./*.webp', { eager: true, query: '?url', import: 'default' });
const asset = image => images[`./${image}.webp`];
const ease = { duration: T.duration.slow, ease: T.easing.smooth };

function WhatsAppIcon({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

function Reveal({ children, className = '', delay = 0, animate = true }) {
  return (
    <motion.div
      className={className}
      initial={animate ? { opacity: 0, y: T.distance.lg } : false}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ ...ease, delay }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, light = false }) {
  return <span className={`eyebrow ${light ? 'light' : ''}`}><span />{children}</span>;
}

function ProductDialog({ product, onClose }) {
  const dialog = useRef(null);
  const [tab, setTab] = useState('overview');

  useEffect(() => {
    const element = dialog.current, previousFocus = document.activeElement;
    element.showModal();
    const before = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = before;
      if (element.open) element.close();
      queueMicrotask(() => {
        if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
      });
    };
  }, []);

  const waProductUrl = `https://api.whatsapp.com/send?phone=201017845809&text=${encodeURIComponent(`Hello Diamond Pharma, I would like to inquire about ${product.name} (${product.count}).`)}`;

  return (
    <dialog
      ref={dialog}
      data-product={product.id}
      className="product-dialog"
      aria-labelledby="product-dialog-title"
      onCancel={onClose}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <button className="icon-button dialog-close" aria-label="Close product details" onClick={onClose}>
        <X size={20} />
      </button>

      <div className="dialog-image" style={{ background: product.background }}>
        <img src={asset(product.image)} alt={`${product.name} ${product.count} packaging`} />
      </div>

      <div className="dialog-copy">
        <Eyebrow>{product.category}</Eyebrow>
        <h2 id="product-dialog-title">{product.name}</h2>
        <p className="ingredient">{product.ingredient}</p>
        <p>{product.description}</p>

        <div className="modal-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={tab === 'overview'}
            className={`modal-tab-btn ${tab === 'overview' ? 'active' : ''}`}
            onClick={() => setTab('overview')}
          >
            Overview & Benefits
          </button>
          <button
            role="tab"
            aria-selected={tab === 'composition'}
            className={`modal-tab-btn ${tab === 'composition' ? 'active' : ''}`}
            onClick={() => setTab('composition')}
          >
            Composition
          </button>
          <button
            role="tab"
            aria-selected={tab === 'directions'}
            className={`modal-tab-btn ${tab === 'directions' ? 'active' : ''}`}
            onClick={() => setTab('directions')}
          >
            Directions & Care
          </button>
        </div>

        {tab === 'overview' && (
          <div>
            <section className="benefit-panel" aria-label="Potential nutritional support">
              <h3>May help in</h3>
              <ul>
                {product.benefits.map(b => (
                  <li key={b}><Check size={16} /><span>{b}</span></li>
                ))}
              </ul>
            </section>
            <dl>
              <div><dt>Format</dt><dd>{product.format}</dd></div>
              <div><dt>Pack size</dt><dd>{product.count}</dd></div>
              {product.healthGoal && <div><dt>Health Focus</dt><dd>{product.healthGoal}</dd></div>}
            </dl>
          </div>
        )}

        {tab === 'composition' && (
          <section className="composition-section">
            <table className="composition-table">
              <caption>{product.serving}</caption>
              <thead>
                <tr>
                  <th scope="col">Nutrient / ingredient</th>
                  {product.composition.some(row => row[1]) && <th scope="col">Amount</th>}
                </tr>
              </thead>
              <tbody>
                {product.composition.map(([name, amount]) => (
                  <tr key={name}>
                    <th scope="row">{name}</th>
                    {amount && <td>{amount}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
            {product.compositionNote && <p className="composition-note">{product.compositionNote}</p>}
            {product.otherIngredients && (
              <details className="other-ingredients" open>
                <summary>Other ingredients{product.flavorName ? ` · ${product.flavorName}` : ''}</summary>
                <p>{product.otherIngredients}</p>
              </details>
            )}
          </section>
        )}

        {tab === 'directions' && (
          <section className="directions-section">
            <h3>Directions for use</h3>
            <p>{product.directions}</p>
            <p className="product-note">{product.note}</p>
          </section>
        )}

        <div className="modal-actions">
          <a className="button whatsapp-btn" href={waProductUrl} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon size={18} /> Inquire via WhatsApp
          </a>
          <a className="button primary" href={company.phoneHref}>
            Call Us <ArrowUpRight size={17} />
          </a>
        </div>

        <span className="dialog-disclaimer">
          Dietary supplement. Not intended to diagnose, treat, cure or prevent disease. Read the full product label before use.
        </span>
      </div>
    </dialog>
  );
}

function App() {
  const reduce = useReducedMotion();
  const [menu, setMenu] = useState(false);
  const [category, setCategory] = useState('All products');
  const [flavor, setFlavor] = useState(0);
  const [selected, setSelected] = useState(null);
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });

  const animate = shouldAnimate({ reduced: reduce });
  const { scrollYProgress } = useScroll();
  const currentFlavor = flavors[flavor];
  const categories = ['All products', 'Everyday essentials', 'For little ones', 'Adult nutrition', 'Night-time routine'];
  const filtered = products.filter(p => category === 'All products' || p.category === category);
  const isLozin = filtered.some(p => p.id === 'lozin');

  const onHeroMove = (e) => {
    if (!animate) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setHeroTilt({ x, y });
  };

  const onHeroLeave = () => {
    setHeroTilt({ x: 0, y: 0 });
  };

  useEffect(() => {
    const close = e => { if (e.key === 'Escape') setMenu(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />

      <header className="header">
        <div className="nav container">
          <a href="#home" aria-label="Diamond Pharmaceutical Industries home" className="brand">
            <img src={asset('diamond-logo')} alt="Diamond Pharmaceutical Industries" width="86" height="74" />
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#about">About us</a>
            <a href="#products">Our products</a>
            <a href="#purpose">Our purpose</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="nav-actions">
            <a className="nav-wa-btn" href={company.whatsappHref} target="_blank" rel="noopener noreferrer" title="Chat with us on WhatsApp">
              <WhatsAppIcon size={16} /> WhatsApp
            </a>

            <a className="nav-contact" href="#contact">
              Let’s connect <ArrowUpRight size={16} />
            </a>

            <button
              className="icon-button mobile-menu-button"
              aria-expanded={menu}
              aria-controls="mobile-navigation"
              aria-label={menu ? 'Close menu' : 'Open menu'}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menu && (
            <motion.nav
              key="mobile-nav"
              id="mobile-navigation"
              className="mobile-nav"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: T.duration.fast }}
            >
              {[
                ['About us', 'about'],
                ['Our products', 'products'],
                ['Our purpose', 'purpose'],
                ['Contact us', 'contact']
              ].map(([name, id]) => (
                <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
                  {name} <ArrowUpRight size={18} />
                </a>
              ))}
              <a href={company.whatsappHref} target="_blank" rel="noopener noreferrer" style={{ color: '#16994a' }}>
                Chat on WhatsApp <WhatsAppIcon size={18} />
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main id="main">
        {/* Hero Section */}
        <section id="home" className="hero container">
          <div className="hero-copy">
            <Reveal animate={animate}>
              <Eyebrow>Diamond Pharmaceutical Industries</Eyebrow>
              <h1>A brighter<br />perspective on<br /><span>everyday wellness.</span></h1>
              <p>Thoughtfully considered nutrition.<br />For the different ways we live, grow and thrive.</p>
              <div className="hero-actions">
                <a className="button primary" href="#products">
                  Explore our products <ArrowUpRight size={18} />
                </a>
                <a className="button whatsapp-btn" href={company.whatsappHref} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon size={17} /> Direct Inquiry
                </a>
                <a className="text-link" href="#about">
                  Get to know Diamond <ArrowRight size={17} />
                </a>
              </div>
              <div className="hero-footnote">
                <span className="tiny-diamond" /> A portfolio shaped around everyday life.
              </div>
            </Reveal>
          </div>

          <div
            className="hero-visual"
            onPointerMove={onHeroMove}
            onPointerLeave={onHeroLeave}
          >
            <div className="visual-caption">
              <span className="live-dot" /> A little care. A world of possibility.
            </div>

            <div className="hero-orbit" aria-hidden="true">
              <div /><div />
            </div>

            <motion.div
              className="hero-vita"
              initial={false}
              animate={animate ? {
                y: [0, -T.distance.sm, 0],
                x: heroTilt.x * -16,
                translateY: heroTilt.y * -12
              } : { y: 0 }}
              transition={animate ? {
                duration: T.duration.slow * 8,
                repeat: Infinity,
                ease: T.easing.linear
              } : { duration: T.duration.instant }}
            >
              <img src={asset('vitamond')} alt="VitaMond Kids vitamins and minerals gummies" fetchPriority="high" />
              <span className="image-label"><span />Made for little moments</span>
            </motion.div>

            <motion.div
              className="hero-lozin"
              initial={false}
              animate={animate ? {
                y: [0, T.distance.sm, 0],
                x: heroTilt.x * 15,
                translateY: heroTilt.y * 10
              } : { y: 0 }}
              transition={animate ? {
                duration: T.duration.slow * 10,
                repeat: Infinity,
                ease: T.easing.linear
              } : { duration: T.duration.instant }}
            >
              <img src={asset('lozin-orange')} alt="Lozin C orange flavor, 24 lozenges" fetchPriority="high" />
            </motion.div>

            <div className="hero-stamp">
              <Diamond size={18} />
              <span>Care, in<br />every detail.</span>
            </div>
          </div>
        </section>

        {/* Intro Metric Strip */}
        <section className="intro-strip">
          <div className="container intro-inner">
            <span className="strip-label">
              DIFFERENT NEEDS.<br />
              <strong>ONE DIAMOND FAMILY.</strong>
            </span>
            <p>From childhood discoveries<br />to everyday adult routines.</p>
            <div className="strip-stat">
              <strong>{String(products.length).padStart(2, '0')}</strong>
              <span>Product<br />families</span>
            </div>
            <a href="#products" aria-label={`Discover all ${products.length} product families`}>
              <ArrowDown size={22} />
            </a>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section container about">
          <Reveal animate={animate} className="about-art">
            <div className="diamond-stage">
              <div className="stage-grid" />
              <DiamondScene animate={animate} />
              <span className="stage-word">DIAMOND</span>
              <span className="stage-caption">Our identity. In every dimension.</span>
            </div>
          </Reveal>

          <Reveal animate={animate} className="about-copy">
            <Eyebrow>01 / About us</Eyebrow>
            <h2>Thoughtful nutrition.<br /><span>A human focus.</span></h2>
            <p className="lead">Different lives. Different routines.<br />A common place for care.</p>
            <p>{company.about}</p>
            <p>We believe a clearer understanding of nutrition starts with clear information, considered choices and a connection to real life.</p>
            <a className="text-link" href="#purpose">
              The principles that guide us <ArrowRight size={17} />
            </a>
            <div className="about-signature">
              <span className="small-brand-diamond" />
              <span>
                Diamond Pharmaceutical Industries<br />
                <small>New Nozha, Cairo · Egypt</small>
              </span>
            </div>
          </Reveal>
        </section>

        {/* Products Section */}
        <section id="products" className="section products-section">
          <div className="container">
            <Reveal animate={animate} className="section-top">
              <div>
                <Eyebrow>02 / Our portfolio</Eyebrow>
                <h2>Find your everyday<br /><span>kind of care.</span></h2>
              </div>
              <p>
                {products.length} product families. Distinct formulations.<br />
                Explore the Diamond portfolio, one detail at a time.
              </p>
            </Reveal>

            {/* Filter Bar with Animated Pill Indicator */}
            <div className="filter-row">
              <div className="filters" role="group" aria-label="Filter products by category">
                {categories.map(c => (
                  <button
                    key={c}
                    className={`filter-btn ${category === c ? 'active' : ''}`}
                    aria-pressed={category === c}
                    onClick={() => setCategory(c)}
                  >
                    {category === c && (
                      <motion.span
                        layoutId="activeFilterPill"
                        className="filter-pill-bg"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {c}
                  </button>
                ))}
              </div>
              <span className="result-count" role="status">
                {filtered.length} {filtered.length === 1 ? 'product family' : 'product families'}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: reduce ? T.duration.instant : T.duration.fast }}
              >
                {/* Lozin C 7-Flavor Showcase */}
                {isLozin && (
                  <article className="lozin-feature" style={{ '--flavor': currentFlavor.color }}>
                    <div className="lozin-copy">
                      <span className="product-kicker">EVERYDAY ESSENTIALS</span>
                      <h3>One Lozin C.<br /><span>Seven little possibilities.</span></h3>
                      <p className="lozin-composition">
                        <span>Composition · Per lozenge</span>
                        Vitamin C 100 mg · Zinc bisglycinate 3 mg<br />
                        Elderberry concentrate 150 mg
                      </p>

                      <div className="flavors" role="group" aria-label="Choose a Lozin C flavor">
                        {flavors.map((f, i) => (
                          <button
                            key={f.name}
                            aria-label={f.name}
                            aria-pressed={flavor === i}
                            className={flavor === i ? 'selected' : ''}
                            onClick={() => setFlavor(i)}
                            style={{ '--swatch': f.color }}
                          >
                            <span />
                            {flavor === i && <Check size={14} />}
                          </button>
                        ))}
                      </div>

                      <div className="flavor-name" aria-live="polite">
                        {currentFlavor.name}
                        <span>24 lozenges</span>
                        {currentFlavor.tag && <span className="flavor-note-pill">{currentFlavor.tag}</span>}
                      </div>

                      <div className="lozin-support">
                        <span>May help in</span>
                        <p>Supporting normal immune function and providing antioxidant support.</p>
                      </div>

                      <button
                        className="text-link"
                        onClick={() => setSelected({
                          ...products[0],
                          image: currentFlavor.image,
                          background: '#f6f8f7',
                          name: `Lozin C — ${currentFlavor.name}`,
                          otherIngredients: lozinOtherIngredients[flavor],
                          flavorName: currentFlavor.name
                        })}
                      >
                        Discover full facts <ArrowUpRight size={17} />
                      </button>
                    </div>

                    <div className="lozin-visual">
                      <div className="flavor-ambient-glow" />
                      <span className="flavor-backdrop" aria-hidden="true">C</span>
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentFlavor.image}
                          src={asset(currentFlavor.image)}
                          alt={`Lozin C ${currentFlavor.name}, 24 lozenges`}
                          initial={{ opacity: 0, scale: 0.94 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.94 }}
                          transition={{ duration: T.duration.fast }}
                          loading="lazy"
                        />
                      </AnimatePresence>
                      <span className="lozin-visual-note">A flavor for every preference.</span>
                    </div>
                  </article>
                )}

                {/* Standard Products Grid */}
                <div className="product-grid">
                  {filtered.filter(p => p.id !== 'lozin').map((p, i) => (
                    <motion.article
                      key={p.id}
                      data-product={p.id}
                      className="product-card"
                      initial={animate ? { opacity: 0, y: T.distance.md } : false}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      exit={{ opacity: 0 }}
                      transition={{ ...ease, delay: (i % 3) * T.stagger }}
                      whileHover={animate ? { y: -T.distance.xs } : undefined}
                      style={{ '--product-color': p.color, '--product-bg': p.background }}
                    >
                      <button
                        className="product-image-button"
                        onClick={() => setSelected(p)}
                        aria-label={`View ${p.name} details`}
                      >
                        <span className="product-format">{p.format}</span>
                        <img src={asset(p.image)} alt={`${p.name}, ${p.count}`} loading="lazy" width="600" height="600" />
                        <span className="open-product"><Plus size={18} /></span>
                      </button>

                      <div className="product-card-copy">
                        <span className="product-kicker">{p.category}</span>
                        <button className="product-title" onClick={() => setSelected(p)}>
                          <h3>{p.name}</h3>
                          <ArrowUpRight size={19} />
                        </button>
                        <span className="composition-label">Composition</span>
                        <p>{p.ingredient}</p>
                        <div className="card-benefit">
                          <span>May help in</span>
                          <p>{p.benefits[0]}</p>
                        </div>
                        <div className="pack-size">
                          <span>{p.tag}</span>
                          {p.healthGoal && <span className="health-goal-badge">{p.healthGoal}</span>}
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <p className="portfolio-note">
              Our products are dietary supplements. Product information is for general reference; consult the packaging for ingredients, directions and warnings.
            </p>
          </div>
        </section>

        {/* Purpose & Mission Section */}
        <section id="purpose" className="section purpose-section">
          <div className="container">
            <Reveal animate={animate} className="section-top">
              <div>
                <Eyebrow light>03 / Our purpose</Eyebrow>
                <h2>What we believe.<br /><span>How we move forward.</span></h2>
              </div>
              <p>Purpose gives us direction.<br />Our values bring that direction to life.</p>
            </Reveal>

            <div className="purpose-pair">
              <Reveal animate={animate} className="purpose-card">
                <span className="purpose-icon"><Compass size={24} /></span>
                <span className="purpose-number">01</span>
                <h3>Our mission</h3>
                <p>{company.mission}</p>
              </Reveal>
              <Reveal animate={animate} delay={T.stagger} className="purpose-card">
                <span className="purpose-icon"><Eye size={24} /></span>
                <span className="purpose-number">02</span>
                <h3>Our vision</h3>
                <p>{company.vision}</p>
              </Reveal>
            </div>

            <div className="values-heading">
              <span>Our values</span>
              <div />
            </div>

            <div className="values-grid">
              {values.map((v, i) => {
                const Icon = [Heart, Eye, Diamond, Sparkles][i];
                return (
                  <Reveal animate={animate} key={v.title} delay={i * T.stagger} className="value-item">
                    <Icon size={24} />
                    <h3>{v.title}</h3>
                    <p>{v.text}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section contact-section container">
          <Reveal animate={animate} className="contact-title">
            <Eyebrow>04 / Let’s connect</Eyebrow>
            <h2>Good conversations<br />start <span>something brighter.</span></h2>
            <p>
              Have a question about our company or dietary portfolio?<br />
              We are pleased to connect via direct call or WhatsApp.
            </p>
            <div className="contact-actions-row">
              <a className="button whatsapp-btn" href={company.whatsappHref} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={18} /> Chat on WhatsApp
              </a>
              <a className="button primary" href={company.phoneHref}>
                Call Directly <ArrowUpRight size={17} />
              </a>
            </div>
          </Reveal>

          <Reveal animate={animate} className="contact-details">
            <a className="contact-item wa-item" href={company.whatsappHref} target="_blank" rel="noopener noreferrer">
              <span className="contact-icon"><WhatsAppIcon size={22} /></span>
              <div>
                <span>WhatsApp Business</span>
                <strong>{company.whatsapp}</strong>
              </div>
              <ArrowUpRight size={19} />
            </a>

            <a className="contact-item" href={company.phoneHref}>
              <span className="contact-icon"><Phone size={20} /></span>
              <div>
                <span>Telephone Line</span>
                <strong>{company.phone}</strong>
              </div>
              <ArrowUpRight size={19} />
            </a>

            <a className="contact-item" href={company.mapsHref} target="_blank" rel="noopener noreferrer" title="View on Google Maps">
              <span className="contact-icon"><MapPin size={20} /></span>
              <div>
                <span>Headquarters & Office</span>
                <address>{company.address}</address>
              </div>
              <ArrowUpRight size={19} />
            </a>

            <div className="contact-small">
              <Leaf size={16} />
              <span>Here for questions. Dedicated to quality nutritional care.</span>
            </div>
          </Reveal>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="footer-main container">
          <a href="#home" className="footer-logo" aria-label="Back to top">
            <img src={asset('diamond-logo')} alt="Diamond Pharmaceutical Industries" width="115" height="98" />
          </a>
          <p>A brighter perspective.<br /><strong>Every day.</strong></p>
          <div className="footer-links">
            <a href="#about">About us</a>
            <a href="#products">Portfolio</a>
            <a href="#purpose">Our purpose</a>
            <a href="#contact">Contact</a>
          </div>
          <a className="back-top" href="#home" aria-label="Back to top">
            <ArrowUpRight size={22} />
          </a>
        </div>
        <div className="footer-bottom container">
          <span>© {new Date().getFullYear()} Diamond Pharmaceutical Industries. All rights reserved.</span>
          <span>Thoughtfully considered. Distinctly Diamond.</span>
        </div>
      </footer>

      {selected && <ProductDialog key={selected.id} product={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
