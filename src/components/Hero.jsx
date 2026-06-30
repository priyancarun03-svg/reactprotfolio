import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data/profile.js'
import Icon from './Icon.jsx'
import './Hero.css'

const NAME_LETTERS = profile.name.split('')

const letterVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.04 * i, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
}

function Petals() {
  const petals = Array.from({ length: 9 })
  return (
    <div className="petals" aria-hidden="true">
      {petals.map((_, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${(i * 11 + 4) % 100}%`,
            animationDelay: `${i * 1.4}s`,
            animationDuration: `${14 + (i % 5) * 2}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % profile.roles.length), 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="hero" className="hero">
      <Petals />
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__grid">
        <div>
          <motion.div
            className="eyebrow"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Open to opportunities
          </motion.div>

          <h1 className="hero__name">
            {NAME_LETTERS.map((ch, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className={ch === ' ' ? 'sp' : ''}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </motion.span>
            ))}
          </h1>

          <svg className="ribbon-underline" viewBox="0 0 320 18" width="240" height="18">
            <motion.path
              d="M2 12 C 60 2, 120 18, 180 8 S 280 4, 318 10"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>

          <div className="hero__role">
            <AnimatePresence mode="wait">
              <motion.span
                key={profile.roles[roleIndex]}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                {profile.roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <motion.p
            className="hero__desc"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.25 }}
          >
            <a href="#contact" className="btn btn-primary">
              <Icon name="envelope" /> Hire me
            </a>
            <a href="#projects" className="btn btn-ghost">
              View work
            </a>
          </motion.div>

          <motion.div
            className="hero__socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.4 }}
          >
            <a href={profile.github} target="_blank" rel="noreferrer" className="icon-btn"><Icon name="github" /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="icon-btn"><Icon name="linkedin" /></a>
            <a href={`mailto:${profile.email}`} className="icon-btn"><Icon name="envelope" /></a>
            <a href={`tel:${profile.phone}`} className="icon-btn"><Icon name="phone" /></a>
          </motion.div>

          <motion.div
            className="hero__stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.55 }}
          >
            {profile.stats.map((s) => (
              <div key={s.label} className="stat">
                <div className="stat__num">{s.num}</div>
                <div className="stat__label">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="orbit-ring ring-1" />
          <div className="orbit-ring ring-2" />
          <div className="orbit-core">
            <Icon name="shield" />
          </div>
          {['html5', 'css3', 'js', 'react', 'linux', 'github'].map((icon, i) => (
            <div
              key={icon}
              className="orbit-chip"
              style={{ '--deg': `${i * 60}deg`, '--delay': `${i * -1.1}s` }}
            >
              <Icon name={icon} />
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="scroll-cue"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span />
      </motion.div>
    </section>
  )
}