import React from 'react';
import { assets } from '../assets/manifest';
import ContactSection from '../components/ContactSection';

export default function Contact() {
  return (
    <>
      <section className="pagehead">
        <span className="glow"></span><span className="grid-ovl"></span>
        <div className="inner">
          <div className="txt">
            <span className="eyebrow">Contact</span>
            <h1>Empowering Human Potential.<br />Enabling <mark>AI Futures</mark>.</h1>
            <p className="sub">Tell us what you're building — a career, a campus program, or a workforce — and we'll take it from there.</p>
          </div>
          <img width="900" height="600" loading="eager" fetchPriority="high" className="rail-img" src={assets['hero-contact']} alt="A professional reaching out to connect" style={{transform: "translateX(-250px) scale(2.4)"}}/>
        </div>
      </section>

      <section>
        <div className="contact-grid">
          <ContactSection embedded />

          <img width="1400" height="933" loading="lazy"
src={assets['contact-illustration']}
  alt="A friendly professional reaching out with a message panel"
  className="banner-illustration reveal"
  style={{
    width: "100%",
    height: "100%",
    maxWidth: "750px",
    objectFit: "contain",
    display: "block",
    margin: "0 auto",
    transform: "scale(1.3)"
  }}
/>

          <div className="cinfo reveal">
            <div className="box"><strong>Talk to Us</strong><span>+91-75399 99500</span></div>
            <div className="box"><strong>Email</strong><span>info@empoweredcareers.ai</span></div>
            <div className="box"><strong>Address</strong><span>Sai Pride, 4th floor, SIDCO Industrial Estate, Guindy, Chennai, Tamil Nadu 600032</span></div>
            <div className="box"><strong>Web</strong><span>www.empoweredcareers.ai</span></div>
          </div>
        </div>
      </section>
    </>
  );
}
