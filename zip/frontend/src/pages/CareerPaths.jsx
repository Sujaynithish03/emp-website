import React from 'react';
import { assets } from '../assets/manifest';

export default function CareerPaths() {
  return (
    <>
<section className="pagehead">
    <span className="glow"></span><span className="grid-ovl"></span>
    <div className="inner">
      <div className="txt">
        <span className="eyebrow">Role-Based Deployment Model</span>
        <h1>Career paths with <mark>clear progression</mark>.</h1>
        <p className="sub">Every professional builds a foundation across six horizontal skill towers before specializing — from entry-level associate to advanced architect.</p>
        <div className="ctas"><a href="#programs" className="btn btn-yellow" data-nav>See the Programs</a><a href="#contact" className="btn btn-ghost" data-nav>Start Your Career</a></div>
      </div>
      <img className="rail-img" src={assets['hero-career-paths']} alt="A staircase branching into multiple career paths"/>
    </div>
  </section>

  <section>
    <div className="shead reveal"><span className="eyebrow">6 Career Tracks</span><h2>Horizontal skill towers</h2></div>
    <div className="grid2 reveal">
      <div className="card"><img className="track-img" src={assets['track-ai-data']} alt="A professional beside a glowing neural-network diagram"/><h3>AI &amp; Data Intelligence</h3><p>Build intelligent systems that learn and adapt.</p><div className="ladder"><div className="rung"><span className="lv">Entry · 0–2 yrs</span><b>AI Associate</b></div><div className="rung"><span className="lv">Intermediate · 2–5 yrs</span><b>AI Engineer</b></div><div className="rung top"><span className="lv">Advanced · 5+ yrs</span><b>AI Solution Architect</b></div></div></div>
      <div className="card"><img className="track-img" src={assets['track-cloud']} alt="A professional beside cloud and server-rack shapes"/><h3>Cloud &amp; Platform</h3><p>Scale resilient infrastructure for the modern enterprise.</p><div className="ladder"><div className="rung"><span className="lv">Entry · 0–2 yrs</span><b>Cloud Support</b></div><div className="rung"><span className="lv">Intermediate · 2–5 yrs</span><b>Cloud Engineer</b></div><div className="rung top"><span className="lv">Advanced · 5+ yrs</span><b>Platform Architect</b></div></div></div>
      <div className="card"><img className="track-img" src={assets['track-cybersecurity']} alt="A professional in front of a glowing shield shape"/><h3>Cybersecurity</h3><p>Defend systems and earn the trust of every user.</p><div className="ladder"><div className="rung"><span className="lv">Entry · 0–2 yrs</span><b>SOC Analyst L1</b></div><div className="rung"><span className="lv">Intermediate · 2–5 yrs</span><b>Security Engineer</b></div><div className="rung top"><span className="lv">Advanced · 5+ yrs</span><b>Cyber Architect</b></div></div></div>
      <div className="card"><img className="track-img" src={assets['track-enterprise-tech']} alt="A professional beside an enterprise dashboard panel"/><h3>Enterprise Technology</h3><p>Power the business with reliable enterprise platforms.</p><div className="ladder"><div className="rung"><span className="lv">Entry · 0–2 yrs</span><b>Service Desk</b></div><div className="rung"><span className="lv">Intermediate · 2–5 yrs</span><b>Platform Specialist</b></div><div className="rung top"><span className="lv">Advanced · 5+ yrs</span><b>Enterprise Consultant</b></div></div></div>
      <div className="card"><img className="track-img" src={assets['track-iot']} alt="A professional beside connected sensor and device shapes"/><h3>IoT / Industry 4.0</h3><p>Connect the physical and digital worlds at the edge.</p><div className="ladder"><div className="rung"><span className="lv">Entry · 0–2 yrs</span><b>IoT Associate</b></div><div className="rung"><span className="lv">Intermediate · 2–5 yrs</span><b>Edge AI Engineer</b></div><div className="rung top"><span className="lv">Advanced · 5+ yrs</span><b>IIoT Architect</b></div></div></div>
      <div className="card"><img className="track-img" src={assets['track-data-eng']} alt="A professional beside a data funnel flowing into a grid"/><h3>Data Engineering</h3><p>Turn raw data into pipelines that drive decisions.</p><div className="ladder"><div className="rung"><span className="lv">Entry · 0–2 yrs</span><b>Data Associate</b></div><div className="rung"><span className="lv">Intermediate · 2–5 yrs</span><b>Data Engineer</b></div><div className="rung top"><span className="lv">Advanced · 5+ yrs</span><b>Data Architect</b></div></div></div>
    </div>
  </section>

  <section className="band">
    <div className="shead reveal"><span className="eyebrow">Clear Career Progression</span><h2>From associate to architect</h2></div>
    <div className="progression reveal">
      <div className="prog"><img className="prog-img" src={assets['career-entry']} alt="A junior professional on the first step of a staircase"/><span className="pn">01</span><h4>Entry-Level Roles</h4><p>0–2 years · Associate roles applying foundational and specialization capability on real work.</p></div>
      <div className="prog"><img className="prog-img" src={assets['career-intermediate']} alt="A mid-level professional explaining to a junior colleague"/><span className="pn">02</span><h4>Intermediate Roles</h4><p>2–5 years · Engineer and specialist roles owning delivery, quality, and systems.</p></div>
      <div className="prog"><img className="prog-img" src={assets['career-advanced']} alt="A senior architect at the top of the staircase"/><span className="pn">03</span><h4>Advanced Architecture Roles</h4><p>5+ years · Architect and consultant roles setting technical direction across the enterprise.</p></div>
    </div>
  </section>

  <section className="ctaband"><span className="glow"></span><span className="grid-ovl"></span><div className="inner reveal">
    <h2>Find your path.</h2>
    <p>Every track begins with the same foundation and ends in an enterprise-ready role.</p>
    <div className="ctas"><a href="#contact" className="btn btn-yellow" data-nav>Start Your Career</a><a href="#programs" className="btn btn-ghost" data-nav>Explore Programs</a></div>
  </div></section>
    </>
  );
}
