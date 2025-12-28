'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../pages/homepage/page.module.css';
// import styles from './Header.module.css';
import { NAVIGATION_ITEMS } from '../../data/site';
import vehicleData from '../../data/vehicles.json';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrolledMenuOpen, setScrolledMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileMenuLevel, setMobileMenuLevel] = useState<string | null>(null);
  const [isClosingSubmenu, setIsClosingSubmenu] = useState(false);

  // Vehicle selector state
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedSubModel, setSelectedSubModel] = useState<string>('');

  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleOverlayClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains(styles.mobileMenuOverlay)) {
        setMobileMenuOpen(false);
        setActiveSubmenu(null);
        setScrolledMenuOpen(false);
        setMobileMenuLevel(null);
        document.body.classList.remove('menuOpen');
      }
    };

    document.addEventListener('click', handleOverlayClick);
    return () => document.removeEventListener('click', handleOverlayClick);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        setScrolledMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (activeSubmenu) {
      const el = headerRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const bottom = Math.ceil(rect.bottom + window.scrollY);
        document.documentElement.style.setProperty('--header-bottom', `${bottom}px`);
      }
    } else {
      document.documentElement.style.removeProperty('--header-bottom');
    }

    const onResize = () => {
      if (activeSubmenu && headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        const bottom = Math.ceil(rect.bottom + window.scrollY);
        document.documentElement.style.setProperty('--header-bottom', `${bottom}px`);
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeSubmenu]);

  const toggleMobileMenu = () => {
    const newState = !mobileMenuOpen;
    setMobileMenuOpen(newState);
    if (newState) {
      document.body.classList.add('menuOpen');
    } else {
      document.body.classList.remove('menuOpen');
      setActiveSubmenu(null);
      setMobileMenuLevel(null);
    }
  };

  const toggleSubmenu = (label: string) => {
    setActiveSubmenu(activeSubmenu === label ? null : label);
  };

  const handleBackButton = () => {
    setIsClosingSubmenu(true);
    setTimeout(() => {
      setMobileMenuLevel(null);
      setIsClosingSubmenu(false);
    }, 300);
  };

  const toggleScrolledMenu = () => {
    const newState = !scrolledMenuOpen;
    setScrolledMenuOpen(newState);
    if (newState) {
      document.body.classList.add('menuOpen');
    } else {
      document.body.classList.remove('menuOpen');
      setActiveSubmenu(null);
      setMobileMenuLevel(null);
    }
  };

  // Get unique years from vehicle data
  const years = Array.from(new Set(vehicleData.vehicles.map(v => v.year))).sort((a, b) => parseInt(b) - parseInt(a));

  // Get makes for selected year
  const makes = selectedYear 
    ? Array.from(new Set(vehicleData.vehicles.filter(v => v.year === selectedYear).map(v => v.make))).sort()
    : [];

  // Get models for selected year and make
  const models = selectedYear && selectedMake
    ? vehicleData.vehicles
        .filter(v => v.year === selectedYear && v.make === selectedMake)
        .flatMap(v => v.models.map(m => m.model))
    : [];

  // Get sub-models for selected year, make, and model
  const subModels = selectedYear && selectedMake && selectedModel
    ? vehicleData.vehicles
        .filter(v => v.year === selectedYear && v.make === selectedMake)
        .flatMap(v => v.models.filter(m => m.model === selectedModel))
        .flatMap(m => m.subModels)
    : [];

  // Reset dependent dropdowns when parent changes
  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setSelectedMake('');
    setSelectedModel('');
    setSelectedSubModel('');
  };

  const handleMakeChange = (make: string) => {
    setSelectedMake(make);
    setSelectedModel('');
    setSelectedSubModel('');
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    setSelectedSubModel('');
  };

  // Try to read the current text query from any search input on the page
  const getCurrentSearchQuery = (): string => {
    if (typeof document === 'undefined') return '';
    const inputs = document.querySelectorAll('input[name="q"]');
    for (const input of Array.from(inputs)) {
      const val = (input as HTMLInputElement).value?.trim();
      if (val) return val;
    }
    return '';
  };

  const handleSearch = () => {
    if (!selectedYear || !selectedMake || !selectedModel) {
      return;
    }
    
    // Build search URL with vehicle parameters
    const params = new URLSearchParams();
    params.append('year', selectedYear);
    params.append('make', selectedMake);
    params.append('model', selectedModel);
    if (selectedSubModel) {
      params.append('submodel', selectedSubModel);
    }

    // Include text query if present
    const q = getCurrentSearchQuery();
    if (q) {
      params.append('q', q);
    }
    
    // Navigate to local search page
    window.location.href = `/search?${params.toString()}`;
  };

  const handleClear = () => {
    setSelectedYear('');
    setSelectedMake('');
    setSelectedModel('');
    setSelectedSubModel('');
  };

  return (
    <header
      ref={headerRef}
      className={`${styles.siteHeader} ${styles.haloHeader02} ${activeSubmenu ? styles.dropdownOpen : ''} ${isScrolled ? styles.hidden : ''}`}
    >
      <div className={styles.haloHeaderPc}>
        <div className={`${styles.headerTop}`}>
          <div className={styles.container}>
            <div className={`${styles.navUser}`}>
              <div className={styles.navUserLeft}>
                <p className={styles.navUserItem}>                    
                  <svg width="26" height="26" aria-hidden="true" viewBox="0 0 1024 1024" fill="currentColor" style={{ transform: 'translateY(5.5px) translateX(15px)' }}>
                      <path d="M98.339,320.8c47.6,56.9,104.9,101.7,170.3,133.4c24.9,11.8,58.2,25.8,95.3,28.2c2.3,0.1,4.5,0.2,6.8,0.2c24.9,0,44.9-8.6,61.2-26.3c0.1-0.1,0.3-0.3,0.4-0.5c5.8-7,12.4-13.3,19.3-20c4.7-4.5,9.5-9.2,14.1-14c21.3-22.2,21.3-50.4-0.2-71.9l-60.1-60.1c-10.2-10.6-22.4-16.2-35.2-16.2c-12.8,0-25.1,5.6-35.6,16.1l-35.8,35.8c-3.3-1.9-6.7-3.6-9.9-5.2c-4-2-7.7-3.9-11-6c-32.6-20.7-62.2-47.7-90.5-82.4c-14.3-18.1-23.9-33.3-30.6-48.8c9.4-8.5,18.2-17.4,26.7-26.1c3-3.1,6.1-6.2,9.2-9.3c10.8-10.8,16.6-23.3,16.6-36s-5.7-25.2-16.6-36l-29.8-29.8c-3.5-3.5-6.8-6.9-10.2-10.4c-6.6-6.8-13.5-13.8-20.3-20.1c-10.3-10.1-22.4-15.4-35.2-15.4c-12.7,0-24.9,5.3-35.6,15.5l-37.4,37.4c-13.6,13.6-21.3,30.1-22.9,49.2c-1.9,23.9,2.5,49.3,13.9,80C32.739,229.6,59.139,273.7,98.339,320.8z M25.739,104.2c1.2-13.3,6.3-24.4,15.9-34l37.2-37.2c5.8-5.6,12.2-8.5,18.4-8.5c6.1,0,12.3,2.9,18,8.7c6.7,6.2,13,12.7,19.8,19.6c3.4,3.5,6.9,7,10.4,10.6l29.8,29.8c6.2,6.2,9.4,12.5,9.4,18.7s-3.2,12.5-9.4,18.7c-3.1,3.1-6.2,6.3-9.3,9.4c-9.3,9.4-18,18.3-27.6,26.8c-0.2,0.2-0.3,0.3-0.5,0.5c-8.3,8.3-7,16.2-5,22.2c0.1,0.3,0.2,0.5,0.3,0.8c7.7,18.5,18.4,36.1,35.1,57.1c30,37,61.6,65.7,96.4,87.8c4.3,2.8,8.9,5,13.2,7.2c4,2,7.7,3.9,11,6c0.4,0.2,0.7,0.4,1.1,0.6c3.3,1.7,6.5,2.5,9.7,2.5c8,0,13.2-5.1,14.9-6.8l37.4-37.4c5.8-5.8,12.1-8.9,18.3-8.9c7.6,0,13.8,4.7,17.7,8.9l60.3,60.2c12,12,11.9,25-0.3,37.7c-4.2,4.5-8.6,8.8-13.3,13.3c-7,6.8-14.3,13.8-20.9,21.7c-11.5,12.4-25.2,18.2-42.9,18.2c-1.7,0-3.5-0.1-5.2-0.2c-32.8-2.1-63.3-14.9-86.2-25.8c-62.2-30.1-116.8-72.8-162.1-127c-37.3-44.9-62.4-86.7-79-131.5C28.039,146.4,24.139,124.3,25.739,104.2z"/>
                  </svg>
                  604-613-4751
                </p>
                <p className={styles.navUserItem}>
                  <svg width="15" height="15" aria-hidden="true" viewBox="0 0 512 512" fill="currentColor">
                      <path d="M486.4,59.733H25.6c-14.138,0-25.6,11.461-25.6,25.6v341.333c0,14.138,11.461,25.6,25.6,25.6h460.8c14.138,0,25.6-11.461,25.6-25.6V85.333C512,71.195,500.539,59.733,486.4,59.733z M494.933,426.667c0,4.713-3.82,8.533-8.533,8.533H25.6c-4.713,0-8.533-3.82-8.533-8.533V85.333c0-4.713,3.82-8.533,8.533-8.533h460.8c4.713,0,8.533,3.82,8.533,8.533V426.667z"/>
                      <path d="M470.076,93.898c-2.255-0.197-4.496,0.51-6.229,1.966L266.982,261.239c-6.349,5.337-15.616,5.337-21.965,0L48.154,95.863c-2.335-1.96-5.539-2.526-8.404-1.484c-2.865,1.042-4.957,3.534-5.487,6.537s0.582,6.06,2.917,8.02l196.864,165.367c12.688,10.683,31.224,10.683,43.913,0L474.82,108.937c1.734-1.455,2.818-3.539,3.015-5.794c0.197-2.255-0.51-4.496-1.966-6.229C474.415,95.179,472.331,94.095,470.076,93.898z"/>
                      <path d="M164.124,273.13c-3.021-0.674-6.169,0.34-8.229,2.65l-119.467,128c-2.162,2.214-2.956,5.426-2.074,8.392c0.882,2.967,3.301,5.223,6.321,5.897c3.021,0.674,6.169-0.34,8.229-2.65l119.467-128c2.162-2.214,2.956-5.426,2.074-8.392C169.563,276.061,167.145,273.804,164.124,273.13z"/>
                      <path d="M356.105,275.78c-2.059-2.31-5.208-3.324-8.229-2.65c-3.021,0.674-5.439,2.931-6.321,5.897c-0.882,2.967-0.088,6.178,2.074,8.392l119.467,128c3.24,3.318,8.536,3.442,11.927,0.278c3.391-3.164,3.635-8.456,0.549-11.918L356.105,275.78z"/>
                  </svg> 
                  info@boostbarnmotorsports.com
                </p>
              </div>
              <div className={styles.navUserCenter}>
                <p className={styles.navUserCenterItem}>Your Canadian Performance Parts Supplier!</p>
              </div>
              <div className={styles.navUserRight}>
                <Link href="https://boost-barn.myshopify.com/pages/contact" className={styles.navUserAction}>
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.headerMiddle}>
          <div className={styles.container}>
            <button
              className={`${styles.hamburgerMenu} ${mobileMenuOpen ? styles.active : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <div className={styles.headerMiddleLogo}>
              <Image
                src="/assets/img/copperplate_boost_barn_logo_invert_d74dc39f-e366-4024-b52a-01172915ecfa.webp"
                alt="Boost Barn"
                width={200}
                height={60}
                className={styles.siteHeaderLogo}
                onClick={() => (window.location.href = '/')}
                style={{ cursor: 'pointer' }}
              />
            </div>

            {/* <div className={styles.headerMiddleText}>
              <div className={styles.itemCart}>
                <Link href="https://boostbarnmotorsports.com/collections/all" className={styles.navUserActionCustom}>
                  <span className={styles.cartWrapper}>
                    <svg width="45" height="45" viewBox="0 0 1024 1024" fill="white" aria-hidden="true" style={{ display: 'block' }}>
                      <path d="M409.6 1024c-56.464 0-102.4-45.936-102.4-102.4s45.936-102.4 102.4-102.4 102.4 45.936 102.4 102.4-45.936 102.4-102.4 102.4zM409.6 870.4c-28.232 0-51.2 22.968-51.2 51.2s22.968 51.2 51.2 51.2 51.2-22.968 51.2-51.2-22.968-51.2-51.2-51.2z"/>
                      <path d="M768 1024c-56.464 0-102.4-45.936-102.4-102.4s45.936-102.4 102.4-102.4 102.4 45.936 102.4 102.4-45.936 102.4-102.4 102.4zM768 870.4c-28.232 0-51.2 22.968-51.2 51.2s22.968 51.2 51.2 51.2 51.2-22.968 51.2-51.2-22.968-51.2-51.2-51.2z"/>
                      <path d="M898.021 228.688c-12.859-15.181-32.258-23.888-53.221-23.888h-626.846l-5.085-30.506c-6.72-40.315-43.998-71.894-84.869-71.894h-51.2c-14.138 0-25.6 11.462-25.6 25.6s11.462 25.6 25.6 25.6h51.2c15.722 0 31.781 13.603 34.366 29.112l85.566 513.395c6.718 40.314 43.997 71.893 84.867 71.893h512c14.139 0 25.6-11.461 25.6-25.6s-11.461-25.6-25.6-25.6h-512c-15.722 0-31.781-13.603-34.366-29.11l-12.63-75.784 510.206-44.366c39.69-3.451 75.907-36.938 82.458-76.234l34.366-206.194c3.448-20.677-1.952-41.243-14.813-56.424zM862.331 276.694l-34.366 206.194c-2.699 16.186-20.043 32.221-36.39 33.645l-514.214 44.714-50.874-305.246h618.314c5.968 0 10.995 2.054 14.155 5.782 3.157 3.73 4.357 9.024 3.376 14.912z"/>
                    </svg>
                  </span>
                  <span className={styles.cartText}>Shop Now</span>
                </Link>
              </div>
            </div> */}

            <div className={styles.headerMiddleText}>
              <div className={styles.itemQuickSearch}>
                <form action="/search" method="get" className={styles.searchBar} role="search">
                  <input
                    type="text"
                    name="q"
                    placeholder="Search for a product..."
                    className={styles.headerSearchInput}
                    aria-label="Search Site"
                    autoComplete="off"
                  />
                  {selectedYear && <input type="hidden" name="year" value={selectedYear} />}
                  {selectedMake && <input type="hidden" name="make" value={selectedMake} />}
                  {selectedModel && <input type="hidden" name="model" value={selectedModel} />}
                  {selectedSubModel && <input type="hidden" name="submodel" value={selectedSubModel} />}
                  <button type="submit" className={styles.btnSearch} title="search">
                    <svg width="20" height="20" aria-hidden="true" viewBox="0 0 1024 1024" fill="currentColor">
                      <path d="M966.070 981.101l-304.302-331.965c68.573-71.754 106.232-165.549 106.232-265.136 0-102.57-39.942-199-112.47-271.53s-168.96-112.47-271.53-112.47-199 39.942-271.53 112.47-112.47 168.96-112.47 271.53 39.942 199.002 112.47 271.53 168.96 112.47 271.53 112.47c88.362 0 172.152-29.667 240.043-84.248l304.285 331.947c5.050 5.507 11.954 8.301 18.878 8.301 6.179 0 12.378-2.226 17.293-6.728 10.421-9.555 11.126-25.749 1.571-36.171zM51.2 384c0-183.506 149.294-332.8 332.8-332.8s332.8 149.294 332.8 332.8-149.294 332.8-332.8 332.8-332.8-149.294-332.8-332.8z"/>
                    </svg>
                  </button>
                </form>
              </div>
            </div>

            <div className={styles.userActions}>
              <div className={styles.itemAccount}>
                <div className={`${styles.navUserActionCustom} ${styles.accountAction}`}>
                  <svg width="26" height="26" viewBox="0 0 1024 1024" fill="white" aria-hidden="true">
                    <path d="M486.4 563.2c-155.275 0-281.6-126.325-281.6-281.6s126.325-281.6 281.6-281.6 281.6 126.325 281.6 281.6-126.325 281.6-281.6 281.6zM486.4 51.2c-127.043 0-230.4 103.357-230.4 230.4s103.357 230.4 230.4 230.4c127.042 0 230.4-103.357 230.4-230.4s-103.358-230.4-230.4-230.4z"/>
                    <path d="M896 1024h-819.2c-42.347 0-76.8-34.451-76.8-76.8 0-3.485 0.712-86.285 62.72-168.96 36.094-48.126 85.514-86.36 146.883-113.634 74.957-33.314 168.085-50.206 276.797-50.206 108.71 0 201.838 16.893 276.797 50.206 61.37 27.275 110.789 65.507 146.883 113.634 62.008 82.675 62.72 165.475 62.72 168.96 0 42.349-34.451 76.8-76.8 76.8zM486.4 665.6c-178.52 0-310.267 48.789-381 141.093-53.011 69.174-54.195 139.904-54.2 140.61 0 14.013 11.485 25.498 25.6 25.498h819.2c14.115 0 25.6-11.485 25.6-25.6-0.006-0.603-1.189-71.333-54.198-140.507-70.734-92.304-202.483-141.093-381.002-141.093z"/>
                  </svg>
                  <div className={styles.navUserTextWrapper}>
                    <Link href="https://boostbarnmotorsports.com/account/login" className={styles.navUserActionText}>
                      SIGN IN
                    </Link>
                    <Link href="https://boostbarnmotorsports.com/account/register" className={styles.navUserActionText}>
                      JOIN
                    </Link>
                  </div>
                </div>
              </div>
                <div className={styles.itemCart}>
                <Link href="https://boostbarnmotorsports.com/cart" className={styles.navUserActionCustom}>
                  <span className={styles.cartWrapper}>
                    <span className={styles.countPill}>0</span>
                    <svg width="30" height="30" viewBox="0 0 1024 1024" fill="white" aria-hidden="true" style={{ display: 'block' }}>
                      <path d="M409.6 1024c-56.464 0-102.4-45.936-102.4-102.4s45.936-102.4 102.4-102.4 102.4 45.936 102.4 102.4-45.936 102.4-102.4 102.4zM409.6 870.4c-28.232 0-51.2 22.968-51.2 51.2s22.968 51.2 51.2 51.2 51.2-22.968 51.2-51.2-22.968-51.2-51.2-51.2z"/>
                      <path d="M768 1024c-56.464 0-102.4-45.936-102.4-102.4s45.936-102.4 102.4-102.4 102.4 45.936 102.4 102.4-45.936 102.4-102.4 102.4zM768 870.4c-28.232 0-51.2 22.968-51.2 51.2s22.968 51.2 51.2 51.2 51.2-22.968 51.2-51.2-22.968-51.2-51.2-51.2z"/>
                      <path d="M898.021 228.688c-12.859-15.181-32.258-23.888-53.221-23.888h-626.846l-5.085-30.506c-6.72-40.315-43.998-71.894-84.869-71.894h-51.2c-14.138 0-25.6 11.462-25.6 25.6s11.462 25.6 25.6 25.6h51.2c15.722 0 31.781 13.603 34.366 29.112l85.566 513.395c6.718 40.314 43.997 71.893 84.867 71.893h512c14.139 0 25.6-11.461 25.6-25.6s-11.461-25.6-25.6-25.6h-512c-15.722 0-31.781-13.603-34.366-29.11l-12.63-75.784 510.206-44.366c39.69-3.451 75.907-36.938 82.458-76.234l34.366-206.194c3.448-20.677-1.952-41.243-14.813-56.424zM862.331 276.694l-34.366 206.194c-2.699 16.186-20.043 32.221-36.39 33.645l-514.214 44.714-50.874-305.246h618.314c5.968 0 10.995 2.054 14.155 5.782 3.157 3.73 4.357 9.024 3.376 14.912z"/>
                    </svg>
                  </span>
                  <span className={styles.cartText}>My Cart</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.headerBottom} ${mobileMenuOpen ? styles.active : ''}`}>
          <div className={styles.container}>
            <ul className={styles.siteNav}>
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.label} className={`${styles.menuLv1} ${activeSubmenu === item.label ? styles.active : ''}`}>
                  <p className={styles.navAction}>
                    {item.submenu ? (
                      <button onClick={() => toggleSubmenu(item.label)} className={styles.navLink}>
                        <span className={styles.navTextTrigger}>{item.label.toUpperCase()}</span>
                      </button>
                    ) : (
                      <Link href={item.href}>{item.label.toUpperCase()}</Link>
                    )}
                  </p>
                  {item.submenu && (
                    <div className={styles.dropdownMenu}>
                      <ul className={styles.menuLv2List}>
                        {item.submenu.map((subitem) => (
                          <li key={subitem.label} className={styles.menuLv2}>
                            <p className={styles.navAction}>
                              <Link href={subitem.href}>{subitem.label}</Link>
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Submenu Slide-in */}
            {mobileMenuLevel && (
              <div className={styles.mobileSubmenuPanel}>
                <button
                  className={styles.backButton}
                  onClick={() => setMobileMenuLevel(null)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                  <span>Back</span>
                </button>
                <h3 className={styles.submenuTitle}>{mobileMenuLevel.toUpperCase()}</h3>
                <ul className={styles.submenuList}>
                  {NAVIGATION_ITEMS.find((item) => item.label === mobileMenuLevel)?.submenu?.map(
                    (subitem) => (
                      <li key={subitem.label}>
                        <Link
                          href={subitem.href}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileMenuLevel(null);
                          }}
                          className={styles.submenuLink}
                        >
                          {subitem.label}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            {/* Vehicle Selector Dropdowns */}
            <div className={styles.vehicleSelector}>
              <div className={styles.vehicleSelectorInner}>
                <select 
                  value={selectedYear} 
                  onChange={(e) => handleYearChange(e.target.value)}
                  className={styles.vehicleDropdown}
                >
                  <option value="">Select Year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>

                <select 
                  value={selectedMake} 
                  onChange={(e) => handleMakeChange(e.target.value)}
                  className={styles.vehicleDropdown}
                  disabled={!selectedYear}
                >
                  <option value="">Select Make</option>
                  {makes.map(make => (
                    <option key={make} value={make}>{make}</option>
                  ))}
                </select>

                <select 
                  value={selectedModel} 
                  onChange={(e) => handleModelChange(e.target.value)}
                  className={styles.vehicleDropdown}
                  disabled={!selectedMake}
                >
                  <option value="">Select Model</option>
                  {models.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>

                <select 
                  value={selectedSubModel} 
                  onChange={(e) => setSelectedSubModel(e.target.value)}
                  className={styles.vehicleDropdown}
                  disabled={!selectedModel}
                >
                  <option value="">Select Sub-Model</option>
                  {subModels.map(subModel => (
                    <option key={subModel} value={subModel}>{subModel}</option>
                  ))}
                </select>

                <button 
                  onClick={handleSearch}
                  className={styles.vehicleSearchBtn}
                  disabled={!selectedYear || !selectedMake || !selectedModel}
                  title="Search"
                >
                  <svg width="20" height="20" aria-hidden="true" viewBox="0 0 1024 1024" fill="currentColor">
                    <path d="M966.070 981.101l-304.302-331.965c68.573-71.754 106.232-165.549 106.232-265.136 0-102.57-39.942-199-112.47-271.53s-168.96-112.47-271.53-112.47-199 39.942-271.53 112.47-112.47 168.96-112.47 271.53 39.942 199.002 112.47 271.53 168.96 112.47 271.53 112.47c88.362 0 172.152-29.667 240.043-84.248l304.285 331.947c5.050 5.507 11.954 8.301 18.878 8.301 6.179 0 12.378-2.226 17.293-6.728 10.421-9.555 11.126-25.749 1.571-36.171zM51.2 384c0-183.506 149.294-332.8 332.8-332.8s332.8 149.294 332.8 332.8-149.294 332.8-332.8 332.8-332.8-149.294-332.8-332.8z"/>
                  </svg>
                </button>

                <button 
                  onClick={handleClear}
                  className={styles.vehicleClearBtn}
                  disabled={!selectedYear && !selectedMake && !selectedModel && !selectedSubModel}
                  title="Clear"
                >
                  <svg width="20" height="20" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.scrolledHeader} ${isScrolled ? styles.visible : ''}`}>
        <div className={styles.scrolledHeaderContent}>
          <button
            className={`${styles.scrolledHamburger} ${scrolledMenuOpen ? styles.active : ''}`}
            onClick={toggleScrolledMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={styles.scrolledLogo}>
            <Image
              src="/assets/img/copperplate_boost_barn_logo_invert_d74dc39f-e366-4024-b52a-01172915ecfa.webp"
              alt="Boost Barn"
              width={150}
              height={45}
              className={styles.scrolledLogoImage}
              onClick={() => (window.location.href = '/')}
              style={{ cursor: 'pointer' }}
            />
          </div>

          <div className={styles.scrolledSearch}>
            <form action="/search" method="get" className={styles.searchBar} role="search">
              <input
                type="text"
                name="q"
                placeholder="Search for a product..."
                className={styles.headerSearchInput}
                aria-label="Search Site"
                autoComplete="off"
              />
              {selectedYear && <input type="hidden" name="year" value={selectedYear} />}
              {selectedMake && <input type="hidden" name="make" value={selectedMake} />}
              {selectedModel && <input type="hidden" name="model" value={selectedModel} />}
              {selectedSubModel && <input type="hidden" name="submodel" value={selectedSubModel} />}
              <button type="submit" className={styles.btnSearch} title="search">
                <svg width="20" height="20" aria-hidden="true" viewBox="0 0 1024 1024" fill="currentColor">
                  <path d="M966.070 981.101l-304.302-331.965c68.573-71.754 106.232-165.549 106.232-265.136 0-102.57-39.942-199-112.47-271.53s-168.96-112.47-271.53-112.47-199 39.942-271.53 112.47-112.47 168.96-112.47 271.53 39.942 199.002 112.47 271.53 168.96 112.47 271.53 112.47c88.362 0 172.152-29.667 240.043-84.248l304.285 331.947c5.050 5.507 11.954 8.301 18.878 8.301 6.179 0 12.378-2.226 17.293-6.728 10.421-9.555 11.126-25.749 1.571-36.171zM51.2 384c0-183.506 149.294-332.8 332.8-332.8s332.8 149.294 332.8 332.8-149.294 332.8-332.8 332.8-332.8-149.294-332.8-332.8z"/>
                </svg>
              </button>
            </form>
          </div>

            {/* <div className={styles.headerMiddleText}>
              <div className={styles.itemCart}>
                <Link href="https://boostbarnmotorsports.com/collections/all" className={styles.navUserActionCustom}>
                  <span className={styles.cartWrapper}>
                    <svg width="35" height="35" viewBox="0 0 1024 1024" fill="white" aria-hidden="true" style={{ display: 'block' }}>
                      <path d="M409.6 1024c-56.464 0-102.4-45.936-102.4-102.4s45.936-102.4 102.4-102.4 102.4 45.936 102.4 102.4-45.936 102.4-102.4 102.4zM409.6 870.4c-28.232 0-51.2 22.968-51.2 51.2s22.968 51.2 51.2 51.2 51.2-22.968 51.2-51.2-22.968-51.2-51.2-51.2z"/>
                      <path d="M768 1024c-56.464 0-102.4-45.936-102.4-102.4s45.936-102.4 102.4-102.4 102.4 45.936 102.4 102.4-45.936 102.4-102.4 102.4zM768 870.4c-28.232 0-51.2 22.968-51.2 51.2s22.968 51.2 51.2 51.2 51.2-22.968 51.2-51.2-22.968-51.2-51.2-51.2z"/>
                      <path d="M898.021 228.688c-12.859-15.181-32.258-23.888-53.221-23.888h-626.846l-5.085-30.506c-6.72-40.315-43.998-71.894-84.869-71.894h-51.2c-14.138 0-25.6 11.462-25.6 25.6s11.462 25.6 25.6 25.6h51.2c15.722 0 31.781 13.603 34.366 29.112l85.566 513.395c6.718 40.314 43.997 71.893 84.867 71.893h512c14.139 0 25.6-11.461 25.6-25.6s-11.461-25.6-25.6-25.6h-512c-15.722 0-31.781-13.603-34.366-29.11l-12.63-75.784 510.206-44.366c39.69-3.451 75.907-36.938 82.458-76.234l34.366-206.194c3.448-20.677-1.952-41.243-14.813-56.424zM862.331 276.694l-34.366 206.194c-2.699 16.186-20.043 32.221-36.39 33.645l-514.214 44.714-50.874-305.246h618.314c5.968 0 10.995 2.054 14.155 5.782 3.157 3.73 4.357 9.024 3.376 14.912z"/>
                    </svg>
                  </span>
                  <span className={styles.cartText}>Shop Now</span>
                </Link>
              </div>
            </div> */}

          <div className={styles.scrolledActions}>
            <button className={styles.mobileSearchButton} onClick={() => setMobileSearchOpen(!mobileSearchOpen)} aria-label="Toggle search">
              <svg width="20" height="20" aria-hidden="true" viewBox="0 0 1024 1024" fill="currentColor">
                <path d="M966.070 981.101l-304.302-331.965c68.573-71.754 106.232-165.549 106.232-265.136 0-102.57-39.942-199-112.47-271.53s-168.96-112.47-271.53-112.47-199 39.942-271.53 112.47-112.47 168.96-112.47 271.53 39.942 199.002 112.47 271.53 168.96 112.47 271.53 112.47c88.362 0 172.152-29.667 240.043-84.248l304.285 331.947c5.050 5.507 11.954 8.301 18.878 8.301 6.179 0 12.378-2.226 17.293-6.728 10.421-9.555 11.126-25.749 1.571-36.171zM51.2 384c0-183.506 149.294-332.8 332.8-332.8s332.8 149.294 332.8 332.8-149.294 332.8-332.8 332.8-332.8-149.294-332.8-332.8z"/>
              </svg>
            </button>

            <div className={styles.itemAccount}>
              <Link href="https://boostbarnmotorsports.com/account/login" className={styles.mobileAccountIcon}>
                <svg width="26" height="26" viewBox="0 0 1024 1024" fill="white" aria-hidden="true">
                  <path d="M486.4 563.2c-155.275 0-281.6-126.325-281.6-281.6s126.325-281.6 281.6-281.6 281.6 126.325 281.6 281.6-126.325 281.6-281.6 281.6zM486.4 51.2c-127.043 0-230.4 103.357-230.4 230.4s103.357 230.4 230.4 230.4c127.042 0 230.4-103.357 230.4-230.4s-103.358-230.4-230.4-230.4z"/>
                  <path d="M896 1024h-819.2c-42.347 0-76.8-34.451-76.8-76.8 0-3.485 0.712-86.285 62.72-168.96 36.094-48.126 85.514-86.36 146.883-113.634 74.957-33.314 168.085-50.206 276.797-50.206 108.71 0 201.838 16.893 276.797 50.206 61.37 27.275 110.789 65.507 146.883 113.634 62.008 82.675 62.72 165.475 62.72 168.96 0 42.349-34.451 76.8-76.8 76.8zM486.4 665.6c-178.52 0-310.267 48.789-381 141.093-53.011 69.174-54.195 139.904-54.2 140.61 0 14.013 11.485 25.498 25.6 25.498h819.2c14.115 0 25.6-11.485 25.6-25.6-0.006-0.603-1.189-71.333-54.198-140.507-70.734-92.304-202.483-141.093-381.002-141.093z"/>
                </svg>
              </Link>
              <div className={`${styles.navUserActionCustom} ${styles.accountAction} ${styles.desktopOnly}`}>
                <svg width="26" height="26" viewBox="0 0 1024 1024" fill="white" aria-hidden="true">
                  <path d="M486.4 563.2c-155.275 0-281.6-126.325-281.6-281.6s126.325-281.6 281.6-281.6 281.6 126.325 281.6 281.6-126.325 281.6-281.6 281.6zM486.4 51.2c-127.043 0-230.4 103.357-230.4 230.4s103.357 230.4 230.4 230.4c127.042 0 230.4-103.357 230.4-230.4s-103.358-230.4-230.4-230.4z"/>
                  <path d="M896 1024h-819.2c-42.347 0-76.8-34.451-76.8-76.8 0-3.485 0.712-86.285 62.72-168.96 36.094-48.126 85.514-86.36 146.883-113.634 74.957-33.314 168.085-50.206 276.797-50.206 108.71 0 201.838 16.893 276.797 50.206 61.37 27.275 110.789 65.507 146.883 113.634 62.008 82.675 62.72 165.475 62.72 168.96 0 42.349-34.451 76.8-76.8 76.8zM486.4 665.6c-178.52 0-310.267 48.789-381 141.093-53.011 69.174-54.195 139.904-54.2 140.61 0 14.013 11.485 25.498 25.6 25.498h819.2c14.115 0 25.6-11.485 25.6-25.6-0.006-0.603-1.189-71.333-54.198-140.507-70.734-92.304-202.483-141.093-381.002-141.093z"/>
                </svg>
                <div className={styles.navUserTextWrapper}>
                  <Link href="https://boostbarnmotorsports.com/account/login" className={styles.navUserActionText}>
                    Sign In
                  </Link>
                  <Link href="https://boostbarnmotorsports.com/account/register" className={styles.navUserActionText}>
                    Join
                  </Link>
                </div>
              </div>
            </div>

            <div className={`${styles.itemCart} ${styles.desktopOnly}`}>
              <Link href="https://boostbarnmotorsports.com/cart" className={styles.navUserActionCustom}>
                <span className={styles.cartWrapper}>
                  <span className={styles.countPill}>0</span>
                  <svg width="26" height="26" viewBox="0 0 1024 1024" fill="white" aria-hidden="true" style={{ display: 'block' }}>
                    <path d="M409.6 1024c-56.464 0-102.4-45.936-102.4-102.4s45.936-102.4 102.4-102.4 102.4 45.936 102.4 102.4-45.936 102.4-102.4 102.4zM409.6 870.4c-28.232 0-51.2 22.968-51.2 51.2s22.968 51.2 51.2 51.2 51.2-22.968 51.2-51.2-22.968-51.2-51.2-51.2z"/>
                    <path d="M768 1024c-56.464 0-102.4-45.936-102.4-102.4s45.936-102.4 102.4-102.4 102.4 45.936 102.4 102.4-45.936 102.4-102.4 102.4zM768 870.4c-28.232 0-51.2 22.968-51.2 51.2s22.968 51.2 51.2 51.2 51.2-22.968 51.2-51.2-22.968-51.2-51.2-51.2z"/>
                    <path d="M898.021 228.688c-12.859-15.181-32.258-23.888-53.221-23.888h-626.846l-5.085-30.506c-6.72-40.315-43.998-71.894-84.869-71.894h-51.2c-14.138 0-25.6 11.462-25.6 25.6s11.462 25.6 25.6 25.6h51.2c15.722 0 31.781 13.603 34.366 29.112l85.566 513.395c6.718 40.314 43.997 71.893 84.867 71.893h512c14.139 0 25.6-11.461 25.6-25.6s-11.461-25.6-25.6-25.6h-512c-15.722 0-31.781-13.603-34.366-29.11l-12.63-75.784 510.206-44.366c39.69-3.451 75.907-36.938 82.458-76.234l34.366-206.194c3.448-20.677-1.952-41.243-14.813-56.424zM862.331 276.694l-34.366 206.194c-2.699 16.186-20.043 32.221-36.39 33.645l-514.214 44.714-50.874-305.246h618.314c5.968 0 10.995 2.054 14.155 5.782 3.157 3.73 4.357 9.024 3.376 14.912z"/>
                  </svg>
                </span>
                <span className={styles.navUserTextWrapper}>My Cart</span>
              </Link>
            </div>
          </div>
        </div>

        <div className={`${styles.mobileSearchBar} ${mobileSearchOpen ? styles.active : ''}`}>
          <form action="/search" method="get" className={styles.searchBar} role="search">
            <input
              type="text"
              name="q"
              placeholder="Search for a product..."
              className={styles.headerSearchInput}
              aria-label="Search Site"
              autoComplete="off"
            />
            {selectedYear && <input type="hidden" name="year" value={selectedYear} />}
            {selectedMake && <input type="hidden" name="make" value={selectedMake} />}
            {selectedModel && <input type="hidden" name="model" value={selectedModel} />}
            {selectedSubModel && <input type="hidden" name="submodel" value={selectedSubModel} />}
            <button type="submit" className={styles.btnSearch} title="search">
              <svg width="20" height="20" aria-hidden="true" viewBox="0 0 1024 1024" fill="currentColor">
                <path d="M966.070 981.101l-304.302-331.965c68.573-71.754 106.232-165.549 106.232-265.136 0-102.57-39.942-199-112.47-271.53s-168.96-112.47-271.53-112.47-199 39.942-271.53 112.47-112.47 168.96-112.47 271.53 39.942 199.002 112.47 271.53 168.96 112.47 271.53 112.47c88.362 0 172.152-29.667 240.043-84.248l304.285 331.947c5.050 5.507 11.954 8.301 18.878 8.301 6.179 0 12.378-2.226 17.293-6.728 10.421-9.555 11.126-25.749 1.571-36.171zM51.2 384c0-183.506 149.294-332.8 332.8-332.8s332.8 149.294 332.8 332.8-149.294 332.8-332.8 332.8-332.8-149.294-332.8-332.8z"/>
              </svg>
            </button>
          </form>
        </div>
      </div>

      <div className={`${styles.scrolledNav} ${scrolledMenuOpen ? styles.active : ''}`}>
        <ul className={`${styles.scrolledNavList} ${mobileMenuLevel ? styles.hidden : ''}`}>
          {NAVIGATION_ITEMS.map((item) => (
            <li key={item.label} className={styles.scrolledNavItem}>
              <div className={styles.navAction}>
                {item.submenu ? (
                  <button
                    onClick={() => setMobileMenuLevel(item.label)}
                    className={`${styles.scrolledNavLink} ${styles.navLinkWithArrow}`}
                  >
                    <span className={styles.navTextTrigger}>{item.label.toUpperCase()}</span>
                    <svg className={styles.navArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                ) : (
                  <Link href={item.href} className={styles.scrolledNavLink} onClick={() => setScrolledMenuOpen(false)}>
                    {item.label.toUpperCase()}
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
        
        {/* Submenu Slide-in for Mobile */}
        {mobileMenuLevel && (
          <div className={`${styles.mobileSubmenuPanel} ${isClosingSubmenu ? styles.slideOut : ''}`}>
            <div className={styles.submenuHeader}>
              <button
                className={styles.backButton}
                onClick={handleBackButton}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <h3 className={styles.submenuTitle}>{mobileMenuLevel.toUpperCase()}</h3>
            </div>
            <ul className={styles.submenuList}>
              {NAVIGATION_ITEMS.find((item) => item.label === mobileMenuLevel)?.submenu?.map(
                (subitem) => (
                  <li key={subitem.label}>
                    <Link
                      href={subitem.href}
                      onClick={() => {
                        setScrolledMenuOpen(false);
                        setMobileMenuLevel(null);
                      }}
                      className={styles.submenuLink}
                    >
                      {subitem.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
        {/* Mobile Menu Footer */}
        {!mobileMenuLevel && (
        <div className={styles.mobileMenuFooter}>
          <Link href="https://boostbarnmotorsports.com/account/login" className={styles.mobileFooterLink}>
            <svg width="26" height="26" viewBox="0 0 1024 1024" fill="CurrentColor" aria-hidden="true">
              <path d="M486.4 563.2c-155.275 0-281.6-126.325-281.6-281.6s126.325-281.6 281.6-281.6 281.6 126.325 281.6 281.6-126.325 281.6-281.6 281.6zM486.4 51.2c-127.043 0-230.4 103.357-230.4 230.4s103.357 230.4 230.4 230.4c127.042 0 230.4-103.357 230.4-230.4s-103.358-230.4-230.4-230.4z"/>
              <path d="M896 1024h-819.2c-42.347 0-76.8-34.451-76.8-76.8 0-3.485 0.712-86.285 62.72-168.96 36.094-48.126 85.514-86.36 146.883-113.634 74.957-33.314 168.085-50.206 276.797-50.206 108.71 0 201.838 16.893 276.797 50.206 61.37 27.275 110.789 65.507 146.883 113.634 62.008 82.675 62.72 165.475 62.72 168.96 0 42.349-34.451 76.8-76.8 76.8zM486.4 665.6c-178.52 0-310.267 48.789-381 141.093-53.011 69.174-54.195 139.904-54.2 140.61 0 14.013 11.485 25.498 25.6 25.498h819.2c14.115 0 25.6-11.485 25.6-25.6-0.006-0.603-1.189-71.333-54.198-140.507-70.734-92.304-202.483-141.093-381.002-141.093z"/>
            </svg>
            LOGIN
          </Link>
          
          <a href="tel:604-613-4751" className={styles.mobileFooterLink}>
            <svg width="26" height="26" aria-hidden="true" viewBox="0 0 512 512" fill="currentColor">
              <path d="M98.339,320.8c47.6,56.9,104.9,101.7,170.3,133.4c24.9,11.8,58.2,25.8,95.3,28.2c2.3,0.1,4.5,0.2,6.8,0.2c24.9,0,44.9-8.6,61.2-26.3c0.1-0.1,0.3-0.3,0.4-0.5c5.8-7,12.4-13.3,19.3-20c4.7-4.5,9.5-9.2,14.1-14c21.3-22.2,21.3-50.4-0.2-71.9l-60.1-60.1c-10.2-10.6-22.4-16.2-35.2-16.2c-12.8,0-25.1,5.6-35.6,16.1l-35.8,35.8c-3.3-1.9-6.7-3.6-9.9-5.2c-4-2-7.7-3.9-11-6c-32.6-20.7-62.2-47.7-90.5-82.4c-14.3-18.1-23.9-33.3-30.6-48.8c9.4-8.5,18.2-17.4,26.7-26.1c3-3.1,6.1-6.2,9.2-9.3c10.8-10.8,16.6-23.3,16.6-36s-5.7-25.2-16.6-36l-29.8-29.8c-3.5-3.5-6.8-6.9-10.2-10.4c-6.6-6.8-13.5-13.8-20.3-20.1c-10.3-10.1-22.4-15.4-35.2-15.4c-12.7,0-24.9,5.3-35.6,15.5l-37.4,37.4c-13.6,13.6-21.3,30.1-22.9,49.2c-1.9,23.9,2.5,49.3,13.9,80C32.739,229.6,59.139,273.7,98.339,320.8z M25.739,104.2c1.2-13.3,6.3-24.4,15.9-34l37.2-37.2c5.8-5.6,12.2-8.5,18.4-8.5c6.1,0,12.3,2.9,18,8.7c6.7,6.2,13,12.7,19.8,19.6c3.4,3.5,6.9,7,10.4,10.6l29.8,29.8c6.2,6.2,9.4,12.5,9.4,18.7s-3.2,12.5-9.4,18.7c-3.1,3.1-6.2,6.3-9.3,9.4c-9.3,9.4-18,18.3-27.6,26.8c-0.2,0.2-0.3,0.3-0.5,0.5c-8.3,8.3-7,16.2-5,22.2c0.1,0.3,0.2,0.5,0.3,0.8c7.7,18.5,18.4,36.1,35.1,57.1c30,37,61.6,65.7,96.4,87.8c4.3,2.8,8.9,5,13.2,7.2c4,2,7.7,3.9,11,6c0.4,0.2,0.7,0.4,1.1,0.6c3.3,1.7,6.5,2.5,9.7,2.5c8,0,13.2-5.1,14.9-6.8l37.4-37.4c5.8-5.8,12.1-8.9,18.3-8.9c7.6,0,13.8,4.7,17.7,8.9l60.3,60.2c12,12,11.9,25-0.3,37.7c-4.2,4.5-8.6,8.8-13.3,13.3c-7,6.8-14.3,13.8-20.9,21.7c-11.5,12.4-25.2,18.2-42.9,18.2c-1.7,0-3.5-0.1-5.2-0.2c-32.8-2.1-63.3-14.9-86.2-25.8c-62.2-30.1-116.8-72.8-162.1-127c-37.3-44.9-62.4-86.7-79-131.5C28.039,146.4,24.139,124.3,25.739,104.2z"/>
            </svg>
            604-613-4751
          </a>
          
          <a href="mailto:info@boostbarnmotorsports.com" className={styles.mobileFooterLink}>
            <svg width="15" height="15" aria-hidden="true" viewBox="0 0 512 512" fill="currentColor">
              <path d="M486.4,59.733H25.6c-14.138,0-25.6,11.461-25.6,25.6v341.333c0,14.138,11.461,25.6,25.6,25.6h460.8c14.138,0,25.6-11.461,25.6-25.6V85.333C512,71.195,500.539,59.733,486.4,59.733z M494.933,426.667c0,4.713-3.82,8.533-8.533,8.533H25.6c-4.713,0-8.533-3.82-8.533-8.533V85.333c0-4.713,3.82-8.533,8.533-8.533h460.8c4.713,0,8.533,3.82,8.533,8.533V426.667z"/>
              <path d="M470.076,93.898c-2.255-0.197-4.496,0.51-6.229,1.966L266.982,261.239c-6.349,5.337-15.616,5.337-21.965,0L48.154,95.863c-2.335-1.96-5.539-2.526-8.404-1.484c-2.865,1.042-4.957,3.534-5.487,6.537s0.582,6.06,2.917,8.02l196.864,165.367c12.688,10.683,31.224,10.683,43.913,0L474.82,108.937c1.734-1.455,2.818-3.539,3.015-5.794c0.197-2.255-0.51-4.496-1.966-6.229C474.415,95.179,472.331,94.095,470.076,93.898z"/>
            </svg>
            INFO@BOOSTBARNMOTORSPORTS.COM
          </a>

          <Link href="https://boost-barn.myshopify.com/pages/contact" className={styles.mobileFooterLink}>
            CONTACT US
          </Link>

          <p className={styles.mobileFooterText}>YOUR CANADIAN PERFORMANCE PARTS SUPPLIER!</p>
        </div>
        )}
      </div>

      <div
        className={`${styles.menuOverlay} ${activeSubmenu ? styles.active : ''}`}
        onClick={() => {
          setActiveSubmenu(null);
        }}
      ></div>

      <div
        className={`${styles.mobileMenuOverlay} ${mobileMenuOpen || scrolledMenuOpen ? styles.active : ''}`}
        onClick={() => {
          setMobileMenuOpen(false);
          setScrolledMenuOpen(false);
          setActiveSubmenu(null);
          setMobileMenuLevel(null);
          document.body.classList.remove('menuOpen');
        }}
      ></div>
    </header>
  );
}
