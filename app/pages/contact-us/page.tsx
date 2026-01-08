'use client';

import { FormEvent, useState } from 'react';
import styles from './contact.module.css';
import Header from '@/app/components/Header/Header';
import AnnouncementBanner from '@/app/components/AnnouncementBanner/AnnouncementBanner';
import Footer from '@/app/components/Footer/Footer';
import BackToTop from '@/app/components/BackToTop/BackToTop';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setStatus('idle');

        if (!formData.email || !formData.message) {
            setStatus('error');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', phone: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AnnouncementBanner />
            <Header />
            <main className={styles.mainContent}>
                <div className={styles.contactContainer}>
                    <div className={styles.contactHeader}>
                        <h1>Contact Us</h1>
                        <p>Get in touch with us for more information about our services and builds</p>
                    </div>
                    <div className={styles.formWrapper}>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="phone">Phone</label>
                                <input
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    placeholder="Your Phone Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email *</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="message">Message *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={styles.submitButton}
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                        {status === 'success' && (
                            <p className={`${styles.statusMessage} ${styles.successMessage}`}>
                                Message sent successfully! We&apos;ll get back to you soon.
                            </p>
                        )}
                        {status === 'error' && (
                            <p className={`${styles.statusMessage} ${styles.errorMessage}`}>
                                Error sending message. Please try again.
                            </p>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
            <BackToTop />
        </>
    );
}