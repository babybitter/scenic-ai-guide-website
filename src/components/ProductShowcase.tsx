import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { featureSlides } from '../data/content'

export function ProductShowcase() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reducedMotion = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  useEffect(() => {
    if (paused || reducedMotion || document.hidden) return undefined
    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % featureSlides.length)
    }, 5600)
    return () => window.clearInterval(timer)
  }, [paused, reducedMotion])

  const slide = featureSlides[active]

  const move = (direction: number) => {
    setActive((value) => (value + direction + featureSlides.length) % featureSlides.length)
  }

  return (
    <div
      className="product-showcase"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="showcase-tabs" role="tablist" aria-label="产品功能截图">
        {featureSlides.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active === index}
            className={active === index ? 'active' : ''}
            onClick={() => setActive(index)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            {item.title}
          </button>
        ))}
      </div>
      <div className="showcase-panel">
        <div className="showcase-copy">
          <span className="eyebrow">{slide.eyebrow}</span>
          <h3>{slide.title}</h3>
          <p>{slide.description}</p>
          <ul>
            {slide.facts.map((fact) => <li key={fact}>{fact}</li>)}
          </ul>
          <div className="showcase-controls">
            <button type="button" onClick={() => move(-1)} aria-label="上一项">
              <ChevronLeft size={18} />
            </button>
            <span>{active + 1} / {featureSlides.length}</span>
            <button type="button" onClick={() => move(1)} aria-label="下一项">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <figure className="app-window">
          <div className="window-bar">
            <span /><span /><span />
            <b>数智游踪 · 产品实景</b>
          </div>
          <img key={slide.image} src={slide.image} alt={slide.alt} />
        </figure>
      </div>
    </div>
  )
}
