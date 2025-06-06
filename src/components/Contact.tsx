import { useState, type FormEvent } from 'react';

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    // Anti-bot check (honeypot)
    const gotcha = (form.elements.namedItem('_gotcha') as HTMLInputElement).value;
    if (gotcha) {
      return;
    }

    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setStatus('success');

      // WhatsApp message open on success
      const whatsappMessage = `Hi, I'm ${data.name}. ${data.message}`;
      window.open(`https://wa.me/918101859911?text=${encodeURIComponent(whatsappMessage)}`, '_blank');

      form.reset();
    } else {
      setStatus('error');
    }
  };

  return (
    <section id="contact">
      <h2>Contact Us</h2>
      <p>
        You can also reach us at: <strong>gorkharides@gmail.com</strong> or <strong>+91 81018 59911</strong>
      </p>

      {status === 'success' && <p className="success">Thanks! We’ll be in touch soon.</p>}
      {status === 'error' && <p className="error">Oops! Something went wrong.</p>}

      <form onSubmit={handleSubmit} className="contact-form">
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <input type="tel" name="phone" placeholder="Your Phone Number" required />
        <textarea name="message" rows={5} placeholder="Your Message" required></textarea>
        <button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </button>
        <input type="text" name="_gotcha" style={{ display: 'none' }} />
      </form>

      {/* Optional: Static WhatsApp Button (not just on success) */}
      { 
      <a
        href="https://wa.me/8101859911?text=Hi%2C%20I%20want%20to%20know%20more%20about%20your%20services"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          marginTop: '1rem',
          backgroundColor: '#25D366',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '5px',
          textDecoration: 'none',
        }}
      >
        Chat on WhatsApp
      </a>
      }
    </section>
  );
};

export default Contact;
