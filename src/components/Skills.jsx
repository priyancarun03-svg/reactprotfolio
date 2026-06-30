import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import Icon from './Icon.jsx'
import { skills } from '../data/profile.js'
import './Skills.css'

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <Reveal>
          <div className="eyebrow"><Icon name="terminal" /> Skills</div>
          <h2 className="section-title">What I work with</h2>
          <p className="section-sub">
            Technologies and tools I use to build secure, modern web experiences.
          </p>
        </Reveal>

        <motion.div
          className="skills__grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        >
          {skills.map((s) => (
            <motion.div
              key={s.name}
              className="skill-chip"
              variants={{
                hidden: { opacity: 0, y: 22, scale: 0.9 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
              }}
              whileHover={{ y: -6, scale: 1.04 }}
            >
              <Icon name={s.icon} />
              <span>{s.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}