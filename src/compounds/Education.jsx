import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import Icon from './Icon.jsx'
import { education, experience } from '../data/profile.js'
import './Education.css'

function Timeline({ items, withDesc }) {
  return (
    <div className="timeline">
      <motion.div
        className="timeline__line"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />
      {items.map((it, i) => (
        <Reveal key={it.title} delay={i * 0.12} className="timeline__item">
          <span className="timeline__dot" />
          <div className="timeline__card card">
            <span className="timeline__date">{it.date}</span>
            <div className="timeline__title">{it.title}</div>
            <div className="timeline__sub">{it.sub}</div>
            {withDesc && it.desc && <p className="timeline__desc">{it.desc}</p>}
          </div>
        </Reveal>
      ))}
    </div>
  )
}

export default function Education() {
  return (
    <section id="education" className="education">
      <div className="container edu__grid">
        <div>
          <Reveal>
            <div className="eyebrow"><Icon name="grad" /> Education</div>
            <h2 className="section-title">Academic background</h2>
          </Reveal>
          <Timeline items={education} />
        </div>
        <div>
          <Reveal delay={0.1}>
            <div className="eyebrow"><Icon name="briefcase" /> Experience</div>
            <h2 className="section-title">Work & internship</h2>
          </Reveal>
          <Timeline items={experience} withDesc />
        </div>
      </div>
    </section>
  )
}