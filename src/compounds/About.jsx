import Reveal from './Reveal.jsx'
import Icon from './Icon.jsx'
import { profile } from '../data/profile.js'
import './About.css'

const FACTS = [
  { icon: 'location', label: 'Location', value: profile.location },
  { icon: 'grad', label: 'Degree', value: 'B.Tech Cyber Security, SRM University' },
  { icon: 'briefcase', label: 'Experience', value: 'Web Dev Intern — Webronics' },
  { icon: 'envelope', label: 'Email', value: profile.email },
]

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <Reveal>
          <div className="eyebrow"><Icon name="grad" /> About me</div>
          <h2 className="section-title">
            From <em>Kanchipuram</em>, building for the web
          </h2>
        </Reveal>

        <div className="about__grid">
          <Reveal delay={0.1}>
            <p className="about__p">
              I'm from <strong>Kanchipuram</strong>, Tamil Nadu — a city known for its rich
              heritage. I completed my schooling there and am currently pursuing a{' '}
              <strong>Bachelor's Degree in Cyber Security</strong> at SRM University (2025–2028).
            </p>
            <p className="about__p">
              Alongside my studies, I have a strong interest in web development. I completed a{' '}
              <strong>Web Development Internship at Webronics</strong>, where I built real-world
              projects and sharpened my frontend skills. I believe secure, well-crafted digital
              products make a real difference.
            </p>
          </Reveal>

          <div className="about__facts">
            {FACTS.map((f, i) => (
              <Reveal key={f.label} delay={0.15 + i * 0.07} className="card fact">
                <div className="fact__icon"><Icon name={f.icon} /></div>
                <div>
                  <div className="fact__label">{f.label}</div>
                  <div className="fact__value">{f.value}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}