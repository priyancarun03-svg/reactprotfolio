import { useEffect, useRef } from 'react'
import './SparkleTrail.css'

// A restrained, low-frequency sparkle trail that follows the pointer.
// Pure DOM + CSS (no per-frame React renders) for performance.
export default function SparkleTrail() {
  const containerRef = useRef(null)
  const lastSpawn = useRef(0)

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || reduced) return

    const onMove = (e) => {
      const now = performance.now()
      if (now - lastSpawn.current < 70) return
      lastSpawn.current = now

      const el = document.createElement('span')
      el.className = 'sparkle-dot'
      el.style.left = e.clientX + 'px'
      el.style.top = e.clientY + 'px'
      const size = 4 + Math.random() * 4
      el.style.width = size + 'px'
      el.style.height = size + 'px'
      containerRef.current?.appendChild(el)
      setTimeout(() => el.remove(), 700)
    }

    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return <div ref={containerRef} className="sparkle-layer" aria-hidden="true" />
}