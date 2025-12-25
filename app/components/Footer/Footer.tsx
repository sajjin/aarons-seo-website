import Link from 'next/link';
import styles from './Footer.module.css';


export default function Footer() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.haloFooterTop}>
        <div className={styles.container}>
          <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Subscription form with social icons below */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', flex: '0 0 auto' }}>
              <div>
                <h5 className={styles.footerInfoHeading}>FOLLOW OUR SOCIAL MEDIA CHANNELS</h5>
                <p style={{ fontSize: '0.875rem', margin: '0 0 15px 0' }}>Receive our latest updates about our products and promotions.</p>
                <form method="post" action="/contact" className={styles.subscribeForm}>
                  <input type="hidden" name="form_type" value="customer" />
                  <input type="hidden" name="utf8" value="✓" />
                  <input type="hidden" name="contact[tags]" value="newsletter" />
                  <input type="email" name="contact[email]" placeholder="Email address" className={styles.formControl} required />
                  <button type="submit" className={styles.btnPrimary}>Subscribe</button>
                </form>
              </div>
              <div className={styles.socialList}>
                <a href="https://www.facebook.com/BoostBarnMotorsports/" title="Facebook" target="_blank" rel="noopener noreferrer">f</a>
                <a href="https://www.instagram.com/boostbarnmotorsports" title="Instagram" target="_blank" rel="noopener noreferrer">📷</a>
                <a href="https://www.youtube.com/channel/UCgfchSp9NDs-nsIGULu4xsQ" title="YouTube" target="_blank" rel="noopener noreferrer">▶</a>
              </div>
            </div>

            {/* Text columns */}
            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', flex: '1 1 auto', justifyContent: 'flex-end' }}>
              <div className={styles.footerColSmall} style={{ fontSize: '0.813rem', minWidth: '150px' }}>
                <h5 className={styles.footerInfoHeading}>SHOP</h5>
                <ul className={styles.footerInfoList}>
                  <li><Link href="https://boostbarnmotorsports.com/collections/accessories-1">Accessories</Link></li>
                  <li><Link href="https://boostbarnmotorsports.com/collections/brakes-rotors-pads">Brake Parts</Link></li>
                  <li><Link href="https://boostbarnmotorsports.com/collections/drivetrain">Drivetrain</Link></li>
                  <li><Link href="https://boostbarnmotorsports.com/collections/engine-components">Engine Parts</Link></li>
                  <li><Link href="https://boostbarnmotorsports.com/collections/exhaust-mufflers-tips">Exhaust Systems</Link></li>
                  <li><Link href="https://boostbarnmotorsports.com/collections/forced-induction">Forced Induction</Link></li>
                  <li><Link href="https://boostbarnmotorsports.com/collections/fuel-delivery">Fuel Delivery</Link></li>
                  <li><Link href="https://boostbarnmotorsports.com/collections/suspension">Suspension</Link></li>
                  <li><Link href="https://boostbarnmotorsports.com/collections/wheel-and-tire-accessories">Wheel And Tires</Link></li>
                  <li><Link href="https://boost-barn.myshopify.com/collections/all">All Products</Link></li>
                </ul>
              </div>

              <div className={styles.footerColSmall} style={{ fontSize: '0.813rem', minWidth: '150px' }}>
                <h5 className={styles.footerInfoHeading}>PROJECTS</h5>
                <ul className={styles.footerInfoList}>
                  <li><Link href="/projects/2007-subaru-sti">Gurj&apos;s 2007 STI</Link></li>
                  <li><Link href="/projects/2006-subaru-sti-richard">Richard&apos;s 2006 STI</Link></li>
                  <li><Link href="/projects/2006-subaru-baja">Aaron&apos;s 2006 Baja</Link></li>
                  <li><Link href="/projects/Erfan-2001-JDM-STI">Erfan&apos;s 2001 JDM STI</Link></li>
                  <li><Link href="/projects/2013-subaru-sti">Chris&apos; 2013 STI</Link></li>
                  <li><Link href="/projects/2019-widebody-sti">Rene&apos;s 2019 STI</Link></li>
                  <li><Link href="/projects/2004-drift-car">Aaron&apos;s 2004 Impreza</Link></li>
                  <li><Link href="/projects/Kevin-2008-STI">Kevin&apos;s 2008 STI</Link></li>
                  <li><Link href="/projects">View All</Link></li>
                </ul>
              </div>

              <div className={styles.footerColSmall} style={{ fontSize: '0.813rem', minWidth: '150px' }}>
                <h5 className={styles.footerInfoHeading}>CUSTOMER SERVICE</h5>
                <ul className={styles.footerInfoList}>
                  <li><Link href="https://boostbarnmotorsports.com/pages/faqs">FAQ&apos;s</Link></li>
                  <li><Link href="https://boostbarnmotorsports.com/pages/contact">Booking An Appointment</Link></li>
                  <li><Link href="https://boostbarnmotorsports.com/pages/terms-and-conditions">Terms And Conditions</Link></li>
                  <li><Link href="https://boostbarnmotorsports.com/pages/refund-policy">Refund Policy</Link></li>
                  <li><Link href="https://www.youtube.com/channel/UCgfchSp9NDs-nsIGULu4xsQ">Technical Video&apos;s</Link></li>
                </ul>
              </div>

              <div className={styles.footerColSmall} style={{ fontSize: '0.813rem', minWidth: '150px' }}>
                <h5 className={styles.footerInfoHeading}>BRANDS</h5>
                <ul className={styles.footerInfoList}>
                  <li><Link href="https://boostbarnmotorsports.com/collections/vendors?q=Killer%20B%20Motorsport">Killer B</Link></li>
                  <li><Link href="https://boostbarnmotorsports.com/collections/vendors?q=Cobb">Cobb</Link></li>
                  <li><Link href="https://boostbarnmotorsports.com/collections/vendors?q=GrimmSpeed">Grimmspeed</Link></li>
                  <li><Link href="https://boostbarnmotorsports.com/collections/vendors?q=Injector%20Dynamics">Injector Dynamics</Link></li>
                  <li><Link href="https://boostbarnmotorsports.com/collections/vendors?q=IAG%20Performance">IAG Performance</Link></li>
                  <li><Link href="https://boostbarnmotorsports.com/collections/vendors?q=Turbosmart">Turbosmart</Link></li>
                  <li><Link href="https://boostbarnmotorsports.com/collections/vendors?q=Torque%20Solution">Torque Solution</Link></li>
                  <li><Link href="https://boostbarnmotorsports.com/collections/vendors?q=Mishimoto">Mishimoto</Link></li>
                  <li><Link href="https://boostbarnmotorsports.com/pages/brands">View All</Link></li>
                </ul>
              </div>

              <div className={styles.footerColSmall} style={{ fontSize: '0.813rem', minWidth: '150px' }}>
                <h5 className={styles.footerInfoHeading}>CONTACT</h5>
                <ul className={styles.footerInfoList}>
                  <li>
                  <svg width="26" height="26" aria-hidden="true" viewBox="0 0 824 824" fill="currentColor" style={{ transform: 'translateY(5.5px)' }}>
                    <path d="M98.339,320.8c47.6,56.9,104.9,101.7,170.3,133.4c24.9,11.8,58.2,25.8,95.3,28.2c2.3,0.1,4.5,0.2,6.8,0.2c24.9,0,44.9-8.6,61.2-26.3c0.1-0.1,0.3-0.3,0.4-0.5c5.8-7,12.4-13.3,19.3-20c4.7-4.5,9.5-9.2,14.1-14c21.3-22.2,21.3-50.4-0.2-71.9l-60.1-60.1c-10.2-10.6-22.4-16.2-35.2-16.2c-12.8,0-25.1,5.6-35.6,16.1l-35.8,35.8c-3.3-1.9-6.7-3.6-9.9-5.2c-4-2-7.7-3.9-11-6c-32.6-20.7-62.2-47.7-90.5-82.4c-14.3-18.1-23.9-33.3-30.6-48.8c9.4-8.5,18.2-17.4,26.7-26.1c3-3.1,6.1-6.2,9.2-9.3c10.8-10.8,16.6-23.3,16.6-36s-5.7-25.2-16.6-36l-29.8-29.8c-3.5-3.5-6.8-6.9-10.2-10.4c-6.6-6.8-13.5-13.8-20.3-20.1c-10.3-10.1-22.4-15.4-35.2-15.4c-12.7,0-24.9,5.3-35.6,15.5l-37.4,37.4c-13.6,13.6-21.3,30.1-22.9,49.2c-1.9,23.9,2.5,49.3,13.9,80C32.739,229.6,59.139,273.7,98.339,320.8z M25.739,104.2c1.2-13.3,6.3-24.4,15.9-34l37.2-37.2c5.8-5.6,12.2-8.5,18.4-8.5c6.1,0,12.3,2.9,18,8.7c6.7,6.2,13,12.7,19.8,19.6c3.4,3.5,6.9,7,10.4,10.6l29.8,29.8c6.2,6.2,9.4,12.5,9.4,18.7s-3.2,12.5-9.4,18.7c-3.1,3.1-6.2,6.3-9.3,9.4c-9.3,9.4-18,18.3-27.6,26.8c-0.2,0.2-0.3,0.3-0.5,0.5c-8.3,8.3-7,16.2-5,22.2c0.1,0.3,0.2,0.5,0.3,0.8c7.7,18.5,18.4,36.1,35.1,57.1c30,37,61.6,65.7,96.4,87.8c4.3,2.8,8.9,5,13.2,7.2c4,2,7.7,3.9,11,6c0.4,0.2,0.7,0.4,1.1,0.6c3.3,1.7,6.5,2.5,9.7,2.5c8,0,13.2-5.1,14.9-6.8l37.4-37.4c5.8-5.8,12.1-8.9,18.3-8.9c7.6,0,13.8,4.7,17.7,8.9l60.3,60.2c12,12,11.9,25-0.3,37.7c-4.2,4.5-8.6,8.8-13.3,13.3c-7,6.8-14.3,13.8-20.9,21.7c-11.5,12.4-25.2,18.2-42.9,18.2c-1.7,0-3.5-0.1-5.2-0.2c-32.8-2.1-63.3-14.9-86.2-25.8c-62.2-30.1-116.8-72.8-162.1-127c-37.3-44.9-62.4-86.7-79-131.5C28.039,146.4,24.139,124.3,25.739,104.2z"/>
                  </svg>
                    <Link href="tel:604-613-4751">604-613-4751</Link>
                  </li>
                  <li>
                  <svg width="15" height="15" aria-hidden="true" viewBox="0 0 512 512" fill="currentColor">
                    <path d="M486.4,59.733H25.6c-14.138,0-25.6,11.461-25.6,25.6v341.333c0,14.138,11.461,25.6,25.6,25.6h460.8c14.138,0,25.6-11.461,25.6-25.6V85.333C512,71.195,500.539,59.733,486.4,59.733z M494.933,426.667c0,4.713-3.82,8.533-8.533,8.533H25.6c-4.713,0-8.533-3.82-8.533-8.533V85.333c0-4.713,3.82-8.533,8.533-8.533h460.8c4.713,0,8.533,3.82,8.533,8.533V426.667z"/>
                    <path d="M470.076,93.898c-2.255-0.197-4.496,0.51-6.229,1.966L266.982,261.239c-6.349,5.337-15.616,5.337-21.965,0L48.154,95.863c-2.335-1.96-5.539-2.526-8.404-1.484c-2.865,1.042-4.957,3.534-5.487,6.537s0.582,6.06,2.917,8.02l196.864,165.367c12.688,10.683,31.224,10.683,43.913,0L474.82,108.937c1.734-1.455,2.818-3.539,3.015-5.794c0.197-2.255-0.51-4.496-1.966-6.229C474.415,95.179,472.331,94.095,470.076,93.898z"/>
                    <path d="M164.124,273.13c-3.021-0.674-6.169,0.34-8.229,2.65l-119.467,128c-2.162,2.214-2.956,5.426-2.074,8.392c0.882,2.967,3.301,5.223,6.321,5.897c3.021,0.674,6.169-0.34,8.229-2.65l119.467-128c2.162-2.214,2.956-5.426,2.074-8.392C169.563,276.061,167.145,273.804,164.124,273.13z"/>
                    <path d="M356.105,275.78c-2.059-2.31-5.208-3.324-8.229-2.65c-3.021,0.674-5.439,2.931-6.321,5.897c-0.882,2.967-0.088,6.178,2.074,8.392l119.467,128c3.24,3.318,8.536,3.442,11.927,0.278c3.391-3.164,3.635-8.456,0.549-11.918L356.105,275.78z"/>
                  </svg> 
                    <Link href="mailto:info@boostbarnmotorsports.com">info@boostbarnmotorsports.com</Link>
                  </li>
                  <li><Link href="https://boost-barn.myshopify.com/pages/contact">CONTACT US</Link></li>
                  <li><span>Tuesday - Friday 8am-5pm Saturday 10am-5pm</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.haloFooterBottom}>
        <div className={styles.container}>
          <div className={styles.footerCopyright}>
            <small>© 2025 Boost Barn Motorsports Inc.</small>
          </div>
        </div>
      </div>
    </footer>
  );
}
