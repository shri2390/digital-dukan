// DigitalDukanApp.jsx
// Single-file React component (default export) built with TailwindCSS classes.
// Intended as a ready-to-copy App component for a Vite/CRA project configured with Tailwind.
// -------------------------------
// Quick setup notes (paste into your project):
// 1) Create a React app (Vite recommended):
//    npm create vite@latest digital-dukan --template react
//    cd digital-dukan
// 2) Install dependencies: npm install
// 3) Install TailwindCSS (follow Tailwind docs) and add the Tailwind directives
//    in src/index.css: @tailwind base; @tailwind components; @tailwind utilities;
// 4) Replace src/App.jsx with this file (or import this component into your App).
// 5) Start: npm run dev (Vite) or npm start (CRA)
// 6) To deploy to your own domain (digitaldukan.co.in), use Vercel/Netlify and
//    point the domain's DNS to the host. Configure production build (npm run build).
// -------------------------------

import React, { useState } from 'react';

// --- Branding / Palette ---
// Primary: #007BFF (electric blue)
// Secondary: #333333 (charcoal)
// Accent: #FF7A00 (bright orange)
// Background: #F9FAFB

const SERVICES = [
  { id: 'digital', title: 'Digital Solutions', desc: 'Web development, SEO, online marketing, apps.' },
  { id: 'technical', title: 'Technical Services', desc: 'Hardware repairs, software troubleshooting, network setup.' },
  { id: 'home', title: 'Home Maintenance', desc: 'Plumbing, electrical, AC repair, general handyman.' },
];

const PRODUCTS = [
  { id: 1, title: 'Basic Website Package', price: '₹7,999', desc: '5-page website, responsive, contact form.' },
  { id: 2, title: 'Premium Maintenance Plan', price: '₹2,499/yr', desc: 'Priority service & discounted repair rates.' },
  { id: 3, title: 'SEO Starter', price: '₹4,499', desc: 'On-page SEO + local listings setup.' },
];

