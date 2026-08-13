import { useEffect, useMemo, useState } from 'react'
import { featureSlides } from '../data/content'

export function ProductShowcase() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [cycle, setCycle] = useState(0)
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
  }, [paused, reducedMotion, cycle])

  const slide = featureSlides[active]

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
            onClick={() => {
              setActive(index)
              setCycle((value) => value + 1)
            }}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className="showcase-stage">
        <div className="showcase-track" style={{ transform: `translateX(-${active * 100}%)` }}>
          {featureSlides.map((item) => (
            <figure className="showcase-image-frame" key={item.id}>
              <img src={item.image} alt={item.alt} />
            </figure>
          ))}
        </div>
        <div className="showcase-summary" aria-live="polite">
          <span>{slide.eyebrow}</span>
          <b>{slide.description}</b>
          <div>{slide.facts.map((fact) => <small key={fact}>{fact}</small>)}</div>
        </div>
      </div>
    </div>
  )
}
