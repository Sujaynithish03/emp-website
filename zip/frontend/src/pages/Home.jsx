import React from 'react';
import { assets } from '../assets/manifest';
import FactoryModel from '../components/FactoryModel';
import TalentPipeline from '../components/TalentPipeline';

export default function Home() {
  return (
    <>
<section className="hero" style={{backgroundImage: `linear-gradient(rgba(15,43,34,.72),rgba(15,43,34,.86)),url(${assets['bg-hero-mesh']})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
    <span className="glow g1"></span><span className="glow g2"></span><span className="grid-ovl"></span>
    <canvas id="pnet" aria-hidden="true"></canvas>
    <svg className="wave" viewBox="0 0 1440 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 60 Q 240 20 480 45 T 960 45 T 1440 40 V90 H0 Z" fill="#0b241d"/><path d="M0 70 Q 300 40 600 58 T 1200 58 T 1440 55 V90 H0 Z" fill="#08201a"/></svg>
    <div className="inner">
      <div className="hero-grid">
        <div>
          <span className="eyebrow">AI Talent Factory</span>
          <h1>We build the <mark>enterprise-ready</mark> Human + AI workforce.</h1>
          <p className="sub">A next-generation Talent Transformation Company. Our AI Talent Factory transforms talent into enterprise-ready professionals — through role-based pathways, hands-on product engineering, and real-world deployment.</p>
          <div className="ctas">
            <a href="#home" className="btn btn-yellow" data-scroll="factory-model" data-nav>Explore the Factory</a>
            <a href="#contact" className="btn btn-ghost" data-nav>Get Started</a>
          </div>
        </div>
        <div className="viz-card reveal hero-logo-card">
          <img src={assets['logo-hero']} alt="EmpowerED Careers logo" className="hero-logo-img" />
        </div>
      </div>
    </div>
  </section>

  
  <section className="dark">
    <span className="glow" style={{top: '-70px', left: '15%'}}></span><span className="grid-ovl"></span>
    <div className="inner">
      <div className="shead reveal"><span className="eyebrow">Enterprise Talent Advantage</span>
        <h2>A trusted <mark>pipeline of high-quality talent</mark> for employers.</h2></div>
      <img src={assets['home-advantage-banner']} alt="A professional connected to five badges representing enterprise-ready skills" className="banner-illustration reveal"/>
      <div className="advantage reveal">
        <div className="adv"><div className="iconwrap ic" style={{margin: '0', padding: '8px'}}><svg className="ico" viewBox="0 0 32 32"><rect fill="#155F4B" x="6" y="6" width="20" height="20" rx="5"/><rect fill="#5AB94B" x="11" y="11" width="10" height="10" rx="2.5"/><rect fill="#5AB94B" x="14.6" y="1.5" width="2.8" height="5"/><rect fill="#5AB94B" x="14.6" y="25.5" width="2.8" height="5"/><rect fill="#5AB94B" x="1.5" y="14.6" width="5" height="2.8"/><rect fill="#5AB94B" x="25.5" y="14.6" width="5" height="2.8"/></svg></div><div><strong>AI</strong><span>AI-Powered Assessments</span></div></div>
        <div className="adv"><div className="iconwrap ic" style={{margin: '0', padding: '8px'}}><svg className="ico" viewBox="0 0 32 32"><rect fill="#155F4B" x="5" y="18" width="22" height="10" rx="5"/><circle fill="#5AB94B" cx="16" cy="10" r="6.5"/></svg></div><div><strong>40+</strong><span>Enterprise Roles</span></div></div>
        <div className="adv"><div className="iconwrap ic" style={{margin: '0', padding: '8px'}}><svg className="ico" viewBox="0 0 32 32"><polygon fill="#155F4B" points="16,4 30,11 16,18 2,11"/><rect fill="#5AB94B" x="9" y="14" width="14" height="10" rx="1.5"/><rect fill="#5AB94B" x="27" y="11" width="2.4" height="9" rx="1.2"/></svg></div><div><strong>10+</strong><span>Learning Tracks</span></div></div>
        <div className="adv"><div className="iconwrap ic" style={{margin: '0', padding: '8px'}}><svg className="ico" viewBox="0 0 32 32"><rect fill="#155F4B" x="3" y="15" width="7" height="13" rx="1"/><rect fill="#155F4B" x="12.5" y="9" width="7" height="19" rx="1"/><rect fill="#155F4B" x="22" y="4" width="7" height="24" rx="1"/><rect fill="#5AB94B" x="3" y="26" width="26" height="3"/></svg></div><div><strong>10+</strong><span>Industry Verticals</span></div></div>
        <div className="adv"><div className="iconwrap ic" style={{margin: '0', padding: '8px'}}><svg className="ico" viewBox="0 0 32 32"><rect fill="#155F4B" x="4" y="15" width="24" height="10" rx="5"/><circle fill="#155F4B" cx="12" cy="15" r="6"/><circle fill="#155F4B" cx="20" cy="13" r="7.5"/><rect fill="#5AB94B" x="11" y="18" width="10" height="3" rx="1.5"/></svg></div><div><strong>100+</strong><span>Real-World Labs</span></div></div>
      </div>
    </div>
  </section>

  
  <section>
    <div className="shead reveal"><span className="eyebrow">The Impact We Create</span>
      <h2>From raw potential to <mark>Day-1 billable</mark> professionals.</h2>
      <p className="muted">Our AI Talent Factory integrates structured learning, hands-on labs, real-world projects, industry mentorship, continuous assessment, and career deployment into one comprehensive transformation journey.</p></div>
    <img src={assets['home-pipeline']} alt="A figure transforming through three stages into a confident professional" className="banner-illustration reveal"/>
    <TalentPipeline />
  </section>

  
      <FactoryModel />

<section>
    <div className="shead reveal"><span className="eyebrow">Traditional vs. Empowered Model</span>
      <h2>Traditional learning creates trainees.<br/>Industry needs <mark>product builders</mark>.</h2></div>
    <div className="cmp reveal">
      <div className="card old"><img src={assets['contrast-classroom']} alt="A passive learner in a static classroom" className="contrast-img"/><h3>Traditional Education</h3><ul>
        <li><i>—</i>Theory-first, lecture-heavy</li><li><i>—</i>Isolated assignments, no agile exposure</li><li><i>—</i>6–12 months to productivity</li><li><i>—</i>Success measured by course completion</li>
      </ul></div>
      <div className="card new"><img src={assets['contrast-factory']} alt="An active learner building in a dynamic factory setting" className="contrast-img"/><h3>EmpowerED Factory</h3><ul>
        <li><i>✓</i>Product-first, agile squads</li><li><i>✓</i>Real deployments &amp; sprint delivery</li><li><i>✓</i>Day-1 billable professionals</li><li><i>✓</i>Success measured by career outcomes</li>
      </ul></div>
    </div>
    <p className="cmp-note reveal">“The gap between graduation and employability isn't a skills gap. <b>It's an engineering culture gap.</b>” — EmpowerED Careers Founding Philosophy</p>
  </section>

  
  <section className="dark strip">
    <span className="glow" style={{bottom: '-100px', right: '10%'}}></span><span className="grid-ovl"></span>
    <div className="inner">
      <div className="shead reveal"><span className="eyebrow">Inside the Factory</span>
        <h2>One pathway. Three stages.</h2>
        <p>Foundational capability, deep Specialization, and deployed Expertise — the whole journey, structured end to end.</p></div>
      <div className="row reveal">
        <div className="box"><div className="num" style={{background: '#5AB94B'}}>1</div><small>≈ 12 WEEKS</small><h3>Foundational</h3><p>A common baseline for every professional, from any background.</p></div>
        <div className="box"><div className="num" style={{background: '#3f8f6f'}}>2</div><small>8–16 WEEKS</small><h3>Specialization</h3><p>Deep capability in one high-demand domain.</p></div>
        <div className="box"><div className="num" style={{background: '#F6DB2D'}}>3</div><small>ENTERPRISE READY</small><h3>Expertise</h3><p>Deployed on real enterprise work until Day-1 billable.</p></div>
      </div>
      <a href="#programs" className="btn btn-green" data-nav>Explore the programs →</a>
    </div>
  </section>

  
  <section>
    <div className="hero-grid" style={{alignItems: 'center'}}>
      <div className="reveal">
        <span className="eyebrow">AI for Everyone</span>
        <h2 style={{fontSize: 'clamp(26px,3.4vw,38px)', margin: '14px 0 14px'}}>Every profession. <mark>AI enabled</mark>. Future ready.</h2>
        <p className="muted" style={{fontSize: '16px', marginBottom: '22px'}}>AI is the new digital literacy. We equip students, professionals, entrepreneurs, and organizations with practical, profession-specific AI skills that improve productivity, decision-making, creativity, and career growth.</p>
        <a href="#ai-for-everyone" className="btn btn-outline" data-nav>Explore AI for Everyone →</a>
      </div>
      <div className="reveal"><img src={assets['home-ai-teaser']} alt="A professional working naturally alongside an AI assistant"/></div>
    </div>
  </section>

  
  <section className="band">
    <div className="shead reveal"><span className="eyebrow">Who We Serve</span>
      <h2>End-to-end talent transformation for everyone.</h2>
      <p className="muted">We help individuals, enterprises, institutions, startups, and governments build future-ready Human + AI capabilities.</p></div>
    <div className="offers reveal">
      <a href="#solutions" className="offer lead" data-scroll="sol-enterprises" data-nav><div className="iconwrap"><svg className="ico" viewBox="0 0 32 32"><rect fill="#8FD97F" x="5" y="7" width="22" height="21" rx="2.5"/><rect fill="#F6DB2D" x="9" y="11" width="5" height="5" rx="1"/><rect fill="#F6DB2D" x="18" y="11" width="5" height="5" rx="1"/><rect fill="#F6DB2D" x="9" y="19" width="5" height="5" rx="1"/><rect fill="#F6DB2D" x="18" y="19" width="5" height="5" rx="1"/></svg></div><span className="tg">For Enterprises</span><h3>Your managed, enterprise-ready talent pipeline.</h3><p>Capability assessment, graduate hiring &amp; deployment, BOT talent models, and dedicated AI Talent Factories.</p><span className="lnk">Explore →</span></a>
      <a href="#solutions" className="offer sub" data-scroll="sol-institutions" data-nav><div className="iconwrap"><svg className="ico" viewBox="0 0 32 32"><polygon fill="#8FD97F" points="16,2 28,8.5 28,23.5 16,30 4,23.5 4,8.5"/><polygon fill="#F6DB2D" points="16,9 18.6,14.6 24.5,15.2 20,19.2 21.3,25 16,22 10.7,25 12,19.2 7.5,15.2 13.4,14.6"/></svg></div><span className="tg">For Universities</span><h3>Turn your campus into a future-workforce hub.</h3><p>Industry-aligned curriculum, AI Centres of Excellence, faculty development, and placement readiness.</p><span className="lnk">Explore →</span></a>
      <a href="#solutions" className="offer sub" data-scroll="sol-students" data-nav><div className="iconwrap"><svg className="ico" viewBox="0 0 32 32"><polygon fill="#155F4B" points="16,1.5 22.5,15 16,11.5 9.5,15"/><rect fill="#155F4B" x="12.5" y="11" width="7" height="13" rx="1"/><polygon fill="#155F4B" points="9.5,15 5,25 9.5,22"/><polygon fill="#155F4B" points="22.5,15 27,25 22.5,22"/><circle fill="#5AB94B" cx="16" cy="13" r="3.2"/><rect fill="#5AB94B" x="13.8" y="24" width="4.4" height="6.5" rx="2.2"/></svg></div><span className="tg">For Students &amp; Professionals</span><h3>Launch or reinvent your career.</h3><p>Career-readiness pathways, upskilling &amp; reskilling, certifications, and career assurance.</p><span className="lnk">Explore →</span></a>
    </div>
    <div style={{textAlign: 'center', marginTop: '26px'}}><a href="#solutions" className="btn btn-dark" data-nav>See all six client types →</a></div>
  </section>

  
  <section>
    <div className="shead center reveal" style={{margin: '0 auto 36px'}}><span className="eyebrow">In Collaboration with Teceze</span>
      <h2>Transforming the AI era together</h2>
      <p className="muted">A global partnership ecosystem across cloud, networking, cybersecurity, and enterprise platforms — powering real-world labs and enterprise deployment.</p></div>
    <div className="marquee reveal" aria-label="Partner ecosystem"><div className="mtrack"><div className="plist mset"><span>Microsoft Azure</span><span>AWS</span><span>Google Cloud</span><span>Lenovo</span><span>Dell</span><span>HP</span><span>CrowdStrike</span><span>Fortinet</span><span>Mimecast</span><span>Zoho</span><span>Infosys</span><span>HCL</span><span>Wipro</span></div><div className="plist mset" aria-hidden="true"><span>Microsoft Azure</span><span>AWS</span><span>Google Cloud</span><span>Lenovo</span><span>Dell</span><span>HP</span><span>CrowdStrike</span><span>Fortinet</span><span>Mimecast</span><span>Zoho</span><span>Infosys</span><span>HCL</span><span>Wipro</span></div></div></div>
  </section>

  
  <section className="band">
    <div className="shead center reveal" style={{margin: '0 auto 40px'}}><span className="eyebrow">Proof</span>
      <h2>From potential to production</h2></div>
    <div className="tst reveal">
      <div className="q"><p>“EmpowerED transformed my career. Hands-on AI engineering and real production experience gave me the confidence to land my dream role. I was billable from day one.”</p><div className="who"><span className="av">PS</span><div><strong>Priya Sharma</strong><span>AI Engineer</span></div></div></div>
      <div className="q"><p>“From a non-IT background, I was skeptical. But the structured AWS pathway and enterprise simulations prepared me perfectly. I switched careers in just 18 weeks.”</p><div className="who"><span className="av">RK</span><div><strong>Rajesh Kumar</strong><span>Cloud Engineer</span></div></div></div>
      <div className="q"><p>“The enterprise partnership connected me directly with my employer. Working real SIEM platforms inside an agile squad made all the difference.”</p><div className="who"><span className="av">AP</span><div><strong>Aisha Patel</strong><span>Cybersecurity Analyst</span></div></div></div>
    </div>
  </section>

  <section className="ctaband"><span className="glow"></span><span className="grid-ovl"></span><div className="inner reveal">
    <img src={assets['hero-handshake-detail-v3']} alt="A robotic hand and a human hand clasped together" style={{width: '180px', height: 'auto', margin: '0 auto 20px', display: 'block'}}/>
    <h2>Learn. Build. Validate. Deploy.</h2>
    <p>We transform talent into enterprise-ready professionals equipped to succeed in the AI-powered future of work.</p>
    <div className="ctas"><a href="#contact" className="btn btn-yellow" data-nav>Get Started</a><a href="#home" className="btn btn-ghost" data-scroll="factory-model" data-nav>Explore the Factory</a></div>
  </div></section>
    </>
  );
}