export default function DigitalDukanApp() {
  const [booking, setBooking] = useState({
    name: '', phone: '', email: '', service: 'digital', date: '', time: '', address: '', message: ''
  });
  const [productCart, setProductCart] = useState([]);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  function validateBooking(b) {
    const e = {};
    if (!b.name.trim()) e.name = 'Name is required';
    if (!/^\+?[0-9]{7,15}$/.test(b.phone.replace(/\s+/g, ''))) e.phone = 'Enter a valid phone';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(b.email)) e.email = 'Enter a valid email';
    if (!b.date) e.date = 'Choose a preferred date';
    return e;
  }

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBooking(prev => ({ ...prev, [name]: value }));
  };

  const submitBooking = (ev) => {
    ev.preventDefault();
    const e = validateBooking(booking);
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    // For now we'll simulate submission by logging and showing a success message.
    // Replace this with an API call (e.g., to your server or a serverless function).
    console.log('Booking submitted', booking);
    setSent(true);
    // optional: store to localStorage
    localStorage.setItem('lastBooking', JSON.stringify(booking));
    setBooking({ name: '', phone: '', email: '', service: 'digital', date: '', time: '', address: '', message: '' });

    // Provide a mailto fallback so owner gets notified (works without backend)
    const mailto = `mailto:hello@digitaldukan.co.in?subject=New%20Booking%20from%20${encodeURIComponent(booking.name)}&body=${encodeURIComponent(JSON.stringify(booking, null, 2))}`;
    // open mail client in a new tab (user will need to send)
    window.open(mailto, '_blank');
  };

  const toggleCart = (product) => {
    setProductCart(prev => {
      if (prev.find(p => p.id === product.id)) return prev.filter(p => p.id !== product.id);
      return [...prev, product];
    });
  };

  return (
    <div className="min-h-screen bg-[color:var(--bg,#F9FAFB)] text-slate-800">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Placeholder logo */}
          <div className="w-10 h-10 rounded-md flex items-center justify-center bg-[color:var(--primary,#007BFF)] text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h3m10-12v10a2 2 0 01-2 2h-3M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2" />
            </svg>
          </div>
          <div>
            <div className="font-semibold text-lg">DIGITAL <span className="text-[color:var(--secondary,#333333)]">DUKAN</span></div>
            <div className="text-xs text-slate-500">Digital, Technical & Home Maintenance</div>
          </div>
        </div>
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="#home" className="hover:text-[color:var(--primary,#007BFF)]">Home</a>
          <a href="#about" className="hover:text-[color:var(--primary,#007BFF)]">About Us</a>
          <a href="#services" className="hover:text-[color:var(--primary,#007BFF)]">Services</a>
          <a href="#products" className="hover:text-[color:var(--primary,#007BFF)]">Products</a>
          <a href="#contact" className="hover:text-[color:var(--primary,#007BFF)]">Contact Us</a>
        </nav>
        <div className="hidden md:block">
          <a href="#contact" className="inline-block px-4 py-2 rounded-md bg-[color:var(--primary,#007BFF)] text-white">Book Service</a>
        </div>
      </header>

      {/* HERO */}
      <main className="max-w-6xl mx-auto px-6" id="home">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center py-10 md:py-20">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Your One-Stop Solution for Digital, Technical, and Home Maintenance</h1>
            <p className="mt-6 text-slate-600 max-w-xl">Providing reliable, affordable, and professional services under one roof — combining technology, convenience, and customer satisfaction.</p>

            <div className="mt-8 flex gap-4">
              <a href="#contact" className="px-5 py-3 rounded-md bg-[color:var(--primary,#007BFF)] text-white inline-block">Contact Us</a>
              <a href="#services" className="px-5 py-3 rounded-md border border-slate-200">Our Services</a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[color:var(--primary,#007BFF)]/10 flex items-center justify-center">📱</div>
                <div className="mt-2 text-sm font-medium">Online Services</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[color:var(--primary,#007BFF)]/10 flex items-center justify-center">🛠️</div>
                <div className="mt-2 text-sm font-medium">On-site Repair</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[color:var(--primary,#007BFF)]/10 flex items-center justify-center">💳</div>
                <div className="mt-2 text-sm font-medium">Easy Payments</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            {/* Illustration placeholder */}
            <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-lg">
              <img src="https://images.unsplash.com/photo-1526378725983-0c1b834d4f2c?auto=format&fit=crop&w=800&q=60" alt="illustration" className="rounded-xl" />
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-10 md:py-16">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold">About Digital Dukan</h2>
            <p className="mt-4 text-slate-600">Digital Dukan is committed to delivering comprehensive digital, technical, and home maintenance solutions with a focus on affordability and customer satisfaction. Our team combines technical expertise with local, hands-on service to ensure the job is done right — every time.</p>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-8 md:py-14">
          <h3 className="text-2xl font-bold text-center">Our Services</h3>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map(s => (
              <div key={s.id} className="p-6 bg-white rounded-xl shadow-sm">
                <div className="w-14 h-14 rounded-full bg-[color:var(--primary,#007BFF)]/10 flex items-center justify-center text-[color:var(--primary,#007BFF)] text-xl">⚙️</div>
                <h4 className="mt-4 font-semibold text-lg">{s.title}</h4>
                <p className="mt-3 text-slate-600">{s.desc}</p>
                <div className="mt-4">
                  <a href="#contact" className="text-[color:var(--primary,#007BFF)] underline">Book this service</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PRODUCTS */}
        <section id="products" className="py-8 md:py-14">
          <h3 className="text-2xl font-bold text-center">Products & Packages</h3>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTS.map(p => (
              <div key={p.id} className="p-6 bg-white rounded-xl shadow-sm flex flex-col">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{p.title}</h4>
                  <p className="mt-2 text-slate-600">{p.desc}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="font-bold">{p.price}</div>
                  <button onClick={() => toggleCart(p)} className={`px-3 py-1 rounded-md border ${productCart.find(x=>x.id===p.id) ? 'bg-[color:var(--primary,#007BFF)] text-white' : ''}`}>
                    {productCart.find(x=>x.id===p.id) ? 'Added' : 'Add'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {productCart.length > 0 && (
            <div className="mt-6 bg-white p-4 rounded-md shadow-sm flex items-center justify-between">
              <div>{productCart.length} item(s) in cart</div>
              <div className="flex items-center gap-3">
                <button onClick={() => setProductCart([])} className="px-3 py-2 rounded-md border">Clear</button>
                <a href="#contact" className="px-4 py-2 rounded-md bg-[color:var(--accent,#FF7A00)] text-white">Proceed to Book</a>
              </div>
            </div>
          )}
        </section>

        {/* CONTACT / BOOKING FORM */}
        <section id="contact" className="py-8 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold">Book a Service / Contact Us</h3>
              <p className="mt-2 text-slate-600">Fill out the form and our team will contact you to confirm the booking.</p>

              {sent && <div className="mt-4 p-3 bg-green-50 border border-green-100 text-green-800 rounded">Thanks — your booking request was recorded. We also opened your mail client so you can notify us instantly.</div>}

              <form onSubmit={submitBooking} className="mt-4 space-y-3">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <input name="name" value={booking.name} onChange={handleBookingChange} className="w-full mt-1 p-2 border rounded-md" />
                  {errors.name && <div className="text-xs text-red-600">{errors.name}</div>}
                </div>

                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <input name="phone" value={booking.phone} onChange={handleBookingChange} className="w-full mt-1 p-2 border rounded-md" placeholder="+91 98765 43210" />
                  {errors.phone && <div className="text-xs text-red-600">{errors.phone}</div>}
                </div>

                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input name="email" value={booking.email} onChange={handleBookingChange} className="w-full mt-1 p-2 border rounded-md" placeholder="name@example.com" />
                  {errors.email && <div className="text-xs text-red-600">{errors.email}</div>}
                </div>

                <div>
                  <label className="text-sm font-medium">Service Type</label>
                  <select name="service" value={booking.service} onChange={handleBookingChange} className="w-full mt-1 p-2 border rounded-md">
                    {SERVICES.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium">Preferred Date</label>
                    <input type="date" name="date" value={booking.date} onChange={handleBookingChange} className="w-full mt-1 p-2 border rounded-md" />
                    {errors.date && <div className="text-xs text-red-600">{errors.date}</div>}
                  </div>

                  <div>
                    <label className="text-sm font-medium">Preferred Time</label>
                    <input type="time" name="time" value={booking.time} onChange={handleBookingChange} className="w-full mt-1 p-2 border rounded-md" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Address (optional)</label>
                  <input name="address" value={booking.address} onChange={handleBookingChange} className="w-full mt-1 p-2 border rounded-md" />
                </div>

                <div>
                  <label className="text-sm font-medium">Additional Details</label>
                  <textarea name="message" value={booking.message} onChange={handleBookingChange} className="w-full mt-1 p-2 border rounded-md" rows={4} />
                </div>

                <div className="flex items-center gap-3">
                  <button type="submit" className="px-4 py-2 rounded-md bg-[color:var(--primary,#007BFF)] text-white">Submit Booking</button>
                  <button type="button" onClick={() => { setBooking({ name: '', phone: '', email: '', service: 'digital', date: '', time: '', address: '', message: '' }); setErrors({}); }} className="px-4 py-2 rounded-md border">Reset</button>
                </div>
              </form>
            </div>

            <div className="p-6 rounded-xl">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h4 className="font-semibold">Contact Info</h4>
                <p className="mt-2 text-sm text-slate-600">Email: hello@digitaldukan.co.in</p>
                <p className="text-sm text-slate-600">Phone: +91 98765 43210</p>
                <p className="text-sm text-slate-600">Address: Your city, India</p>

                <div className="mt-4">
                  <h5 className="font-medium">Opening Hours</h5>
                  <p className="text-sm text-slate-600">Mon - Sat: 9:00 AM - 7:00 PM</p>
                </div>

                <div className="mt-6">
                  <h5 className="font-medium">Quick Links</h5>
                  <ul className="mt-2 text-sm space-y-1 text-[color:var(--primary,#007BFF)]">
                    <li><a href="#services">View Services</a></li>
                    <li><a href="#products">View Products</a></li>
                    <li><a href="#contact">Book Now</a></li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 text-center text-sm text-slate-500">© {new Date().getFullYear()} Digital Dukan — All rights reserved.</div>
            </div>
          </div>
        </section>

      </main>

      <footer className="mt-12 bg-white border-t">
        <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-slate-600 flex flex-col md:flex-row justify-between items-center">
          <div>Made with care · Digital Dukan</div>
          <div className="mt-3 md:mt-0">Follow us: <span className="ml-2 text-[color:var(--primary,#007BFF)]">Facebook · Instagram · LinkedIn</span></div>
        </div>
      </footer>
    </div>
  );
}
