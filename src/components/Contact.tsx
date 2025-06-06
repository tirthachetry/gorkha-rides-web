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

    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setStatus('success');
      form.reset();
    } else {
      setStatus('error');
    }
  };

  return (
    <section id="contact">
      <h2>Contact Us</h2>
      <p>You can also reach us at: <strong>gorkharides@gmail.com</strong> or <strong>+91 81018 59911</strong></p>
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
    </section>
  );
};

export default Contact;
