import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Reveal from './Reveal.jsx'
import Icon from './Icon.jsx'
import { projects } from '../data/profile.js'
import './Projects.css'

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleLeave = () => { x.set(0); y.set(0) }

  return (
    <Reveal delay={index * 0.1} className="project-reveal">
      <motion.div
        ref={ref}
        className="project-card"
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <div className="project-banner">
          <div className="project-banner__icon"><Icon name={project.icon} /></div>
          <div className="project-banner__tags">
            {project.tags.map((t) => <span key={t}>{t}</span>)}
          </div>
        </div>
        <div className="project-body">
          <div className="project-num">Project {project.id}</div>
          <h3 className="project-title">{project.title}</h3>
          <p className="project-desc">{project.description}</p>
          <div className="project-links">
            <a href={project.live} target="_blank" rel="noreferrer" className="project-link">
              <Icon name="external" /> Live
            </a>
            <a href={project.code} target="_blank" rel="noreferrer" className="project-link project-link--ghost">
              <Icon name="github" /> Code
            </a>
          </div>
        </div>
      </motion.div>
    </Reveal>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <Reveal>
          <div className="eyebrow"><Icon name="react" /> Projects</div>
          <h2 className="section-title">My work</h2>
          <p className="section-sub">Live projects I've built and deployed — tilt the cards to explore.</p>
        </Reveal>

        <div className="projects__grid">
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}