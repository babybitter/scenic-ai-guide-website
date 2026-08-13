import { useEffect, useRef, type PointerEvent as ReactPointerEvent, type ReactNode, type RefObject } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  className: string
  ariaLabel: string
  href?: string
  onClick?: () => void
}

const MAGNET_RADIUS = 14
const MAGNET_STRENGTH = 0.12

export function MagneticButton({ children, className, ariaLabel, href, onClick }: MagneticButtonProps) {
  const elementRef = useRef<HTMLElement>(null)

  const updateMagnet = (clientX: number, clientY: number) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const element = elementRef.current
    if (!element) return

    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const offsetX = clientX - centerX
    const offsetY = clientY - centerY
    const distance = Math.hypot(offsetX, offsetY)

    if (distance <= Math.max(rect.width, rect.height) / 2 + MAGNET_RADIUS) {
      element.style.setProperty('--magnetic-x', `${offsetX * MAGNET_STRENGTH}px`)
      element.style.setProperty('--magnetic-y', `${offsetY * MAGNET_STRENGTH}px`)
    }
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    updateMagnet(event.clientX, event.clientY)
  }

  const reset = () => {
    const element = elementRef.current
    if (!element) return
    element.style.setProperty('--magnetic-x', '0px')
    element.style.setProperty('--magnetic-y', '0px')
  }

  useEffect(() => {
    const onWindowPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const element = elementRef.current
      if (!element) return
      const rect = element.getBoundingClientRect()
      const expandedLeft = rect.left - MAGNET_RADIUS
      const expandedRight = rect.right + MAGNET_RADIUS
      const expandedTop = rect.top - MAGNET_RADIUS
      const expandedBottom = rect.bottom + MAGNET_RADIUS
      if (event.clientX >= expandedLeft && event.clientX <= expandedRight && event.clientY >= expandedTop && event.clientY <= expandedBottom) {
        updateMagnet(event.clientX, event.clientY)
      } else {
        reset()
      }
    }

    window.addEventListener('pointermove', onWindowPointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', onWindowPointerMove)
  })

  const common = {
    className: `${className} magnetic-button`,
    'aria-label': ariaLabel,
    onPointerMove,
    onPointerEnter: (event: ReactPointerEvent<HTMLElement>) => updateMagnet(event.clientX, event.clientY),
    onBlur: reset,
  }

  if (href) {
    return <a {...common} ref={elementRef as RefObject<HTMLAnchorElement>} href={href} target="_blank" rel="noreferrer">{children}</a>
  }

  return <button {...common} ref={elementRef as RefObject<HTMLButtonElement>} type="button" onClick={onClick}>{children}</button>
}
